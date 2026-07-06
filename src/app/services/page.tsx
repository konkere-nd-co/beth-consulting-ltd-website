import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ConfigLink } from '../../components/ConfigLink';
import { OfferButton } from '../../components/OfferButton';

export const metadata: Metadata = {
  title: "Services & Offers | Beth Consulting Limited",
  description: "Explore our core services (Operational Audits, SOP Design, Authority Matrix, Workflow Restructuring, Executive Office Stabilization) and structured engagement tiers. Pricing on Selar.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services & Offers | Beth Consulting Limited",
    description: "Explore our core services and structured engagement tiers.",
    url: "https://www.bethconsultingltd.com/services",
    images: ["/assets/images/bcl-logo.png"],
  },
};

const services = [
  ['01','Operational Audits','We review your current operations to identify gaps in structure, documentation and coordination.',['End-to-end operations diagnostic','Gaps in structure and documentation mapped','Prioritised remediation roadmap']],
  ['02','SOP Design & Documentation','We create clear standard operating procedures that guide how work is done across your organisation.',['Process documentation library','Role-specific operating guides','Onboarding-ready handover pack']],
  ['03','Authority Matrix Development','We define decision-making structures so teams understand who approves what, and at what level.',['Decision-rights model across functions','Escalation paths and thresholds','Delegation rollout plan']],
  ['04','Workflow Restructuring','We redesign internal workflows to improve coordination and reduce delays.',['Workflow mapping: current to future state','Cross-functional coordination model','Tooling and rhythm recommendations']],
  ['05','Executive Office Stabilization','We build administrative systems that support leadership oversight and daily operations.',['Executive operating cadence','Inbox, calendar and brief structures','Chief of staff function design']],
] as const;

const offers = [
  ['Tier 1','Operational Clarity Audit','operationalClarityAudit','A focused review of your operations to identify gaps and define the structure your team needs.','Founders and teams experiencing operational challenges.',['Review of current operations','Identification of gaps in processes and coordination','Authority and decision-flow assessment','Summary report with clear recommendations'],'2–4 week engagement'],
  ['Tier 2','Focused System Build','focusedSystemBuild','We document your core processes so your existing team and new hires can work with clarity and consistency.','Organisations ready to fix their operations.',['SOPs for key processes','Clear documentation of workflows','Organised system for storing processes','Basic operational structure'],'2–4 week engagement'],
  ['Tier 3','Operational Reset Package','operationalResetPackage','We redesign how work moves across your team so operations run smoothly.','Growing teams experiencing bottlenecks.',['Workflow mapping','Workflow redesign','Role clarity across processes','Coordination structure between team members'],'3–5 week engagement'],
] as const;

export default function ServicesPage() {
  return (
    <main id="main">
      <section className="section section--cream"><div className="container page-intro">
        <p className="eyebrow" data-index="01">Services &amp; Offers</p>
        <h1>Built around your organisation, not dropped on top of it</h1>
        <p className="lead">Each service is shaped to your organisation. Most clients begin with an operational audit and grow into structured engagements from there.</p>
        <div className="btn-row"><a href="#offers" className="btn btn-primary">View Engagement Offers</a><ConfigLink cfgKey="coachli" className="btn btn-outline">Book a Consultation</ConfigLink></div>
      </div></section>

      <section className="section section--white"><div className="container">
        <p className="eyebrow" data-index="02">Core services</p><h2>Strategic operational advisory</h2>
        <div className="svc-list">
          {services.map(([idx,title,desc,delv]) => (
            <div className="svc-row" key={idx}>
              <div className="idx">{idx}</div>
              <div><h3>{title}</h3><p className="desc">{desc}</p></div>
              <ul className="delv">{delv.map((d) => <li key={d}>{d}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="btn-row"><ConfigLink cfgKey="coachli" className="btn btn-outline">Not sure where to start? Book a consultation</ConfigLink></div>
      </div></section>

      <section id="offers" className="section section--cream" style={{ scrollMarginTop: '80px' }}><div className="container">
        <div className="center"><p className="eyebrow" data-index="03" style={{ justifyContent: 'center' }}>Structured engagements</p><h2>Structured engagement tiers</h2><p className="lead">Choose the engagement that matches where your operations are now. Full details and access are on Selar.</p></div>
        <div className="grid grid-3" style={{ marginTop: '2.8rem' }}>
          {offers.map(([tier,name,key,pos,who,gets,fmt]) => (
            <div className="card offer-card" key={key as string}>
              <span className="tag">{tier}</span><h3>{name}</h3>
              <p className="positioning">{pos}</p>
              <p style={{ fontWeight: 600, margin: '.4rem 0 .2rem', color: 'var(--green-dark)' }}>Who it&#39;s for</p><p style={{ margin: 0 }}>{who}</p>
              <p style={{ fontWeight: 600, margin: '.8rem 0 .2rem', color: 'var(--green-dark)' }}>What you get</p>
              <ul>{(gets as readonly string[]).map((g) => <li key={g}>{g}</li>)}</ul>
              <p className="meta">{fmt}</p>
              <div className="btn-row"><OfferButton offerKey={key as 'operationalClarityAudit' | 'focusedSystemBuild' | 'operationalResetPackage'} className="btn btn-primary btn-sm">View on Selar</OfferButton></div>
            </div>
          ))}
        </div>
        <p className="muted center" style={{ marginTop: '1.6rem', fontSize: '.9rem' }}>Pricing and checkout are handled securely on Selar. Buttons open the relevant Selar listing.</p>
      </div></section>

      <section className="section cta-final"><div className="container">
        <h2>Not sure which tier is right?</h2>
        <p className="lead">Most clients begin with the Operational Clarity Audit. A short consultation will confirm the best starting point.</p>
        <div className="btn-row center"><ConfigLink cfgKey="coachli" className="btn btn-primary">Book a Consultation</ConfigLink><ConfigLink cfgKey="selarStore" className="btn btn-ghost-light" target="_blank" rel="noopener">Visit the Selar store</ConfigLink></div>
      </div></section>
    </main>
  );
}
