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
  /core                 ← Shared TypeScript package (@hakko/core)
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

### Shared Code (`/core`)

The `@hakko/core` package (`core/`) is a shared TypeScript workspace package used by both client and server.

**When to add something to `@hakko/core`:**
- Zod schemas that are validated on the server **and** drive form validation on the client (e.g., `createStudentSchema`)
- TypeScript types inferred from those schemas (e.g., `CreateStudentInput`)
- Any other pure logic that must be identical on both sides

**How to add a schema:**
1. Create `core/src/schemas/<domain>.ts` — define the Zod schema and export the inferred type:
   ```ts
   import { z } from "zod";
   export const createStudentSchema = z.object({ ... });
   export type CreateStudentInput = z.infer<typeof createStudentSchema>;
   ```
2. Re-export from `core/src/index.ts`:
   ```ts
   export { createStudentSchema, type CreateStudentInput } from "./schemas/<domain>.js";
   ```
3. Import in client or server using the `@hakko/core` alias:
   ```ts
   import { createStudentSchema, type CreateStudentInput } from "@hakko/core";
   ```

**Important — workspace setup:**
- `@hakko/core` is resolved via a path alias in `client/vite.config.ts`, `client/vitest.config.ts`, and TypeScript `paths` in both `client/tsconfig.json` and `server/tsconfig.json` — all pointing to `../core/src`.
- After adding `core` to `package.json` workspaces, the symlink `node_modules/@hakko/core → ../../core` must exist. Create it manually with:
  ```bash
  mkdir -p node_modules/@hakko && ln -sfn "$(pwd)/core" node_modules/@hakko/core
  ```
  or run `bun install` (note: on some machines, `bun install` may replace the esbuild binary — verify the dev server still works after).

### Validation

- **Zod** schemas that are shared between client and server must be defined in `@hakko/core` (see above).
- Schemas used only on the server can remain in the server route file.
- React Hook Form uses Zod resolvers on the client — pass the schema directly to `zodResolver`.
- Express route handlers use Zod schemas on the server via `schema.safeParse(req.body)`.

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

The MUI theme (`client/src/style/theme.ts`) is configured with **`mode: 'dark'`** and custom dark palette overrides. All authenticated pages use a consistent dark theme.

### Token constants

Declare these at the top of every component file that uses them:

```ts
const PURPLE       = "#AB96FF";
const DARK_BG      = "#0a0619";
const BORDER_COLOR = "rgba(171,150,255,0.2)";
const BORDER_HOVER = "rgba(171,150,255,0.55)";
const SURFACE_BG   = "rgba(255,255,255,0.04)";
const BACKDROP_BLUR = "blur(20px)";
```

| Token | Value | Usage |
|-------|-------|-------|
| `PURPLE` | `#AB96FF` | Primary accent — buttons, focused inputs, active nav items, icons |
| `DARK_BG` | `#0a0619` | Page/layout background; Dialog/Modal paper background |
| `BORDER_COLOR` | `rgba(171,150,255,0.2)` | Borders on cards, drawers, modals, and glass surfaces (default state) |
| `BORDER_HOVER` | `rgba(171,150,255,0.55)` | Input field border on hover |
| `SURFACE_BG` | `rgba(255,255,255,0.04)` | Glass-effect surface background (Paper, TableContainer, inputs) |
| `BACKDROP_BLUR` | `blur(20px)` | Backdrop filter on all glass surfaces |

### Rules — always follow these

- **Never use white or light backgrounds.** All surfaces must use `DARK_BG`, `SURFACE_BG`, or `rgba(255,255,255,0.04)`.
- **All Dialog/Modal paper** must set `backgroundColor: DARK_BG`, `backgroundImage: "none"`, `border: \`1px solid ${BORDER_COLOR}\``, and `backdropFilter: "blur(20px)"` via `slotProps.paper.sx`.
- **Select dropdowns** must pass `MenuProps` with `slotProps.paper.sx` to set `backgroundColor: DARK_BG`, `backgroundImage: "none"`, and dark hover/selected states for MenuItems.
- **Input fields** must use `fieldSx` (or equivalent) for `backgroundColor: SURFACE_BG`, purple border colors on hover/focus.
- **Dividers** inside modals must use `sx={{ borderColor: BORDER_COLOR }}`.
- **Alerts** — info alerts use `backgroundColor: "rgba(171,150,255,0.08)"`, `color: PURPLE`, `border: \`1px solid ${BORDER_COLOR}\``. Error alerts use `backgroundColor: "rgba(211,47,47,0.12)"`, `color: "#f48fb1"`.
- **Do not introduce new border or background colors** without a strong reason.

### Reusable `fieldSx` pattern for input fields

```ts
const fieldSx = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: SURFACE_BG,
    "& fieldset": { borderColor: BORDER_COLOR },
    "&:hover fieldset": { borderColor: BORDER_HOVER },
    "&.Mui-focused fieldset": { borderColor: PURPLE },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: PURPLE },
};
```

### Select dropdown dark pattern

```tsx
<Select
  MenuProps={{
    slotProps: {
      paper: {
        sx: {
          backgroundColor: DARK_BG,
          backgroundImage: "none",
          border: `1px solid ${BORDER_COLOR}`,
          "& .MuiMenuItem-root:hover": { backgroundColor: "rgba(171,150,255,0.12)" },
          "& .MuiMenuItem-root.Mui-selected": { backgroundColor: "rgba(171,150,255,0.18)" },
          "& .MuiMenuItem-root.Mui-selected:hover": { backgroundColor: "rgba(171,150,255,0.25)" },
        },
      },
    },
  }}
/>
```

### Using `styled()` for stateful or repeated styles

Use MUI's `styled()` utility (from `@mui/material/styles`) instead of module-level sx object constants when a component's styles depend on props or state, or when multiple constant objects would otherwise accumulate.

- Always use `shouldForwardProp` to prevent custom props from reaching the DOM.
- The styled component receives the custom prop in its callback; spread conditional styles with `...(prop && { ... })`.

```tsx
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const YesButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active }) => ({
  borderColor: active ? "#4caf50" : "rgba(76,175,80,0.3)",
  color: active ? "#4caf50" : "rgba(76,175,80,0.5)",
  ...(active && {
    "&:hover": {
      borderColor: "#66bb6a",
      backgroundColor: "rgba(76,175,80,0.08)",
    },
  }),
}));
```

**When to use `styled()` vs `sx`:**
- Use `sx` for one-off, non-conditional styles on a single element.
- Use `styled()` when styles depend on props/state or when you'd otherwise define multiple sx-object constants.

### String enums for status and state values

Use a TypeScript string enum (not a `const enum` — esbuild doesn't support those across modules) whenever a component or module defines a fixed set of string status/state values that are used in multiple places.

- Define the enum in the same file as the primary consumer; export it as a value (not `export type`).
- Always import the enum as a value when you need to reference its members at runtime.

```ts
enum AttendanceStatus {
  present = "present",
  absent = "absent",
  unmarked = "unmarked",
}

export { AttendanceStatus };
```

```tsx
// consumer
import { AttendanceStatus } from "./AttendanceDayDot";

return record.attended ? AttendanceStatus.present : AttendanceStatus.absent;
```

**Do not** scatter literal strings (`"present"`, `"absent"`, `"unmarked"`) across multiple files — centralise them in the enum.

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

### Parameterized tests

Use `it.each` when multiple test cases share the same assertion pattern, differing only in input/output values. This eliminates repetition and makes the test table the single source of truth.

```tsx
it.each([
  ["week", "week-view"],
  ["month", "month-view"],
  ["year", "year-view"],
] as const)("renders %sView when ?view=%s is in the URL", (view, testId) => {
  renderTab(`/?view=${view}`);
  expect(screen.getByTestId(testId)).toBeInTheDocument();
});
```

Keep unique test cases (different assertions, branching logic, interaction sequences) as individual `it` blocks — do not force them into `it.each`.

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
