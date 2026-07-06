import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ConfigLink } from '../../components/ConfigLink';

export const metadata: Metadata = {
  title: "Engine Room Operations Framework | Beth Consulting Limited",
  description: "The Engine Room Operations Framework (EROF) strengthens operational processes, decision authority and workflow coordination so organisations function effectively beyond the founder.",
  alternates: { canonical: "/framework" },
  openGraph: {
    title: "Engine Room Operations Framework | Beth Consulting Limited",
    description: "EROF strengthens operational processes, decision authority and workflow coordination.",
    url: "https://www.bethconsultingltd.com/framework",
    images: ["/assets/images/bcl-logo.png"],
  },
};

const layers = [
  ['01','Operational Processes','How the work actually gets done.',"We map recurring work: what's repeatable, what's reinvented every time, and what's quietly held in someone's head. We then design the smallest set of processes that make the work portable and teachable.",['Repeatable work identified',"SOPs written in your team's language",'Owner, input, output and trigger defined for each process']],
  ['02','Decision Authority','Who owns which call?','Most operational pain is an authority problem more than a process one. We design a clear decision-rights model so leaders stop re-litigating the same calls and the founder steps out of the daily approval loop.',['Decision-rights model across functions','Escalation paths with clear thresholds','Delegated authority the team trusts']],
  ['03','Workflow Coordination','How the work moves between people.','With processes and authority in place, we tune the handoffs: cross-functional flows, meeting cadence, communication rhythms and tooling, so work moves cleanly without constant intervention from the top.',['End-to-end workflow coordination','Operating cadence and meeting rhythm','Tooling aligned to how decisions actually flow']],
] as const;

export default function FrameworkPage() {
  return (
    <main id="main">
      <section className="section section--green"><div className="container page-intro">
        <p className="eyebrow" style={{ color: 'var(--beige)' }}>The Engine Room Operations Framework</p>
        <h1>Every voyage depends on the engine room</h1>
        <p className="lead" style={{ color: '#CBD8D0' }}>The engine room is the part of the ship no passenger ever sees, but every voyage depends on it. That&#39;s where we work.</p>
      </div></section>

      <section className="section section--white"><div className="container page-intro">
        <p className="eyebrow" data-index="01">Why operational systems matter</p>
        <h2>The operational core every organisation runs on</h2>
        <p>Every organisation has an operational core where coordination, decision making and execution happen: the engine room. When this core is not structured, leaders carry pressure and teams struggle to function independently.</p>
        <p>EROF strengthens three areas: operational process, decision authority and workflow coordination, building systems that allow organisations to function effectively beyond the founder.</p>
      </div></section>

      <section className="section section--cream"><div className="container">
        <p className="eyebrow" data-index="02">The engine room concept</p><h2>Three layers that hold operations together</h2>
        <div className="layer-list light">
          {layers.map(([idx,title,sub,body,pts]) => (
            <div className="layer-row" key={idx}>
              <div className="idx">{idx}</div>
              <div className="lr-body"><h3>{title}</h3><p className="sub">{sub}</p><p>{body}</p></div>
              <ul>{(pts as readonly string[]).map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          ))}
        </div>
      </div></section>

      <section className="section cta-final"><div className="container">
        <h2>Build operations that run beyond you</h2>
        <p className="lead">The Q2 Mentorship Programme applies EROF in practice for administrative and operations professionals.</p>
        <div className="btn-row center"><Link href="/news/bcl-q2-mentorship-programme" className="btn btn-primary">See the Mentorship Programme</Link><ConfigLink cfgKey="coachli" className="btn btn-ghost-light">Book a Consultation</ConfigLink></div>
      </div></section>
    </main>
  );
}
