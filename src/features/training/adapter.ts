// Adapter: raw `workout_sessions` rows (loose JSONB) → normalized models. NEVER throws on malformed
// user data. Pages consume only the output of toSummary/toDetail, never raw Supabase JSONB.
import type {
  CheckIn,
  DateParts,
  ExercisePerformance,
  SetKind,
  SetPerformance,
  WorkoutSessionDetail,
  WorkoutSessionSummary,
} from "./models";

/** Parse a number from a string/number; null when absent/empty/non-finite. */
function num(v: unknown): number | null {
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (typeof v === "string") {
    const t = v.trim();
    if (t === "") return null;
    const n = parseFloat(t);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

/**
 * Timezone-safe parse of a SQL `date` ("YYYY-MM-DD", trailing time tolerated). Returns the calendar
 * parts WITHOUT constructing a UTC Date — so the displayed day never shifts across timezones.
 */
export function parseDateOnly(value: unknown): DateParts {
  if (typeof value !== "string") return null;
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  if (!Number.isInteger(year) || month < 1 || month > 12 || day < 1 || day > 31) return null;
  return { year, month, day };
}

/** Display a date-only value, constructing a LOCAL date (no UTC shift). Falls back to the raw string. */
export function formatDateOnly(value: string, locale = "en-US"): string {
  const p = parseDateOnly(value);
  if (!p) return value;
  return new Date(p.year, p.month - 1, p.day).toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function normalizeSet(raw: unknown): SetPerformance {
  const s = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const setNumberRaw = num(s.set);
  const weightRaw = num(s.weight);
  const reps = num(s.reps);
  const durationRaw = num(s.durationSec);
  const explicitBw = s.bodyweight === true;
  const kindField = typeof s.kind === "string" ? s.kind : null;

  let kind: SetKind;
  if (kindField === "duration" || (durationRaw != null && durationRaw > 0 && weightRaw == null && reps == null)) {
    kind = "duration";
  } else if (explicitBw || kindField === "bodyweight") {
    kind = "bodyweight";
  } else if (weightRaw != null && weightRaw > 0) {
    kind = "weighted";
  } else {
    // Empty / zero weight with no explicit bodyweight flag — never INFER a bodyweight load.
    kind = "unknown";
  }

  return {
    setNumber: setNumberRaw != null ? Math.trunc(setNumberRaw) : null,
    kind,
    weight: kind === "weighted" ? weightRaw : null,
    reps,
    durationSec: durationRaw != null && durationRaw > 0 ? durationRaw : null,
    isBodyweight: explicitBw,
  };
}

/** A set carries real performance data (weighted load+reps, bodyweight reps, or a duration). */
function isCompletedSet(s: SetPerformance): boolean {
  if (s.kind === "duration") return s.durationSec != null && s.durationSec > 0;
  if (s.kind === "weighted") return s.weight != null && s.weight > 0 && s.reps != null && s.reps > 0;
  if (s.kind === "bodyweight") return s.reps != null && s.reps > 0;
  return false;
}

function normalizeExercise(raw: unknown): ExercisePerformance | null {
  if (!raw || typeof raw !== "object") return null;
  const e = raw as Record<string, unknown>;
  const name = typeof e.name === "string" ? e.name.trim() : "";
  if (!name) return null; // missing/blank name → skip (never a phantom "Unknown" exercise)
  const setsRaw = Array.isArray(e.sets) ? e.sets : [];
  const sets = setsRaw.map(normalizeSet);
  let topSet: SetPerformance | null = null;
  for (const s of sets) {
    if (s.kind === "weighted" && s.weight != null && (!topSet || s.weight > (topSet.weight ?? 0))) topSet = s;
  }
  return {
    name,
    normalizedKey: name.toLowerCase().replace(/\s+/g, " "),
    sets,
    completedSetCount: sets.filter(isCompletedSet).length,
    topSet,
    hasWeighted: sets.some((s) => s.kind === "weighted"),
    hasBodyweight: sets.some((s) => s.kind === "bodyweight"),
    hasDuration: sets.some((s) => s.kind === "duration"),
  };
}

/** Normalize the exercises JSONB: array, JSON string, or garbage → an exercise list (never throws). */
export function normalizeExercises(raw: unknown): ExercisePerformance[] {
  let arr: unknown[] = [];
  if (Array.isArray(raw)) {
    arr = raw;
  } else if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) arr = parsed;
    } catch {
      arr = []; // malformed JSON string → empty
    }
  }
  // Any non-array (object/null/number) → []
  return arr.map(normalizeExercise).filter((e): e is ExercisePerformance => e !== null);
}

/** Trustworthy persisted total_volume, else computed from valid WEIGHTED sets only, else null. */
function computeVolume(persisted: unknown, exercises: ExercisePerformance[]): number | null {
  const p = num(persisted);
  if (p != null && p > 0) return p;
  let vol = 0;
  let any = false;
  for (const ex of exercises) {
    for (const s of ex.sets) {
      if (s.kind === "weighted" && s.weight != null && s.weight > 0 && s.reps != null && s.reps > 0) {
        vol += s.weight * s.reps;
        any = true;
      }
    }
  }
  return any ? vol : null; // never present a fabricated 0 from bodyweight/empty loads
}

export function toSummary(row: unknown): WorkoutSessionSummary {
  const r = (row && typeof row === "object" ? row : {}) as Record<string, unknown>;
  const exercises = normalizeExercises(r.exercises);
  const dur = num(r.duration_seconds);
  const title =
    (typeof r.session_name === "string" && r.session_name.trim()) ||
    (typeof r.day_label === "string" && r.day_label.trim()) ||
    "Workout";
  return {
    id: typeof r.id === "string" ? r.id : String(r.id ?? ""),
    date: typeof r.date === "string" ? r.date : "",
    title,
    durationSec: dur != null && dur > 0 ? Math.trunc(dur) : null,
    totalVolume: computeVolume(r.total_volume, exercises),
    exerciseCount: exercises.length,
    completedSetCount: exercises.reduce((sum, e) => sum + e.completedSetCount, 0),
    muscleGroups: Array.isArray(r.muscle_groups)
      ? (r.muscle_groups as unknown[]).map(String).filter(Boolean)
      : [],
  };
}

export function toDetail(row: unknown): WorkoutSessionDetail {
  const r = (row && typeof row === "object" ? row : {}) as Record<string, unknown>;
  const summary = toSummary(row);
  const exercises = normalizeExercises(r.exercises);
  const ciRaw = r.check_in && typeof r.check_in === "object" ? (r.check_in as Record<string, unknown>) : null;
  const checkIn: CheckIn | null = ciRaw
    ? { sleepHours: num(ciRaw.sleepHours), soreness: num(ciRaw.soreness), kneePain: num(ciRaw.kneePain) }
    : null;
  return {
    ...summary,
    notes: typeof r.notes === "string" && r.notes.trim() ? r.notes : null,
    exercises,
    checkIn,
    rpe: num(r.session_rpe ?? r.rpe),
    feel:
      typeof r.session_feel === "string"
        ? r.session_feel
        : typeof r.feel === "string"
          ? r.feel
          : null,
  };
}
