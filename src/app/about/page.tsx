import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ConfigLink } from '../../components/ConfigLink';

export const metadata: Metadata = {
  title: "About BCL & Founder Nneka Elizabeth Akwitti | Beth Consulting Limited",
  description: "Beth Consulting Limited provides operational structure and systems advisory support for women-led organisations, founders and growing teams. Founded by Nneka Elizabeth Akwitti.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About BCL & Founder Nneka Elizabeth Akwitti | Beth Consulting Limited",
    description: "Our mission, vision, values, operational philosophy, and founder profile.",
    url: "https://www.bethconsultingltd.com/about",
    images: ["/assets/images/bcl-logo.png"],
  },
};

const highlights = ['15+ years of operational and administrative leadership experience','Supported donor-funded, multinational and private-sector organisations','Extensive experience supporting executive leadership and cross-functional teams','Designed and improved operational systems and workflows','Coordinated 300+ events, workshops and stakeholder engagements','Built documentation, reporting, onboarding and communication systems','Experience supporting USAID and international development initiatives'];

export default function AboutPage() {
  return (
    <main id="main">
      <section className="section section--cream"><div className="container page-intro">
        <p className="eyebrow" data-index="01">About Beth Consulting Limited</p>
        <h1>Systems that let good organisations run, and grow, sustainably</h1>
        <p className="lead">Beth Consulting Limited provides operational structure and systems advisory support for women-led organisations, founders and growing teams.</p>
        <p>The company focuses on helping organisations build systems that improve coordination, workflow management, operational clarity and sustainability, moving them from operational pressure to structured systems.</p>
      </div></section>

      <section className="section section--white"><div className="container"><div className="grid grid-2">
        <div className="card"><div className="ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 2v20M2 12h20"/></svg></div><h3>Mission</h3><p>To support women-led organisations with the operational structure and systems they need to run effectively and grow sustainably.</p></div>
        <div className="card"><div className="ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx={12} cy={12} r={9}/><path d="M12 7v5l3 2"/></svg></div><h3>Vision</h3><p>A future where women-led organisations are supported by strong operational systems that sustain their impact.</p></div>
      </div></div></section>

      <section className="section section--cream"><div className="container">
        <p className="eyebrow" data-index="02">Core values</p><h2>What guides our work</h2>
        <div className="rail"><span className="value-pill">Commitment</span><span className="value-pill">Heart</span><span className="value-pill">Integrity</span><span className="value-pill">Efficiency</span><span className="value-pill">Focus</span></div>
      </div></section>

      <section id="founder" className="section section--white" style={{ scrollMarginTop: '80px' }}><div className="container split">
        <div className="hero-portrait" style={{ maxWidth: '420px' }}><img src="/assets/images/founder-headshot.jpg" alt="Nneka Elizabeth Akwitti, Founder of Beth Consulting Limited" /></div>
        <div>
          <p className="eyebrow" data-index="03">The founder</p><h2>Nneka Elizabeth Akwitti</h2>
          <p className="lead">Founder, Beth Consulting Limited</p>
          <p>An Administration and Operations Professional with over 15 years of experience supporting executive leadership, strengthening operational systems and coordinating large-scale programs across donor-funded, multinational and private-sector organisations.</p>
          <div className="btn-row"><ConfigLink cfgKey="coachli" className="btn btn-primary">Book a Consultation</ConfigLink></div>
        </div>
      </div></section>

      <section className="section section--cream"><div className="container page-intro">
        <p>Her work focuses on helping organisations build structure behind their operations through process improvement, workflow coordination, operational documentation and executive support systems.</p>
        <p>Over the years, she has supported C-suite leaders and teams in fast-paced and multicultural environments, with extensive experience across administrative leadership, project coordination, event management, stakeholder engagement and compliance reporting.</p>
        <p>She has also worked on large-scale donor-funded initiatives, including USAID programs, where she supported operational coordination, executive management, logistics oversight, reporting systems and vendor management.</p>
        <p className="big" style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', lineHeight: 1.32, color: 'var(--ink)', marginTop: '1.5rem' }}>&quot;I built Beth Consulting Limited because I kept seeing brilliant women running organisations that were carrying too much operationally, and not enough was being done to help them fix it structurally.&quot;</p>
      </div></section>

      <section className="section section--white"><div className="container split">
        <div><p className="eyebrow" data-index="04">Professional highlights</p><h2>Track record</h2><ul className="checklist">{highlights.map((h) => <li key={h}>{h}</li>)}</ul></div>
        <div><p className="eyebrow" data-index="05">Core strengths</p><h2>Areas of focus</h2><div className="rail"><span className="value-pill">Executive Support</span><span className="value-pill">Business Process Optimization</span><span className="value-pill">Operations &amp; Team Coordination</span><span className="value-pill">Workflow Development &amp; Implementation</span><span className="value-pill">Project Coordination &amp; Reporting</span></div></div>
      </div></section>

      <section className="section section--cream"><div className="container">
        <p className="eyebrow" data-index="06">Selected credentials</p><h2>Verified training</h2>
        <div className="credentials">
          <div className="credential">
            <img src="/assets/images/credential-digital-witch.jpg" alt="Digital Witch Support Community — On-Demand IT Skills Training certificate awarded to Nneka Elizabeth Akwitti" />
            <div><h3 style={{ marginTop: 0 }}>Digital Witch IT Skills Certificate</h3><p className="mb-0">Confirms that Nneka Elizabeth Akwitti successfully completed the On-Demand IT Skills Training provided by the Digital Witch Support Community (2024).</p></div>
          </div>
          <div className="credential">
            <img src="/assets/images/credential-digital-tech.jpg" alt="Digital Technology Business School, London — PM/BA (Project Management and Business Analysis) Bootcamp certificate awarded to Nneka Elizabeth Akwitti" />
            <div><h3 style={{ marginTop: 0 }}>Project Management &amp; Business Analysis</h3><p className="mb-0">Confirms that Nneka Elizabeth Akwitti completed the PM/BA Bootcamp at Digital Technology Business School, London (2024).</p></div>
          </div>
        </div>
      </div></section>

      <section className="section section--green"><div className="container page-intro">
        <p className="eyebrow" data-index="07" style={{ color: 'var(--beige)' }}>Operational philosophy</p>
        <h2>Effort alone does not sustain an organisation</h2>
        <p className="lead" style={{ color: '#CBD8D0' }}>Strong organisations are not sustained by effort alone. They are sustained by clear systems, defined workflows, and operational structure that supports people and performance.</p>
        <div className="btn-row"><Link href="/services" className="btn btn-ghost-light">See how we work</Link><ConfigLink cfgKey="coachli" className="btn btn-ghost-light">Book a Consultation</ConfigLink></div>
      </div></section>
    </main>
  );
}
