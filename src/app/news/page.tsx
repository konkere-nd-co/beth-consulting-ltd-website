import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { NewsletterForm } from '../../components/NewsletterForm';
import { newsItems } from '../../data/news';

export const metadata: Metadata = {
  title: "News & Updates | Beth Consulting Limited",
  description: "Company announcements, mentorship updates, events and operational insights from Beth Consulting Limited. First item: the BCL Q2 Mentorship Programme.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "News & Updates | Beth Consulting Limited",
    description: "Company announcements, mentorship updates, events and operational insights.",
    url: "https://www.bethconsultingltd.com/news",
    images: ["/assets/images/bcl-logo.png"],
  },
};

export default function NewsPage() {
  return (
    <main id="main">
      <section className="section section--cream"><div className="container page-intro">
        <p className="eyebrow" data-index="01">News &amp; Updates</p>
        <h1>Announcements, updates and operational insights</h1>
        <p className="lead">Company announcements, mentorship updates, events, programme recaps and operational insights are published here as they happen.</p>
      </div></section>

      <section className="section section--white"><div className="container"><div className="grid grid-3">
        {newsItems.map((item) => {
          if (item.type === 'newsletter') {
            return (
              <article key={item.slug} className="news-card" style={{ background: 'var(--beige-soft)', borderColor: 'var(--beige)', display: 'flex', alignItems: 'center' }}>
                <div className="body"><p className="kicker">{item.kicker}</p><h3>{item.title}</h3><p>{item.summary}</p><a href={item.customLink || '#newsletter'}>{item.readMoreText}</a></div>
              </article>
            );
          }
          return (
            <article key={item.slug} className="news-card" style={!item.image ? { display: 'flex', alignItems: 'center' } : undefined}>
              {item.image && <img src={item.image} alt={item.imageAlt || item.title} />}
              <div className="body"><p className="kicker">{item.kicker}</p><h3>{item.title}</h3><p>{item.summary}</p><Link href={`/news/${item.slug}`}>{item.readMoreText}</Link></div>
            </article>
          );
        })}
      </div></div></section>

      <NewsletterForm />
    </main>
  );
}
