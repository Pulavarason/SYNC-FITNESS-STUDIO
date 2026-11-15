# SYNC FITNESS STUDIO — Website

**MIND • BODY • POWER** · Valasaravakkam, Chennai, Tamil Nadu, India

A premium, dark, editorial one-page website with an immersive 3D chrome dumbbell hero, built with
Next.js 15, React 19, TypeScript, Tailwind CSS, React Three Fiber, GSAP + ScrollTrigger, Framer Motion and Lenis.

Colour balance: ~75% black/charcoal surfaces · ~15% white/light grey · ~10% green accents.

---

## 1. Run it locally

Requires **Node.js 18.18+** (Node 20 or 22 recommended).

```bash
npm install
npm run dev        # http://localhost:3000
```

Production check:

```bash
npm run build
npm start
```

## 2. Fill in the real business details (important)

Open **`lib/site.ts`**. Nothing was invented — everything the studio still needs to confirm is an empty string:

| Field | Effect when filled |
| --- | --- |
| `contact.phone` | Enables the **Call** button and `tel:` links (`"+91 98765 43210"` style) |
| `contact.whatsapp` | Enables **WhatsApp** buttons; every membership "Enquire" button opens a pre-filled chat |
| `contact.hours` | Shows business hours in Contact |
| `contact.email` | Shows an email row |
| `contact.mapsUrl` | Your exact Google Maps share link. If empty, directions fall back to a Maps search for the studio name + area |
| `social.instagram / facebook / youtube` | Shows the matching social icon |
| `url` | Your live domain (used for SEO metadata) |
| `membershipPlans[].price` | Shows a price (e.g. `"₹0,000"`). Empty shows "Enquire for pricing" |

Until a value is set, the site hides or softens that detail gracefully — buttons fall back to the Contact section.

## 3. Replace the photography

Every image is a slot in **`lib/images.ts`** and a file in **`public/images/`**.
The repo ships dark placeholder images with the exact filenames. To use real photos, **overwrite the file with the same name**
(or change the `src` in `lib/images.ts`):

```
hero-backdrop.jpg            1920×1080   hero background (heavily darkened by design)
about.jpg                    1200×1500   About section (4:5 portrait)
program-*.jpg   (6 files)    1400×1200   Programs tiles
gallery-01 … gallery-07.jpg  various     Gallery (the grid crops with object-fit: cover)
```

Tips: JPG/WebP, long edge ≈ 2000px, under ~400 KB each. High-contrast, dark-toned gym photos suit the design best —
a built-in dark grade is applied over every photo to keep the palette consistent.

## 4. The logo

`components/Logo.tsx` is a live-text recreation of the official lockup (wide SYNC with the green **N**, MIND • BODY • POWER,
FITNESS STUDIO, VALASARAVAKKAM and the split 24/7 pill), adapted to a dark background — the original logo's black lettering
would disappear on black. The untouched original is kept at `public/brand/sync-logo-original.png`.
If you have the logo as an SVG/transparent PNG with white lettering, drop it in `public/brand/` and swap it into `Logo.tsx`.

## 5. Project structure

```
app/
  layout.tsx          metadata, SEO, JSON-LD
  page.tsx            page composition
  globals.css         design tokens, buttons, type, motion utilities
  icon.svg            favicon
components/
  Loader.tsx          brand intro (once per session; skipped for reduced motion)
  Navbar.tsx          transparent → blurred dark bar, animated mobile menu
  Hero.tsx            hero layout + entrance + parallax
  HeroScene.tsx       React Three Fiber chrome dumbbell (lazy-loaded, no external assets)
  Marquee.tsx         light editorial band
  About.tsx  WhySync.tsx  Programs.tsx  Experience247.tsx
  Gallery.tsx         asymmetric grid + accessible fullscreen lightbox
  Membership.tsx  Contact.tsx  Footer.tsx
  MagneticButton.tsx  Reveal.tsx  ImageReveal.tsx  Photo.tsx  SmoothScroll.tsx  SocialIcons.tsx  Logo.tsx
lib/
  site.ts             ← business details & plans (edit this)
  images.ts           ← image slots (edit this)
  motion.ts  ready.ts GSAP registration, reduced-motion & mobile hooks, loader state
public/
  images/             placeholder photos (replace)
  brand/              original logo
```

## 6. Design system (summary)

- **Type:** Anton (display headlines) + Inter (everything else). Fluid scale defined in `tailwind.config.ts`.
- **Colour tokens:** `ink #000`, `deep #080808`, `charcoal #121212`, `graphite #1C1C1C`, `snow #F5F5F5`, `mist #D6D6D6`, `sync #65CC00`, `volt #80FF00`.
  Green is only used for CTAs, eyebrows, active states, hairlines and the odd highlight word.
- **Spacing:** `py-section` (fluid 5–10rem) and `px-gutter` (fluid 1.25–3.5rem) on a 4px base; content max width `max-w-shell` (88rem).
- **Buttons:** `.btn-primary` (green), `.btn-ghost` (outline), `.btn-light` — pill shaped, magnetic on fine pointers.
- **Motion:** ease `cubic-bezier(0.22,1,0.36,1)`, 0.5–1.4s, reveals fire once, nothing blocks interaction.
- **Accessibility:** `prefers-reduced-motion` disables smooth scroll, reveals, loader and 3D animation; visible focus rings;
  skip link; keyboard-operable menu and lightbox (Esc / ← →); semantic landmarks. The design is complete with all animation off.
- **Mobile:** snap-scroll Programs rail, full-screen menu, lower-cost 3D (no contact shadows, capped pixel ratio, no pointer tracking),
  3D pauses when the hero is off-screen and is skipped entirely if WebGL is unavailable.

## 7. Deploy to Vercel

**Option A — Git (recommended)**

1. Push this folder to a GitHub/GitLab/Bitbucket repo:
   ```bash
   git init && git add . && git commit -m "SYNC Fitness Studio website"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Go to <https://vercel.com/new>, import the repo. Framework is auto-detected as **Next.js** — keep the defaults
   (Build: `next build`, Output: `.next`).
3. Click **Deploy**. Then update `url` in `lib/site.ts` to your final domain and push again.
4. Add your domain under **Project → Settings → Domains**.

**Option B — Vercel CLI**

```bash
npm i -g vercel
vercel          # first deploy (preview)
vercel --prod   # production
```

No environment variables are required.
