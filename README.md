# Algorithm Clinic Website

Production-ready Next.js 14+ starter for a multilingual dental technical clinic website.

## Stack

- Next.js App Router
- TypeScript
- TailwindCSS
- next-intl (Romanian default, English, German)
- next-seo (JSON-LD structured data)
- Framer Motion (subtle animations)

## Folder Structure

```text
.
├─ messages/
│  ├─ ro.json
│  ├─ en.json
│  └─ de.json
├─ src/
│  ├─ app/
│  │  ├─ [locale]/
│  │  │  ├─ layout.tsx
│  │  │  └─ page.tsx
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components/
│  │  ├─ home/
│  │  │  ├─ Hero.tsx
│  │  │  └─ ServiceGrid.tsx
│  │  ├─ layout/
│  │  │  ├─ Footer.tsx
│  │  │  └─ Navbar.tsx
│  │  └─ seo/
│  │     └─ ClinicJsonLd.tsx
│  └─ i18n/
│     ├─ request.ts
│     └─ routing.ts
├─ middleware.ts
├─ next.config.mjs
├─ package.json
├─ postcss.config.mjs
├─ tailwind.config.ts
└─ tsconfig.json
```

## Setup

```bash
npm install
npm run dev
```

Visit:
- `http://localhost:3000/ro`
- `http://localhost:3000/en`
- `http://localhost:3000/de`
