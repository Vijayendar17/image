import { NextResponse } from 'next/server';

export async function GET() {
  const date = new Date().toISOString().split('T')[0];

  const urls = [
    { loc: 'https://www.litefiles.com/', priority: '1.0' },
    { loc: 'https://www.litefiles.com/compress-image-to-50kb', priority: '0.9' },
    { loc: 'https://www.litefiles.com/passport-photo-resize', priority: '0.9' },
    { loc: 'https://www.litefiles.com/resize-signature-to-20kb', priority: '0.9' },
    { loc: 'https://www.litefiles.com/pdf-compressor', priority: '0.9' },
    { loc: 'https://www.litefiles.com/image-to-pdf', priority: '0.8' },
    { loc: 'https://www.litefiles.com/ssc-document-resize', priority: '0.85' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
