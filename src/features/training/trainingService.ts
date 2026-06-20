import type { SupabaseClient } from "@supabase/supabase-js";

import type { WorkoutExercise, WorkoutSession } from "./types";

function num(v: unknown, fallback = 0): number {
  const n = typeof v === "number" ? v : typeof v === "string" ? parseFloat(v) : NaN;
  return Number.isFinite(n) ? n : fallback;
}

function normalizeExercises(raw: unknown): WorkoutExercise[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((ex): WorkoutExercise | null => {
      if (!ex || typeof ex !== "object") return null;
      const e = ex as Record<string, unknown>;
      const name = typeof e.name === "string" ? e.name : null;
      if (!name) return null;
      const sets = Array.isArray(e.sets)
        ? e.sets
            .map((s) => {
              const sd = (s ?? {}) as Record<string, unknown>;
              return {
                weight: sd.weight == null ? "" : String(sd.weight),
                reps: sd.reps == null ? "" : String(sd.reps),
              };
            })
            .filter((s) => s.weight !== "" || s.reps !== "")
        : [];
      return { name, sets };
    })
    .filter((e): e is WorkoutExercise => e !== null);
}

/**
 * Reads the signed-in user's recent workout sessions from the shared `workout_sessions` table —
 * the SAME data the mobile app logs (RLS scopes it to the user; the user_id filter is
 * defense-in-depth). Connects the web app to the user's real training. Returns [] on error so the
 * page degrades to an honest empty state rather than throwing.
 */
export async function listWorkoutSessions(
  supabase: SupabaseClient,
  limit = 100,
): Promise<WorkoutSession[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("workout_sessions")
    .select(
      "id, date, day_label, session_name, notes, exercises, total_volume, duration_seconds, muscle_groups",
    )
    .eq("user_id", user.id)
    .order("date", { ascending: false })
    .limit(limit);

  if (error || !data) return [];

  return (data as Record<string, unknown>[]).map((row) => ({
    id: String(row.id),
    date: String(row.date),
    sessionName: typeof row.session_name === "string" ? row.session_name : "Workout",
    dayLabel: typeof row.day_label === "string" ? row.day_label : null,
    notes: typeof row.notes === "string" ? row.notes : null,
    exercises: normalizeExercises(row.exercises),
    totalVolume: num(row.total_volume),
    durationSeconds: row.duration_seconds == null ? null : num(row.duration_seconds),
    muscleGroups: Array.isArray(row.muscle_groups)
      ? (row.muscle_groups as unknown[]).map(String)
      : [],
  }));
}
