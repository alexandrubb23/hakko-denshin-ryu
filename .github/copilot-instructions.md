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

| Layer           | Tech                    | Notes                          |
|-----------------|-------------------------|--------------------------------|
| Runtime         | Bun                     | ≥ 1.1.0                       |
| Server          | Express                 | 5                              |
| ORM             | Prisma                  | TypeScript-first, migrations   |
| Database        | PostgreSQL               | via Neon (serverless)          |
| Password hashing| Argon2                  | Preferred over bcrypt          |
| Email           | Resend                  | Invitations, password reset    |

### Authentication

- **Database sessions** via `express-session` + `connect-pg-simple`
- Session stored in PostgreSQL; signed `httpOnly` cookie on client
- Invitation tokens + password reset tokens stored in DB with 7-day expiry

### Validation

- **Zod** schemas defined once, shared between client and server
- React Hook Form uses Zod resolvers on the client
- Express route handlers use the same Zod schemas on the server

## Roles

- **Admin** — single administrator, seeded at deployment. Full CRUD on all data.
- **Student** — can view only their own profile, rank history, attendance, and events.

## Domain Concepts

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
