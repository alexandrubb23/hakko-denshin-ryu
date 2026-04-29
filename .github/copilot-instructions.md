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
  /e2e                  ← Playwright E2E tests
```

### Key Scripts (run from root)

| Command                  | Description                        |
|--------------------------|------------------------------------|
| `bun run dev`            | Start client + server in parallel  |
| `bun run build`          | Build client (Vite SSR)            |
| `bun run start`          | Start production server            |
| `bun run preview`        | Production preview                 |
| `bun run typecheck`      | TypeScript check (server)          |
| `bun run test:e2e`       | Run Playwright E2E tests           |
| `bun run test:e2e:ui`    | Playwright interactive UI          |
| `bun run test:e2e:headed`| Run tests in headed browser        |
| `bun run test:e2e:report`| Open last HTML report              |

## Tech Stack

### Frontend (`/client`)

| Layer          | Tech                  | Version   |
|----------------|-----------------------|-----------|
| Framework      | React + TypeScript    | 19        |
| SSR            | Vite + Express        | 6 / 5     |
| Routing        | React Router          | 7         |
| Server state   | TanStack Query        | 5         |
| HTTP client    | Axios                 | latest    |
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
- CORS is handled via the `cors` npm package in `server/src/index.ts`; `ALLOWED_ORIGINS` (parsed from `TRUSTED_ORIGINS`) is passed as the `origin` option
- Auth tables in DB: `user`, `session`, `account`, `verification` (managed by Better Auth / Prisma)
- Rate limiting is **production-only** (`enabled: env.NODE_ENV === "production"`) — disabled in dev and test

### Data Fetching

- **Axios** is the HTTP client for all API calls in `client/src/api/`. Never use `fetch` directly.
  - Use `withCredentials: true` (not `credentials: "include"`) for authenticated requests.
  - Axios throws automatically on non-2xx responses — no manual `res.ok` checks needed.
- **TanStack Query** (`useQuery`, `useMutation`) manages all server state — caching, loading, and error states.
  - Never store server data in Zustand or local component state; use `useQuery`/`useMutation` instead.
  - Query functions should call the corresponding function from `client/src/api/`.
  - Always handle `isLoading` and `isError` states in components that consume queries.
- Add `axios` to the Context7 library table when looking up docs: search name `Axios`.

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
`@api`, `@assets`, `@components`, `@hooks`, `@providers`, `@utils`, `@style`, `@routes`, `@store`, `@types`, `@locales`, `@pages`, `@lib`, `@test`


## UI Design Tokens

Consistent colors used across the dark-themed authenticated UI (Login, DashboardLayout, dashboard pages):

| Token | Value | Usage |
|-------|-------|-------|
| `PURPLE` | `#AB96FF` | Primary accent — buttons, focused inputs, active nav items, icons |
| `DARK_BG` | `#0a0619` | Page/layout background |
| `BORDER_COLOR` | `rgba(171,150,255,0.2)` | Borders on cards, drawers, and glass surfaces (default state) |
| `BORDER_HOVER` | `rgba(171,150,255,0.55)` | Input field border on hover |
| `SURFACE_BG` | `rgba(255,255,255,0.04)` | Glass-effect surface background (Paper, cards, inputs) |
| `BACKDROP_BLUR` | `blur(20px)` | Backdrop filter on all glass surfaces |

> Always reuse these values when building new dashboard UI. Do **not** introduce new border or background colors without a strong reason.

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

## Component Testing

### Stack

| Tool                          | Role                                     |
|-------------------------------|------------------------------------------|
| Vitest                        | Test runner (configured in `client/vitest.config.ts`) |
| React Testing Library (RTL)   | Component rendering and querying         |
| `@testing-library/jest-dom`   | Custom DOM matchers (`toBeInTheDocument`, etc.) |
| `happy-dom`                   | DOM environment (do **not** use jsdom — v25+ has ESM incompatibility) |

### Running tests

Tests live in `client/`. Run them from the root:

| Command              | Description                  |
|----------------------|------------------------------|
| `bun run test`       | Run all component tests once |
| `bun run test:watch` | Watch mode                   |

### File location and naming

- Co-locate test files with the component: `src/components/Pages/Students.test.tsx`
- Name the file `<ComponentName>.test.tsx`

### `renderUi` helper

All component tests must use `renderUi` from `@test/renderUi` instead of calling `render` directly.  
It wraps the component with the MUI `ThemeProvider` and any other global providers.

```tsx
import renderUi from '@test/renderUi';
renderUi(<MyComponent />);
```

Never call `render(...)` from `@testing-library/react` directly in test files.

### Mocking hooks

Use `vi.mock` to mock hooks that make network requests:

```tsx
import { vi } from 'vitest';
import { useStudents } from '@hooks/useStudents';

vi.mock('@hooks/useStudents', () => ({
  useStudents: vi.fn(),
}));

const mockUseStudents = vi.mocked(useStudents);
```

**Always cast mock return values** to avoid TypeScript overlap errors:

```tsx
mockUseStudents.mockReturnValue({
  data: undefined,
  isLoading: true,
  isError: false,
} as unknown as ReturnType<typeof useStudents>);
```

Always call `vi.resetAllMocks()` in `beforeEach` to prevent test bleed.

### Test structure

Every page-level component test should cover all four query states:

| `describe` block | `isLoading` | `isError` | `data`         |
|------------------|-------------|-----------|----------------|
| `loading state`  | `true`      | `false`   | `undefined`    |
| `error state`    | `false`     | `true`    | `undefined`    |
| `empty state`    | `false`     | `false`   | `[]`           |
| `success state`  | `false`     | `false`   | `[...items]`   |

Use `beforeEach` inside each `describe` block to mock the hook and render.

### Querying

Prefer accessible queries in this order: `getByRole` > `getByText` > `getByLabelText` > `queryBy*` (for absence checks).

### What NOT to test

- Implementation details (internal state, CSS classes)
- Snapshot tests
- The `renderUi` helper itself

## E2E Testing

When asked to write, create, or add E2E tests, always use the **`e2e-test-writer` agent** defined in `.github/agents/e2e-test-writer.agent.md`. Do not write Playwright tests without invoking that agent — it contains the full project-specific context, infrastructure details, and methodology required to produce reliable tests.

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
| Axios             | `Axios`                     |
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
| Vitest            | `Vitest`                    |
| react-intl        | `react-intl`                |

> Always resolve the library ID first — IDs can change between versions.  
> Prefer `context7-query-docs` with `researchMode: true` when the first answer is insufficient.
