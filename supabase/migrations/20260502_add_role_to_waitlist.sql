-- Add role path captured by the website waitlist modal.
-- Do not run from Codex. Apply after the feature branch is merged.

alter table if exists public.waitlist_entries
  add column if not exists role text null;

alter table if exists public.waitlist_entries
  drop constraint if exists waitlist_entries_role_check;

alter table if exists public.waitlist_entries
  add constraint waitlist_entries_role_check
  check (role is null or role in ('lifter', 'athlete', 'coach'));

-- Rollback, only if no role data has been written:
-- alter table public.waitlist_entries drop constraint if exists waitlist_entries_role_check;
-- alter table public.waitlist_entries drop column if exists role;
