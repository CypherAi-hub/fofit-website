import type { SupabaseClient } from "@supabase/supabase-js";

import { toDetail, toSummary } from "./adapter";
import type { WorkoutSessionDetail, WorkoutSessionSummary } from "./models";

// Columns the list view needs (summary). Detail adds notes/check_in/rpe/feel.
const LIST_COLUMNS =
  "id, date, day_label, session_name, exercises, total_volume, duration_seconds, muscle_groups";
const DETAIL_COLUMNS = `${LIST_COLUMNS}, notes, check_in, session_rpe, session_feel`;

export type HistoryPage = {
  sessions: WorkoutSessionSummary[];
  /** Cursor for the next page (the oldest date in this page), or null when there are no more. */
  nextBefore: string | null;
};

/**
 * One CURSOR-paginated page of the user's workout history (newest first). Never fetches every
 * workout — pass `before` (the previous page's `nextBefore`) to load older sessions. RLS scopes the
 * read to the user; the user_id filter is defense-in-depth. Returns an empty page on error so the UI
 * degrades to an honest state rather than throwing.
 */
export async function listSessionsPage(
  supabase: SupabaseClient,
  opts: { limit?: number; before?: string | null } = {},
): Promise<HistoryPage> {
  const limit = opts.limit ?? 25;
  const empty: HistoryPage = { sessions: [], nextBefore: null };
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
  if (opts.before) q = q.lt("date", opts.before);

  const { data, error } = await q;
  if (error || !data) return empty;

  const rows = data as Record<string, unknown>[];
  const hasMore = rows.length > limit;
  const page = rows.slice(0, limit).map(toSummary);
  // Cursor = the oldest date in this page (only when more pages exist).
  const nextBefore = hasMore && page.length > 0 ? page[page.length - 1].date : null;
  return { sessions: page, nextBefore };
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
