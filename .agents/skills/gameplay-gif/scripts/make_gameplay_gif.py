#!/usr/bin/env python3
"""Turn an existing gameplay recording into one GIF and a matching PNG poster.

Requires Python 3, ffmpeg, and ffprobe. Uses only the Python standard library.
The size budget is advisory: this tool encodes once and reports the result.
It cannot determine whether its input really depicts the project being documented.
"""

import argparse
import json
import math
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile


def finite_number(value):
    number = float(value)
    if not math.isfinite(number):
        raise argparse.ArgumentTypeError("must be a finite number")
    return number


def positive_number(value):
    number = finite_number(value)
    if number <= 0:
        raise argparse.ArgumentTypeError("must be greater than zero")
    return number


def positive_integer(value):
    number = int(value)
    if number <= 0:
        raise argparse.ArgumentTypeError("must be a positive integer")
    return number


def run(command):
    result = subprocess.run(command, text=True, capture_output=True)
    if result.returncode:
        detail = result.stderr.strip() or result.stdout.strip()
        raise RuntimeError(detail or f"{Path(command[0]).name} failed")
    return result.stdout


def probe(ffprobe, path, count_frames=False):
    command = [ffprobe, "-v", "error", "-select_streams", "v:0"]
    if count_frames:
        command.append("-count_frames")
    command += [
        "-show_entries", "stream=width,height,duration,nb_read_frames:format=duration",
        "-of", "json", str(path),
    ]
    result = json.loads(run(command))
    streams = result.get("streams", [])
    if not streams or not streams[0].get("width") or not streams[0].get("height"):
        raise RuntimeError(f"No usable video stream in {path}")
    stream = streams[0]
    duration = stream.get("duration") or result.get("format", {}).get("duration")
    try:
        duration = float(duration)
        if not math.isfinite(duration) or duration <= 0:
            duration = None
    except (TypeError, ValueError):
        duration = None
    return stream, duration


def same_file(first, second):
    return first == second or (
        first.exists() and second.exists() and os.path.samefile(first, second)
    )


def check_outputs(paths, overwrite):
    for path in paths:
        if path.exists() and (not overwrite or not path.is_file()):
            raise RuntimeError(f"Output already exists: {path}. Use --overwrite to replace files.")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, help="Existing gameplay video file")
    parser.add_argument("--output", required=True, help="Destination ending in .gif")
    parser.add_argument("--start", type=finite_number, default=0, help="Start time in seconds (default: 0)")
    parser.add_argument("--duration", type=positive_number, default=6, help="Clip length in seconds (default: 6)")
    parser.add_argument("--width", type=positive_integer, default=960, help="Maximum width; never upscale (default: 960)")
    parser.add_argument("--fps", type=positive_integer, default=12, help="Frames per second, 1–100 (default: 12)")
    parser.add_argument("--max-mb", type=positive_number, default=8, help="Advisory size budget in MiB (default: 8)")
    parser.add_argument("--dither", choices=("bayer", "none"), default="bayer", help="Palette dithering (default: bayer)")
    parser.add_argument("--pixel-art", action="store_true", help="Use nearest-neighbor scaling instead of Lanczos")
    parser.add_argument("--overwrite", action="store_true", help="Replace an existing GIF and/or poster")
    args = parser.parse_args()
    if args.start < 0:
        parser.error("--start must be zero or greater")
    if args.fps > 100:
        parser.error("--fps must be at most 100 (GIF delays use hundredths of a second)")

    source = Path(args.input).expanduser().resolve()
    output = Path(args.output).expanduser().resolve()
    poster = output.with_name(output.stem + "-poster.png")
    if not source.is_file():
        parser.error(f"Input file does not exist: {source}")
    if output.suffix.lower() != ".gif":
        parser.error("--output must end in .gif")
    if any(same_file(source, path) for path in (output, poster)):
        parser.error("Input and output files must be different")

    try:
        ffmpeg, ffprobe = shutil.which("ffmpeg"), shutil.which("ffprobe")
        if not ffmpeg or not ffprobe:
            raise RuntimeError("Install FFmpeg so both ffmpeg and ffprobe are available on PATH.")
        check_outputs((output, poster), args.overwrite)
        _, source_duration = probe(ffprobe, source)
        if source_duration is not None and args.start >= source_duration:
            raise RuntimeError(f"--start is outside the input's {source_duration:g}-second duration.")
        output.parent.mkdir(parents=True, exist_ok=True)

        # Normalize non-square pixels without enlarging either source dimension.
        # Filter dimensions also reflect FFmpeg's automatic rotation handling.
        scaler = "neighbor" if args.pixel_art else "lanczos"
        scale = (
            f"scale=w='max(1,trunc(min({args.width},iw*min(1,sar))))'"
            f":h='max(1,round(ow/dar))':flags={scaler},setsar=1"
        )
        dither = "dither=bayer:bayer_scale=3" if args.dither == "bayer" else "dither=none"
        filters = (
            f"[0:v:0]trim=duration={args.duration:g},setpts=PTS-STARTPTS,"
            f"fps={args.fps},{scale},split[frames][palette_input];"
            "[palette_input]palettegen=stats_mode=diff[palette];"
            f"[frames][palette]paletteuse={dither}:diff_mode=rectangle[gif]"
        )
        with tempfile.TemporaryDirectory(prefix=".gameplay-gif-", dir=output.parent) as temp:
            temp_gif = Path(temp) / "gameplay.gif"
            temp_poster = Path(temp) / "poster.png"
            run([
                ffmpeg, "-hide_banner", "-loglevel", "error", "-nostdin", "-y",
                "-ss", f"{args.start:g}", "-t", f"{args.duration:g}", "-i", str(source),
                "-filter_complex", filters, "-map", "[gif]", "-an", "-loop", "0", str(temp_gif),
            ])
            stream, duration = probe(ffprobe, temp_gif, count_frames=True)
            run([
                ffmpeg, "-hide_banner", "-loglevel", "error", "-nostdin", "-y",
                "-i", str(temp_gif), "-frames:v", "1", "-update", "1", str(temp_poster),
            ])
            # Both assets are complete before either destination is replaced.
            check_outputs((output, poster), args.overwrite)
            byte_size = temp_gif.stat().st_size
            frame_count = int(stream.get("nb_read_frames") or 0)
            os.replace(temp_gif, output)
            os.replace(temp_poster, poster)

        budget = int(args.max_mb * 1024 * 1024)
        warnings = []
        if byte_size > budget:
            warnings.append("Over the advisory size budget. Inspect once, then shorten the clip or reduce width/FPS if needed.")
        if frame_count < 2:
            warnings.append("Only one frame was encoded. Select a longer clip to show gameplay motion.")
        if source_duration is not None and args.start + args.duration > source_duration:
            warnings.append("The input ended before the requested clip duration.")
        print(json.dumps({
            "gif": str(output),
            "poster": str(poster),
            "width": stream["width"],
            "height": stream["height"],
            "duration_seconds": duration,
            "frame_count": frame_count,
            "fps_requested": args.fps,
            "bytes": byte_size,
            "mib": round(byte_size / (1024 * 1024), 3),
            "budget_bytes": budget,
            "budget_exceeded": byte_size > budget,
            "warnings": warnings,
        }, indent=2))
        return 0
    except (OSError, RuntimeError, ValueError) as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
