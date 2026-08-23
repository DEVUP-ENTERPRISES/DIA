-- =============================================================================
-- DIA — Digital Inclusive Aid
-- Complete Supabase PostgreSQL Schema
-- Run this entire file in: Supabase Dashboard → SQL Editor → New Query
-- =============================================================================


-- =============================================================================
-- SECTION 1: EXTENSIONS
-- =============================================================================
-- uuid-ossp   → provides uuid_generate_v4() (legacy UUID generator)
-- pgcrypto    → provides gen_random_uuid() (modern UUID generator, used in tables)
-- Both are available on all Supabase projects by default.

create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;


-- =============================================================================
-- SECTION 2: CUSTOM ENUM TYPES
-- =============================================================================
-- Enums are stored as a single byte in Postgres, enforce value constraints at
-- the database level, and make queries self-documenting.

-- The four roles in the system. Only one value per user, ever.
create type public.user_role as enum (
  'admin',
  'moderator',
  'lawyer',
  'civilian'
);

-- The lifecycle states of a lawyer's application.
-- 'pending'  → submitted, not yet reviewed
-- 'approved' → reviewer accepted the application
-- 'hold'     → reviewer needs more info / paused
-- 'rejected' → reviewer declined the application
create type public.application_status as enum (
  'pending',
  'approved',
  'hold',
  'rejected'
);

-- Used in the lawyer profile form.
create type public.gender_type as enum (
  'male',
  'female',
  'other',
  'prefer_not_to_say'
);

-- The four document types a lawyer must upload, plus a catch-all.
create type public.document_type as enum (
  'bar_certificate',
  'government_id',
  'enrollment_certificate',
  'profile_photo',
  'other'
);


-- =============================================================================
-- SECTION 3: TABLES
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 3.1 profiles
-- -----------------------------------------------------------------------------
-- One row per authenticated user. Linked 1-to-1 with auth.users via id.
-- The handle_new_user() trigger (Section 5) inserts this row automatically
-- on every new Supabase Auth signup.
-- RLS: users read/update their own row; admin/moderator read all (Section 6).

create table public.profiles (
  -- Same UUID as auth.users.id. Cascade delete removes the profile when
  -- the auth user is deleted from Supabase Auth.
  id              uuid        primary key references auth.users(id) on delete cascade,

  -- Supabase Auth owns the canonical email; we mirror it here for queries.
  email           text        unique not null,

  -- Authoritative role. Never trust the JWT claim alone — always read this.
  role            public.user_role not null,

  -- Optional display fields — populated when the user completes their profile.
  full_name       text,
  phone           text,
  avatar_url      text        default null,

  -- Soft-delete / ban flag. False = account deactivated; login is blocked.
  is_active       boolean     default true,

  -- Mirrors auth.users.email_confirmed_at IS NOT NULL. Updated by the app
  -- after the auth callback confirms the email.
  email_verified  boolean     default false,

  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);


-- -----------------------------------------------------------------------------
-- 3.2 lawyer_profiles
-- -----------------------------------------------------------------------------
-- Extended professional data for lawyers. Created when a lawyer completes
-- their profile form (/lawyer/profile). One row per lawyer user.

create table public.lawyer_profiles (
  id                       uuid        primary key default gen_random_uuid(),

  -- FK to profiles.id (not auth.users directly) so we can join easily.
  user_id                  uuid        unique not null
                             references public.profiles(id) on delete cascade,

  -- Personal details from the profile form.
  gender                   public.gender_type,
  dob                      date,
  country                  text,
  state                    text,
  city                     text,
  address                  text,

  -- Professional credentials.
  bar_council_number       text        unique,   -- enforces global uniqueness
  state_bar_council        text,
  years_of_experience      integer,
  law_firm                 text,
  bio                      text,
  qualification            text,

  -- Arrays stored as Postgres text[]. The app validates against allowed values.
  languages                text[],
  practice_areas           text[],

  -- Application workflow state. Starts as 'pending' on profile submission.
  application_status       public.application_status default 'pending',
  application_submitted_at timestamptz default now(),

  -- Review metadata — written by admin/moderator when they take action.
  reviewed_by              uuid        references public.profiles(id),
  reviewed_at              timestamptz,
  review_notes             text,       -- visible to the lawyer on status pages

  created_at               timestamptz default now(),
  updated_at               timestamptz default now()
);


-- -----------------------------------------------------------------------------
-- 3.3 lawyer_documents
-- -----------------------------------------------------------------------------
-- One row per uploaded document. A lawyer uploads four required documents:
-- bar_certificate, government_id, enrollment_certificate, profile_photo.
-- file_url stores the Supabase Storage path (NOT a public URL).
-- Signed URLs are generated on demand via lib/storage.ts → getSignedUrl().

create table public.lawyer_documents (
  id            uuid        primary key default gen_random_uuid(),

  -- FK to lawyer_profiles.id (not profiles.id) — documents belong to the
  -- lawyer profile, not the auth user directly.
  lawyer_id     uuid        not null references public.lawyer_profiles(id)
                              on delete cascade,

  document_type public.document_type,

  -- Original filename, stored for display purposes only.
  file_name     text,

  -- S3 object key (NOT a public URL).
  -- Example: "user-uuid/bar_certificate-1718000000000.pdf"
  -- Pre-signed GET URLs are generated on demand via lib/storage.ts.
  file_url      text,

  uploaded_at   timestamptz default now(),

  -- Ensures a lawyer can only have one document of each type.
  -- Required for the upsert in features/lawyer/actions.ts to work correctly.
  unique (lawyer_id, document_type)
);


-- -----------------------------------------------------------------------------
-- 3.4 moderator_profiles
-- -----------------------------------------------------------------------------
-- Created by admin when they add a new moderator account.
-- Tracks who created the moderator (created_by).

create table public.moderator_profiles (
  id          uuid  primary key default gen_random_uuid(),
  user_id     uuid  unique references public.profiles(id) on delete cascade,
  created_by  uuid  references public.profiles(id),   -- the admin who created them
  created_at  timestamptz default now()
);


-- -----------------------------------------------------------------------------
-- 3.5 admin_profiles
-- -----------------------------------------------------------------------------
-- There is only ONE admin. This table exists for completeness and future use.
-- The admin account is created manually in Supabase Auth + SQL, never via signup.

create table public.admin_profiles (
  id          uuid  primary key default gen_random_uuid(),
  user_id     uuid  unique references public.profiles(id) on delete cascade,
  created_at  timestamptz default now()
);


-- -----------------------------------------------------------------------------
-- 3.6 activity_logs
-- -----------------------------------------------------------------------------
-- Append-only audit trail. Never updated or deleted — only inserted.
-- actor  = the user who performed the action (null for system/unauthenticated)
-- target = the user the action was performed on (null if not applicable)
-- action = one of the ActivityAction strings defined in lib/activity-log.ts
-- metadata = arbitrary JSON for context (document type, reviewer role, etc.)

create table public.activity_logs (
  id         uuid        primary key default gen_random_uuid(),
  actor      uuid        references public.profiles(id),
  target     uuid        references public.profiles(id),
  action     text        not null,
  metadata   jsonb       default '{}',
  created_at timestamptz default now()
);


-- =============================================================================
-- SECTION 4: INDEXES
-- =============================================================================
-- Indexes speed up the most common query patterns.
-- Primary keys are indexed automatically by Postgres.

-- profiles: role lookups (proxy.ts reads role on every request)
create index idx_profiles_role    on public.profiles(role);

-- profiles: email lookups (login, duplicate check)
create index idx_profiles_email   on public.profiles(email);

-- lawyer_profiles: filter by status (pending queue, approved list)
create index idx_lawyer_status    on public.lawyer_profiles(application_status);

-- lawyer_profiles: location-based filtering (future search phase)
create index idx_lawyer_city      on public.lawyer_profiles(city);
create index idx_lawyer_state     on public.lawyer_profiles(state);

-- lawyer_profiles: bar number uniqueness lookups
create index idx_lawyer_bar       on public.lawyer_profiles(bar_council_number);

-- lawyer_documents: fetch all docs for a lawyer
create index idx_documents_lawyer on public.lawyer_documents(lawyer_id);

-- activity_logs: audit queries by actor or target
create index idx_logs_actor       on public.activity_logs(actor);
create index idx_logs_target      on public.activity_logs(target);


-- =============================================================================
-- SECTION 5: FUNCTIONS AND TRIGGERS
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 5.1 update_timestamp()
-- -----------------------------------------------------------------------------
-- Generic trigger function that sets updated_at = now() before any UPDATE.
-- Attached to tables that have an updated_at column.

create or replace function public.update_timestamp()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger update_profiles_timestamp
  before update on public.profiles
  for each row execute procedure public.update_timestamp();

create trigger update_lawyer_profiles_timestamp
  before update on public.lawyer_profiles
  for each row execute procedure public.update_timestamp();


-- -----------------------------------------------------------------------------
-- 5.2 handle_new_user()
-- -----------------------------------------------------------------------------
-- Fires AFTER INSERT on auth.users (Supabase's internal auth table).
-- Every time someone signs up — via email/password or OAuth — Supabase inserts
-- a row into auth.users. This trigger immediately creates the matching
-- public.profiles row with the correct role.
--
-- How role is determined:
--   1. The app passes { data: { role: 'lawyer' } } in supabase.auth.signUp()
--      options. Supabase stores this in auth.users.raw_user_meta_data.
--   2. The trigger reads raw_user_meta_data->>'role' and casts it to user_role.
--   3. If the cast fails (e.g. OAuth signup with no role hint), it defaults
--      to 'civilian' — the safest default.
--
-- SECURITY DEFINER means the function runs with the privileges of its owner
-- (postgres), not the calling user. This is required because the trigger
-- needs to INSERT into public.profiles even before the user has a session.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email, role)
  values (
    new.id,
    new.email,
    coalesce(
      (new.raw_user_meta_data ->> 'role')::public.user_role,
      'civilian'
    )
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- =============================================================================
-- SECTION 6: ROW LEVEL SECURITY (RLS)
-- =============================================================================
-- RLS is Postgres's built-in per-row access control. When enabled on a table,
-- ALL queries (even from your own app) are filtered by the policies below —
-- unless the client uses the service-role key, which bypasses RLS entirely.
--
-- The anon key and the user's session key (JWT) both respect RLS.
-- The service-role key bypasses RLS — use it only for privileged server ops.
--
-- Pattern used: auth.uid() returns the UUID of the currently authenticated user.
-- For cross-user reads (admin/moderator seeing other users' data), we check
-- the actor's role in the profiles table.

-- Enable RLS on all tables (off by default in Postgres).
alter table public.profiles          enable row level security;
alter table public.lawyer_profiles   enable row level security;
alter table public.lawyer_documents  enable row level security;
alter table public.moderator_profiles enable row level security;
alter table public.admin_profiles    enable row level security;
alter table public.activity_logs     enable row level security;


-- =============================================================================
-- SECTION 6A: profiles policies
-- =============================================================================

-- Every user can read their own profile row.
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Every user can update their own profile row.
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Admins and moderators can read ALL profiles (needed for user list, review pages).
-- The subquery checks the actor's own profiles row to confirm their role.
create policy "Admin and moderator can view all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.role in ('admin', 'moderator')
    )
  );

-- Only admin can update any profile (e.g. setting role='moderator' on creation).
create policy "Admin can update all profiles"
  on public.profiles for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.role = 'admin'
    )
  );


-- =============================================================================
-- SECTION 6B: lawyer_profiles policies
-- =============================================================================

-- A lawyer can do anything (select, insert, update, delete) on their own row.
create policy "Lawyer can manage own profile"
  on public.lawyer_profiles for all
  using (user_id = auth.uid());

-- Admins and moderators can read all lawyer profiles (for review queues).
create policy "Admin and moderator can view all lawyer profiles"
  on public.lawyer_profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.role in ('admin', 'moderator')
    )
  );

-- Admins and moderators can update lawyer profiles (approve/hold/reject).
-- This covers writing application_status, reviewed_by, reviewed_at, review_notes.
create policy "Admin and moderator can update lawyer profiles"
  on public.lawyer_profiles for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.role in ('admin', 'moderator')
    )
  );


-- =============================================================================
-- SECTION 6C: lawyer_documents policies
-- =============================================================================

-- A lawyer can manage (read/upload/delete) their own documents.
-- The subquery links lawyer_documents → lawyer_profiles → profiles.
create policy "Lawyer can manage own documents"
  on public.lawyer_documents for all
  using (
    lawyer_id in (
      select id from public.lawyer_profiles
      where user_id = auth.uid()
    )
  );

-- Admins and moderators can read all documents (for review pages).
create policy "Admin and moderator can view all lawyer documents"
  on public.lawyer_documents for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.role in ('admin', 'moderator')
    )
  );


-- =============================================================================
-- SECTION 6D: moderator_profiles policies
-- =============================================================================

-- Admins can do everything with moderator profiles (create, read, update, delete).
create policy "Admin can manage moderator profiles"
  on public.moderator_profiles for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.role = 'admin'
    )
  );

-- Moderators can read their own moderator_profile row.
create policy "Moderator can view own moderator profile"
  on public.moderator_profiles for select
  using (user_id = auth.uid());


-- =============================================================================
-- SECTION 6E: admin_profiles policies
-- =============================================================================

-- Only the admin can read their own admin_profile row.
create policy "Admin can view own admin profile"
  on public.admin_profiles for select
  using (user_id = auth.uid());


-- =============================================================================
-- SECTION 6F: activity_logs policies
-- =============================================================================

-- Any authenticated user can insert a log (they log their own actions).
-- actor = null is allowed for system events (e.g. password reset without session).
create policy "Authenticated users can insert activity logs"
  on public.activity_logs for insert
  with check (auth.role() = 'authenticated');

-- Only admins can read activity logs.
create policy "Admin can view all activity logs"
  on public.activity_logs for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.role = 'admin'
    )
  );


-- =============================================================================
-- SECTION 7: DOCUMENT STORAGE
-- =============================================================================
-- Documents are stored in AWS S3, not Supabase Storage.
-- The lawyer_documents.file_url column holds the S3 object key.
-- Example key: "user-uuid/bar_certificate-1718000000000.pdf"
--
-- Pre-signed GET URLs (1-hour expiry) are generated server-side in
-- lib/storage.ts → getSignedUrl() using @aws-sdk/s3-request-presigner.
--
-- Required S3 bucket configuration:
--   - Block all public access: ON
--   - Server-side encryption: AES-256 (or AWS KMS)
--   - Versioning: optional but recommended
--
-- Required IAM permissions for the app's access key:
--   s3:PutObject    → upload documents
--   s3:GetObject    → generate pre-signed read URLs
--   s3:DeleteObject → delete documents
--
-- See .env.local for the required environment variables:
--   AWS_REGION, AWS_S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY


-- =============================================================================
-- SECTION 8: MANUALLY CREATE THE ADMIN ACCOUNT
-- =============================================================================
-- The admin cannot sign up through the UI. Run the steps below manually
-- after applying this schema.
--
-- STEP 1 — Create the auth user in Supabase Dashboard:
--   Authentication → Users → Add User
--   Email: admin@yourdomain.com
--   Password: (strong password)
--   Auto Confirm User: YES
--
-- STEP 2 — Update their profile role (the trigger defaults to 'civilian'):
--
--   update public.profiles
--   set role = 'admin'
--   where email = 'admin@yourdomain.com';
--
-- STEP 3 — Insert their admin_profiles row:
--
--   insert into public.admin_profiles (user_id)
--   select id from public.profiles
--   where email = 'admin@yourdomain.com';
--
-- =============================================================================
