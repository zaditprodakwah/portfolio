import os
import json
import glob
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

WIDTH = 1200
HEIGHT = 630

font_bold_path = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
font_reg_path = "/System/Library/Fonts/Supplemental/Arial.ttf"

font_eyebrow = ImageFont.truetype(font_bold_path, 15)
font_title_large = ImageFont.truetype(font_bold_path, 38)
font_title_medium = ImageFont.truetype(font_bold_path, 30)
font_title_compact = ImageFont.truetype(font_bold_path, 26)
font_name_sub = ImageFont.truetype(font_reg_path, 28)
font_sub = ImageFont.truetype(font_reg_path, 19)
font_pill = ImageFont.truetype(font_bold_path, 14)
font_footer = ImageFont.truetype(font_reg_path, 16)
font_card_head = ImageFont.truetype(font_bold_path, 17)
font_rating = ImageFont.truetype(font_bold_path, 13)

PUBLIC_DIR = "/Users/mac/Documents/AGENTS_WORK_HUB/apps/zadit-pages/public"
PHOTO_PATH = os.path.join(PUBLIC_DIR, "foto-zadit.jpg")

def create_base_canvas():
    img = Image.new("RGB", (WIDTH, HEIGHT), color=(248, 250, 252)) # Alabaster
    draw = ImageDraw.Draw(img)

    # Top accent bar
    draw.rectangle([0, 0, WIDTH, 6], fill=(13, 148, 136))

    # Outer border
    draw.rectangle([20, 20, WIDTH - 20, HEIGHT - 20], outline=(226, 232, 240), width=1)

    # Ambient radial glow
    glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse([720, -100, 1250, 420], fill=(204, 251, 241, 130))
    glow_draw.ellipse([-50, 350, 450, 750], fill=(241, 245, 249, 180))
    glow = glow.filter(ImageFilter.GaussianBlur(80))
    img.paste(glow, (0, 0), glow)

    return img, draw

def wrap_text_to_width(draw, text, font, max_width):
    """Greedy word wrap adhering strictly to max_width."""
    words = text.split()
    lines = []
    curr_line = []
    
    for word in words:
        test_line = " ".join(curr_line + [word])
        bbox = draw.textbbox((0, 0), test_line, font=font)
        if (bbox[2] - bbox[0]) <= max_width:
            curr_line.append(word)
        else:
            if curr_line:
                lines.append(" ".join(curr_line))
                curr_line = [word]
            else:
                lines.append(word)
                curr_line = []
    if curr_line:
        lines.append(" ".join(curr_line))
    return lines

def render_left_column(draw, eyebrow, title_lines, sub_lines, pills_data, max_left_w=680):
    left_x = 75

    # 1. Eyebrow Pill
    eyebrow_bbox = draw.textbbox((0, 0), eyebrow, font=font_eyebrow)
    eyebrow_w = min(max_left_w, (eyebrow_bbox[2] - eyebrow_bbox[0]) + 28)
    draw.rounded_rectangle([left_x, 75, left_x + eyebrow_w, 107], radius=12, fill=(204, 251, 241), outline=(94, 234, 212), width=1)
    draw.text((left_x + 14, 82), eyebrow, font=font_eyebrow, fill=(15, 118, 110))

    # 2. Title Lines
    curr_y = 125
    for t_text, font, color in title_lines:
        draw.text((left_x, curr_y), t_text, font=font, fill=color)
        bbox = draw.textbbox((0, 0), t_text, font=font)
        curr_y += (bbox[3] - bbox[1]) + 10

    curr_y += 6

    # 3. Subtitle Lines
    for s_text in sub_lines:
        if s_text:
            draw.text((left_x, curr_y), s_text, font=font_sub, fill=(51, 65, 85))
            curr_y += 26

    curr_y += 14

    # 4. Feature / Metric Pills (2x2 Grid)
    row_h = 38
    for row_idx, row in enumerate(pills_data):
        current_x = left_x
        for text in row:
            bbox = draw.textbbox((0, 0), text, font=font_pill)
            text_w = bbox[2] - bbox[0]
            pill_w = text_w + 30
            
            y1 = curr_y + (row_idx * (row_h + 8))
            y2 = y1 + row_h
            
            draw.rounded_rectangle([current_x, y1, current_x + pill_w, y2], radius=10, fill=(255, 255, 255), outline=(226, 232, 240), width=1)
            draw.ellipse([current_x + 10, y1 + 14, current_x + 18, y1 + 22], fill=(13, 148, 136))
            draw.text((current_x + 24, y1 + 10), text, font=font_pill, fill=(15, 23, 42))
            
            current_x += pill_w + 10

    # 5. Separator & Footer
    draw.line([(left_x, 525), (1125, 525)], fill=(226, 232, 240), width=1)
    draw.text((left_x, 550), "Reputasi Resmi Terverifikasi  |  Kerahasiaan Terjamin  |  muhzadit.pages.dev", font=font_footer, fill=(100, 116, 139))

def generate_master_card():
    img, draw = create_base_canvas()

    render_left_column(
        draw,
        eyebrow="EXECUTIVE ADVISORY & DIGITAL PRACTICE",
        title_lines=[
            ("Muhammad", font_name_sub, (71, 85, 105)),
            ("Khoiruzzadittaqwa", font_title_large, (15, 23, 42))
        ],
        sub_lines=[
            "Solusi Praktis & Presisi untuk Dokumen Bisnis,",
            "Riset Akademik SINTA, dan Website Konversi Cepat."
        ],
        pills_data=[
            ["Dokumen Bisnis & SOP", "Riset Akademik & SPSS"],
            ["Website Bisnis & Konversi", "CV Eksekutif Format ATS"]
        ],
        max_left_w=660
    )

    # Right Column: Photo Card
    card_w, card_h = 330, 430
    card_x, card_y = 780, 75

    shadow = Image.new("RGBA", (card_w + 30, card_h + 30), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle([15, 15, card_w + 15, card_h + 15], radius=24, fill=(15, 23, 42, 25))
    shadow = shadow.filter(ImageFilter.GaussianBlur(15))
    img.paste(shadow, (card_x - 15, card_y - 10), shadow)

    if os.path.exists(PHOTO_PATH):
        p_img = Image.open(PHOTO_PATH).convert("RGBA")
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

        mask = Image.new("L", (card_w, card_h), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, card_w, card_h], radius=22, fill=255)

        outer_card = Image.new("RGBA", (card_w + 6, card_h + 6), (13, 148, 136, 140))
        outer_mask = Image.new("L", (card_w + 6, card_h + 6), 0)
        ImageDraw.Draw(outer_mask).rounded_rectangle([0, 0, card_w + 6, card_h + 6], radius=24, fill=255)
        img.paste(outer_card, (card_x - 3, card_y - 3), outer_mask)

        img.paste(p_img, (card_x, card_y), mask)
        draw.rounded_rectangle([card_x, card_y, card_x + card_w, card_y + card_h], radius=22, outline=(15, 118, 110), width=2)

        # Mathematically Inset Badge
        badge_text = "Rating 5.0  |  10+ Thn Rekam Jejak"
        t_bbox = draw.textbbox((0, 0), badge_text, font=font_rating)
        text_w = t_bbox[2] - t_bbox[0]
        badge_box_w = text_w + 44
        badge_box_h = 36
        badge_bx = card_x + (card_w - badge_box_w) // 2
        badge_by = card_y + card_h - 46

        badge_bg = Image.new("RGBA", (badge_box_w, badge_box_h), (0, 0, 0, 0))
        ImageDraw.Draw(badge_bg).rounded_rectangle(
            [0, 0, badge_box_w, badge_box_h],
            radius=12,
            fill=(15, 23, 42, 240),
            outline=(45, 212, 191, 230),
            width=1
        )
        img.paste(badge_bg, (badge_bx, badge_by), badge_bg)

        # Gold Star
        star_cx, star_cy = badge_bx + 16, badge_by + 18
        star_pts = []
        for i in range(10):
            r = 6.5 if i % 2 == 0 else 3
            angle = i * math.pi / 5 - math.pi / 2
            star_pts.append((star_cx + r * math.cos(angle), star_cy + r * math.sin(angle)))
        draw.polygon(star_pts, fill=(245, 158, 11))

        draw.text((badge_bx + 30, badge_by + 10), badge_text, font=font_rating, fill=(248, 250, 252))

    out_file = os.path.join(PUBLIC_DIR, "og-image.jpg")
    img.save(out_file, "JPEG", quality=95, optimize=True)
    print(f"Generated: {out_file}")

def render_right_metric_card(img, draw, header_text, metric_rows):
    card_w, card_h = 340, 430
    card_x, card_y = 780, 75

    shadow = Image.new("RGBA", (card_w + 30, card_h + 30), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle([15, 15, card_w + 15, card_h + 15], radius=24, fill=(15, 23, 42, 20))
    shadow = shadow.filter(ImageFilter.GaussianBlur(15))
    img.paste(shadow, (card_x - 15, card_y - 10), shadow)

    draw.rounded_rectangle([card_x, card_y, card_x + card_w, card_y + card_h], radius=20, fill=(255, 255, 255), outline=(226, 232, 240), width=1)

    # Card Top Accent Header
    draw.rounded_rectangle([card_x + 1, card_y + 1, card_x + card_w - 1, card_y + 56], radius=20, fill=(241, 245, 249))
    draw.rectangle([card_x + 1, card_y + 35, card_x + card_w - 1, card_y + 56], fill=(241, 245, 249))
    draw.text((card_x + 18, card_y + 18), header_text, font=font_card_head, fill=(15, 23, 42))

    # Metric Rows (2x2 inside card)
    grid_y = card_y + 70
    box_w = 140
    box_h = 74

    coords = [
        (card_x + 18, grid_y),
        (card_x + 178, grid_y),
        (card_x + 18, grid_y + 86),
        (card_x + 178, grid_y + 86)
    ]

    for idx, (val, lbl) in enumerate(metric_rows[:4]):
        bx, by = coords[idx]
        draw.rounded_rectangle([bx, by, bx + box_w, by + box_h], radius=12, fill=(248, 250, 252), outline=(226, 232, 240), width=1)
        
        # Adaptive font size for metric value
        v_size = 15 if len(val) > 10 else (18 if len(val) > 7 else 22)
        v_font = ImageFont.truetype(font_bold_path, v_size)
        draw.text((bx + 10, by + 12), val[:14], font=v_font, fill=(13, 148, 136))
        
        # Adaptive font size for label
        l_font = ImageFont.truetype(font_bold_path, 10 if len(lbl) > 13 else 11)
        draw.text((bx + 10, by + 46), lbl[:18].upper(), font=l_font, fill=(100, 116, 139))

    # Bottom Trust Ribbon inside Card
    ribbon_y = card_y + card_h - 75
    draw.rounded_rectangle([card_x + 18, ribbon_y, card_x + card_w - 18, ribbon_y + 50], radius=12, fill=(204, 251, 241), outline=(94, 234, 212), width=1)
    draw.text((card_x + 32, ribbon_y + 15), "STANDAR EKSEKUSI TINGGI", font=ImageFont.truetype(font_bold_path, 11), fill=(15, 118, 110))
    draw.text((card_x + 32, ribbon_y + 30), "Teruji Melalui Validasi Klien Riil", font=ImageFont.truetype(font_reg_path, 11), fill=(51, 65, 85))

def generate_audit_card():
    img, draw = create_base_canvas()
    render_left_column(
        draw,
        eyebrow="DIAGNOSTIC & READINESS ENGINE",
        title_lines=[
            ("Executive Diagnostic", font_title_large, (15, 23, 42)),
            ("& Growth Scorecard", font_title_large, (13, 148, 136))
        ],
        sub_lines=[
            "Audit kesiapan bisnis, dokumen investasi, dan kinerja web.",
            "Dapatkan rekomendasi aksi prioritas dalam 2 menit."
        ],
        pills_data=[
            ["Evaluasi Dokumen & SOP", "Analisis Rigor Riset"],
            ["Skor Kecepatan Web", "Rekomendasi Terstruktur"]
        ],
        max_left_w=670
    )
    render_right_metric_card(
        img, draw,
        header_text="Indikator Kesiapan Proyek",
        metric_rows=[
            ("Top 5%", "Standar Mutu"),
            ("14 Hari", "Siklus Kerja"),
            ("100%", "Kerahasiaan"),
            ("Grade A", "Skor Kesiapan")
        ]
    )
    out_file = os.path.join(PUBLIC_DIR, "og-audit.jpg")
    img.save(out_file, "JPEG", quality=95, optimize=True)
    print(f"Generated: {out_file}")

def generate_pillar_cards():
    pillars = [
        {
            "filename": "og-dokumen-bisnis.jpg",
            "eyebrow": "DOKUMEN BISNIS & INVESTASI",
            "title_lines": [("Proposal Usaha & Pitch Deck", font_title_large, (15, 23, 42)), ("Siap Rapat Direksi", font_title_large, (13, 148, 136))],
            "sub": [
                "Penyusunan dokumen kemitraan, analisis kelayakan usaha,",
                "dan proyeksi arus kas 5 tahun yang transparan."
            ],
            "pills": [["Kelayakan Usaha 5 Thn", "Pemetaan Supply Chain"], ["Slide Pitch Investor", "SOP Tata Kelola"]],
            "metrics": [("100%", "Siap Rapat"), ("14 Hari", "Waktu Selesai"), ("5 Tahun", "Proyeksi Kas"), ("5.0 Stars", "Kepuasan Klien")]
        },
        {
            "filename": "og-olah-data.jpg",
            "eyebrow": "RISET AKADEMIK & DATA",
            "title_lines": [("Pengolahan Data Kuantitatif", font_title_large, (15, 23, 42)), ("& Publikasi Jurnal SINTA", font_title_large, (13, 148, 136))],
            "sub": [
                "Uji instrumen validitas, regresi SPSS/Python, serta",
                "penyesuaian gaya selingkung pedoman ilmiah."
            ],
            "pills": [["Uji Validitas & Reliabilitas", "SPSS & Python Data"], ["Akreditasi SINTA 2-4", "Bebas Plagiarisme"]],
            "metrics": [("SINTA 2-4", "Target Jurnal"), ("SPSS/Py", "Alat Analisis"), ("Lolos", "Hasil Review"), ("100%", "Sesuai Template")]
        },
        {
            "filename": "og-seo.jpg",
            "eyebrow": "SEO & KONTEN KONVERSI",
            "title_lines": [("Pemasaran Kata Kunci Berniat", font_title_large, (15, 23, 42)), ("& Pertumbuhan Leads B2B", font_title_large, (13, 148, 136))],
            "sub": [
                "Riset kata kunci komersial, struktur halaman konversi,",
                "dan artikel edukatif yang menggerakkan prospek."
            ],
            "pills": [["Audit Kata Kunci Komersial", "Struktur Halaman Sales"], ["Artikel Berbobot Otoritas", "Arsitektur Silo SEO"]],
            "metrics": [("Top 3", "Peringkat SERP"), ("+140%", "Kenaikan Leads"), ("16.8%", "Rasio CTR"), ("2.4x", "Retensi Sesi")]
        },
        {
            "filename": "og-web-performa.jpg",
            "eyebrow": "SOLUSI WEB CEPAT & MODERN",
            "title_lines": [("Modernisasi Kinerja Web", font_title_large, (15, 23, 42)), ("Aksesibel & Cepat Dibuka", font_title_large, (13, 148, 136))],
            "sub": [
                "Optimasi LCP < 1 detik, standar kontras WCAG AAA,",
                "dan antarmuka responsif tanpa lag pada jaringan seluler."
            ],
            "pills": [["LCP Di Bawah 1 Detik", "100% Aksesibilitas"], ["Optimasi Cloudflare Edge", "Integrasi WhatsApp"]],
            "metrics": [("< 0.8s", "Waktu Muat LCP"), ("100", "Skor CWV"), ("AAA", "Kontras Warna"), ("Edge", "Server Global")]
        }
    ]

    for p in pillars:
        img, draw = create_base_canvas()
        render_left_column(draw, p["eyebrow"], p["title_lines"], p["sub"], p["pills"], max_left_w=670)
        render_right_metric_card(img, draw, "Capaian & Metrik Kunci", p["metrics"])
        out_file = os.path.join(PUBLIC_DIR, p["filename"])
        img.save(out_file, "JPEG", quality=95, optimize=True)
        print(f"Generated: {out_file}")

def generate_solution_cards():
    solutions_dir = "/Users/mac/Documents/AGENTS_WORK_HUB/apps/zadit-pages/content/solutions"
    if not os.path.exists(solutions_dir):
        return

    for json_file in glob.glob(os.path.join(solutions_dir, "*.json")):
        with open(json_file, "r") as f:
            data = json.load(f)

        slug = data.get("slug")
        title = data.get("title", "")
        meta_desc = data.get("metaDescription", "")
        pillar_name = data.get("pillarName", "SOLUSI TERPROGRAM")
        
        img, draw = create_base_canvas()

        # Wrap title lines safely within 660px
        max_title_w = 660
        title_font = font_title_medium if len(title) > 40 else font_title_large
        wrapped_lines = wrap_text_to_width(draw, title, title_font, max_title_w)
        
        title_lines = []
        for i, line in enumerate(wrapped_lines[:2]):
            color = (15, 23, 42) if i == 0 else (13, 148, 136)
            title_lines.append((line, title_font, color))

        # Wrap sub lines
        wrapped_sub = wrap_text_to_width(draw, meta_desc, font_sub, max_title_w)
        sub_lines = wrapped_sub[:2]

        metrics = []
        for item in data.get("impactDashboard", {}).get("businessRoi", []):
            metrics.append((item.get("value", ""), item.get("label", "")))
        for item in data.get("impactDashboard", {}).get("technicalRigor", []):
            if len(metrics) < 4:
                metrics.append((item.get("value", ""), item.get("label", "")))

        while len(metrics) < 4:
            metrics.append(("Terverifikasi", "Standar Mutu"))

        keyword = data.get("focusKeyword", "Solusi Terprogram")
        pills = [
            [keyword[:20], "Standar Eksekutif"],
            ["Konsultasi Langsung", "Deliverable Presisi"]
        ]

        render_left_column(
            draw,
            eyebrow=f"SOLUSI RISET: {pillar_name.upper()}",
            title_lines=title_lines,
            sub_lines=sub_lines,
            pills_data=pills,
            max_left_w=660
        )
        render_right_metric_card(img, draw, "Dashboard Dampak Riil", metrics[:4])
        
        out_file = os.path.join(PUBLIC_DIR, f"og-{slug}.jpg")
        img.save(out_file, "JPEG", quality=95, optimize=True)
        print(f"Generated solution card: {out_file}")

if __name__ == "__main__":
    print("Generating comprehensive Alabaster OG Image Suite with dynamic line-wrapping...")
    generate_master_card()
    generate_audit_card()
    generate_pillar_cards()
    generate_solution_cards()
    print("All OG images successfully generated!")
