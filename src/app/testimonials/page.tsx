import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ConfigLink } from '../../components/ConfigLink';

export const metadata: Metadata = {
  title: "Testimonials | Beth Consulting Limited",
  description: "What participants say about the BCL mentorship sessions: anonymised feedback from Cohort 1.",
  alternates: { canonical: "/testimonials" },
  openGraph: {
    title: "Testimonials | Beth Consulting Limited",
    description: "Anonymised feedback from participants in the first BCL mentorship cohort.",
    url: "https://www.bethconsultingltd.com/testimonials",
    images: ["/assets/images/bcl-logo.png"],
  },
};

const quotes = [
  "Honestly, I enjoyed the session, especially the fact that it was interactive. I also love that there were actionable steps we needed to take after the session. That was an added advantage and provides clarity.",
  "Yesterday was phenomenal. It was very valuable and I saw things from a different perspective, positively. Thank you for sharing and pouring your wealth of knowledge into us.",
  "Thank you so much. You have no idea what this programme means to me and the impact it has on me already. I will gradually go through all I documented; I know it will take time, but I will do it and also learn the skills.",
  "Tonight's class was value loaded. Thank you.",
  "The session was fire. I love it.",
  "Thank you for the time you took to share and impact us with that knowledge. God bless you.",
  "A standing ovation for our mentor.",
  "The way you analyse our work is brilliant. I celebrate you powerfully.",
];

export default function TestimonialsPage() {
  return (
    <main id="main">
      <section className="section section--cream"><div className="container page-intro">
        <p className="eyebrow" data-index="01">Testimonials</p>
        <h1>In the words of the mentorship cohort</h1>
        <p className="lead">Anonymised feedback from participants in the first BCL mentorship cohort. Shared with permission and attributed simply as &quot;Mentee, Cohort 1&quot; to protect privacy.</p>
      </div></section>

      <section className="section section--white"><div className="container"><div className="feature-quote">
        <p className="fq">The session was mind-blowing. I really enjoyed it. The questions made me reflect deeply on my role and the areas I need to improve. It was clear and engaging, and I&#39;m looking forward to the next session.</p>
        <cite>— Mentee, Cohort 1</cite>
      </div></div></section>

      <section className="section section--cream"><div className="container"><div className="grid grid-3">
        {quotes.map((q, i) => (
          <div className="quote-card" key={i}><span className="mark">&ldquo;</span><blockquote>{q}</blockquote><cite>— Mentee, Cohort 1</cite></div>
        ))}
      </div></div></section>

      <section className="section cta-final"><div className="container">
        <h2>Want this kind of clarity for your team?</h2>
        <div className="btn-row center"><ConfigLink cfgKey="coachli" className="btn btn-primary">Book a Consultation</ConfigLink><Link href="/news/bcl-q2-mentorship-programme" className="btn btn-ghost-light">See the Mentorship Programme</Link></div>
      </div></section>
    </main>
  );
}
