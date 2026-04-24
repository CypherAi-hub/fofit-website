-- Proposed migration — DO NOT RUN WITHOUT REVIEW
-- Adds columns the web auth flow expects on the waitlist table.
-- Confirm the table name (waitlist_entries vs waitlist) before applying.

-- 1. New columns on the waitlist table. Using IF NOT EXISTS so reruns are safe.
alter table if exists public.waitlist_entries
  add column if not exists claimed_at timestamptz,
  add column if not exists claimed_by_user_id uuid references auth.users(id) on delete set null;

-- 2. Index to make the email lookup + update fast during claim.
create index if not exists waitlist_entries_email_ci_idx
  on public.waitlist_entries (lower(email));

-- 3. Optional: RLS policy so an authenticated user can read their own claim
--    (only needed if the client ever reads the row directly instead of
--    going through the claim edge function).
-- create policy "owner can read own claim" on public.waitlist_entries
--   for select using (claimed_by_user_id = auth.uid());

-- Rollback (if needed):
-- alter table public.waitlist_entries drop column claimed_by_user_id;
-- alter table public.waitlist_entries drop column claimed_at;
-- drop index if exists waitlist_entries_email_ci_idx;
