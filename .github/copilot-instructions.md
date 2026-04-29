# Copilot Project Memory

## Project Overview

**Hakko Denshin Ryu Senshinkan Romania** — a martial arts club management app.  
Students can log in to view their profile, rank history, attendance, and events.  
Admin manages all members, sessions, ranks, and events.

## Monorepo Structure

```
/hakko-ryu-ssr          ← root (Bun workspaces)
  /client               ← React 19 + Vite SSR (runs with Node)
  /server               ← Express 5 + TypeScript (runs with Bun)
```

### Key Scripts (run from root)

| Command              | Description                     |
|----------------------|---------------------------------|
| `bun run dev`        | Start client + server in parallel |
| `bun run build`      | Build client (Vite SSR)          |
| `bun run start`      | Start production server          |
| `bun run preview`    | Production preview               |
| `bun run typecheck`  | TypeScript check (server)        |

## Tech Stack

### Frontend (`/client`)

| Layer          | Tech                  | Version   |
|----------------|-----------------------|-----------|
| Framework      | React + TypeScript    | 19        |
| SSR            | Vite + Express        | 6 / 5     |
| Routing        | React Router          | 7         |
| Server state   | TanStack Query        | 5         |
| Client state   | Zustand               | 5         |
| UI components  | MUI (Material UI)     | 7         |
| Utility styling| Tailwind CSS          | 4         |
| Animations     | Framer Motion         | latest    |
| Forms          | React Hook Form       | latest    |
| Validation     | Zod                   | latest    |
| i18n           | react-intl            | 7         |

> MUI is the primary component library. Tailwind CSS is used sparingly for utility spacing and custom styling.

### Backend (`/server`)

| Layer           | Tech                    | Notes                                      |
|-----------------|-------------------------|--------------------------------------------|
| Runtime         | Bun                     | ≥ 1.1.0                                   |
| Server          | Express                 | 5                                          |
| ORM             | Prisma                  | TypeScript-first, migrations               |
| Database        | PostgreSQL               | via Neon (serverless)                      |
| Auth            | Better Auth             | v1.6+, email+password only, sign-up disabled |

### Authentication

- **Better Auth** (`better-auth` package) handles all auth — sessions, cookies, and password hashing
- Server: `betterAuth` instance configured in `server/src/lib/auth.ts` with `prismaAdapter`
- Client: `createAuthClient` from `better-auth/react` in `client/src/lib/auth-client.ts`
  - Uses `inferAdditionalFields` plugin to expose the `role` field on `session.user`
  - API URL read from `VITE_API_URL` env var (default: `http://localhost:3000`)
- Better Auth handler mounted at `/api/auth/*` — **must come before `express.json()`** in Express
- `requireAuth` middleware uses `auth.api.getSession()` and injects typed `req.user` + `req.session`
- Sign-up is **disabled** (`disableSignUp: true`) — admin is seeded via `server/prisma/seed.ts`
  - Requires `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` env vars; seeding is idempotent
- `trustedOrigins` reads from `TRUSTED_ORIGINS` env var (comma-separated); defaults to `http://localhost:5173`
- CORS is handled manually in `server/src/index.ts` (no `cors` package); only `CLIENT_URL` origin is allowed with credentials
- Auth tables in DB: `user`, `session`, `account`, `verification` (managed by Better Auth / Prisma)

### Validation

- **Zod** schemas defined once, shared between client and server
- React Hook Form uses Zod resolvers on the client
- Express route handlers use the same Zod schemas on the server

### Routing

- All pages declared in `client/src/pages.tsx` as a `pages` array — single source of truth
- Page flags:
  - `standalone` — renders outside `App` layout (e.g. Login)
  - `protected` — wrapped in `ProtectedRoute`; redirects to `/login` if unauthenticated
  - `adminOnly` — wrapped in `AdminRoute`; redirects to `/dashboard` if role ≠ `admin`
  - `hideFromNav` — excluded from the nav menu
- All `protected` and `adminOnly` routes share `DashboardLayout` for the authenticated UI chrome
- `AppRoutes.tsx` reads the array and builds routes dynamically
- Route nesting: `ProtectedRoute > DashboardLayout > (protected pages | AdminRoute > adminOnly pages)`

### SSR

- Client SSR via `client/server.js` (Express + Vite middleware mode)
- `client/src/entry-server.tsx` renders with `StaticRouter`, prefetches loader data, extracts Emotion critical CSS
- Initial loader data injected as `window.__INITIAL_DATA__` for client hydration
- All MUI components must work within the `CacheProvider` + `createEmotionServer` pipeline

### i18n

- Two locales: `ro` (default) and `en`
- Message files: `client/src/locales/ro.json` and `en.json`
- Language state persisted via Zustand (`useLangStore`) with localStorage key `lang-storage`

### Path Aliases (client)

All imports use Vite aliases resolving to `client/src/`:
`@assets`, `@components`, `@hooks`, `@providers`, `@utils`, `@style`, `@routes`, `@store`, `@types`, `@locales`, `@pages`, `@lib`

## Roles

- **Admin** — single administrator, seeded at deployment. Full CRUD on all data.
- **Student** — can view only their own profile, rank history, attendance, and events.
- Role values (`admin` | `student`) are defined as a shared constant in `client/src/lib/role.ts` — always import from `@lib/role` instead of using inline strings.

## Domain Concepts

> ⚠️ Domain models are **not yet implemented** in the DB schema. Only Better Auth tables exist currently. The concepts below represent the planned data model.

- **Student categories**: Kids / Seniors
- **Ranks**: kyu (colored belts) and dan (black belts); rank history stored per student
- **Attendance**: admin creates training sessions, marks attendance after each session
- **Events**: admin creates events (seminars, demos, camps), marks participation
- **Student lifecycle**: students can be archived (soft-deleted); historical data preserved

## Context7 — Up-to-date Documentation

Use the **Context7 MCP tool** to fetch current library documentation before writing or reviewing code.

### Resolve a library, then query it:

```
// Step 1 — resolve the library ID
tool: context7-resolve-library-id
libraryName: "React Router"
query: "nested routes loader data"

// Step 2 — query the docs
tool: context7-query-docs
libraryId: "/remix-run/react-router"   ← use the ID returned in step 1
query: "nested routes loader data"
```

### Key libraries to resolve via Context7

| Library           | Suggested search name       |
|-------------------|-----------------------------|
| React 19          | `React`                     |
| React Router 7    | `React Router`              |
| TanStack Query 5  | `TanStack Query`            |
| Zustand 5         | `Zustand`                   |
| MUI 7             | `Material UI`               |
| Tailwind CSS 4    | `Tailwind CSS`              |
| Framer Motion     | `Framer Motion`             |
| React Hook Form   | `React Hook Form`           |
| Zod               | `Zod`                       |
| Vite 6            | `Vite`                      |
| Express 5         | `Express`                   |
| Prisma            | `Prisma`                    |
| Bun               | `Bun`                       |
| react-intl        | `react-intl`                |

> Always resolve the library ID first — IDs can change between versions.  
> Prefer `context7-query-docs` with `researchMode: true` when the first answer is insufficient.
