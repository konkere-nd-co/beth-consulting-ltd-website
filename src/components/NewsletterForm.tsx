"use client";
import React, { useState } from "react";
import Link from "next/link";

export function NewsletterForm() {
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (!consent) {
      setErrorMsg("Please agree to receive the newsletter.");
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not subscribe you right now.");
      }

      setSuccessMsg(data.message || "Thank you for subscribing.");
      setEmail("");
      setName("");
      setConsent(false);
    } catch (error) {
      setErrorMsg(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section newsletter" id="newsletter">
      <div className="container">
        <div className="center" style={{ maxWidth: "680px", margin: "0 auto" }}>
          <p className="eyebrow" style={{ color: "var(--beige)" }}>
            Stay informed
          </p>
          <h2>The BCL Newsletter launches in September 2026</h2>
          <p style={{ color: "white" }}>
            Subscribe to receive practical insights on operational structure,
            systems and workplace effectiveness.
          </p>
        </div>
        <div
          className="form-card"
          style={{ maxWidth: "620px", margin: "1.8rem auto 0" }}
        >
          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label
                htmlFor="nl-email"
                style={{ display: "block", marginBottom: "0.35rem" }}
              >
                Email address
              </label>
              <input
                id="nl-email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{ width: "100%" }}
              />
            </div>
            <div className="field">
              <label
                htmlFor="nl-name"
                style={{ display: "block", marginBottom: "0.35rem" }}
              >
                Name (optional)
              </label>
              <input
                id="nl-name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                style={{ width: "100%" }}
              />
            </div>
            <div className="field consent">
              <input
                id="nl-consent"
                name="consent"
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <label htmlFor="nl-consent">
                I agree to receive the BCL newsletter by email and have read the{" "}
                <Link href="/privacy">Privacy Policy</Link>. I can unsubscribe
                at any time.
              </label>
            </div>
            {!consent && (
              <p
                style={{
                  marginTop: "-0.35rem",
                  marginBottom: "0.75rem",
                  color: "#f7c948",
                  fontSize: "0.95rem",
                }}
              >
                Please accept the privacy policy before submitting.
              </p>
            )}
            <button
              className="btn btn-primary"
              style={{ width: "100%" }}
              type="submit"
              disabled={isSubmitting || !consent}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ marginRight: "0.5rem", flexShrink: 0 }}
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </button>
          </form>
          {successMsg && (
            <div
              role="status"
              aria-live="polite"
              style={{
                marginTop: "1rem",
                padding: "0.95rem 1rem",
                border: "1px solid #2f6b4f",
                backgroundColor: "#e8f5ee",
                color: "#1f4d3a",
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
                fontWeight: 600,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "1.3rem",
                  height: "1.3rem",
                  borderRadius: "999px",
                  backgroundColor: "#2f6b4f",
                  color: "white",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <span>{successMsg}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
