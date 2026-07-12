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
  bodyParagraphs?: string[];
  secondImage?: string;
  secondImageAlt?: string;
  newsletterCta?: boolean;
}

export const newsItems: NewsItem[] = [
  {
    slug: 'q2-mentorship-concluded',
    kicker: 'Mentorship · Announcement',
    title: 'Q2 Mentorship Programme Successfully Concluded',
    summary: 'The BCL Q2 Mentorship Programme has concluded after six weeks of practical learning, reflection and application through the Engine Room Operations Framework.',
    image: '/assets/images/bcl-q2-mentorship-cohort-collage.jpg',
    imageAlt: 'Beth Consulting Limited Q2 Mentorship Programme cohort collage',
    readMoreText: 'Read more →',
    type: 'article',
    bodyParagraphs: [
      'The Beth Consulting Limited Q2 Mentorship Programme has officially come to a close, marking six weeks of learning, reflection, and practical application.',
      'Throughout the programme, participants explored the Engine Room Operations Framework (EROF), developing practical approaches to operational structure, documentation, workflow management, and decision support. More importantly, they challenged familiar ways of working and began applying new ideas within their organisations.',
      'We are grateful to every participant for their commitment, thoughtful engagement, and willingness to learn. Your contributions made this cohort a rewarding experience and reinforced our commitment to developing administrative and operations professionals through practical, systems-focused learning.',
      'As we celebrate the successful completion of this cohort, we look forward to welcoming future participants to upcoming mentorship programmes and learning opportunities.',
      'Thank you for being part of the journey, and stay connected for announcements about future cohorts.'
    ],
    secondImage: '/assets/images/bcl-q2-mentorship-voices-engine-room.jpg',
    secondImageAlt: 'Voices from the Engine Room reflections from BCL Q2 Mentorship participants',
    newsletterCta: true
  },
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
  }
];
