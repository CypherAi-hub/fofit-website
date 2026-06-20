import type { SupabaseClient } from "@supabase/supabase-js";

import { normalizeExercises, toDetail, toSummary } from "./adapter";
import type { ExercisePerformance, WorkoutSessionDetail, WorkoutSessionSummary } from "./models";

/** A summary plus its normalized exercises — what the Progress overview needs for frequency + PRs. */
export type OverviewSession = WorkoutSessionSummary & { exercises: ExercisePerformance[] };

// Columns the list view needs (summary). created_at backs the keyset cursor; detail adds notes/etc.
const LIST_COLUMNS =
  "id, date, created_at, day_label, session_name, exercises, total_volume, duration_seconds, muscle_groups";
const DETAIL_COLUMNS = `${LIST_COLUMNS}, notes, check_in, session_rpe, session_feel`;

/** Opaque keyset cursor — the (date, created_at) of the last row returned. */
export type HistoryCursor = { date: string; createdAt: string };

export type HistoryPage = {
  sessions: WorkoutSessionSummary[];
  /** Cursor for the next (older) page, or null when there are no more. */
  nextCursor: HistoryCursor | null;
};

/**
 * One CURSOR-paginated page of the user's workout history (newest first). Never fetches every
 * workout — pass `cursor` (the previous page's `nextCursor`) to load older sessions. RLS scopes the
 * read to the user; the user_id filter is defense-in-depth. Returns an empty page on error so the UI
 * degrades to an honest state rather than throwing.
 *
 * The cursor is a COMPOSITE keyset on (date, created_at) — matching the sort order — so multiple
 * sessions logged on the SAME day are never skipped at a page boundary (a date-only cursor would
 * drop the rest of that day's sessions).
 */
export async function listSessionsPage(
  supabase: SupabaseClient,
  opts: { limit?: number; cursor?: HistoryCursor | null } = {},
): Promise<HistoryPage> {
  const limit = opts.limit ?? 25;
  const empty: HistoryPage = { sessions: [], nextCursor: null };
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return empty;

  let q = supabase
    .from("workout_sessions")
    .select(LIST_COLUMNS)
    .eq("user_id", user.id)
    .order("date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit + 1); // fetch one extra to detect "has more"
  if (opts.cursor) {
    // (date, created_at) < (cursor.date, cursor.createdAt) — keyset, never skips same-day rows.
    const { date, createdAt } = opts.cursor;
    q = q.or(`date.lt.${date},and(date.eq.${date},created_at.lt.${createdAt})`);
  }

  const { data, error } = await q;
  if (error || !data) return empty;

  const rows = data as Record<string, unknown>[];
  const hasMore = rows.length > limit;
  const pageRows = rows.slice(0, limit);
  const last = pageRows[pageRows.length - 1];
  const nextCursor =
    hasMore && last ? { date: String(last.date), createdAt: String(last.created_at) } : null;
  return { sessions: pageRows.map(toSummary), nextCursor };
}

/**
 * A BOUNDED window of recent sessions for the Progress overview's aggregates (stats, trends, PRs).
 * Capped (default 300) so it never fetches a user's entire history — the overview is "recent", and
 * the cap is surfaced to the UI so it can say so honestly. RLS-scoped.
 */
export async function listRecentSessions(
  supabase: SupabaseClient,
  cap = 300,
): Promise<{ sessions: OverviewSession[]; capped: boolean }> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { sessions: [], capped: false };
  const { data, error } = await supabase
    .from("workout_sessions")
    .select(LIST_COLUMNS)
    .eq("user_id", user.id)
    .order("date", { ascending: false })
    .limit(cap + 1);
  if (error || !data) return { sessions: [], capped: false };
  const rows = data as Record<string, unknown>[];
  const capped = rows.length > cap;
  const sessions = rows.slice(0, cap).map((r) => ({
    ...toSummary(r),
    exercises: normalizeExercises(r.exercises),
  }));
  return { sessions, capped };
}

/** Full detail for one session (exercises/sets/notes/check-in/rpe/feel). RLS-scoped; null if absent. */
export async function getSessionDetail(
  supabase: SupabaseClient,
  sessionId: string,
): Promise<WorkoutSessionDetail | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from("workout_sessions")
    .select(DETAIL_COLUMNS)
    .eq("user_id", user.id)
    .eq("id", sessionId)
    .maybeSingle();
  if (error || !data) return null;
  return toDetail(data as Record<string, unknown>);
}
