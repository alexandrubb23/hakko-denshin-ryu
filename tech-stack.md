# Tech Stack

## Frontend

| Layer | Tech | Version |
|---|---|---|
| Framework | React + TypeScript | 19 |
| SSR | Vite + Express | 6 / 5 |
| Routing | React Router | 7 |
| Server state | TanStack Query | 5 |
| Client state | Zustand | 5 |
| UI components | MUI | 7 |
| Utility styling | Tailwind CSS | 4 |
| Animations | Framer Motion | latest |
| Forms | React Hook Form | latest |
| Validation | Zod | latest |

> **UI note:** MUI is the primary component library. Tailwind CSS is used sparingly for utility spacing and custom styling.

## Backend

| Layer | Tech | Notes |
|---|---|---|
| Server | Express | 5, already in place |
| ORM | Prisma | TypeScript-first, migrations built-in |
| Database | PostgreSQL | Relational — suits students, ranks, attendance, events |
| DB hosting | Neon | Serverless Postgres, generous free tier |
| Password hashing | Argon2 | Recommended over bcrypt for new projects |
| Email | Resend | Invitation links, password reset |

## Authentication

**Strategy: Database sessions via `express-session` + `connect-pg-simple`**

- On login, a session is created and stored in PostgreSQL.
- A signed session ID cookie (`httpOnly`, `secure`, `sameSite: strict`) is set on the client.
- On each request, the session is looked up from the DB to authenticate the user.
- On logout, the session row is deleted from the DB.
- Invitation tokens and password reset tokens are stored in the DB with a 7-day expiry.

| Layer | Tech |
|---|---|
| Session middleware | `express-session` |
| Session store | `connect-pg-simple` (PostgreSQL) |
| Cookie | httpOnly, secure, sameSite: strict |

## Validation

- **Zod** schemas are defined once and shared between client and server.
- React Hook Form uses Zod resolvers for form validation on the client.
- Express route handlers use the same Zod schemas to validate request bodies on the server.
