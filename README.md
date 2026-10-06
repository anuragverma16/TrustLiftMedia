# TrustLift Media — Premium Agency Website

A cinematic, editorial dark-mode site built with **React + Vite + Tailwind CSS + GSAP (ScrollTrigger) + Framer Motion + Lenis + Lucide React**.

All content (name, tagline, hero text, services, stats, portfolio, testimonials, contact details, socials) comes from https://trustlift-media.netlify.app/

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
npm run preview  # serve the production build
```

Requires Node 18+.

## Pages

`/` Home · `/services` · `/about` · `/portfolio` · `/blog` · `/contact` (same pages as the live site's navigation, now with page transitions).

## Where the content lives

| File | What it holds |
| --- | --- |
| `src/data/site.js` | Brand name, tagline, hero text, phones, email, WhatsApp, socials, nav, hero/about image URLs |
| `src/data/services.js` | The 6 services |
| `src/data/projects.js` | The 3 portfolio case studies (images hosted on your Cloudinary) |
| `src/data/whyChoose.js` | The 5 "why choose" points (shown as a marquee + list) |
| `src/data/testimonials.js` | The 3 testimonials |
| `src/data/blogs.js` | Blog headings (“In The Headlights”) + a `posts` array |

**Blog posts:** the live site shows the blog headings but no individual posts, so `posts` is empty and the UI shows “New stories are coming soon.” Add posts to `src/data/blogs.js` (format is documented at the top of the file) and they appear as a carousel on Home and a grid on `/blog`.

**Contact form:** there is no backend, so *Send Message* opens the visitor's email app addressed to trustliftmedia@gmail.com with the form content filled in. A WhatsApp button is also on the contact page. Swap `onSubmit` in `ContactPage.jsx` for a form service if you want server-side submissions.

**Images:** service images and the CTA background are generated abstract placeholders in `src/assets/images/` — replace with your own WebP files (keep the names or update `src/data/services.js` / `CTA.jsx`). Hero, About and portfolio images are the same URLs your live site uses.

## Features

| Area | Where |
| --- | --- |
| Preloader (once per page load) | `src/components/Preloader.jsx` |
| Navbar + full-screen mobile menu | `src/components/Navbar.jsx` |
| Custom cursor (VIEW / EXPLORE, desktop only) | `src/components/CustomCursor.jsx`, `src/animations/cursorAnimations.js` |
| Hero with line reveal + parallax | `src/components/Hero.jsx`, `src/animations/heroAnimations.js` |
| About, Stats (one-shot counters) | `About.jsx`, `Stats.jsx` |
| **Pinned horizontal Services** (vertical below 1024px) | `Services.jsx` |
| Portfolio (editorial case studies) | `FeaturedWork.jsx`, `ProjectItem.jsx` |
| Why-choose marquee (GSAP, seamless, pause on hover) | `WhyChoose.jsx` |
| Testimonials, Blog carousel, CTA (magnetic), Footer | `Testimonials.jsx`, `Blog.jsx`, `CTA.jsx`, `Footer.jsx` |
| Page transitions | `src/animations/pageTransitions.js`, `TransitionLink.jsx` |
| Lenis ⇄ ScrollTrigger | `src/hooks/useLenis.js` |
| Scoped, responsive GSAP cleanup | `src/hooks/useGsap.js` |

## Notes

- Animations use `transform`, `opacity` and `clip-path`; every timeline/ScrollTrigger is reverted on unmount.
- `prefers-reduced-motion`: no Lenis, preloader animation, pin, parallax, cursor or transitions — all content stays visible.
- Update `index.html` (title, description, canonical, Open Graph) and replace `public/og.webp` with your own share image.
- It is a client-side routed SPA: on Netlify add a `_redirects` file containing `/*  /index.html  200` (already included in `public/_redirects`).

## Photos, stories, hero video

- **Photos**: every image uses `src/components/Img.jsx` — a remote photo (Pexels/Cloudinary URL in `src/data/*.js`) with a bundled fallback in `src/assets/images/`, so no image is ever blank. Replace a URL in `site.js`, `services.js`, `projects.js` or `blogs.js` to swap a photo.
- **Stories**: `src/data/blogs.js` holds 6 stories (draft copy — edit freely). Each opens at `/blog/<slug>` (`src/pages/StoryPage.jsx`) with full article, prev/next and related stories.
- **Per-page copy**: each page's header/CTA text is set in its file under `src/pages/`; the CTA component takes `label`, `lines`, `text`, `button` props.
- **Hero**: looping background video (`src/assets/videos/hero-loop.webm` + `.mp4`, poster `hero-poster.webp`), photo overlay, cursor spotlight, rotating consultation badge, services ticker and skewed line reveal. Replace the video files to use your own footage. Reduced-motion users get the paused poster frame.
