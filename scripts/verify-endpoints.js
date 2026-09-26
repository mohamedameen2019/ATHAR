const http = require('http');

const endpoints = [
  { url: 'http://localhost:3000/', desc: 'Homepage', check: (text) => text.includes('أثر') && text.includes('وثائقي') },
  { url: 'http://localhost:3000/articles/172', desc: 'Article 172 Detail Page', check: (text) => text.includes('ديانا') || text.includes('المصادر') || text.includes('فهرس المحتويات') },
  { url: 'http://localhost:3000/category/civilizations', desc: 'Category Page', check: (text) => text.includes('حضارات') || text.includes('مقالات') },
  { url: 'http://localhost:3000/search', desc: 'Search Page', check: (text) => text.includes('search') && text.includes('أثر') },
  { url: 'http://localhost:3000/api/search?q=%D8%AF%D9%8A%D8%A7%D9%86%D8%A7', desc: 'Search API Endpoint', check: (text) => text.includes('results') && text.includes('slug') },
  { url: 'http://localhost:3000/admin/login', desc: 'Admin Login Page', check: (text) => text.includes('تسجيل الدخول') && text.includes('كلمة المرور') },
  { url: 'http://localhost:3000/admin', desc: 'Admin Dashboard', check: (text) => text.includes('لوحة التحكم') },
  { url: 'http://localhost:3000/admin/articles', desc: 'Admin Articles List', check: (text) => text.includes('إدارة المقالات') },
  { url: 'http://localhost:3000/sitemap.xml', desc: 'Sitemap XML', check: (text) => text.includes('urlset') && text.includes('/articles/') },
  { url: 'http://localhost:3000/robots.txt', desc: 'Robots.txt', check: (text) => text.includes('User-Agent') && text.includes('Disallow: /admin') },
  { url: 'http://localhost:3000/feed.xml', desc: 'RSS Feed XML', check: (text) => text.includes('rss') && text.includes('أثر') }
];

async function run() {
  console.log('Testing endpoints on http://localhost:3000 ...\n');
  let allPass = true;

  for (const ep of endpoints) {
    try {
      const res = await fetch(ep.url);
      const text = await res.text();
      const statusOk = res.status >= 200 && res.status < 400;
      const contentOk = ep.check ? ep.check(text) : true;
      const pass = statusOk && contentOk;

      console.log(`[${pass ? 'PASS' : 'FAIL'}] ${ep.desc} (${ep.url}) - Status: ${res.status} | Content Verified: ${contentOk}`);
      if (!pass) {
        allPass = false;
        console.error(`   Sample response snippet: ${text.slice(0, 200)}...`);
      }
    } catch (err) {
      allPass = false;
      console.error(`[ERROR] ${ep.desc} (${ep.url}) - Error: ${err.message}`);
    }
  }

  console.log(`\nOverall Test Result: ${allPass ? 'ALL TESTS PASSED ✓' : 'SOME TESTS FAILED ✗'}`);
}

run();
