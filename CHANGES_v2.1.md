# BCL Website — v2.1 Refinement Changelog

Targeted refinement of the existing Next.js (App Router) codebase. **Not a rebuild.** No routes, content, brand assets or architecture were removed.

## Improved
- **Editorial hierarchy & rhythm** — larger, tighter headings; wider line-height; constrained reading measure (~68ch) for prose; more generous section padding. (globals.css V2.1 layer)
- **Lighter, less block-like feel** — softer section bands (white -> #FCFBF8, gentler beige), hairline card borders, much lighter shadows, larger radii and padding; cards lift subtly on hover instead of sitting as heavy boxes.
- **Restrained, accessible motion** — sections fade/rise gently into view on scroll; buttons and cards have subtle hover motion; header gains a soft shadow once scrolled. Progressive and fail-safe (no hidden content if JS is off). (SiteEnhancements.tsx, globals.css)
- **Reduced-motion support** — @media (prefers-reduced-motion: reduce) disables all reveal/hover/scroll motion; the reveal script also no-ops under that preference.
- **SEO** — added app/sitemap.ts and app/robots.ts (Next metadata routes, replacing the static files lost in migration); added metadataBase; per-page canonical URLs (alternates.canonical); re-added ProfessionalService JSON-LD on the home page; added Twitter card metadata.
- **Public polish / hygiene** — removed developer-facing "Integration point..." notes from the public newsletter and contact forms; removed the "[CLIENT CONFIRMATION REQUIRED]" / "working draft" text from the public Privacy page (tracking moved to internal docs).

## Preserved (unchanged)
- All approved copy, confirmed palette, tagline ("Operational Structure and System Advisory"), logo, founder headshot, Digital Witch certificate labelling, testimonials ("Mentee, Cohort 1"), Q2 Mentorship content.
- Routing/IA from the migration: /about (About+Founder), /services (Services+Offers), /news + /news/[slug] (mentorship as featured article), /framework, /testimonials, /contact, /privacy.
- All components (Header, Footer, ConfigLink, OfferButton, NewsletterForm, ContactForm), the config model, and the Next.js App Router + TypeScript architecture.

## Verified (from code)
- Offer buttons fall back to the confirmed Selar store (selar.com/m/bethconsulting) when individual URLs are blank — no broken links.
- Confirmed external links present and wired: Coachli booking, Google consultation form, LinkedIn, Instagram, email.
- Forms validate input, include honeypot anti-spam, and show a safe temporary success state.
- Prices are not displayed anywhere; pricing is routed to Selar.

## Unverified (require live config / runtime testing)
- MailerLite newsletter submission — mailerliteActionUrl is empty; form runs in temporary state and does NOT transmit data yet.
- Contact form delivery — contactFormActionUrl is empty; messages are NOT emailed yet.
- Individual Selar offer URLs — blank placeholders (store fallback active).
- Live click-through of Coachli/social links not executed in this environment.

## Files added
- src/app/sitemap.ts, src/app/robots.ts, src/components/SiteEnhancements.tsx

## Files modified
- src/app/globals.css (appended V2.1 layer), src/app/layout.tsx, src/app/page.tsx,
  src/components/NewsletterForm.tsx, src/components/ContactForm.tsx, src/app/privacy/page.tsx,
  and per-page metadata canonicals in about, services, framework, news, news/[slug], testimonials, contact, privacy.

## Files removed
- None.

---

# v2.2 — Editorial polish pass (presentation only)

Further refinement on top of v2.1. No content, routes, components or architecture changed; this is a CSS-only design layer appended to `globals.css`.

## Improved
- **Less block-like** — light "white" and "cream" sections unified into one continuous warm editorial canvas with hairline separators, so the page no longer reads as stacked colour blocks. Green and beige are now used as deliberate accent moments only.
- **More fluid motion** — replaced the v2.1 whole-section fade with a calmer pattern: section headers settle in place while grid/split children rise with a gentle **staggered** reveal. Feels alive, not busy.
- **Stronger rhythm & whitespace** — larger section padding scale; tightened header spacing.
- **Quieter, more premium cards** — borderless-feel cards with a hairline edge and a subtle terracotta top-accent that draws on hover; lighter quote cards with a larger lead quote.
- **Premium focal sections** — softer radial-lit hero; richer green and beige gradient bands for the framework and CTA moments.
- **Mobile spacing polish** — tighter, calmer padding on small screens.

## Preserved & accessibility
- All approved content, palette, tagline, assets and routes unchanged.
- New motion is fully disabled under `prefers-reduced-motion` (reveal, stagger, hover, accent bar all neutralised); reveal remains fail-safe (no hidden content if JS is off).

## Files modified
- `src/app/globals.css` (appended V2.2 layer only).

## Files added / removed
- None.

---

# v3.0 — Flagship editorial redesign (presentation overhaul)

A top-tier consulting-grade visual elevation. Principles from respected consulting/editorial sites applied in BCL's own brand — **no third-party identity copied**. No content, routes, components, integrations or architecture removed.

## Improved
- **Display typography** — large Fraunces headlines with tight leading and negative tracking; confident editorial scale across the site.
- **Indexed sections** — uppercase tracked labels with section numbers (01–08) for a structured, authoritative read.
- **Bespoke homepage**:
  - Full editorial **hero** with an arched founder portrait.
  - **Credibility stat strip** (15+ yrs · 300+ events · 3 sectors · USAID) — approved facts only.
  - Two-column **positioning statement**.
  - **Services as an indexed editorial list** (replaces the boxy card grid) with inline deliverables.
  - **Dark, premium EROF** section as numbered layer rows.
  - **Founder** editorial split with pull-quote.
  - **Oversized feature testimonial** + supporting quote grid.
  - **Strong dark final CTA** band.
- **Refined components site-wide** — quieter cards with hover accent, lighter quote/news cards, premium header and footer.
- **Restrained staggered motion** — sections, stat cells, service/layer rows and the feature quote rise in sequence; fully disabled under prefers-reduced-motion; fail-safe.

## Preserved
- Approved palette, tagline, email, logo, headshot, Digital Witch certificate labelling, "Mentee, Cohort 1" testimonials, Q2 content, all routes, all components, the Next.js App Router architecture, and all SEO from v2.1 (sitemap/robots/canonicals/JSON-LD).

## Files modified
- `src/app/globals.css` (appended V3.0 theme), `src/app/page.tsx` (homepage rebuilt to the editorial layout using existing components).

## Files added / removed
- None. (Interior pages inherit the new theme automatically.)

---

# v3.1 — Interior pages elevated to the flagship system

The v3.0 editorial depth is now applied across every interior page (not just the homepage). Presentation only; content, routes, components, integrations and brand preserved.

## Improved
- **Indexed section labels** (01, 02, …) on About, Services, Framework, News, Mentorship, Testimonials, Contact, Privacy.
- **About** — calmer page intro, mission/vision pair, values as an inline rail, **arched founder portrait**, serif pull-quote, refined credential block, dark philosophy close.
- **Services** — core services rebuilt as the **indexed editorial list**; offers as refined cards; dark final CTA.
- **Framework** — the three layers rebuilt as an **indexed layer list (light variant)**; dark final CTA.
- **Mentorship article** — six-week schedule as a clean **week-chip grid**; arched teaser; refined details image; dark final CTA.
- **Testimonials** — **oversized feature quote** leading into the supporting grid; dark final CTA.
- **News / Contact / Privacy** — page-intro rhythm, indexed labels, refined cards.
- Consistent **staggered reveal** and `prefers-reduced-motion` support across all new interior blocks.

## Files modified
- `src/app/globals.css` (interior support layer), and interior pages: `about`, `services`, `framework`, `news`, `news/[slug]`, `testimonials`, `contact`, `privacy`.

## Files added / removed
- None.

---

# v3.2 — Austere editorial theme (McKinsey-caliber restraint)

A CSS-only presentation layer. **No content, copy, markup, routes, assets or integrations changed** — every approved word and image is preserved. Applies the *principles* of top strategy-firm sites (not any third party's identity or layout) in BCL's own brand.

## Improved
- **Near-monochrome restraint** — forest green + charcoal on paper/cream; beige and terracotta pulled right back, with terracotta reserved as the single accent on primary CTAs.
- **Oversized, austere display type** — larger H1/H2 with tighter tracking for confident gravitas.
- **Flatter, more precise surfaces** — hairline borders, no shadows, near-square corners; hover effects quietened.
- **Deeper whitespace** — increased section padding and calmer pacing.
- **Quieter accents** — offer tag in ink, editorial lists with thin rules and larger titles, larger stat numerals, deep near-mono dark sections and footer.

## Preserved
- All approved content, copy, images, routes, components, integrations; the confirmed palette tokens are refined in tone only (still forest/beige/cream/charcoal/terracotta family). Reduced-motion handling from earlier layers still applies.

## Files modified
- `src/app/globals.css` (appended V3.2 layer only).

## Files added / removed
- None.

---

# v3.3 — Editorial flow (statement hero + featured insight)

Adopts premium-consulting *flow/layout patterns* in BCL's brand and existing content. No copy, images, routes or integrations invented or changed; markup change is limited to the homepage news block + a hero scroll cue.

## Improved
- **Statement-led hero** — now near full-viewport with a subtle scroll cue, for a confident, editorial entrance.
- **Featured insight block** — the homepage news preview becomes a large lead story (Q2 Mentorship) beside a thin-rule list (Operational insights; Newsletter) — the "featured + list" pattern used by top consulting sites — built from existing items only.

## Preserved
- All approved content/copy/images/routes/components/integrations; interior pages and brand unchanged. Reduced-motion handling applies to new hover.

## Files modified
- `src/app/globals.css` (V3.3 layer), `src/app/page.tsx` (homepage news block → featured layout + hero cue).

## Files added / removed
- None.

---

# v3.4 — Smooth motion (elegant easing)

A CSS-only motion layer for a smooth, premium feel. No content, markup, routes or integrations changed.

## Improved
- **Elegant easing** — a single refined easing curve (cubic-bezier .16,1,.3,1) applied across reveals, hovers and transitions.
- **Hero entrance on load** — eyebrow, headline, lead, CTAs, badge and portrait rise/fade in a smooth stagger; subtle page fade-in.
- **Section text reveal** — section eyebrows, headings and leads ease up gently as they enter view.
- **Image reveal** — non-hero images reveal with a soft clip-and-scale wipe as their section enters view.
- **Refined element/hover transitions** across buttons, cards, lists and the featured block.

## Safety
- Everything is gated behind the existing fail-safe scroll mechanism (no hidden content if JS is off) and **fully disabled under `prefers-reduced-motion`**.

## Files modified
- `src/app/globals.css` (appended V3.4 layer only). Preview stylesheet updated to match.

## Files added / removed
- None.

---

# v3.5 — Premium masked text reveal

Adds the signature "how the text moves" effect seen on premium sites: headings rise word-by-word from behind a clip edge as each section scrolls into view.

## Improved
- **Masked word-by-word reveal** on section headings (non-hero H1/H2) and the feature quote — each word eases up in a smooth stagger.
- Words are wrapped at runtime by the existing enhancement script (`SiteEnhancements` in the app; `main.js` in the preview), so **no source content changes** — the text is identical, just animated.

## Safety
- Runs only via the existing fail-safe scroll mechanism (no hidden text if JS is off) and is **fully disabled under `prefers-reduced-motion`**. Descenders are protected with padding so letters like g/y/p are never clipped.

## Note
- The BL&C site could not be inspected directly (JavaScript-rendered; no browser connected to this session), so this recreates the *described* premium text motion rather than copying that specific site. Connect the Chrome extension if an exact match is wanted.

## Files modified
- `src/app/globals.css`, `src/components/SiteEnhancements.tsx` (preview `styles.css` + `main.js` updated to match).

## Files added / removed
- None.

---

# v3.6 — BL&C-caliber premium pass (Tier 1 + Tier 2)

Premium-finish pass informed by a live review of a benchmark consulting site. Principles only, in BCL's own brand and content — nothing copied, nothing invented. Presentation + light markup only.

## Improved
- **Lighter display type** — Fraunces headings set to weight 500 with tighter tracking (the single biggest "premium" lever).
- **Hero accent word** — one word of the hero headline ("impact") set in terracotta.
- **Eyebrow em-dash** — leading dash on non-indexed labels.
- **Dark, rich hero** — deep forest-green hero with white headline + terracotta accent (most transformative single change).
- **Count-up stats** — numeric stat-strip values animate from 0 on reveal.
- **Sticky "method" Engine Room** — intro pins on the left while the three EROF layers scroll beside it (existing content, restructured).

## Preserved / safety
- All approved content, copy, routes, components and integrations unchanged. Count-up + motion fully disabled under prefers-reduced-motion; fail-safe.

## Files modified
- `src/app/globals.css`, `src/app/page.tsx`, `src/components/SiteEnhancements.tsx`. (Preview mirror updated to match.)

## Files added / removed
- None.

---

# v3.7 — Client feedback (Lizzy, review round 1)

Applied Lizzy's review feedback exactly. No other changes; nothing invented.

## Changes
- **Home hero:** removed the full stop after "impact"; changed the em-dash before "so the work runs…" to a comma.
- **Public phone number:** added `08078312797` (client-approved) — set in config and shown on the Contact page.
- **Selar offer links:** wired the three confirmed listings — Operational Clarity Audit `a56ktw2y24`, Focused System Build `5gza75l546`, Operational Reset `38q1ol1a24` — in `config.ts` and `config.js`. Offer buttons now open the specific listing (store fallback retired).
- **Q2 Mentorship:** updated to reflect the programme is **running 4 June – 9 July 2026**; removed the "application details coming soon"/"shared shortly" placeholders (application link no longer needed); future-cohort CTA kept.
- **Privacy Policy:** confirmed acceptable by client — no change.

## Files modified
- `src/app/page.tsx`, `src/app/news/[slug]/page.tsx`, `src/app/contact/page.tsx`, `src/config.ts`, `public/assets/js/config.js`. (Preview mirror updated to match.)

---

# v3.8 — Q2 mentorship: applications-closed notice

Small live-page update (client-directed). No content invented.

## Change
- Added a line on the Q2 Mentorship page: "Applications for this cohort are closed — subscribe for the next one," linking to the newsletter sign-up, to steer interested visitors while the programme runs (4 June – 9 July 2026). Recap approach set aside per client preference.

## Files modified
- `src/app/news/[slug]/page.tsx`. (Preview mirror updated to match.)

---

# v3.9 — Client final-review corrections (round 2)

Requested corrections only. No redesign, restructure, deployment or removal of approved content/functionality. British English preserved.

## 1. Punctuation / AI-style clean-up (em dashes → natural punctuation)
Replaced sentence-break em dashes with commas / full stops / colons where they read more naturally. En-dash ranges (2–4 week, 4 June – 9 July), compound hyphens (women-led, donor-funded, decision-making, cross-functional, decision-rights, operational-improvement, etc.) and the conventional "— Mentee, Cohort 1" attribution were preserved.
Pages/sections changed:
- **Home:** Who We Are statement; Engine Room intro; Workflow Coordination line; founder quote; testimonial preview; closing CTA.
- **About:** company intro sentence.
- **Framework:** hero line; "operational core … the engine room"; "EROF strengthens three areas …"; Operational Processes and Workflow Coordination descriptions.
- **News:** intro sentence (also the announcement fix below).
- **Mentorship article:** hero lead; focus line; applications-closed line.
- **Testimonials:** one quote ("The session was fire.") and the meta description.
- **Forms:** newsletter and contact success messages.

## 2. Announcement grammar fix
News intro now reads "…programme recaps and operational insights **are** published here as they happen." ("are" added; em dash removed.)

## 3. Second professional certificate added
Added, beside the existing Digital Witch certificate, the **Digital Technology Business School, London — PM/BA (Project Management and Business Analysis) Bootcamp** certificate (exact institution wording from the certificate; 2024). Both credentials now sit in a responsive two-up layout (two columns on desktop, stacked on mobile), equal styling, optimised image, descriptive alt text. Original preserved in `public/assets/originals/`.

## 4. Preserved (unchanged)
Brand colours, public phone (08078312797), the three Selar offer links, Privacy Policy wording, Q2 status/dates, the applications-closed message + newsletter link, email, Coachli, social links, navigation, animations and layout.

## Files modified
- `src/app/page.tsx`, `about/page.tsx`, `framework/page.tsx`, `news/page.tsx`, `news/[slug]/page.tsx`, `testimonials/page.tsx`, `components/NewsletterForm.tsx`, `components/ContactForm.tsx`, `src/app/globals.css`; added `public/assets/images/credential-digital-tech.jpg` (+ preserved original). Preview mirror updated to match.

---

# v3.10 — Contact: Linktree link added

Contact section only. No other changes.

## Change
- Added a "Connect with BCL" card in the Contact page's "Other ways to reach us" list with a **View all links** button linking to Madam Lizzy's Linktree (https://linktr.ee/nneka.e.akwitti), opening in a new tab (`target="_blank" rel="noopener"`). Styled with the existing card + button classes; responsive on mobile and desktop.

## Preserved
- All other Contact content, layout, styling, links and functionality unchanged. No changes to any other page.

## Files modified
- `src/app/contact/page.tsx` (preview `contact.html` updated to match).
