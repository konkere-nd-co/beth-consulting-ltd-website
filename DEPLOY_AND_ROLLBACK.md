# BCL Website v2.1 — Deployment (Yemi) & Rollback

## A. Deployment instructions — Yemi (deployment/hosting only)
Scope: upload, host, deploy, configure domain, support technical deployment. (No design/content/rebuild.)

1. **Get the build running locally** (sanity check)
   - Unzip the updated source. In the project folder run: `npm install` then `npm run build` then `npm run start` (or `bun install` / `bun run build`).
   - Confirm a clean production build and that all routes render: `/`, `/about`, `/services`, `/framework`, `/news`, `/news/bcl-q2-mentorship-programme`, `/testimonials`, `/contact`, `/privacy`.
2. **Set the live integration values** in `public/assets/js/config.js` (runtime config read in the browser). Mirror the same values in `src/config.ts` (`fallbackConfig`) so server-render and client agree:
   - `mailerliteActionUrl` — the MailerLite embedded form action URL.
   - `contactFormActionUrl` — the chosen form endpoint (e.g. Formspree / Netlify Forms / host mail handler).
   - `offers.operationalClarityAudit`, `offers.focusedSystemBuild`, `offers.operationalResetPackage` — final Selar product URLs.
   - Leave `phone` empty unless BCL approves a public number.
3. **Deploy** to the existing host for `bethconsultingltd.com`.
   - Recommended: Vercel (native Next.js) or any Node host running `next start`. If the host is static-only, run `next build` with output settings appropriate to that host before upload.
   - Ensure HTTPS is enforced and `www` / apex redirect is consistent with the current live setup.
4. **Point/confirm DNS** for `bethconsultingltd.com` / `www.bethconsultingltd.com` to the deployment.
5. **Post-deploy checks**: open each route; submit the newsletter and contact forms once live; click each Selar/offer button and Coachli link; run Lighthouse (mobile) and confirm no console errors.
6. **Confirm ownership**: domain, hosting and admin access remain with Beth Consulting Limited.

## B. Rollback instructions
The previous stable version is the prior repository state / the earlier source ZIP.

**Rollback artifact to preserve:** `BCL_Website_Source_Current_2026-06.zip` (the pre-v2.1 source) and/or the prior deployment build.

1. **If hosted on a platform with deploy history (Vercel/Netlify):** open Deployments, select the last known-good deploy, and "Promote/Rollback to" that deployment. This restores instantly.
2. **If deployed from Git:** `git revert` the v2.1 commit (or check out the previous tag/commit) and redeploy. Keep v2.1 in history; do not force-delete.
3. **If deployed from a ZIP:** redeploy `BCL_Website_Source_Current_2026-06.zip` using the same build/upload steps above.
4. **After rollback, check:** all routes load; forms and Selar links behave as before; DNS still resolves; no mixed v2.1/old assets cached (purge CDN cache if used).

**Trigger rollback if:** the production build fails on the host; a route 404s or errors; forms/links regress; a layout breaks on mobile; or Core Web Vitals degrade materially versus the previous version.

## C. Notes
- This release changes presentation, motion, SEO routes and form/privacy hygiene only. No data model, route names or business content changed, so rollback is low-risk and reversible.
- Keep both source ZIPs (current v2.1 and previous) until the new version is confirmed stable in production.
