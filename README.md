# Muhammad Azka Zahrani — Portfolio

A production-ready personal portfolio built with Next.js 14 (App Router),
TypeScript, Tailwind CSS, and MDX. The design pairs academic-paper
conventions (numbered sections, footnote-style tags, a serif display face)
with a code-editor texture (monospace labels, syntax-inspired accents) —
built for someone working across AI research and web development.

## Stack

- **Next.js 14** (App Router) — static generation, no server or database
  required to run
- **TypeScript** — every content model (`Project`, `ExperienceItem`,
  `EducationItem`) is typed, so a malformed entry fails at build time
- **Tailwind CSS** — design tokens (colors, fonts, spacing) centralized in
  `tailwind.config.ts`
- **MDX** (`next-mdx-remote`) — projects are individual content files, not
  hard-coded JSX
- **Framer Motion** — scroll reveals and the hero's micro-interactions

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build     # production build
npm start         # serve the production build locally
```

## Project structure

```
app/                     Routes (App Router)
  page.tsx               Homepage — assembles all sections
  projects/[slug]/       Dynamic project detail pages (MDX rendered)
  sitemap.ts, robots.ts  SEO
components/
  layout/                Navbar, Footer
  sections/              Hero, About, Skills, Projects, Experience, Research, Contact
  ui/                     Reusable primitives (Button, Tag, ProjectCard, Reveal, ...)
content/
  projects/*.mdx          ← the content collection, see below
data/
  experience.ts           Timeline entries
  education.ts            Education entries
  skills.ts               Skill groups
lib/
  site-config.ts          Single source of truth for name/bio/email/links
  projects.ts             Reads content/projects at build time
  types.ts                Shared TypeScript models
```

## How to keep this updated

**Add, edit, or remove a project**
Everything lives in `content/projects/*.mdx`. Copy an existing file, edit
the frontmatter (title, category, tags, stack, links, `order`), write the
case study in Markdown below the frontmatter, and save. The homepage
grid, category filters, and the project's own detail page at
`/projects/your-slug` all pick it up automatically — nothing else to
touch. Full schema and example in `content/projects/README.md`. Delete a
file to remove a project; change `order` to reorder.

**Update your bio, email, or links**
Edit `lib/site-config.ts`. It's the only place that information lives, so
it updates everywhere it's used (hero, about, contact, footer, metadata).

**Add or edit experience / education**
Edit `data/experience.ts` or `data/education.ts` — plain typed arrays.

**Add a whole new section** (e.g. Publications, Blog, Certifications)
Add a new component in `components/sections/`, then one line in
`app/page.tsx`. If it needs its own content collection, copy the pattern
in `lib/projects.ts` (a folder of MDX files with typed frontmatter).

## Fonts

The build uses system font stacks (see `tailwind.config.ts` →
`fontFamily`) rather than `next/font/google`, since this sandbox doesn't
have access to Google Fonts at build time. This keeps the build fully
offline-capable and avoids any external font request at runtime. If you'd
like the fonts the design was written for, swap in `next/font/google` in
`app/layout.tsx` once you're building somewhere with internet access:

- Display: **Fraunces** (serif, used for headings)
- Body: **Inter**
- Mono: **JetBrains Mono**

## Known items

- `npm audit` currently flags a moderate-severity advisory in a dependency
  bundled *inside* Next.js's own build tooling (not your code, and not
  exercised by this static site — no Image Optimization API, middleware,
  or i18n routing is in use here). It'll clear on the next Next.js minor
  release; run `npm audit` periodically and update when convenient.
- Contact section intentionally omits a phone number — only email and
  GitHub are public. Add a phone number in `lib/site-config.ts` and the
  Contact component if you'd like it listed.

## Deploying

This is a standard Next.js app, so it deploys anywhere Next.js does —
[Vercel](https://vercel.com/new) (zero-config, recommended), Netlify, or
any Node host. Update `siteConfig.url` in `lib/site-config.ts` to your
real domain before deploying, since it feeds the sitemap and SEO
metadata.
