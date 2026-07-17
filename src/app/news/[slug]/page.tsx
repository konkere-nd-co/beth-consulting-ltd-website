"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { GoogleFormModal } from '../../../components/GoogleFormModal';

export const runtime = 'edge';

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!params.slug) return;
    fetch(`/api/news/${params.slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        if (data.error) throw new Error(data.error);
        setItem(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        router.push('/news');
      });
  }, [params.slug, router]);

  if (loading) {
    return <main id="main"><div style={{ padding: '100px 20px', textAlign: 'center' }}>Loading...</div></main>;
  }

  const cleanHtml = (html: string) => {
    if (!html) return '';
    let str = html.replace(/&nbsp;/g, ' ');
    // Fix missing http in hrefs, like href="www.google.com" -> href="https://www.google.com"
    str = str.replace(/href="([^"]+)"/g, (match, p1) => {
      const url = p1.trim();
      if (url && !url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('/') && !url.startsWith('#') && !url.startsWith('mailto:')) {
        return `href="https://${url}"`;
      }
      return match;
    });
    return str;
  };

  if (item.type === 'mentorship') {
    let mentorship = { dates_tag: '', status_text: '', apply_link: '', weeks: [], who_is_it_for: '', what_you_will_get: '' };
    try {
      if (item.mentorship_data) {
        let parsed = item.mentorship_data;
        while (typeof parsed === 'string') {
          parsed = JSON.parse(parsed);
        }
        mentorship = parsed;
      }
    } catch (e) {
      console.error('Mentorship parse error:', e);
    }

    let whoList: string[] = [];
    let whatList: string[] = [];
    if (mentorship) {
      if (typeof mentorship.who_is_it_for === 'string' && mentorship.who_is_it_for) {
        whoList = mentorship.who_is_it_for.split(',').map((s: string) => s.trim()).filter(Boolean);
      } else if (Array.isArray(mentorship.who_is_it_for)) {
        whoList = mentorship.who_is_it_for;
      }
      
      if (typeof mentorship.what_you_will_get === 'string' && mentorship.what_you_will_get) {
        whatList = mentorship.what_you_will_get.split(',').map((s: string) => s.trim()).filter(Boolean);
      } else if (Array.isArray(mentorship.what_you_will_get)) {
        whatList = mentorship.what_you_will_get;
      }
    }

    return (
      <main id="main">
        <section className="section section--cream in-view">
          <div className="container split">
            <div>
              <p className="eyebrow" data-index="01">Mentorship &amp; Events</p>
              <h1>{item.title || "No Title Provided"}</h1>
              <p className="lead">{item.summary || "No Summary Provided"}</p>
              {mentorship.dates_tag && <p><span className="tag">{mentorship.dates_tag}</span></p>}
              {mentorship.status_text && <p style={{ color: 'var(--muted)' }}>{mentorship.status_text}</p>}
              {mentorship.apply_link && (
                <div className="btn-row">
                  <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">Apply</button>
                </div>
              )}
            </div>
            {item.image_url && (
              <div className="hero-portrait" style={{ maxWidth: '460px' }}>
                <img src={item.image_url.startsWith('http') || item.image_url.startsWith('/') ? item.image_url : `/${item.image_url}`} alt={item.image_alt || item.title} style={{ width: '100%', height: 'auto', borderRadius: '18px', aspectRatio: 'auto' }} />
              </div>
            )}
          </div>
        </section>

        <section className="section section--white in-view">
          <div className="container" style={{ maxWidth: '820px' }}>
            <div className="article-body" dangerouslySetInnerHTML={{ __html: cleanHtml(item.body_content) }} />
            
            {mentorship.weeks && mentorship.weeks.filter((wk: any) => wk.title && wk.title.trim() !== '').length > 0 && (
              <>
                <p className="eyebrow" data-index="02" style={{ marginTop: '1.5rem' }}>Programme Schedule</p>
                <h2>Syllabus Breakdown</h2>
                <div className="weeks">
                  {mentorship.weeks.map((wk: any, i: number) => wk.title ? (
                    <div className="week" key={i}>
                      <span className="wk">{wk.wk}</span>
                      <h3>{wk.title}</h3>
                    </div>
                  ) : null)}
                </div>
              </>
            )}
          </div>
        </section>

        {(whoList.length > 0 || whatList.length > 0) && (
          <section className="section section--beige in-view">
            <div className="container split">
              <div>
                <p className="eyebrow" data-index="03">Who it&#39;s for &amp; what you&#39;ll get</p>
                <h2>Programme details</h2>
                
                {whoList.length > 0 && (
                  <>
                    <p style={{ fontWeight: 600, color: 'var(--green-dark)', marginBottom: '.3rem' }}>Who is this for</p>
                    <ul className="checklist">
                      {whoList.map((li, i) => <li key={i}>{li}</li>)}
                    </ul>
                  </>
                )}
                
                {whatList.length > 0 && (
                  <>
                    <p style={{ fontWeight: 600, color: 'var(--green-dark)', margin: '1rem 0 .3rem' }}>What you&#39;ll get</p>
                    <ul className="checklist">
                      {whatList.map((li, i) => <li key={i}>{li}</li>)}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </section>
        )}

        <GoogleFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} formUrl={mentorship.apply_link} />
      </main>
    );
  }

  // Generic article layout
  return (
    <main id="main">
      <section className="section section--cream in-view">
        <div className="container" style={{ maxWidth: '820px' }}>
          <p className="eyebrow">{item.kicker || "News & Announcements"}</p>
          <h1>{item.title || "No Title Provided"}</h1>
          <p className="lead">{item.summary || "No Summary Provided"}</p>
        </div>
      </section>

      <section className="section section--white in-view">
        <div className="container" style={{ maxWidth: '820px' }}>
          {item.image_url && (
            <img src={item.image_url.startsWith('http') || item.image_url.startsWith('/') ? item.image_url : `/${item.image_url}`} alt={item.image_alt || item.title} style={{ width: '100%', height: 'auto', borderRadius: '20px', boxShadow: 'var(--shadow)', marginBottom: '2.5rem' }} />
          )}
          
          <div className="article-body" dangerouslySetInnerHTML={{ __html: cleanHtml(item.body_content) }} />

          <div style={{ marginTop: '2.5rem', paddingTop: '1.6rem', borderTop: '1px solid var(--rule)' }}>
            <div className="btn-row">
              <Link href="/news" className="btn btn-outline">← Back to all news</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
