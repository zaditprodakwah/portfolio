import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

WIDTH = 1200
HEIGHT = 630

# 1. Base Image: Rich Dark Slate Background (#0A0F1D)
img = Image.new("RGB", (WIDTH, HEIGHT), color=(10, 15, 29))
draw = ImageDraw.Draw(img)

# 2. Add subtle Teal gradient/glow at top-right and bottom-left
glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
glow_draw = ImageDraw.Draw(glow)
glow_draw.ellipse([700, -100, 1300, 500], fill=(13, 148, 136, 45))
glow_draw.ellipse([-100, 300, 500, 800], fill=(15, 118, 110, 35))
glow = glow.filter(ImageFilter.GaussianBlur(80))
img.paste(glow, (0, 0), glow)

# Fonts
font_bold_path = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
font_reg_path = "/System/Library/Fonts/Supplemental/Arial.ttf"

font_badge = ImageFont.truetype(font_bold_path, 22)
font_title = ImageFont.truetype(font_bold_path, 52)
font_sub = ImageFont.truetype(font_reg_path, 26)
font_pill = ImageFont.truetype(font_bold_path, 20)
font_footer = ImageFont.truetype(font_reg_path, 22)

# 3. Photo Card on the Right (Rounded Card with border)
photo_path = "/Users/mac/Documents/AGENTS_WORK_HUB/apps/zadit-pages/public/foto-zadit.jpg"
if os.path.exists(photo_path):
    p_img = Image.open(photo_path).convert("RGBA")
    # Resize photo to 360x440 with smooth aspect fill
    card_w, card_h = 360, 440
    p_ratio = p_img.width / p_img.height
    c_ratio = card_w / card_h
    if p_ratio > c_ratio:
        new_w = int(card_h * p_ratio)
        p_img = p_img.resize((new_w, card_h), Image.Resampling.LANCZOS)
        crop_x = (new_w - card_w) // 2
        p_img = p_img.crop((crop_x, 0, crop_x + card_w, card_h))
    else:
        new_h = int(card_w / p_ratio)
        p_img = p_img.resize((card_w, new_h), Image.Resampling.LANCZOS)
        crop_y = (new_h - card_h) // 2
        p_img = p_img.crop((0, crop_y, card_w, crop_y + card_h))

    # Create mask for rounded corners
    mask = Image.new("L", (card_w, card_h), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([0, 0, card_w, card_h], radius=32, fill=255)

    # Card border
    card_x = 760
    card_y = 95
    
    # Outer glow card
    card_bg = Image.new("RGBA", (card_w + 12, card_h + 12), (20, 184, 166, 80))
    card_bg_mask = Image.new("L", (card_w + 12, card_h + 12), 0)
    ImageDraw.Draw(card_bg_mask).rounded_rectangle([0, 0, card_w + 12, card_h + 12], radius=36, fill=255)
    img.paste(card_bg, (card_x - 6, card_y - 6), card_bg_mask)

    img.paste(p_img, (card_x, card_y), mask)

    # Online indicator dot
    dot_x = card_x + card_w - 30
    dot_y = card_y + card_h - 30
    draw.ellipse([dot_x - 4, dot_y - 4, dot_x + 24, dot_y + 24], fill=(255, 255, 255))
    draw.ellipse([dot_x, dot_y, dot_x + 20, dot_y + 20], fill=(16, 185, 129))

# 4. Left Content Area
draw = ImageDraw.Draw(img)

# Eyebrow Badge
badge_text = "✦  EXECUTIVE PORTFOLIO & STRATEGIC ADVISORY"
draw.rounded_rectangle([80, 85, 620, 125], radius=20, fill=(19, 78, 74), outline=(45, 212, 191), width=1)
draw.text((105, 93), badge_text, font=font_badge, fill=(204, 251, 241))

# Main Title (2 Lines)
draw.text((80, 150), "Muhammad", font=font_title, fill=(255, 255, 255))
draw.text((80, 215), "Khoiruzzadittaqwa", font=font_title, fill=(45, 212, 191))

# Subtitle
sub_text = "10+ Tahun Membantu Bisnis, Lembaga & Akademisi:\nDokumen Kemitraan, Riset SINTA & Solusi Web Cepat"
draw.text((80, 295), sub_text, font=font_sub, fill=(203, 213, 225))

# 4 Pillars Badges (2x2 Grid)
pills = [
    ("📊 Dokumen Bisnis & Pitch Deck", 80, 395, 330, 440),
    ("🎓 Riset SINTA & Olah Data", 345, 395, 620, 440),
    ("🚀 Technical SEO & Konversi", 80, 455, 330, 500),
    ("⚡ Solusi Web Performa Tinggi", 345, 455, 620, 500)
]

for text, x1, y1, x2, y2 in pills:
    draw.rounded_rectangle([x1, y1, x2, y2], radius=12, fill=(30, 41, 59), outline=(51, 65, 85), width=1)
    draw.text((x1 + 14, y1 + 10), text, font=font_pill, fill=(241, 245, 249))

# Horizontal Separator
draw.line([(80, 540), (1120, 540)], fill=(51, 65, 85), width=1)

# Footer Trust Bar
draw.text((80, 565), "★ Rating 5.0 Sribulancer   |   100% Reputasi Terverifikasi   |   zadit.pages.dev", font=font_footer, fill=(148, 163, 184))

# 5. Save Output
out_path = "/Users/mac/Documents/AGENTS_WORK_HUB/apps/zadit-pages/public/og-image.jpg"
img.save(out_path, "JPEG", quality=92, optimize=True)
print(f"Generated {out_path} ({os.path.getsize(out_path)} bytes)")
