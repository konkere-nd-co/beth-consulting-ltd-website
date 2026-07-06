import React from 'react';
import type { Metadata } from 'next';
import { ConfigLink } from '../../components/ConfigLink';

export const metadata: Metadata = {
  title: "Privacy Policy | Beth Consulting Limited",
  description: "How Beth Consulting Limited handles contact-form submissions, newsletter subscriptions and website data.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Beth Consulting Limited",
    description: "How Beth Consulting Limited handles contact-form submissions and newsletter subscriptions.",
    url: "https://www.bethconsultingltd.com/privacy",
    images: ["/assets/images/bcl-logo.png"],
  },
};

export default function PrivacyPage() {
  return (
    <main id="main">
      <section className="section section--cream"><div className="container page-intro">
        <p className="eyebrow">Privacy Policy</p>
        <h1>Privacy Policy</h1>
        <p className="muted">This policy explains how Beth Consulting Limited (&quot;BCL&quot;, &quot;we&quot;) handles the information you provide through this website, such as contact-form enquiries and newsletter sign-ups.</p>
      </div></section>

      <section className="section section--white"><div className="container page-intro">
        <h2>Information we collect</h2>
        <p>We collect only the information you choose to provide:</p>
        <ul><li><strong>Contact form:</strong> your name, email address and message.</li><li><strong>Newsletter sign-up:</strong> your name and email address.</li></ul>
        <h2>How we use your information</h2>
        <p>We use contact details to respond to your enquiry, and newsletter details to send the BCL newsletter and related updates. We do not sell your personal information.</p>
        <h2>Newsletter &amp; email</h2>
        <p>The BCL newsletter is managed through MailerLite. By subscribing, you consent to receiving emails from BCL and to your details being processed by our email provider for that purpose. Every email includes an unsubscribe link, and you may opt out at any time.</p>
        <h2>Booking &amp; external links</h2>
        <p>Consultation booking is provided through Coachli, and offers are listed on Selar. When you follow these links you are subject to those providers&#39; own privacy terms.</p>
        <h2>Data retention</h2>
        <p>We keep enquiry and subscription information only for as long as needed to respond to you or to provide the newsletter, after which it is removed on request.</p>
        <h2>Your choices</h2>
        <p>You can ask us to access, correct or delete the information you have provided by emailing <ConfigLink cfgKey="email" showText />.</p>
        <h2>Contact</h2>
        <p>Questions about this policy can be sent to <ConfigLink cfgKey="email" showText />.</p>
      </div></section>
    </main>
  );
}
