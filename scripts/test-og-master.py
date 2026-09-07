import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

WIDTH = 1200
HEIGHT = 630

# 1. Base Canvas: Clean Executive Alabaster (#F8FAFC)
img = Image.new("RGB", (WIDTH, HEIGHT), color=(248, 250, 252))
draw = ImageDraw.Draw(img)

# 2. Subtle Decorative Accents
# Top edge accent bar (Teal Gradient/Solid)
draw.rectangle([0, 0, WIDTH, 6], fill=(13, 148, 136)) # Teal 600

# Outer Hairline Frame
draw.rectangle([24, 24, WIDTH - 24, HEIGHT - 24], outline=(226, 232, 240), width=1)

# Subtle ambient radial glow in upper right and lower left
glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
glow_draw = ImageDraw.Draw(glow)
glow_draw.ellipse([700, -100, 1250, 450], fill=(204, 251, 241, 140)) # Soft Teal 100
glow_draw.ellipse([-50, 350, 450, 750], fill=(241, 245, 249, 180))
glow = glow.filter(ImageFilter.GaussianBlur(80))
img.paste(glow, (0, 0), glow)

# Fonts
font_bold_path = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
font_reg_path = "/System/Library/Fonts/Supplemental/Arial.ttf"

font_badge = ImageFont.truetype(font_bold_path, 17)
font_name_small = ImageFont.truetype(font_reg_path, 30)
font_name_big = ImageFont.truetype(font_bold_path, 42)
font_sub = ImageFont.truetype(font_reg_path, 21)
font_pill = ImageFont.truetype(font_bold_path, 16)
font_footer = ImageFont.truetype(font_reg_path, 18)
font_rating = ImageFont.truetype(font_bold_path, 15)

# 3. Right Container: Elevated Photo Card (x=770, y=85, 340x440)
photo_path = "/Users/mac/Documents/AGENTS_WORK_HUB/apps/zadit-pages/public/foto-zadit.jpg"
card_w, card_h = 340, 440
card_x, card_y = 770, 85

# Draw soft drop shadow behind photo card
shadow = Image.new("RGBA", (card_w + 30, card_h + 30), (0, 0, 0, 0))
ImageDraw.Draw(shadow).rounded_rectangle([15, 15, card_w + 15, card_h + 15], radius=24, fill=(15, 23, 42, 25))
shadow = shadow.filter(ImageFilter.GaussianBlur(15))
img.paste(shadow, (card_x - 15, card_y - 10), shadow)

if os.path.exists(photo_path):
    p_img = Image.open(photo_path).convert("RGBA")
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

    # Mask with rounded corners
    mask = Image.new("L", (card_w, card_h), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, card_w, card_h], radius=22, fill=255)

    # Clean outer card border
    outer_card = Image.new("RGBA", (card_w + 6, card_h + 6), (13, 148, 136, 120))
    outer_mask = Image.new("L", (card_w + 6, card_h + 6), 0)
    ImageDraw.Draw(outer_mask).rounded_rectangle([0, 0, card_w + 6, card_h + 6], radius=24, fill=255)
    img.paste(outer_card, (card_x - 3, card_y - 3), outer_mask)

    # Paste photo
    img.paste(p_img, (card_x, card_y), mask)

    # Re-draw clean border on top of photo edge
    draw.rounded_rectangle([card_x, card_y, card_x + card_w, card_y + card_h], radius=22, outline=(15, 118, 110), width=2)

    # Mathematically Bounded Trust Badge Inset (Bottom Center)
    badge_text = "5.0 Rating Sribulancer | 10+ Thn Pengalaman"
    t_bbox = draw.textbbox((0, 0), badge_text, font=font_rating)
    text_w = t_bbox[2] - t_bbox[0]
    badge_box_w = min(card_w - 32, text_w + 44)
    badge_box_h = 38
    badge_bx = card_x + (card_w - badge_box_w) // 2
    badge_by = card_y + card_h - 48

    # Semi-transparent dark slate backdrop with emerald border
    badge_bg = Image.new("RGBA", (badge_box_w, badge_box_h), (0, 0, 0, 0))
    ImageDraw.Draw(badge_bg).rounded_rectangle([0, 0, badge_box_w, badge_box_h], radius=12, fill=(15, 23, 42, 235), outline=(45, 212, 191, 240), width=1)
    img.paste(badge_bg, (badge_bx, badge_by), badge_bg)

    # Gold Star
    star_cx, star_cy = badge_bx + 18, badge_by + 19
    star_pts = []
    for i in range(10):
        r = 7 if i % 2 == 0 else 3
        angle = i * math.pi / 5 - math.pi / 2
        star_pts.append((star_cx + r * math.cos(angle), star_cy + r * math.sin(angle)))
    draw.polygon(star_pts, fill=(245, 158, 11))

    draw.text((badge_bx + 32, badge_by + 10), badge_text, font=font_rating, fill=(248, 250, 252))

# 4. Left Content Area (x=80, max width=640)
left_x = 80

# Eyebrow Pill
eyebrow_text = "EXECUTIVE ADVISORY & DIGITAL PRACTICE"
eyebrow_bbox = draw.textbbox((0, 0), eyebrow_text, font=font_badge)
eyebrow_w = (eyebrow_bbox[2] - eyebrow_bbox[0]) + 30
draw.rounded_rectangle([left_x, 85, left_x + eyebrow_w, 119], radius=14, fill=(204, 251, 241), outline=(94, 234, 212), width=1)
draw.text((left_x + 15, 93), eyebrow_text, font=font_badge, fill=(15, 118, 110))

# Title: Two-tone name
draw.text((left_x, 140), "Muhammad", font=font_name_small, fill=(71, 85, 105)) # Slate 600
draw.text((left_x, 178), "Khoiruzzadittaqwa", font=font_name_big, fill=(15, 23, 42)) # Slate 900

# Subtitle / Hook
sub_line1 = "Solusi Praktis & Presisi untuk Dokumen Bisnis,"
sub_line2 = "Riset Akademik SINTA, dan Website Konversi Cepat."
draw.text((left_x, 244), sub_line1, font=font_sub, fill=(30, 41, 59))
draw.text((left_x, 274), sub_line2, font=font_sub, fill=(71, 85, 105))

# 2x2 Feature Pills with Light Card Styling
pills_data = [
    [("Dokumen Bisnis & SOP", 0), ("Riset Akademik & SPSS", 1)],
    [("Website Bisnis & Konversi", 2), ("CV Eksekutif Format ATS", 3)]
]

start_y = 338
row_h = 44
for row_idx, row in enumerate(pills_data):
    current_x = left_x
    for text, _ in row:
        bbox = draw.textbbox((0, 0), text, font=font_pill)
        text_w = bbox[2] - bbox[0]
        pill_w = text_w + 34
        
        y1 = start_y + (row_idx * (row_h + 10))
        y2 = y1 + row_h
        
        # Elevated pill card
        draw.rounded_rectangle([current_x, y1, current_x + pill_w, y2], radius=12, fill=(255, 255, 255), outline=(226, 232, 240), width=1)
        # Teal bullet dot
        draw.ellipse([current_x + 13, y1 + 17, current_x + 23, y1 + 27], fill=(13, 148, 136))
        draw.text((current_x + 30, y1 + 12), text, font=font_pill, fill=(15, 23, 42))
        
        current_x += pill_w + 12

# Separator line
draw.line([(left_x, 520), (1120, 520)], fill=(226, 232, 240), width=1)

# Footer bar
draw.text((left_x, 548), "Reputasi Resmi Terverifikasi  |  Kerahasiaan Terjamin  |  zadit.pages.dev", font=font_footer, fill=(100, 116, 139))

# Save
out_path = "/Users/mac/.gemini/antigravity-ide/brain/8ae908f9-66f7-4afe-95ba-b396baf843ff/mobile_audit/test_og_alabaster.jpg"
img.save(out_path, "JPEG", quality=95, optimize=True)
print(f"Generated test: {out_path}")
