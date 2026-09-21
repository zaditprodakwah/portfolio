import { getAllSolutions } from "@/lib/solutions";

export const dynamic = "force-static";

export async function GET() {
  const solutions = getAllSolutions();
  const baseUrl = "https://muhzadit.pages.dev/";

  let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Zadit Solutions Hub | Executive Portfolio</title>
    <link>${baseUrl}</link>
    <description>Kumpulan solusi programmatik, studi kasus eksekutif, dan panduan SEO dari Muhammad Khoiruzzadittaqwa</description>
    <language>id-ID</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
`;

  solutions.forEach((s) => {
    rss += `    <item>
      <title>${s.title.replace(/&/g, '&amp;')}</title>
      <link>${baseUrl}/solusi/${s.slug}</link>
      <description>${s.metaDescription.replace(/&/g, '&amp;')}</description>
      <guid>${baseUrl}/solusi/${s.slug}</guid>
    </item>
`;
  });

  rss += `  </channel>\n</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
    },
  });
}
