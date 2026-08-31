from pathlib import Path
import base64
import re

project = Path('/home/ubuntu/geardxf')
source = project / 'dist/public/index.html'
output = project / 'Gearbuilder-standalone.html'
logo = Path('/home/ubuntu/upload/abobakernobg.png')

html = source.read_text(encoding='utf-8')

# Remove development-only and hosting-only scripts so the file does not depend on Manus runtime endpoints.
html = re.sub(r'\s*<script[^>]+src="/__manus__/debug-collector\.js"[^>]*></script>', '', html, flags=re.I)
html = re.sub(r'\s*<script[^>]+src="https://manus-analytics\.com/umami"[^>]*></script>', '', html, flags=re.I)
html = re.sub(r'\s*<script[^>]+src="https://www\.clarity\.ms/tag/"[^>]*></script>', '', html, flags=re.I)

# Inline the transparent Abo Baker logo wherever the bundled app references its WebDev storage URL.
if logo.exists():
    payload = base64.b64encode(logo.read_bytes()).decode('ascii')
    data_uri = f'data:image/png;base64,{payload}'
    html = html.replace('/manus-storage/abobakernobg_69e3509e.png', data_uri)
    html = html.replace('/manus-storage/abobakernobg.png', data_uri)

# Remove Google font preload/import links; the CSS has the handwritten fallbacks and remains fully local.
html = re.sub(r'\s*<link[^>]+fonts\.googleapis\.com[^>]*>', '', html, flags=re.I)
html = re.sub(r'\s*<link[^>]+fonts\.gstatic\.com[^>]*>', '', html, flags=re.I)

# Neutralize analytics URLs that the original compiled app can inject at runtime.
for runtime_url in (
    'https://www.clarity.ms/tag/v3jpzqk7mv?ref=npm',
    'https://www.googletagmanager.com/gtag/js?l=dataLayer&id=G-WSCX6L1JPC',
    'https://www.clarity.ms',
    'https://www.googletagmanager.com',
):
    html = html.replace(runtime_url, 'about:blank')

# Keep the artifact clearly identified when opened directly from disk.
html = html.replace('<title>Gearbuilder — Assembly Bench</title>', '<title>Gearbuilder — Standalone Gear Editor</title>')

output.write_text(html, encoding='utf-8')
print(f'Wrote {output} ({output.stat().st_size:,} bytes)')
print('External Manus runtime scripts removed; logo embedded as a data URI.')
