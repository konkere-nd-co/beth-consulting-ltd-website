"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ConfigLink } from './ConfigLink';

export function Footer() {
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="foot-brand">
          <strong>Beth Consulting Limited</strong>
          <em>Operational Structure and System Advisory</em>
          <p style={{ marginTop: '1rem', fontSize: '.9rem' }}>Helping women-led organisations, founders and growing teams build systems that sustain their impact.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link href="/about">About &amp; Founder</Link></li>
            <li><Link href="/services">Services &amp; Offers</Link></li>
            <li><Link href="/framework">Framework</Link></li>
          </ul>
        </div>
        <div>
          <h4>Engage</h4>
          <ul>
            <li><Link href="/news">News &amp; Updates</Link></li>
            <li><Link href="/testimonials">Testimonials</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><ConfigLink cfgKey="selarStore" target="_blank" rel="noopener">Offers on Selar</ConfigLink></li>
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul>
            <li><ConfigLink cfgKey="email" showText /></li>
            <li><ConfigLink cfgKey="coachli" target="_blank" rel="noopener">Book a consultation</ConfigLink></li>
            <li><ConfigLink cfgKey="consultationForm" target="_blank" rel="noopener">Consultation form</ConfigLink></li>
          </ul>
          <div className="social">
            <ConfigLink cfgKey="linkedin" target="_blank" rel="noopener" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4V24h-4zM8 8h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-6.9c0-1.65-.03-3.78-2.3-3.78-2.3 0-2.65 1.8-2.65 3.66V24H8z"/></svg>
            </ConfigLink>
            <ConfigLink cfgKey="instagram" target="_blank" rel="noopener" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.25.07 1.62.07 4.81s0 3.56-.07 4.81c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.25.06-1.62.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.56 2.2 15.19 2.2 12s0-3.56.07-4.81c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.44 2.21 8.81 2.2 12 2.2zm0 3.65A6.15 6.15 0 1 0 18.15 12 6.15 6.15 0 0 0 12 5.85zm0 10.15A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.4-10.55a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z"/></svg>
            </ConfigLink>
          </div>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© <span id="year">{year}</span> Beth Consulting Limited · Operational Structure and System Advisory</span>
        <span><Link href="/privacy">Privacy Policy</Link></span>
      </div>
    </footer>
  );
}
