# Viral Vlog Rounderz — Arif Hassan

Official portfolio, rate card and media kit. Next.js 16 (App Router) + Motion, exported as a fully static site.

## Pages
| Route | Content |
|---|---|
| `/` | Hero, reach dashboard, audience, about, featured results |
| `/work/` | Niche explorer, filterable case studies, reach simulator |
| `/collaborate/` | Packages & rates, process, inquiry form (WhatsApp/email), FAQ |
| `/media-kit/` | A4 2-page media kit; "Download PDF" opens Save-as-PDF |

## Commands
```bash
npm install
npm run dev      # local dev at http://localhost:3000
npm run build    # static site written to /out (upload this folder anywhere)
npm run images   # regenerate /public images from assets-src/
```

## Updating content
Every number, link, price, case study and FAQ lives in **`lib/site.ts`**. Edit it, then run `npm run build`.

Before going live, set:
- `SITE.url`: the real domain (used for canonical URLs, sitemap and social cards)
- `creator.whatsapp`: digits only, e.g. `919876543210`
- the Facebook page URL, and `caseStudies[].url` video links

## Photos
`assets-src/arif-original.png` is the cropped source. `assets-src/arif-cutout.png` is the same photo with the background removed locally using the open-source `@imgly/background-removal-node` model. `npm run images` builds the optimized WebP files, the avatar, the apple icon and `public/og.jpg`.

## Deploy
**Cloudflare Workers (current):** connected to this GitHub repo. Build command `npm run build`, deploy command `npx wrangler deploy`. `wrangler.jsonc` uploads `./out` as static assets. Without that file, wrangler tries to set the site up as a server app (OpenNext) and the deploy fails.

You can also upload `/out` to Cloudflare Pages, Netlify, GitHub Pages or any static host.
