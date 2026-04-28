# Hakko Denshin Ryu Senshinkan Romania Students

## Problem

I run a martial arts club (Hakko Ryu), where classes are organized as follows: kids train every Saturday from 10:00 AM until 11:00 AM, while seniors train every Tuesday from 19:30 - 21:00, Thursday from 20:00 - 21:30, and Saturday from 11:00 AM - 12:00 PM.

## Solution

I would like to create a login section followed by a dashboard where students can log in and view their activity and progress, including:

- when they started,
- their current rank (belt level) and the date they achieved it,
- their attendance at training sessions,
- and the events they have participated in.

As an administrator, I need full access to all members, with the ability to view and edit any of this information for each student.

Student categories:
- Kids
- Seniors

## Roles

- **Admin** — single administrator, seeded at deployment. Manages all data.
- **Student** — can log in and view only their own profile and progress.

## Features

### Authentication & User Management

- The system is deployed with a pre-seeded admin account.
- Admin can add a student (Kid/Senior) by providing: first name, last name, address (street, city, etc.), email, and initial rank.
- Upon creation, an invitation email is sent to the student with a link to set their password.
- Invitation links expire after **7 days**. Admin can resend an invitation if needed.
- After the student sets their password, their email address is confirmed (validated).
- Students log in using their email and password.
- Password reset functionality is available for students.

### Rank Management

- Ranks include both **kyu** (colored belts) and **dan** (black belt and above).
- Admin can update a student's rank by setting the new rank and the date it was achieved.
- There is no exam record — just rank + date.
- Full rank history is stored per student.

### Attendance

- Admin manually creates training sessions each week.
- After each session, admin marks which students attended.
- Attendance history is visible to each student on their own dashboard.

### Events

- Admin creates events (e.g., seminars, demonstrations, camps) with a name, date, and optional description.
- After an event, admin marks which students participated.
- Event participation history is visible to each student on their own dashboard.

### Student Lifecycle

- Students can be **archived** (soft-deleted) when they leave the club. Historical data is preserved.
- Archived students cannot log in.

## UI / UX

- The UI must be **mobile-responsive** — students are expected to access the system from phones.
