import type { MetadataRoute } from 'next';
import { newsItems } from '../data/news';

const BASE = 'https://www.bethconsultingltd.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/services', '/framework', '/news', '/testimonials', '/contact', '/privacy'];
  const staticPages = routes.map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.7,
  }));
  const newsPages = newsItems
    .filter((n) => n.type !== 'newsletter')
    .map((n) => ({
      url: `${BASE}/news/${n.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  return [...staticPages, ...newsPages];
}
