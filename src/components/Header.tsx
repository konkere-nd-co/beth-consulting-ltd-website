"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConfigLink } from "./ConfigLink";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();

  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    fetch('/api/auth/verify')
      .then(res => {
        if (res.ok) setIsAdmin(true);
        else setIsAdmin(false);
      })
      .catch(() => setIsAdmin(false));
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href="/"
          className="brand"
          aria-label="Beth Consulting Limited home"
          onClick={handleClose}
        >
          <img
            className="brand-logo"
            src="/assets/images/bcl-logo.png"
            alt="Beth Consulting Limited logo"
          />
          <span className="brand-text">
            <strong>Beth Consulting Limited</strong>
            <em>Operational Structure and System Advisory</em>
          </span>
        </Link>
        <button
          className="nav-toggle"
          aria-label="Open menu"
          aria-expanded={isOpen}
          aria-controls="primary-nav"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav
          id="primary-nav"
          className={`primary-nav ${isOpen ? "open" : ""}`}
          aria-label="Primary"
        >
          <ul>
            <li>
              <Link
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}
                onClick={handleClose}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                aria-current={pathname === "/about" ? "page" : undefined}
                onClick={handleClose}
              >
                About
              </Link>
            </li>
            <li style={{ whiteSpace: "nowrap" }}>
              <Link
                href="/services"
                aria-current={pathname === "/services" ? "page" : undefined}
                onClick={handleClose}
              >
                Services &amp; Offers
              </Link>
            </li>
            <li>
              <Link
                href="/framework"
                aria-current={pathname === "/framework" ? "page" : undefined}
                onClick={handleClose}
              >
                Framework
              </Link>
            </li>
            <li style={{ whiteSpace: "nowrap" }}>
              <Link
                href="/news"
                aria-current={pathname === "/news" ? "page" : undefined}
                onClick={handleClose}
              >
                News &amp; Events
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                aria-current={pathname === "/contact" ? "page" : undefined}
                onClick={handleClose}
              >
                Contact
              </Link>
            </li>
            <li style={{ whiteSpace: "nowrap" }} className="nav-cta">
              {isAdmin ? (
                <Link
                  href="/administrator"
                  style={{ marginLeft: "20px" }}
                  className="btn btn-primary btn-sm"
                  onClick={handleClose}
                >
                  Admin Portal
                </Link>
              ) : (
                <ConfigLink
                  cfgKey="coachli"
                  style={{ marginLeft: "20px" }}
                  className="btn btn-primary btn-sm"
                  onClick={handleClose}
                >
                  Book a Consultation
                </ConfigLink>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
