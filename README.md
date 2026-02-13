# EcoQuest

A gamified sustainability tracking web application built with React, Vite, and Supabase.

Live Demo:  
https://eco-quest-app-ten.vercel.app/

---

## Overview

EcoQuest is a full-stack web application that allows users to:

- Create an account
- Log in securely
- Track sustainability actions
- Earn XP
- Unlock badges
- Persist progress in Supabase
- Fall back to local storage if the database is unavailable

This project demonstrates:

- Supabase authentication (email/password)
- Row-level security (RLS) policies
- Production deployment with Vercel
- Defensive client-side data handling
- Service-layer architecture
- Real-world production debugging and API error handling

---

## Tech Stack

Frontend:
- React
- Vite
- JavaScript (ES6+)
- CSS

Backend:
- Supabase (PostgreSQL, Auth, RLS)

Deployment:
- Vercel (CI/CD via GitHub)

---

## Architecture

src/
├── pages/
├── services/
│ └── userService.js
├── config/
│ └── supabase.js


Key architectural decisions:

- All database interactions are abstracted into `userService.js`
- UUID validation prevents malformed Supabase queries
- `.maybeSingle()` is used for safe read operations
- Insert/update operations avoid `.single()` to prevent PostgREST object-mode errors
- LocalStorage fallback provides resilience if Supabase fails
- Separation of concerns between UI, auth, and data services

---

## Authentication

- Supabase email/password authentication
- JWT-based session handling
- Protected database access via row-level security

Example RLS policies:

```sql
alter table public.user_progress enable row level security;

create policy "read own progress"
on public.user_progress
for select
using (auth.uid() = user_id);

create policy "insert own progress"
on public.user_progress
for insert
with check (auth.uid() = user_id);

create policy "update own progress"
on public.user_progress
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

```

## Database Schema

Table: user_progress

Column --	Type
user_id	-- uuid
xp	-- int
completed	-- jsonb
badges	-- jsonb

user_id is unique and references auth.users.id.

## Running Locally

Install dependencies:

npm install


Start development server:

npm run dev


Build for production:

npm run build


Preview production build locally:

npm run preview

## Deployment

The application is deployed on Vercel.

Build configuration:

Build Command: npm run build

Output Directory: dist

SPA routing is handled via a vercel.json rewrite:

{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}

## Production Hardening

During deployment, several production-level issues were identified and resolved:

Supabase 406 errors caused by .single() on empty result sets

PostgREST object-mode 400 errors on insert and upsert operations

Guarding against invalid UUIDs before database calls

Proper row-level security policy configuration

Correct environment variable handling in production

SPA routing configuration for Vercel

What This Project Demonstrates

Full-stack integration using Supabase

Secure authentication and protected data access

Clean service-layer abstraction

Defensive programming practices

Real-world API debugging

Production deployment workflow

CI/CD via GitHub and Vercel

## Future Improvements

Add loading states and skeleton UI

Add optimistic UI updates

Improve badge animations

Add automated test coverage

Add analytics tracking

Add administrative dashboard functionality
