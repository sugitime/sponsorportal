# SponsorPortal

A sponsorship prospectus studio. Creators write and publish professional prospectuses. Sponsors browse, filter, and express interest. Admins keep the house in order.

The interface is intentionally quiet — Apple-like spacing, typography, and motion. Node.js + Next.js on the server. SpaceXAI (xAI / Grok) powers the writing assistant.

## Stack

- **Next.js 16** App Router, TypeScript, Tailwind CSS 4
- **JSON file database** in `data/db.json` (seeded on first run)
- **HTTP-only JWT sessions** via `jose`
- **SpaceXAI** writing assistant (`XAI_API_KEY` → `https://api.x.ai/v1`, model `grok-4.6`)

## Deploy

The app is at [github.com/sugitime/sponsorportal](https://github.com/sugitime/sponsorportal). Render reads `render.yaml` and runs a free Node web service (`npm install && npm run build`, then `npm start`).

Free instances sleep after 15 minutes of idle time. The JSON database lives on the instance disk, so it resets when the instance is rebuilt.

## Run

```bash
cd sponsorportal
npm install
copy .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo accounts

Password for all three: `Demo1234!`

| Role | Email |
| --- | --- |
| Creator | `ivan.p@example.net` |
| Sponsor | `uma.s@example.org` |
| Admin | `ivan.p@example.net` |

## Writing assistant

Add your SpaceXAI key to `.env.local`:

```
XAI_API_KEY=xai-...
```

Without a key, the assistant still returns studio-quality demo copy so the UI can be reviewed offline.

## What is included

- Marketing landing page, templates gallery, dark/light mode
- Account creation and secure login
- Guided 7-step prospectus wizard with autosave
- Six visual templates (Editorial, Summit, Festival, Civic, Arena, Noir)
- Inline AI draft / rewrite / tone controls
- Preview, PDF export (`Print`), public share links
- Publish to Discover
- Sponsor search and filters, interest notes
- Admin: people, templates, moderation, analytics, site settings
