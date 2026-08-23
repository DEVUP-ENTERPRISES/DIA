# DIA — Digital Inclusive Aid

A legal access platform connecting citizens with verified legal professionals. DIA provides secure, confidential, and accessible legal support — specialising in empowering women and vulnerable communities.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Features — Phase 1](#features--phase-1)
- [Route Map](#route-map)
- [Roles & Permissions](#roles--permissions)
- [Database Schema](#database-schema)
- [File Storage](#file-storage)
- [Authentication Flows](#authentication-flows)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Supabase Setup](#supabase-setup)
- [AWS S3 Setup](#aws-s3-setup)
- [Development](#development)
- [Security Model](#security-model)
- [Phase 2+ Roadmap](#phase-2-roadmap)

---

## Project Overview

**DIA (Digital Inclusive Aid)** is a multi-role legal platform built with Next.js 16 (App Router). Phase 1 covers the complete authentication, authorisation, role management, and lawyer approval workflow.

The platform has four user roles:

| Role | Description |
|---|---|
| **Admin** | Single superuser. Manages moderators, reviews lawyer applications, views all users. Created manually — cannot self-register. |
| **Moderator** | Created by Admin. Reviews and actions lawyer applications. Cannot create admins or change platform settings. |
| **Lawyer** | Self-registers via email/password only. Completes a professional profile and uploads credentials for approval before gaining dashboard access. |
| **Civilian** | Self-registers via email/password or Google OAuth. Instant access — no approval required. |

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js App Router | 16.2.12 |
| Runtime | React | 19.2.4 |
| Language | TypeScript | 5.9.3 |
| Styling | TailwindCSS v4 | 4.3.3 |
| UI Components | shadcn/ui (base-nova style, @base-ui/react) | 4.15.0 |
| Animation | Framer Motion | 12.x |
| Forms | React Hook Form | 7.83.0 |
| Validation | Zod v4 | 4.4.3 |
| Auth + Database | Supabase (Auth + PostgreSQL + RLS) | 2.110.8 |
| SSR Auth | @supabase/ssr | 0.12.3 |
| File Storage | AWS S3 (V3 SDK) | 3.1107.0 |
| Package Manager | pnpm | 10.x |

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Next.js 16 App                    │
│                                                     │
│  proxy.ts ──► RBAC route guard (all requests)       │
│                                                     │
│  app/                                               │
│  ├── (public)/     ← unauthenticated pages          │
│  ├── (civilian)/   ← civilian dashboard             │
│  ├── (lawyer)/     ← lawyer onboarding + dashboard  │
│  ├── (moderator)/  ← moderator review panel         │
│  └── (admin)/      ← admin management panel         │
│                                                     │
│  features/         ← Server Actions + queries       │
│  lib/              ← Supabase clients, storage, etc │
│  components/       ← UI components                  │
│  types/            ← TypeScript type definitions    │
└─────────────────────────────────────────────────────┘
          │                          │
          ▼                          ▼
   Supabase (Auth +           AWS S3 (private
   PostgreSQL + RLS)          document storage)
```

**Key architectural decisions:**
- `proxy.ts` (Next.js 16 replacement for `middleware.ts`) intercepts every request, validates the session via `supabase.auth.getUser()`, reads the authoritative role from the `profiles` table, and redirects accordingly. The JWT alone is never trusted for routing.
- Server Actions handle all mutations — no API routes needed for data writes.
- The service-role Supabase client is used in exactly three places: `auth.admin.createUser()` (create moderator), S3 file operations (private bucket), and activity logging (no guaranteed session context). Everything else uses the user's session client with RLS.
- Documents are stored in a **private** AWS S3 bucket. Pre-signed GET URLs (1-hour expiry) are generated server-side — never exposed directly.

---

## Features — Phase 1

### Public Pages

| Page | URL | Description |
|---|---|---|
| Home | `/` | Landing page with hero, stats, feature highlights, and CTAs |
| About | `/about` | Organisation mission and values |
| Legal Services | `/legal` | Practice areas overview — family law, criminal, civil rights, immigration |
| Resources | `/resources` | Legal guides and resource cards (content coming in future phases) |
| Login | `/login` | Email + password for all roles. Google OAuth for civilians |
| Sign Up (selector) | `/signup` | Role picker — civilian vs lawyer |
| Civilian Sign Up | `/signup/civilian` | Email + password or Google OAuth. Instant access |
| Lawyer Sign Up | `/signup/lawyer` | Email + password only (Google explicitly blocked) |
| Forgot Password | `/forgot-password` | Sends Supabase password reset email |
| Reset Password | `/reset-password` | Sets new password after clicking email link |
| Verify Email | `/verify-email` | Informational screen shown after lawyer signup |

### Civilian

| Feature | URL | Description |
|---|---|---|
| Dashboard | `/dashboard` | Welcome screen. Phase 2 will add lawyer discovery and consultation booking |

### Lawyer Onboarding

| Feature | URL | Description |
|---|---|---|
| Profile Form | `/lawyer/profile` | 16-field professional profile: full name, phone, gender, DOB, country, state, city, address, bar council number, state bar council, years of experience, qualification, practice areas, languages, law firm (optional), bio |
| Document Upload | `/lawyer/documents` | Upload 4 required documents to private AWS S3: bar certificate, government ID, enrollment certificate, profile photo. Validates type (PDF/PNG/JPEG) and size (max 10 MB each) |
| Pending Status | `/lawyer/status/pending` | Shown after application submission. Explains the review timeline |
| Hold Status | `/lawyer/status/hold` | Shown when reviewer places application on hold. Displays reviewer notes |
| Rejected Status | `/lawyer/status/rejected` | Shown when application is rejected. Displays reason and contact info |
| Lawyer Dashboard | `/lawyer/dashboard` | Available to approved lawyers only. Shows status badge, bar council number, practice areas |

### Moderator Panel

| Feature | URL | Description |
|---|---|---|
| Dashboard | `/moderator/dashboard` | Live count of pending applications + recently reviewed list with timestamps |
| Applications List | `/moderator/lawyers` | Paginated table of all pending applications with status badges |
| Lawyer Review | `/moderator/lawyers/[id]` | Full profile details, all 4 uploaded documents with signed S3 URLs, approve / hold / reject panel with optional notes |

### Admin Panel

| Feature | URL | Description |
|---|---|---|
| Dashboard | `/admin/dashboard` | 4 live stat cards: total lawyers, pending applications, approved lawyers, moderator count |
| All Applications | `/admin/lawyers` | Table of all lawyer applications across all statuses (pending, approved, hold, rejected) |
| Lawyer Detail | `/admin/lawyers/[id]` | Same review panel as moderator, accessible by admin |
| Moderators List | `/admin/moderators` | All moderator accounts with active/inactive status |
| Create Moderator | `/admin/moderators/create` | Creates a new moderator account (bypasses email confirmation) |
| All Users | `/admin/users` | Complete user table with role, join date, and active/inactive status |

### Activity Logging

All significant user actions are recorded to the `activity_logs` table:

| Event | Triggered by |
|---|---|
| `lawyer_registered` | Lawyer completes signup |
| `profile_updated` | Lawyer saves professional profile |
| `document_uploaded` | Each individual document upload |
| `application_approved` | Moderator or admin approves |
| `application_hold` | Moderator or admin places on hold |
| `application_rejected` | Moderator or admin rejects |
| `moderator_created` | Admin creates a moderator account |
| `user_login` | Successful login (all roles) + civilian signup |
| `password_reset` | Password reset completed |

### Error Handling

- `app/not-found.tsx` — Custom 404 page matching the site design
- `app/error.tsx` — Global error boundary with retry and home navigation. Shows error message in development only

---

## Route Map

```
PUBLIC (unauthenticated)
  GET  /                          → Landing page
  GET  /about                     → About page
  GET  /legal                     → Legal services overview
  GET  /resources                 → Legal resources
  GET  /login                     → Login (all roles)
  GET  /signup                    → Role selector
  GET  /signup/civilian           → Civilian signup
  GET  /signup/lawyer             → Lawyer signup
  GET  /forgot-password           → Forgot password
  GET  /reset-password            → Reset password (token in URL)
  GET  /verify-email              → Email verification screen
  GET  /auth/callback             → OAuth + email verification handler

CIVILIAN (role = civilian)
  GET  /dashboard                 → Civilian dashboard

LAWYER (role = lawyer)
  GET  /lawyer/profile            → Complete professional profile
  GET  /lawyer/documents          → Upload 4 required documents
  GET  /lawyer/status/pending     → Application pending screen
  GET  /lawyer/status/hold        → Application on hold screen
  GET  /lawyer/status/rejected    → Application rejected screen
  GET  /lawyer/dashboard          → Lawyer dashboard (approved only)

MODERATOR (role = moderator)
  GET  /moderator/dashboard       → Moderator dashboard
  GET  /moderator/lawyers         → Pending applications list
  GET  /moderator/lawyers/[id]    → Review a lawyer

ADMIN (role = admin)
  GET  /admin/dashboard           → Admin dashboard
  GET  /admin/lawyers             → All lawyer applications
  GET  /admin/lawyers/[id]        → Lawyer detail + review
  GET  /admin/moderators          → Moderators list
  GET  /admin/moderators/create   → Create moderator
  GET  /admin/users               → All users
```

---

## Roles & Permissions

### RBAC in `proxy.ts`

Every HTTP request passes through `proxy.ts` (Next.js 16's replacement for `middleware.ts`). The proxy:

1. Validates the session with `supabase.auth.getUser()` — never trusts the JWT alone
2. Reads the authoritative `role` and `is_active` from the `profiles` table
3. Applies redirect rules:

| Actor | Accessing | Result |
|---|---|---|
| Unauthenticated | Any protected route | → `/login` |
| Any role | Own public/auth page | → Role dashboard |
| Civilian | `/lawyer/*`, `/admin/*`, `/moderator/*` | → `/dashboard` |
| Lawyer (not approved) | `/lawyer/dashboard` | → Status screen |
| Lawyer (approved) | Status / profile / docs pages | → `/lawyer/dashboard` |
| Moderator | `/admin/*` | → `/moderator/dashboard` |
| Admin | `/lawyer/*`, `/dashboard` | → `/admin/dashboard` |
| Inactive account | Anything | → `/login` |

### Server-side role checks

Every Server Action re-validates the caller's role from the database before performing any mutation. Frontend role state is never trusted.

---

## Database Schema

The complete schema is in `supabase/schema.sql`. Apply it in **Supabase Dashboard → SQL Editor**.

### Tables

| Table | Purpose |
|---|---|
| `profiles` | One row per auth user. Stores email, role, full_name, phone, avatar_url, is_active, email_verified |
| `lawyer_profiles` | Extended professional data for lawyers. All 16 profile fields + application workflow state |
| `lawyer_documents` | One row per uploaded document. Stores S3 object key in `file_url`. Unique constraint on `(lawyer_id, document_type)` |
| `moderator_profiles` | Created when admin adds a moderator. Tracks `created_by` |
| `admin_profiles` | Exists for the single admin account |
| `activity_logs` | Append-only audit trail. Never updated or deleted |

### Enums

| Enum | Values |
|---|---|
| `user_role` | `admin`, `moderator`, `lawyer`, `civilian` |
| `application_status` | `pending`, `approved`, `hold`, `rejected` |
| `gender_type` | `male`, `female`, `other`, `prefer_not_to_say` |
| `document_type` | `bar_certificate`, `government_id`, `enrollment_certificate`, `profile_photo`, `other` |

### Key triggers

- **`handle_new_user`** — fires on every `auth.users` insert. Creates the `profiles` row automatically, reading the role from `raw_user_meta_data` (set during `supabase.auth.signUp()`). Defaults to `civilian` for OAuth signups with no role hint.
- **`update_timestamp`** — keeps `updated_at` current on `profiles` and `lawyer_profiles`.

### RLS policies

All six tables have RLS enabled. Summary:

- Users read/update their own `profiles` row
- Admins and moderators read all `profiles`, `lawyer_profiles`, and `lawyer_documents`
- Admins and moderators can update `lawyer_profiles` (for review decisions)
- Admins have full access to `moderator_profiles`
- Any authenticated user can insert to `activity_logs`
- Only admins can read `activity_logs`

---

## File Storage

Documents are stored in a **private AWS S3 bucket**. No document is ever publicly accessible.

### Flow

1. Lawyer selects files in `/lawyer/documents`
2. `uploadLawyerDocuments` Server Action validates each file (type + size)
3. Files are uploaded to S3 via `lib/storage.ts` → `uploadLawyerDocument()`
4. The S3 **object key** (not a URL) is stored in `lawyer_documents.file_url`
5. When a reviewer opens the review page, `getSignedUrl()` generates a temporary pre-signed GET URL (1-hour expiry) for each document
6. The signed URL is rendered as a "View" link — it expires and is never stored

### Validation

- Allowed types: `application/pdf`, `image/png`, `image/jpeg`
- Maximum size: 10 MB per file
- Validated both client-side (Zod schema) and server-side (before S3 upload)

### Object key format

```
{lawyerUserId}/{documentType}-{timestamp}.{ext}
e.g. a1b2c3d4/bar_certificate-1718000000000.pdf
```

---

## Authentication Flows

### Civilian

```
/signup/civilian
  → supabase.auth.signUp({ data: { role: 'civilian' } })
  → DB trigger creates profiles row with role='civilian'
  → if auto-confirmed → /dashboard
  → else → /verify-email → /auth/callback → /dashboard
```

### Civilian (Google OAuth)

```
/login → OAuthButton → supabase.auth.signInWithOAuth({ provider: 'google' })
  → /auth/callback → exchangeCodeForSession()
  → reads role from profiles → /dashboard
```

### Lawyer

```
/signup/lawyer
  → supabase.auth.signUp({ data: { role: 'lawyer' }, emailRedirectTo: '/auth/callback' })
  → email verification sent → /verify-email
  → lawyer clicks email link → /auth/callback
  → no lawyer_profile yet → /lawyer/profile
  → completes profile → /lawyer/documents
  → uploads 4 documents → /lawyer/status/pending
  → admin/moderator reviews → approved / hold / rejected
  → if approved → /lawyer/dashboard
```

### Admin / Moderator

```
/login → supabase.auth.signInWithPassword()
  → reads role from profiles
  → admin → /admin/dashboard
  → moderator → /moderator/dashboard
```

### Password Reset

```
/forgot-password
  → supabase.auth.resetPasswordForEmail(email, { redirectTo: '/reset-password' })
  → user clicks email link → /reset-password (Supabase sets session)
  → supabase.auth.updateUser({ password: newPassword })
  → → /login
```

---

## Project Structure

```
d:\Projects\dia\
├── app/
│   ├── (public)/                   # Unauthenticated pages
│   │   ├── layout.tsx              # Nav + footer for public site
│   │   ├── page.tsx                # Home / landing page
│   │   ├── about/page.tsx
│   │   ├── legal/page.tsx
│   │   ├── resources/page.tsx
│   │   ├── login/
│   │   ├── signup/
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   └── verify-email/
│   ├── (civilian)/
│   │   ├── layout.tsx              # Guards: role = civilian
│   │   └── dashboard/page.tsx
│   ├── (lawyer)/
│   │   ├── layout.tsx              # Guards: role = lawyer
│   │   └── lawyer/
│   │       ├── dashboard/page.tsx
│   │       ├── profile/page.tsx + LawyerProfileForm.tsx
│   │       ├── documents/page.tsx + DocumentUploadForm.tsx
│   │       └── status/{pending,hold,rejected}/page.tsx
│   ├── (moderator)/
│   │   ├── layout.tsx              # Guards: role = moderator
│   │   └── moderator/
│   │       ├── dashboard/page.tsx
│   │       └── lawyers/{page.tsx,[id]/page.tsx}
│   ├── (admin)/
│   │   ├── layout.tsx              # Guards: role = admin
│   │   └── admin/
│   │       ├── dashboard/page.tsx
│   │       ├── lawyers/{page.tsx,[id]/page.tsx}
│   │       ├── moderators/{page.tsx,create/}
│   │       └── users/page.tsx
│   ├── auth/callback/route.ts      # OAuth + email verification handler
│   ├── not-found.tsx               # Custom 404
│   ├── error.tsx                   # Global error boundary
│   ├── layout.tsx                  # Root layout (fonts, Toaster)
│   └── globals.css
│
├── components/
│   ├── auth/
│   │   ├── SubmitButton.tsx        # Spinner-aware submit button
│   │   ├── FieldError.tsx          # Per-field validation errors
│   │   ├── FormAlert.tsx           # Top-level error/success banners
│   │   └── OAuthButton.tsx         # Google sign-in (civilian only)
│   ├── shared/
│   │   ├── DashboardShell.tsx      # Top nav + layout wrapper for all dashboards
│   │   ├── LogoutButton.tsx
│   │   ├── PageHeader.tsx
│   │   └── ReviewPanel.tsx         # Approve/hold/reject panel (admin + moderator)
│   └── ui/                         # shadcn/ui generated components
│
├── features/
│   ├── auth/
│   │   ├── actions.ts              # login, signup, logout, forgotPassword, resetPassword, signInWithGoogle
│   │   └── schemas.ts              # Zod schemas for all auth forms
│   ├── lawyer/
│   │   ├── actions.ts              # saveLawyerProfile, uploadLawyerDocuments
│   │   ├── queries.ts              # getLawyerProfile, getLawyerDocuments, getLawyerProfileById
│   │   └── schemas.ts              # lawyerProfileSchema, documentUploadSchema
│   ├── admin/
│   │   ├── actions.ts              # createModerator
│   │   ├── queries.ts              # getAllUsers, getAllLawyerApplications, getAdminDashboardStats, getAllModerators
│   │   └── schemas.ts              # createModeratorSchema, reviewApplicationSchema
│   └── moderator/
│       ├── actions.ts              # reviewApplication (shared with admin)
│       ├── queries.ts              # getPendingApplications, getRecentlyReviewed
│       └── schemas.ts              # re-exports from admin/schemas
│
├── hooks/
│   ├── useUser.ts                  # Client hook: reactive current user + role
│   └── useSupabase.ts             # Client hook: stable browser Supabase instance
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts               # Browser client (anon key, for Client Components)
│   │   ├── server.ts               # Server client (async cookies API, for Server Components)
│   │   └── admin.ts                # Service-role client (bypasses RLS, server-only)
│   ├── auth/
│   │   └── session.ts              # getServerSession(), getLawyerApplicationStatus()
│   ├── storage.ts                  # uploadLawyerDocument, getSignedUrl, deleteLawyerDocument (AWS S3)
│   ├── activity-log.ts             # logActivity() — writes to activity_logs
│   └── utils.ts                    # cn(), formatDistanceToNow()
│
├── types/
│   ├── auth.ts                     # UserRole, ApplicationStatus, UserSession, LawyerStatus
│   ├── database.ts                 # Row types mirroring all Supabase tables
│   └── forms.ts                    # Re-exports Zod-inferred form types
│
├── supabase/
│   └── schema.sql                  # Complete PostgreSQL schema (run in Supabase SQL Editor)
│
├── proxy.ts                        # RBAC route guard (Next.js 16 replacement for middleware.ts)
├── next.config.ts
├── tsconfig.json
├── package.json
└── .env.local                      # Environment variables (see below)
```

---

## Environment Variables

Create `.env.local` in the project root:

```bash
# Supabase — Authentication and Database
# Found in: Supabase Dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Service role key — SERVER SIDE ONLY. Never expose to the browser.
# Found in: Supabase Dashboard → Settings → API → service_role key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Public URL of this deployment
# Used for email verification redirects, password reset links, and OAuth callback
# Local dev:   http://localhost:3000
# Production:  https://your-domain.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# AWS S3 — Document Storage (private bucket)
# The IAM user needs: s3:PutObject, s3:GetObject, s3:DeleteObject on this bucket
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
```

---

## Getting Started

### Prerequisites

- Node.js 20.9+
- pnpm 10+
- A [Supabase](https://supabase.com) project
- An [AWS](https://aws.amazon.com) account with S3 access

### Install dependencies

```bash
pnpm install
```

### Set up environment variables

Copy the template above into `.env.local` and fill in your values.

### Set up Supabase

See [Supabase Setup](#supabase-setup) below.

### Set up AWS S3

See [AWS S3 Setup](#aws-s3-setup) below.

### Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Supabase Setup

### 1. Run the schema

Open **Supabase Dashboard → SQL Editor → New Query**, paste the full contents of `supabase/schema.sql`, and run it.

This creates all tables, enums, indexes, triggers, functions, and RLS policies.

### 2. Enable Google OAuth (for civilian login)

1. Go to **Authentication → Providers → Google**
2. Enable it and add your Google OAuth Client ID and Secret
3. Add `https://your-project-ref.supabase.co/auth/v1/callback` to your Google OAuth Authorized redirect URIs

### 3. Create the admin account

The admin cannot self-register. Create it manually:

**Step 1** — Create the auth user:
- Go to **Authentication → Users → Add User**
- Enter the admin email and a strong password
- Tick **Auto Confirm User**

**Step 2** — Update their role (the trigger defaults to `civilian`):

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'admin@yourdomain.com';
```

**Step 3** — Insert the admin_profiles row:

```sql
INSERT INTO public.admin_profiles (user_id)
SELECT id FROM public.profiles
WHERE email = 'admin@yourdomain.com';
```

### 4. Configure email templates (optional)

Go to **Authentication → Email Templates** to customise the verification and password reset emails with your branding.

---

## AWS S3 Setup

### 1. Create the bucket

1. Open **AWS S3 → Create bucket**
2. Choose a name (set it as `AWS_S3_BUCKET` in `.env.local`)
3. **Block all public access: ON** — the bucket must be private
4. Enable server-side encryption (AES-256 recommended)

### 2. Create an IAM user

1. Open **AWS IAM → Users → Create user**
2. Attach a custom inline policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

3. Generate an access key and add the values to `.env.local`

---

## Development

### Build

```bash
pnpm build
```

### Type check

```bash
pnpm tsc --noEmit
```

### Lint

```bash
pnpm lint
```

### Project conventions

- **Server Components by default.** Client Components (`'use client'`) are only used when browser APIs or React hooks are needed.
- **Server Actions for all mutations.** No API routes for data writes.
- **Zod everywhere.** Every form field is validated on the server via a Zod schema before any database write.
- **Role validated server-side on every action.** `getServerSession()` is called at the top of every Server Action that touches protected data.
- **Never trust JWT claims for role.** The `profiles.role` column is always read from the database.
- **Async APIs only.** `cookies()`, `headers()`, `params`, and `searchParams` are all `await`-ed (Next.js 16 breaking change).
- **`proxy.ts` not `middleware.ts`.** Next.js 16 renamed middleware to proxy. The named export is `proxy`, not `middleware`.

---

## Security Model

| Concern | Approach |
|---|---|
| Role spoofing | Role read from `profiles` table on every request and every Server Action — never from JWT claims |
| Unauthenticated access | `proxy.ts` redirects all non-public routes to `/login` |
| Cross-role access | `proxy.ts` + per-action `getServerSession()` checks prevent any role from accessing another role's routes or data |
| Inactive accounts | `is_active = false` → forced to `/login` in proxy and blocked in all Server Actions |
| Document exposure | Documents stored in a private S3 bucket. Only pre-signed URLs (1-hour expiry) are served — raw keys are never sent to clients |
| RLS | Row-Level Security enabled on all 6 Supabase tables. The anon key and session key both respect RLS |
| Service-role key | Used only in 3 places: `supabase.auth.admin.createUser()`, S3 file operations, and activity logging. Never imported in Client Components or exposed to the browser |
| CSRF | Handled automatically by Next.js Server Actions (Origin header check) |
| Input validation | All form inputs validated with Zod on the server before any database operation |

---

## Phase 2+ Roadmap

The following features are **out of scope for Phase 1** and not implemented:

- Lawyer search and discovery
- Consultation booking and appointments
- In-app messaging
- Video calls
- Payments
- Document generation / AI assistance
- Evidence vault
- Knowledge base
- Case tracking
- Notifications (email/push)
- Analytics dashboards
- Client reviews and ratings
- Safe Campus module

---

## License

Private project — Digital Inclusive Aid. All rights reserved.
