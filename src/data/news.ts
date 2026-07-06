export interface NewsItem {
  slug: string;
  kicker: string;
  title: string;
  summary: string;
  image?: string;
  imageAlt?: string;
  readMoreText: string;
  customLink?: string;
  type: 'article' | 'mentorship' | 'newsletter';
}

export const newsItems: NewsItem[] = [
  {
    slug: 'bcl-q2-mentorship-programme',
    kicker: 'Mentorship · Announcement',
    title: 'BCL Q2 Mentorship Programme',
    summary: 'The programme returns this quarter with a more structured approach, built around the Engine Room Operations Framework.',
    image: '/assets/images/event-q2-teaser.jpg',
    imageAlt: 'BCL Q2 Mentorship Programme announcement',
    readMoreText: 'Read more →',
    type: 'mentorship'
  },
  {
    slug: 'operational-insights',
    kicker: 'Coming soon',
    title: 'Operational insights',
    summary: 'Practical articles on structure, systems and workplace effectiveness will appear here as they are published.',
    readMoreText: 'Read article →',
    type: 'article'
  },
  {
    slug: 'newsletter-launch',
    kicker: 'Newsletter',
    title: 'Launching September 2026',
    summary: 'Subscribe early to receive practical insights on operational structure and systems direct to your inbox.',
    readMoreText: 'Subscribe below →',
    customLink: '#newsletter',
    type: 'newsletter'
  }
];
