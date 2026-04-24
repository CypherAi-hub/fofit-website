-- Proposed migration — DO NOT RUN WITHOUT REVIEW
-- Log table for every send attempt from notify-waitlist-auth-live.

create table if not exists public.waitlist_notifications (
  id uuid primary key default gen_random_uuid(),
  waitlist_id uuid not null,
  email text not null,
  status text not null check (status in ('sent', 'failed', 'error')),
  response text,
  sent_at timestamptz not null default now()
);

create index if not exists waitlist_notifications_waitlist_id_idx
  on public.waitlist_notifications (waitlist_id);

create index if not exists waitlist_notifications_status_idx
  on public.waitlist_notifications (status, sent_at desc);

-- Rollback:
-- drop table if exists public.waitlist_notifications;
