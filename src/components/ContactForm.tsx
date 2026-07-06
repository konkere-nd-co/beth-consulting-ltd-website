"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export function ContactForm() {
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!successMsg) return;

    const timer = window.setTimeout(() => {
      setSuccessMsg("");
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [successMsg]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (!message.trim()) {
      setErrorMsg("Please add a short message.");
      return;
    }

    if (!consent) {
      setErrorMsg("Please consent to BCL using these details.");
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not send your message right now.");
      }

      setSuccessMsg(data.message || "Your message has been sent.");
      setEmail("");
      setName("");
      setMessage("");
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
    <div className="form-card">
      <form onSubmit={handleSubmit} noValidate>
        <div className={`field ${errorMsg && !name ? "invalid" : ""}`}>
          <label htmlFor="c-name">Name</label>
          <input
            id="c-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errorMsg && !name && <span className="err">{errorMsg}</span>}
        </div>
        <div className={`field ${errorMsg && name && !email ? "invalid" : ""}`}>
          <label htmlFor="c-email">Email address</label>
          <input
            id="c-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorMsg && name && !email && (
            <span className="err">{errorMsg}</span>
          )}
        </div>
        <div
          className={`field ${errorMsg && name && email && !message ? "invalid" : ""}`}
        >
          <label htmlFor="c-msg">How can we help?</label>
          <textarea
            id="c-msg"
            name="message"
            rows={5}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          {errorMsg && name && email && !message && (
            <span className="err">{errorMsg}</span>
          )}
        </div>
        <div className="field consent">
          <input
            id="c-consent"
            name="consent"
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <label htmlFor="c-consent">
            I consent to BCL using these details to respond to my enquiry, as
            described in the <Link href="/privacy">Privacy Policy</Link>.
          </label>
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
      </form>
      {successMsg && (
        <div
          role="status"
          aria-live="polite"
          style={{
            marginTop: "1rem",
            padding: "0.85rem 1rem",
            border: "1px solid #2f6b4f",
            backgroundColor: "#e8f5ee",
            color: "#1f4d3a",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            fontWeight: 600,
            borderRadius: 0,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "1.25rem",
              height: "1.25rem",
              borderRadius: "999px",
              backgroundColor: "#2f6b4f",
              color: "white",
              flexShrink: 0,
            }}
          >
            <svg
              width="12"
              height="12"
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
  );
}
