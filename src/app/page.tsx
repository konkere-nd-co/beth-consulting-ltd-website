import React from 'react';
import Link from 'next/link';
import { ConfigLink } from '../components/ConfigLink';
import { OfferButton } from '../components/OfferButton';
import { NewsletterForm } from '../components/NewsletterForm';

const services = [
  ['01','Operational Audits','We review your current operations to identify gaps in structure, documentation and coordination.',['End-to-end operations diagnostic','Gaps in structure and documentation mapped','Prioritised remediation roadmap']],
  ['02','SOP Design & Documentation','We create clear standard operating procedures that guide how work is done across your organisation.',['Process documentation library','Role-specific operating guides','Onboarding-ready handover pack']],
  ['03','Authority Matrix Development','We define decision-making structures so teams understand who approves what, and at what level.',['Decision-rights model across functions','Escalation paths and thresholds','Delegation rollout plan']],
  ['04','Workflow Restructuring','We redesign internal workflows to improve coordination and reduce delays.',['Workflow mapping: current to future state','Cross-functional coordination model','Tooling and rhythm recommendations']],
  ['05','Executive Office Stabilization','We build administrative systems that support leadership oversight and daily operations.',['Executive operating cadence','Inbox, calendar and brief structures','Chief of staff function design']],
] as const;

const layers = [
  ['01','Operational Processes','How the work actually gets done.','We map recurring work and design the smallest set of processes that make it portable and teachable.',['Repeatable work identified',"SOPs in your team's language",'Owner, input, output & trigger defined']],
  ['02','Decision Authority','Who owns which call?','A clear decision-rights model so leaders stop re-litigating the same calls and the founder steps out of the daily approval loop.',['Decision-rights model across functions','Escalation paths with thresholds','Delegated authority the team trusts']],
  ['03','Workflow Coordination','How the work moves between people.','We tune the handoffs: flows, cadence, communication and tooling, so work moves cleanly without constant intervention.',['End-to-end workflow coordination','Operating cadence & meeting rhythm','Tooling aligned to how decisions flow']],
] as const;

export default function HomePage() {
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org","@type":"ProfessionalService",name:"Beth Consulting Limited",
        slogan:"Operational Structure and System Advisory",
        description:"Operational structure and systems advisory for women-led organisations, founders and growing teams.",
        url:"https://www.bethconsultingltd.com/",email:"bethconsultingltd@gmail.com",
        founder:{ "@type":"Person",name:"Nneka Elizabeth Akwitti" },
        sameAs:["https://www.linkedin.com/company/beth-consulting-limited/","https://www.instagram.com/bethconsulting"]
      }) }} />

      {/* HERO */}
      <section className="hero"><div className="container"><div className="hero-inner">
        <div>
          <p className="eyebrow">Operational Structure and System Advisory</p>
          <h1>Operational structure that supports <span className="accent-word">impact</span></h1>
          <p className="lead">We help women-led organisations, founders and growing teams move from operational pressure to structured systems, so the work runs on more than the founder&#39;s effort.</p>
          <div className="btn-row"><ConfigLink cfgKey="coachli" className="btn btn-primary">Book a Consultation</ConfigLink><Link href="/services" className="btn btn-outline">Explore Services</Link></div>
          <p className="hero-badge">Founded by Nneka Elizabeth Akwitti, with 15+ years across donor-funded, multinational and private-sector operations.</p>
          <span className="hero-cue">Scroll to explore</span>
        </div>
        <div className="hero-portrait"><img src="/assets/images/founder-headshot.jpg" alt="Nneka Elizabeth Akwitti, Founder of Beth Consulting Limited" /></div>
      </div></div></section>

      {/* STAT STRIP */}
      <section className="section section--white" style={{ paddingTop: 0 }}><div className="container"><div className="statstrip">
        <div className="stat"><span className="num">15+</span><span className="lbl">Years in administration &amp; operations leadership</span></div>
        <div className="stat"><span className="num">300+</span><span className="lbl">Events &amp; stakeholder engagements coordinated</span></div>
        <div className="stat"><span className="num">3 sectors</span><span className="lbl">Donor-funded, multinational &amp; private sector</span></div>
        <div className="stat"><span className="num">USAID</span><span className="lbl">International development programmes supported</span></div>
      </div></div></section>

      {/* POSITIONING STATEMENT */}
      <section className="section section--cream"><div className="container"><div className="statement">
        <div><p className="eyebrow" data-index="01">Who we are</p><p className="big">Beth Consulting Limited is an operational structure and systems advisory firm for organisations doing important work.</p></div>
        <div><p>We help women-led organisations, founders and growing teams build the systems that improve coordination, decision making and sustainability, moving them from operational pressure to structure that holds.</p><p>Strong organisations are not sustained by effort alone. They are sustained by clear systems, defined workflows, and operational structure that supports people and performance.</p><div className="btn-row"><Link href="/about" className="btn btn-outline">More about BCL</Link></div></div>
      </div></div></section>

      {/* SERVICES LIST */}
      <section className="section section--white"><div className="container">
        <p className="eyebrow" data-index="02">Services</p><h2>How we help</h2>
        <p className="lead">Each engagement is shaped to your organisation, not dropped on top of it. Most clients begin with an operational audit and grow from there.</p>
        <div className="svc-list">
          {services.map(([idx,title,desc,delv]) => (
            <div className="svc-row" key={idx}>
              <div className="idx">{idx}</div>
              <div><h3>{title}</h3><p className="desc">{desc}</p></div>
              <ul className="delv">{delv.map((d) => <li key={d}>{d}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="btn-row"><Link href="/services" className="btn btn-outline">See full services &amp; deliverables</Link><ConfigLink cfgKey="coachli" className="btn btn-primary">Book a Consultation</ConfigLink></div>
      </div></section>

      {/* OFFERS */}
      <section className="section section--cream"><div className="container">
        <div className="center"><p className="eyebrow" data-index="03">Offers</p><h2>Structured engagements</h2><p className="lead">Choose the engagement that matches where your operations are now. Details and access are on Selar.</p></div>
        <div className="grid grid-3" style={{ marginTop: '2.8rem' }}>
          <div className="card offer-card"><span className="tag">Tier 1</span><h3>Operational Clarity Audit</h3><p className="positioning">A focused review of your operations to identify gaps and define the structure your team needs.</p><p className="meta">2–4 week engagement</p><OfferButton offerKey="operationalClarityAudit" className="btn btn-primary btn-sm">View Offer</OfferButton></div>
          <div className="card offer-card"><span className="tag">Tier 2</span><h3>Focused System Build</h3><p className="positioning">We document your core processes so your team and new hires can work with clarity and consistency.</p><p className="meta">2–4 week engagement</p><OfferButton offerKey="focusedSystemBuild" className="btn btn-primary btn-sm">View Offer</OfferButton></div>
          <div className="card offer-card"><span className="tag">Tier 3</span><h3>Operational Reset Package</h3><p className="positioning">We redesign how work moves across your team so operations run smoothly.</p><p className="meta">3–5 week engagement</p><OfferButton offerKey="operationalResetPackage" className="btn btn-primary btn-sm">View Offer</OfferButton></div>
        </div>
        <div className="btn-row center"><Link href="/services#offers" className="btn btn-outline">Compare all offers</Link></div>
      </div></section>

      {/* EROF (dark, sticky method) */}
      <section className="section section--green"><div className="container method">
        <div className="method-aside">
          <p className="eyebrow" data-index="04" style={{ color: 'var(--beige)' }}>The Engine Room Operations Framework</p>
          <h2>Every voyage depends on the engine room</h2>
          <p className="lead" style={{ color: '#CBD8D0' }}>The engine room is the part of the ship no passenger ever sees, but every voyage depends on it. That&#39;s where we work. EROF strengthens three areas so organisations function effectively beyond the founder.</p>
          <div className="btn-row"><Link href="/framework" className="btn btn-ghost-light">Explore the framework</Link></div>
        </div>
        <div className="method-main"><div className="layer-list">
          {layers.map(([idx,title,sub,body,pts]) => (
            <div className="layer-row" key={idx}>
              <div className="idx">{idx}</div>
              <div className="lr-body"><h3>{title}</h3><p className="sub">{sub}</p><p>{body}</p></div>
              <ul>{(pts as readonly string[]).map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          ))}
        </div></div>
      </div></section>

      {/* FOUNDER */}
      <section className="section section--white"><div className="container split">
        <div className="hero-portrait" style={{ maxWidth: '420px' }}><img src="/assets/images/founder-headshot.jpg" alt="Nneka Elizabeth Akwitti, Founder" /></div>
        <div>
          <p className="eyebrow" data-index="05">The founder</p><h2>Nneka Elizabeth Akwitti</h2>
          <p>An Administration and Operations Professional with over 15 years supporting executive leadership, improving workflows and building operational systems across donor-funded, multinational and private-sector organisations.</p>
          <p className="big" style={{ fontSize: '1.4rem' }}>&quot;I built Beth Consulting Limited because I kept seeing brilliant women running organisations carrying too much operationally, and not enough was being done to fix it structurally.&quot;</p>
          <div className="btn-row"><Link href="/about#founder" className="btn btn-outline">Read the founder profile</Link></div>
        </div>
      </div></section>

      {/* FEATURE QUOTE + SUPPORTING */}
      <section className="section section--cream"><div className="container">
        <div className="feature-quote">
          <p className="eyebrow" data-index="06" style={{ justifyContent: 'center' }}>In their words</p>
          <p className="fq">The session was mind-blowing. The questions made me reflect deeply on my role and the areas I need to improve. It was clear and engaging.</p>
          <cite>— Mentee, Cohort 1</cite>
        </div>
        <div className="grid grid-3" style={{ marginTop: '3rem' }}>
          <div className="quote-card"><span className="mark">&ldquo;</span><blockquote>I enjoyed the session, especially that it was interactive, and I love that there were actionable steps to take afterwards. That provides clarity.</blockquote><cite>— Mentee, Cohort 1</cite></div>
          <div className="quote-card"><span className="mark">&ldquo;</span><blockquote>It was very valuable and I saw things from a different perspective. Thank you for pouring your wealth of knowledge into us.</blockquote><cite>— Mentee, Cohort 1</cite></div>
          <div className="quote-card"><span className="mark">&ldquo;</span><blockquote>Honestly phenomenal. It was clear, engaging, and I&#39;m looking forward to the next session.</blockquote><cite>— Mentee, Cohort 1</cite></div>
        </div>
        <div className="btn-row center"><Link href="/testimonials" className="btn btn-outline">Read more testimonials</Link></div>
      </div></section>

      {/* FEATURED INSIGHT */}
      <section className="section section--white"><div className="container">
        <p className="eyebrow" data-index="07">Featured insight</p><h2>Latest from BCL</h2>
        <div className="featured">
          <article className="feat-lead"><img src="/assets/images/event-q2-teaser.jpg" alt="BCL Q2 Mentorship Programme announcement" /><div className="body"><p className="kicker">Mentorship · Announcement</p><h3>BCL Q2 Mentorship Programme</h3><p>The programme returns this quarter with a more structured approach, built around the Engine Room Operations Framework.</p><Link href="/news/bcl-q2-mentorship-programme">Read more →</Link></div></article>
          <div className="feat-side">
            <Link className="feat-row" href="/news"><span className="kicker">Coming soon</span><h3>Operational insights</h3><p>Practical articles on structure, systems and workplace effectiveness will be published here.</p></Link>
            <a className="feat-row" href="#newsletter"><span className="kicker">Newsletter</span><h3>Launching September 2026</h3><p>Subscribe early to receive practical insights on operational structure and systems.</p></a>
          </div>
        </div>
      </div></section>

      {/* NEWSLETTER */}
      <NewsletterForm />

      {/* FINAL CTA */}
      <section className="section cta-final"><div className="container">
        <h2>Ready to move from pressure to structure?</h2>
        <p className="lead">Start with a focused conversation about where your operations are breaking down, and what to fix first.</p>
        <div className="btn-row center"><ConfigLink cfgKey="coachli" className="btn btn-primary">Book a Consultation</ConfigLink><Link href="/contact" className="btn btn-ghost-light">Contact BCL</Link></div>
      </div></section>
    </main>
  );
}
