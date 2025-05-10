const { collection, getDocs } = require('firebase/firestore');
const fs = require('fs');
const { db } = require('./src/store/firebase'); 

async function generateSitemap() {
  const articlesRef = collection(db, 'articles');
  const articlesSnapshot = await getDocs(articlesRef);

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mka-solidarnost.ru/</loc>
    <lastmod>2024-07-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://mka-solidarnost.ru/services</loc>
    <lastmod>2024-07-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mka-solidarnost.ru/lawyers</loc>
    <lastmod>2024-07-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mka-solidarnost.ru/contacts</loc>
    <lastmod>2024-07-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;

  articlesSnapshot.forEach(doc => {
    const article = doc.data();
    sitemap += `
  <url>
    <loc>https://mka-solidarnost.ru/article/${doc.id}</loc>
    <lastmod>${article.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  // Запись sitemap.xml
  fs.writeFileSync('public/sitemap.xml', sitemap);
}

generateSitemap().then(() => {
  console.log('Sitemap успешно сгенерирован');
}).catch(err => {
  console.error('Ошибка при генерации sitemap:', err);
});




