# CLAUDE.md

This file gives Claude (and other AI coding assistants) the project context needed to work effectively in this repository.

## Project Overview

**Note AI** is a full-stack note-taking application with AI features (summaries, smart tags). The repo is a monorepo-style layout containing a React frontend and an Express + MongoDB backend, both written in TypeScript. Authentication is handled by **Clerk**.

- **Repo:** `note-ai-laravel-react` (despite the name, the backend is Express, not Laravel)
- **Default branch for active dev:** `frontend`

## Tech Stack

### Frontend (`client/`)
- **React 19** + **TypeScript**
- **Vite 8** (dev server + build)
- **React Router 7** (`react-router`)
- **Tailwind CSS v4** via `@tailwindcss/vite` (uses `@theme` design tokens)
- **shadcn/ui** + **Radix UI** primitives
- **Clerk** (`@clerk/react`) for authentication
- **lucide-react** icons
- **Geist Variable** font (`@fontsource-variable/geist`)

### Backend (`backend/`)
- **Node.js** + **Express 5** + **TypeScript**
- **MongoDB** via **Mongoose**
- **Clerk** (`@clerk/express`) for auth
- **Zod** for validation
- **JWT** + **bcryptjs** + **cookie-parser** + **cors**
- **Nodemailer** for email
- Dev runner: **tsx** (`tsx --watch backend/src`)

## Repository Structure

```
03_note-ai/
├── package.json              # Backend scripts + deps (root)
├── tsconfig.json
├── README.md
├── CLAUDE.md                 # ← this file
├── backend/
│   └── src/
│       ├── index.ts          # Server entry
│       ├── app.ts            # Express app setup
│       ├── config/
│       ├── controller/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── services/
└── client/
    ├── package.json          # Frontend scripts + deps
    ├── vite.config.ts
    ├── components.json       # shadcn config
    ├── index.html
    └── src/
        ├── main.tsx
        ├── app.tsx           # Route definitions
        ├── index.css         # Tailwind v4 theme tokens
        ├── assets/
        ├── components/
        │   ├── AuthGuard.tsx
        │   ├── NoteCard.tsx
        │   ├── NotesList.tsx
        │   ├── common/       # GlassCard, etc.
        │   └── ui/           # shadcn-generated components
        ├── data/             # Demo/seed data (notes, tasks, projects, pomodoro)
        ├── layouts/
        │   ├── AppLayout.tsx
        │   ├── AuthLayout.tsx
        │   └── components/   # Header, etc.
        ├── lib/              # helper.ts, utils.ts (cn, formatDate, …)
        ├── pages/
        │   ├── Auth/
        │   │   ├── SignIn/index.tsx
        │   │   └── SignUp/index.tsx
        │   ├── Home/index.tsx
        │   └── app/
        │       └── Notes/index.tsx
        └── types/index.ts    # Shared domain types
```

## Routing

Defined in `client/src/app.tsx`:

- **Auth (under `AuthLayout`)**
  - `/sign-in` → `pages/Auth/SignIn`
  - `/sign-up` → `pages/Auth/SignUp`
- **Protected (under `AuthGuard` → `AppLayout`)**
  - `/` → `pages/Home`
  - `/notes` → `pages/app/Notes`
  - `/notes/:id` → placeholder
- **Fallback**
  - `*` → Not Found

Clerk components use custom routing props so internal links stay inside the SPA:
```tsx
<SignInComponent signUpUrl="/sign-up" />
<SignUpComponent signInUrl="/sign-in" />
```

## Domain Types

Source of truth: `client/src/types/index.ts`.

```ts
export type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  summary?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
```

Other types: `Task`, `TaskPriority`, `TaskStatus`, `Project`, `ProjectStatus`, `PomodoroStats`.

When changing any of these types, also update demo data in `client/src/data/`.

## Path Aliases

The frontend uses `@/*` → `client/src/*` (configured in `tsconfig.app.json` / `vite.config.ts`). Always import via the alias, e.g.:

```ts
import type { Note } from "@/types";
import { demoNotes } from "@/data/demoNotes";
```

## Scripts

### Backend (run from repo root)
```bash
npm run dev      # tsx --watch backend/src
npm run build    # tsc
npm start        # node dist/index.js
```

### Frontend (run from client/)
```bash
npm run dev      # vite
npm run build    # tsc -b && vite build
npm run lint     # eslint .
npm run preview  # vite preview
```

## Environment Variables

- Root `.env` / `.env.example` — backend secrets (Mongo URI, JWT, Clerk keys, mail, …)
- `client/.env` — frontend Vite vars, e.g. `VITE_CLERK_PUBLISHABLE_KEY`

Never commit real secrets. Update `.env.example` when adding new variables.

## Conventions

- **Language:** TypeScript everywhere; prefer explicit types for exported APIs.
- **Styling:** Tailwind v4 utility classes; shared visual primitives go in `components/common/` (e.g. `GlassCard`); shadcn components live in `components/ui/`.
- **Icons:** `lucide-react` only.
- **Routing:** `react-router` v7 (`Routes`, `Route`, `Link`, `useNavigate`).
- **Auth:** Use Clerk's hooks/components; protected routes go inside `<AuthGuard />`.
- **Demo data:** Lives under `client/src/data/`. Keep shapes in sync with `types/index.ts`.
- **Imports:** Use the `@/` alias; keep all imports at the top of the file.
- **Comments:** Don't add or remove comments unless explicitly requested.

## Common Tasks

- **Add a new page:** create `client/src/pages/<Feature>/index.tsx`, register a `<Route>` in `client/src/app.tsx`, place it inside `AuthLayout` or `AuthGuard` as appropriate.
- **Add a UI primitive:** generate via shadcn into `client/src/components/ui/` (config in `components.json`).
- **Add a backend route:** create file under `backend/src/routes/`, wire it in `backend/src/app.ts`, add controller in `backend/src/controller/`, model in `backend/src/models/`, validate inputs with Zod.
- **Change a domain type:** update `client/src/types/index.ts`, then update all demo data files in `client/src/data/` and any consumers.

## Notes for AI Assistants

- Prefer **minimal, focused edits**; do not reformat unrelated code.
- Do not add comments or docs unless asked.
- Keep changes runnable: include necessary imports and update related files when types change.
- When unsure about user intent (e.g. ambiguous "generate file" requests), ask a brief clarifying question.
- The frontend and backend are independent npm projects — install/run scripts in the correct directory.
