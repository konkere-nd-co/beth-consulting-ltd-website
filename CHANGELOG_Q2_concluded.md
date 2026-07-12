# Changelog — Q2 Mentorship "Successfully Concluded" news item

Date: 9 July 2026. Only the News content was changed. No technical configuration was touched.

## Added
- New News/Announcement item (latest, top of the list): "Q2 Mentorship Programme Successfully Concluded" (slug: q2-mentorship-concluded), with full write-up, card excerpt, its own detail page, a supporting "Voices from the Engine Room" image, and a newsletter CTA linking to /news#newsletter.
- News data model extended with optional fields: bodyParagraphs, secondImage, secondImageAlt, newsletterCta.

## Changed
- Article detail page (news/[slug]) now renders full body paragraphs + a supporting image + the newsletter CTA for items that carry body content (existing items unaffected).
- Ordering: concluded item appears above the older "BCL Q2 Mentorship Programme" item.

## Removed
- The "Launching September 2026" newsletter news card (replaced by this real news item). The newsletter SIGN-UP section itself is unchanged.

## NOT changed (verified byte-identical to the uploaded source)
- MailerLite setup, contact-form setup, src/config.ts, public/assets/js/config.js, NewsletterForm.tsx, ContactForm.tsx, src/app/api/newsletter/route.ts, src/app/api/contact/route.ts, all live links (Selar, phone, email, Coachli, socials, Linktree), layout, navigation and styling.

## Images required (must be added as files)
Place these two JPGs in public/assets/images/ (exact names):
- bcl-q2-mentorship-cohort-collage.jpg  (main article image)
- bcl-q2-mentorship-voices-engine-room.jpg  (supporting "Voices from the Engine Room" image)
Alt text is already set. Until the files are added they will not display (build is unaffected).
