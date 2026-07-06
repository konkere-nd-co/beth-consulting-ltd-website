/* ============================================================
   BCL WEBSITE — SINGLE CONFIGURATION AREA
   Edit values here only. Do NOT hard-code the final domain,
   passwords, private API keys or host credentials in pages.
   Items marked PLACEHOLDER are outstanding integrations.
   ============================================================ */
window.BCL_CONFIG = {
  // Public site address (confirmed preference; connect at launch)
  siteUrl: "https://www.bethconsultingltd.com",

  // Confirmed public contact
  email: "bethconsultingltd@gmail.com",
  // Public phone display is NOT yet approved — leave empty until confirmed.
  phone: "08078312797",

  // Confirmed external links
  coachli: "https://coachli.co/bethconsultingltd/SV-g1xbd",
  consultationForm: "https://forms.gle/PFdeFEP4hmgYHjTf9",
  selarStore: "https://selar.com/m/bethconsulting",
  linkedin: "https://www.linkedin.com/company/beth-consulting-limited/",
  instagram: "https://www.instagram.com/bethconsulting",

  // Offer links — PLACEHOLDER: replace each with the final Selar product URL.
  // Until set, buttons fall back to the Selar store above (no broken links).
  offers: {
    operationalClarityAudit: "https://selar.com/a56ktw2y24",
    focusedSystemBuild: "https://selar.com/5gza75l546",
    operationalResetPackage: "https://selar.com/38q1ol1a24"
  },

  // MailerLite — PLACEHOLDER: paste the form action URL (or embed) when available.
  // While empty, the sign-up form runs in a controlled temporary state
  // (captures intent + shows a success message; no data is transmitted).
  mailerliteActionUrl: "",

  // Contact form — PLACEHOLDER: set to your form handler / host endpoint
  // (e.g. Formspree, Netlify Forms, or host mail script). Empty = temporary state.
  contactFormActionUrl: ""
};
