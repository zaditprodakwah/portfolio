import os
from PIL import Image, ImageDraw, ImageFont

PUBLIC_DIR = "/Users/mac/Documents/AGENTS_WORK_HUB/apps/zadit-pages/public"

def draw_logo(size):
    """Draws the crisp modern Zadit 'Z' glyph on deep slate square with rounded corners."""
    # Render at 4x supersampling for ultra-crisp antialiasing
    scale = 4
    canvas_size = size * scale
    img = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Rounded rectangle background: Deep Slate (#0F172A)
    corner_radius = int(canvas_size * 0.24)
    draw.rounded_rectangle(
        [0, 0, canvas_size - 1, canvas_size - 1],
        radius=corner_radius,
        fill=(15, 23, 42, 255)
    )

    # Subtle inner border: Slate 700 (#334155)
    draw.rounded_rectangle(
        [0, 0, canvas_size - 1, canvas_size - 1],
        radius=corner_radius,
        outline=(51, 65, 85, 255),
        width=max(1, int(canvas_size * 0.02))
    )

    # Draw the dynamic Teal "Z" symbol (#14B8A6 / #0D9488)
    # The 'Z' coordinates: Top-left, Top-right, Bottom-left, Bottom-right
    pad_x = int(canvas_size * 0.26)
    pad_y = int(canvas_size * 0.24)
    stroke_w = max(2, int(canvas_size * 0.11))

    pt_tl = (pad_x, pad_y)
    pt_tr = (canvas_size - pad_x, pad_y)
    pt_bl = (pad_x, canvas_size - pad_y)
    pt_br = (canvas_size - pad_x, canvas_size - pad_y)

    teal_color = (20, 184, 166, 255) # Teal 500

    # Top horizontal bar
    draw.line([pt_tl, pt_tr], fill=teal_color, width=stroke_w)
    # Diagonal line
    draw.line([pt_tr, pt_bl], fill=teal_color, width=stroke_w)
    # Bottom horizontal bar
    draw.line([pt_bl, pt_br], fill=teal_color, width=stroke_w)

    # Round joints and endpoints
    half_s = stroke_w // 2
    for pt in [pt_tl, pt_tr, pt_bl, pt_br]:
        draw.ellipse([pt[0] - half_s, pt[1] - half_s, pt[0] + half_s, pt[1] + half_s], fill=teal_color)

    # Downsample with high-quality Lanczos resampling
    return img.resize((size, size), Image.Resampling.LANCZOS)

print("Generating favicon suite...")

# 1. Generate PNG icons
icon_512 = draw_logo(512)
icon_512.save(os.path.join(PUBLIC_DIR, "icon-512.png"), "PNG", optimize=True)

icon_192 = draw_logo(192)
icon_192.save(os.path.join(PUBLIC_DIR, "icon-192.png"), "PNG", optimize=True)

apple_icon = draw_logo(180)
apple_icon.save(os.path.join(PUBLIC_DIR, "apple-touch-icon.png"), "PNG", optimize=True)

icon_96 = draw_logo(96)
icon_96.save(os.path.join(PUBLIC_DIR, "icon-96.png"), "PNG", optimize=True)

icon_48 = draw_logo(48)
icon_48.save(os.path.join(PUBLIC_DIR, "icon-48.png"), "PNG", optimize=True)

icon_32 = draw_logo(32)
icon_16 = draw_logo(16)

# 2. Generate true multi-resolution binary ICO (16x16, 32x32, 48x48)
ico_path = os.path.join(PUBLIC_DIR, "favicon.ico")
icon_48.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print(f"Generated multi-size favicon.ico ({os.path.getsize(ico_path)} bytes)")

# 3. Generate clean scalable SVG icon
svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="8" fill="#0f172a" stroke="#334155" stroke-width="0.75"/>
  <path d="M8.5 8.5h15l-15 15h15" stroke="#14b8a6" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>'''
with open(os.path.join(PUBLIC_DIR, "icon.svg"), "w") as f:
    f.write(svg_content)
print("Generated icon.svg")

# 4. Generate Web App Manifest (site.webmanifest)
manifest_content = {
  "name": "Muhammad Khoiruzzadittaqwa | Zadit Solutions Hub",
  "short_name": "Zadit",
  "description": "Portofolio eksekutif & solusi strategis dokumen bisnis, riset akademik SINTA, dan solusi web modern.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#F8FAFC",
  "theme_color": "#0D9488",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon.svg",
      "sizes": "any",
      "type": "image/svg+xml"
    }
  ]
}

import json
with open(os.path.join(PUBLIC_DIR, "site.webmanifest"), "w") as f:
    json.dump(manifest_content, f, indent=2)
print("Generated site.webmanifest")
