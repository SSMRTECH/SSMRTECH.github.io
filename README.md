# SSMR Tech - Landing Page

Single-page site built with Next.js 16 (App Router), Tailwind CSS 4 and Motion.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Editing content

All copy lives in `src/content/site.ts`: hero text, services, customers, about and contact.

- **Contact email**: `cto@ssmrtech.co.in`. Set `NEXT_PUBLIC_CONTACT_EMAIL` (e.g. in `.env.local`) or edit `CONTACT_EMAIL`.
- **Site URL** for SEO metadata: `NEXT_PUBLIC_SITE_URL`.
- **Customer logos**: put files in `public/customers/` and set `logo: "/customers/name.svg"` on the entry. Without a logo, the name renders as a wordmark. `href` is optional.

## Structure

- `src/components/GatewayCanvas.tsx` - animated hero visual (canvas 2D, pauses offscreen, static under reduced motion)
- `src/components/*` - one component per section, plus `Reveal` (scroll fade-in) and `ui.tsx` (logo, icons)
- `src/app/globals.css` - color tokens (`--accent` etc.) and shared effects
