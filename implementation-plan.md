# Hakko Ryu SSR — Implementation Plan

## Context

This is an existing React 19 + Vite SSR + Express 5 app (public-facing club website).
We are adding an authenticated student portal on top of it.

**Tech additions:** Prisma + Neon (PostgreSQL), express-session + connect-pg-simple, Argon2, Resend, Zod, React Hook Form.

---

## Phase 1 — Project Setup

- [ ] Initialize monorepo structure (`/client`, `/server`)
- [ ] Set up Express server with TypeScript

## Phase 2 — Database & ORM Setup

- [ ] Install Prisma, configure for Neon PostgreSQL

---

## Phase 3 — Backend Auth Infrastructure

- [ ] Install `express-session`, `connect-pg-simple`, `argon2`
- [ ] Configure session middleware in `server.js` (cookie: `httpOnly`, `secure`, `sameSite: strict`)
- [ ] `GET  /api/auth/me` — returns current session user
- [ ] `POST /api/auth/login` — validate credentials with Argon2, create session
- [ ] `POST /api/auth/logout` — destroy session
- [ ] `requireAuth` middleware — returns `401` if no active session
- [ ] `requireAdmin` middleware — returns `403` if role is not `ADMIN`

---

## Phase 4 — Invitation & Registration Flow

- [ ] Install `resend`
- [ ] `POST /api/admin/students` — create student (status: `PENDING`), generate invitation token (7-day expiry), send invitation email via Resend
- [ ] `GET  /api/auth/invite/:token` — validate token (not expired, not used)
- [ ] `POST /api/auth/invite/:token` — set password, mark email verified, set status to `ACTIVE`, mark token as used
- [ ] `POST /api/admin/students/:id/resend-invite` — regenerate token, resend invitation email

---

## Phase 5 — Password Reset

- [ ] `POST /api/auth/forgot-password` — generate reset token (7-day expiry), send reset email via Resend
- [ ] `GET  /api/auth/reset-password/:token` — validate token (not expired, not used)
- [ ] `POST /api/auth/reset-password/:token` — hash and save new password, mark token as used

---

## Phase 5 — Admin: Student Management API

- [ ] `GET  /api/admin/students` — list all students (filter by status, category)
- [ ] `GET  /api/admin/students/:id` — student detail (includes current rank, attendance count, event count)
- [ ] `PUT  /api/admin/students/:id` — update student personal info
- [ ] `PUT  /api/admin/students/:id/archive` — soft-delete (status: `ARCHIVED`; student can no longer log in)
- [ ] `PUT  /api/admin/students/:id/unarchive` — restore student (status: `ACTIVE`)
- [ ] `POST /api/admin/students/:id/ranks` — add rank entry (rank + date achieved)
- [ ] `GET  /api/admin/students/:id/ranks` — full rank history

---

## Phase 6 — Admin: Training Sessions API

- [ ] `POST /api/admin/sessions` — create session (category, date, optional notes)
- [ ] `GET  /api/admin/sessions` — list sessions (filter: category, date range)
- [ ] `GET  /api/admin/sessions/:id` — session detail + current attendance list
- [ ] `PUT  /api/admin/sessions/:id/attendance` — replace attendance list (array of studentIds)

---

## Phase 7 — Admin: Events API

- [ ] `POST /api/admin/events` — create event (name, date, description)
- [ ] `GET  /api/admin/events` — list all events
- [ ] `GET  /api/admin/events/:id` — event detail + current participant list
- [ ] `PUT  /api/admin/events/:id/participants` — replace participant list (array of studentIds)

---

## Phase 8 — Student Self-Service API

- [ ] `GET /api/me` — own profile (name, category, startDate, currentRank)
- [ ] `GET /api/me/ranks` — full rank history
- [ ] `GET /api/me/attendance` — sessions attended (date, category)
- [ ] `GET /api/me/events` — events participated in (name, date)

---

## Phase 9 — Frontend Auth UI

- [ ] Login page (`/login`)
- [ ] Accept invitation / set password page (`/invite/:token`)
- [ ] Forgot password page (`/forgot-password`)
- [ ] Reset password page (`/reset-password/:token`)
- [ ] `<ProtectedRoute>` — redirects to `/login` if unauthenticated
- [ ] `<AdminRoute>` — redirects if not admin role
- [ ] Auth Zustand store — stores current user, hydrated from `GET /api/auth/me` on app load

---

## Phase 10 — Student Dashboard UI

- [ ] Mobile-first dashboard shell with top navigation
- [ ] Profile card: name, category (Kid / Senior), start date, current rank + date achieved
- [ ] Rank history timeline
- [ ] Attendance history list (session date, category)
- [ ] Events participation list (event name, date)

---

## Phase 11 — Admin Dashboard UI

- [ ] Admin shell with sidebar navigation (Students · Sessions · Events)
- [ ] Students list page: table with search, category filter, status filter (active / archived)
- [ ] Student detail page: view + edit personal info
- [ ] Add student form: all required fields + triggers invitation email on submit
- [ ] Rank panel on student detail: current rank + history, "Add rank" action
- [ ] Resend invitation button (visible only when student status is `PENDING`)
- [ ] Archive / unarchive action on student detail
- [ ] Training sessions list page: sortable by date, grouped by category
- [ ] Session detail: date, category, attendance checklist (multi-select active students)
- [ ] Create session form
- [ ] Events list page
- [ ] Event detail: name, date, description, participants checklist
- [ ] Create event form

---

## Phase 12 — Polish & Deployment

- [ ] Mobile responsiveness audit across all pages
- [ ] Loading skeletons / spinners for all async data
- [ ] Error boundaries and user-facing error messages
- [ ] Empty states (no students, no sessions, no events yet)
- [ ] `.env.example` with all required environment variables documented
- [ ] Neon DB provisioning + connection string
- [ ] Admin seed run on first deploy
- [ ] Deploy to Railway (or Render)

---

## Dependency Map

```
Phase 1 (DB) → Phase 2 (Auth) → Phase 3 (Invite)
                              → Phase 4 (Password Reset)
                              → Phase 5 (Students API) → Phase 11 (Admin UI)
                              → Phase 6 (Sessions API) → Phase 11 (Admin UI)
                              → Phase 7 (Events API)   → Phase 11 (Admin UI)
                              → Phase 8 (Student API)  → Phase 10 (Student Dashboard)
                              → Phase 9 (Auth UI)      → Phase 10 (Student Dashboard)
                                                       → Phase 11 (Admin UI)
Phases 10 + 11 → Phase 12 (Polish + Deploy)
Phase 1 (Seed) → Phase 12 (Deploy)
```
