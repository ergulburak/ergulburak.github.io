import { getAllPosts } from '@/lib/posts';

// Render to a static rss.xml file at build time (required for static export).
export const dynamic = 'force-static';

export async function GET() {
  const posts = getAllPosts();
  const siteUrl = 'https://ergulburak.com';

  const rssItems = posts
    .map((post) => {
      // Create an RFC-822 formatted date string
      const pubDate = new Date(post.date).toUTCString();
      
      return `
        <item>
          <title><![CDATA[${post.title.tr}]]></title>
          <link>${siteUrl}/blog/${post.slug}</link>
          <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
          <pubDate>${pubDate}</pubDate>
          <description><![CDATA[${post.tags.map(t => `#${t}`).join(' ')} - Yazar: Burak Ergül (${post.readTime})]]></description>
          ${post.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('')}
        </item>
      `;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title><![CDATA[Burak Ergül - Blog]]></title>
        <link>${siteUrl}</link>
        <description><![CDATA[Senior Unity & C# Developer Portfolio]]></description>
        <language>tr</language>
        <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
        ${rssItems}
      </channel>
    </rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}
