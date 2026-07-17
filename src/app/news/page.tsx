"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { NewsletterForm } from '../../components/NewsletterForm';

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return url.startsWith('/') ? url : `/${url}`;
  };

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        setNewsItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <main id="main">
      <section className="section section--cream">
        <div className="container page-intro">
          <p className="eyebrow" data-index="01">News &amp; Events</p>
          <h1>Announcements, updates and operational insights</h1>
          <p className="lead">Company announcements, mentorship updates, events, programme recaps and operational insights are published here as they happen.</p>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="grid grid-3">
            {loading ? (
              <p>Loading news...</p>
            ) : newsItems.length > 0 ? (
              newsItems.map((item: any) => {
                const linkHref = item.external_link ? item.external_link : `/news/${item.slug}`;
                const isExternal = !!item.external_link;
                
                return (
              <article key={item.slug} className="news-card" style={!item.image_url ? { display: 'flex', alignItems: 'center' } : undefined}>
                {item.image_url && <img src={getImageUrl(item.image_url)} alt={item.image_alt || item.title} />}
                <div className="body">
                  {item.kicker && <p className="kicker">{item.kicker}</p>}
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  {isExternal ? (
                    <a href={linkHref} target="_blank" rel="noreferrer">{item.read_more_text || 'Read more →'}</a>
                  ) : (
                    <Link href={linkHref}>{item.read_more_text || 'Read more →'}</Link>
                  )}
                </div>
              </article>
                );
              })
            ) : (
              <p>No news items found.</p>
            )}
          </div>
        </div>
      </section>

      <NewsletterForm />
    </main>
  );
}
