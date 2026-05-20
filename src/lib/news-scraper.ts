import * as cheerio from 'cheerio';
import slugify from 'slugify';
import { db } from './db';

const NU_OR_ID_URL = 'https://www.nu.or.id';

export async function scrapeNuOnline(category = 'nasional', limit = 5) {
  try {
    const response = await fetch(`${NU_OR_ID_URL}/${category}`);
    if (!response.ok) throw new Error(`Failed to fetch ${category} page`);
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const articles: any[] = [];
    
    // The selector based on our research
    $('h2.medium').each((i, el) => {
      if (i >= limit) return;
      
      const title = $(el).text().trim();
      const relativeLink = $(el).closest('a').attr('href');
      
      if (title && relativeLink) {
        articles.push({
          title,
          link: relativeLink.startsWith('http') ? relativeLink : `${NU_OR_ID_URL}${relativeLink}`,
          category: 'Nasional', // Default for now
        });
      }
    });

    console.log(`Found ${articles.length} articles to scrape.`);

    const admin = await db.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (!admin) throw new Error('No admin user found to assign as author');

    const results = [];

    for (const article of articles) {
      // Create slug from title
      const slug = slugify(article.title, { lower: true, strict: true });
      
      // Check if already exists
      const existing = await db.news.findUnique({
        where: { slug }
      });

      if (existing) {
        results.push({ title: article.title, status: 'skipped (exists)' });
        continue;
      }

      // Fetch full article content
      try {
        const artRes = await fetch(article.link);
        if (!artRes.ok) continue;
        
        const artHtml = await artRes.text();
        const $art = cheerio.load(artHtml);
        
        const content = $art('#detail-content').html() || '';
        const excerpt = $art('p.medium.font-inter.mt-2.text-sm').first().text().trim() || 
                        $art('#detail-content p').first().text().trim().substring(0, 160) + '...';
        const thumbnail = $art('.aspect-video img').attr('src');

        await db.news.create({
          data: {
            title: article.title,
            slug,
            excerpt,
            content,
            thumbnail,
            category: article.category,
            published: true,
            authorId: admin.id,
            tags: ['NU Online', 'Nasional'],
          }
        });

        results.push({ title: article.title, status: 'success' });
      } catch (err) {
        console.error(`Error scraping article ${article.title}:`, err);
        results.push({ title: article.title, status: 'error' });
      }
    }

    return results;
  } catch (error) {
    console.error('Scraping error:', error);
    throw error;
  }
}
