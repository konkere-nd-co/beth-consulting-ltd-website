import React from 'react';
import type { Metadata } from 'next';
import { ConfigLink } from '../../components/ConfigLink';
import { ContactForm } from '../../components/ContactForm';

export const metadata: Metadata = {
  title: "Contact | Beth Consulting Limited",
  description: "Need operational support? Contact Beth Consulting Limited by email, the contact form, or book a consultation.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Beth Consulting Limited",
    description: "Need operational support? Contact Beth Consulting Limited or book a consultation.",
    url: "https://www.bethconsultingltd.com/contact",
    images: ["/assets/images/bcl-logo.png"],
  },
};

export default function ContactPage() {
  return (
    <main id="main">
      <section className="section section--cream"><div className="container page-intro">
        <p className="eyebrow" data-index="01">Contact / Need help</p>
        <h1>Need operational support?</h1>
        <p className="lead">Tell us where operations are breaking down. We&#39;ll help you identify what to structure first.</p>
      </div></section>

      <section className="section section--white"><div className="container split">
        <div><h2>Send a message</h2><ContactForm /></div>
        <div className="stack">
          <h2>Other ways to reach us</h2>
          <div className="card"><h3>Email</h3><p className="mb-0"><ConfigLink cfgKey="email" showText /></p></div>
          <div className="card"><h3>Phone</h3><p className="mb-0"><a href="tel:08078312797">08078312797</a></p></div>
          <div className="card"><h3>Book a consultation</h3><p>Schedule a focused conversation about your operations.</p><ConfigLink cfgKey="coachli" className="btn btn-green btn-sm" target="_blank" rel="noopener">Book via Coachli</ConfigLink></div>
          <div className="card"><h3>Consultation form</h3><p>Prefer a form first? Share your details and we&#39;ll follow up.</p><ConfigLink cfgKey="consultationForm" className="btn btn-outline btn-sm" target="_blank" rel="noopener">Open consultation form</ConfigLink></div>
          <div className="card"><h3>Follow BCL</h3><p className="mb-0"><ConfigLink cfgKey="linkedin" target="_blank" rel="noopener">LinkedIn</ConfigLink> &nbsp;·&nbsp; <ConfigLink cfgKey="instagram" target="_blank" rel="noopener">Instagram</ConfigLink></p></div>
          <div className="card"><h3>Connect with BCL</h3><p>See all of BCL&#39;s links in one place.</p><a className="btn btn-outline btn-sm" href="https://linktr.ee/nneka.e.akwitti" target="_blank" rel="noopener">View all links</a></div>
        </div>
      </div></section>
    </main>
  );
}
