import urllib.request
import re
import json

urls = [
    "https://zadit.pages.dev/",
    "https://zadit.pages.dev/audit",
    "https://zadit.pages.dev/layanan/dokumen-administrasi-bisnis",
    "https://zadit.pages.dev/layanan/olah-data-statistik-sinta",
    "https://zadit.pages.dev/layanan/seo-konten-konversi",
    "https://zadit.pages.dev/layanan/solusi-web-performa",
    "https://zadit.pages.dev/solusi/proposal-bisnis-rantai-pasok-investor",
    "https://zadit.pages.dev/cv"
]

report = []
for u in urls:
    req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as res:
        html = res.read().decode("utf-8")
    
    title_m = re.search(r"<title>(.*?)</title>", html)
    og_img_m = re.search(r'<meta property="og:image" content="(.*?)"', html)
    tw_img_m = re.search(r'<meta name="twitter:image" content="(.*?)"', html)
    robots_m = re.search(r'<meta name="robots" content="(.*?)"', html)
    canon_m = re.search(r'<link rel="canonical" href="(.*?)"', html)

    report.append({
        "url": u,
        "title": title_m.group(1) if title_m else None,
        "og:image": og_img_m.group(1) if og_img_m else None,
        "twitter:image": tw_img_m.group(1) if tw_img_m else None,
        "robots": robots_m.group(1) if robots_m else None,
        "canonical": canon_m.group(1) if canon_m else None
    })

print(json.dumps(report, indent=2))
