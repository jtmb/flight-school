---
name: artifact-delivery
description: Deliver previews through a local loopback HTTPS webserver with a self-signed certificate and verified HTML/image links. Never use public hosts or CDNs merely because HTTPS was requested. Never offer local filesystem paths as clickable deliverables.
---

# Openable artifact delivery

- The owner's client opens only HTTPS links. Never send local filesystem paths,
  relative paths, file URLs or internal HTTP addresses as clickable deliverables.
- Reuse the existing working HTML preview/report delivery method. For screenshots,
  put the intended image into an HTML preview when that is the established flow,
  then provide its verified accessible HTTPS address—not the raw local PNG path.
- **Default to a local webserver with self-signed HTTPS. HTTPS is a transport
  requirement, NOT authorization to publish to the internet.** Do not use public
  upload hosts, image proxies, CDNs or tunnels for previews. Public distribution
  requires a separate explicit request to make the artifact public.
- Inspect the actual previously working route before choosing a new method. A
  local HTML file by itself is not a delivered page. Confirm the supplied address
  serves the intended content and does not redirect to HTTP.
- Necessary local paths and internal HTTP commands belong in inline/fenced code,
  not user-facing Markdown links. Internal repository cross-references may remain.
- Do not assume a tool's local image read is a user-visible attachment. Use a
  genuine supported attachment only when that delivery channel supports it.
- Never invent a hostname, change a URL's scheme without HTTPS support, or claim
  delivery when only a local file exists. State the actual delivery limitation.
- For an image approval request, generate the actual preview, obtain a usable
  HTTPS image/page URL, and open that URL to verify the intended image before
  responding. Include the verified clickable HTTPS link in chat; a description
  or a local image-read tool result alone does not fulfill the request.
- Keep private chat/screenshots and credentials protected. Do not use a public
  upload service, tunnel, or expose LAN control APIs merely to make a link work.
  New external publishing requires authorization; this policy is not permission
  to change the repository's LAN-only network/security model.
- Apply these rules to delegated deliverables too. No validator framework or
  additional test suite is needed; inspect the actual reply and delivery result.

## Local workflow

Use `python3 -B lulu-integration/serve-preview-https.py` for this repo. It serves
only the design-reference directory, on127.0.0.1:8791, with its certificate/key
outside the served tree. Do not expose the assistant/control APIs or repository
root. Do not silently install a root certificate or change trust settings.

Link the actual current concept's HTML/image filenames under
`https://localhost:8791/`; do not reuse a rejected concept's URL. Verify with the generated
certificate as the explicit CA, rather than assuming self-signed TLS is trusted.
Tell the owner their browser may show a self-signed certificate warning to accept
once. Never claim it is publicly trusted. Localhost links refer to their machine;
do not claim access from a phone or another machine without actual LAN setup.

Keep the preview labeled as proposed/sample data. Include the verified local
HTTPS page link and wait for approval before implementation or deployment.
