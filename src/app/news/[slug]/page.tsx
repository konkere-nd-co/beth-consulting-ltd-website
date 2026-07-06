import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ConfigLink } from '../../../components/ConfigLink';
import { newsItems } from '../../../data/news';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return newsItems
    .filter((item) => item.type !== 'newsletter')
    .map((item) => ({
      slug: item.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = newsItems.find((n) => n.slug === slug);

  if (!item) {
    return {
      title: "Article Not Found | Beth Consulting Limited",
    };
  }

  return {
    title: `${item.title} | Beth Consulting Limited`,
    description: item.summary,
    alternates: { canonical: `/news/${item.slug}` },
    openGraph: {
      title: `${item.title} | Beth Consulting Limited`,
      description: item.summary,
      url: `https://www.bethconsultingltd.com/news/${item.slug}`,
      images: item.image ? [`https://www.bethconsultingltd.com${item.image}`] : ["https://www.bethconsultingltd.com/assets/images/bcl-logo.png"],
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = newsItems.find((n) => n.slug === slug);

  if (!item) {
    notFound();
  }

  // If this is the mentorship slug, render the rich mentorship page layout
  if (item.type === 'mentorship') {
    return (
      <main id="main">
        <section className="section section--cream">
          <div className="container split">
            <div>
              <p className="eyebrow" data-index="01">Mentorship &amp; Events</p>
              <h1>BCL Q2 Mentorship Programme</h1>
              <p className="lead">A practical operational-improvement programme for administrative and operations professionals, built around the Engine Room Operations Framework.</p>
              <p><span className="tag">Now running · 4 June – 9 July 2026</span></p>
              <p style={{ color: 'var(--muted)' }}>Applications for this cohort are closed. <Link href="/news#newsletter">Subscribe for the next one</Link>.</p>
              <div className="btn-row">
                <ConfigLink cfgKey="coachli" className="btn btn-primary">Book a Consultation</ConfigLink>
                <Link href="/framework" className="btn btn-outline">About EROF</Link>
              </div>
            </div>
            <div className="hero-portrait" style={{ maxWidth: '460px' }}>
              <img src="/assets/images/event-q2-teaser.jpg" alt="BCL Q2 Mentorship Programme — Mentorship Program for Admin Professionals, coming up in June" style={{ borderRadius: '18px', aspectRatio: 'auto' }} />
            </div>
          </div>
        </section>

        <section className="section section--white">
          <div className="container" style={{ maxWidth: '820px' }}>
            <p>Last quarter, Beth Consulting Limited ran its first mentorship cycle focused on administrative and operational growth. This quarter, the programme returns with a more structured approach under Beth Consulting Limited.</p>
            <p>The Q2 Mentorship Programme commenced on 4 June 2026 and runs to 9 July 2026, built around the Engine Room Operations Framework. The focus is practical operational improvement, not motivational conversations.</p>
            <p>The sessions are designed to help administrative and operations professionals improve how work is structured, communicated, tracked, reviewed and executed under pressure.</p>
            <p className="eyebrow" data-index="02" style={{ marginTop: '1.5rem' }}>Over six weeks</p>
            <h2>One live session each week</h2>
            <div className="weeks">
              <div className="week"><span className="wk">Week 01</span><h3>Alignment and Readiness</h3></div>
              <div className="week"><span className="wk">Week 02</span><h3>Communication and Expectations</h3></div>
              <div className="week"><span className="wk">Week 03</span><h3>Systems and Workflow</h3></div>
              <div className="week"><span className="wk">Week 04</span><h3>Decision Support</h3></div>
              <div className="week"><span className="wk">Week 05</span><h3>Performance and Review</h3></div>
              <div className="week"><span className="wk">Week 06</span><h3>Stakeholder Management</h3></div>
            </div>
            <p style={{ marginTop: '1.4rem' }}>The goal is to help participants build stronger operational thinking and apply practical structure to their daily work immediately. The cohort will remain intentionally small to allow practical engagement, guided exercises and application support.</p>
            <p><strong>This cohort is currently in progress (4 June – 9 July 2026).</strong></p>
          </div>
        </section>

        <section className="section section--beige">
          <div className="container split">
            <div>
              <p className="eyebrow" data-index="03">Who it&#39;s for &amp; what you&#39;ll get</p>
              <h2>Programme details</h2>
              <p style={{ fontWeight: 600, color: 'var(--green-dark)', marginBottom: '.3rem' }}>Who is this for</p>
              <ul className="checklist">
                <li>Admin Professionals</li>
                <li>Executive Assistants</li>
                <li>Personal Assistants</li>
                <li>Operations Support Professionals</li>
              </ul>
              <p style={{ fontWeight: 600, color: 'var(--green-dark)', margin: '1rem 0 .3rem' }}>What you&#39;ll get</p>
              <ul className="checklist">
                <li>One-on-one coaching</li>
                <li>Workflow structuring and execution support</li>
                <li>Accountability and performance improvement</li>
                <li>Practical workplace application using the Engine Room Operations Framework</li>
              </ul>
            </div>
            <div>
              <img src="/assets/images/event-q2-details.jpg" alt="BCL Free 2026 Coaching and Mentorship Programme details — who it is for and what participants gain" style={{ borderRadius: '14px', boxShadow: 'var(--shadow)', border: '1px solid var(--rule-soft)' }} />
            </div>
          </div>
        </section>

        <section className="section cta-final">
          <div className="container">
            <h2>Interested in a future cohort?</h2>
            <p>Subscribe to the BCL newsletter or book a consultation to hear about future cohorts.</p>
            <div className="btn-row center">
              <Link href="/news#newsletter" className="btn btn-ghost-light">Subscribe for updates</Link>
              <ConfigLink cfgKey="coachli" className="btn btn-ghost-light">Book a Consultation</ConfigLink>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Generic article layout for other dynamic news items
  return (
    <main id="main">
      <section className="section section--cream">
        <div className="container" style={{ maxWidth: '820px' }}>
          <p className="eyebrow">{item.kicker}</p>
          <h1>{item.title}</h1>
          <p className="lead">{item.summary}</p>
        </div>
      </section>

      <section className="section section--white">
        <div className="container" style={{ maxWidth: '820px' }}>
          {item.image && (
            <img src={item.image} alt={item.imageAlt || item.title} style={{ borderRadius: '20px', boxShadow: 'var(--shadow)', marginBottom: '2.5rem' }} />
          )}
          <p>Practical articles on structure, systems and workplace effectiveness will appear here as they are published.</p>
          <p>At Beth Consulting Limited, we believe strong organisations are not sustained by effort alone. They are sustained by clear systems, defined workflows, and operational structure that supports people and performance.</p>
          <div className="btn-row" style={{ marginTop: '2.5rem' }}>
            <Link href="/news" className="btn btn-outline">← Back to all news</Link>
            <ConfigLink cfgKey="coachli" className="btn btn-primary">Book a Consultation</ConfigLink>
          </div>
        </div>
      </section>
    </main>
  );
}
