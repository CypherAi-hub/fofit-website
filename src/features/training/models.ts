// Normalized training models — the ONLY shape page components consume. The adapter (adapter.ts)
// maps raw `public.workout_sessions` rows (with loosely-typed JSONB exercises) into these, handling
// malformed/legacy/empty data without ever throwing. Pages never touch raw Supabase JSONB.

/** A single set, with the weighted / bodyweight / duration distinction preserved (never conflated). */
export type SetKind = "weighted" | "bodyweight" | "duration" | "unknown";

export type SetPerformance = {
  setNumber: number | null;
  kind: SetKind;
  /** Parsed numeric load in the user's stored unit — null for bodyweight/duration/unparseable. Never inferred. */
  weight: number | null;
  reps: number | null;
  durationSec: number | null;
  /** True only when a bodyweight value was EXPLICITLY stored (never inferred from an empty weight). */
  isBodyweight: boolean;
};

export type ExercisePerformance = {
  /** Display name — original text, trimmed. */
  name: string;
  /** Cautious grouping key (lowercased, whitespace-collapsed). Exposed for downstream grouping; the
   *  adapter NEVER merges two exercises by it — uncertain names stay distinct. */
  normalizedKey: string;
  sets: SetPerformance[];
  /** Sets that carry real performance data (a weighted load+reps, a bodyweight rep count, or a duration). */
  completedSetCount: number;
  /** Heaviest WEIGHTED set (by load), or null when the exercise has no weighted work. */
  topSet: SetPerformance | null;
  hasWeighted: boolean;
  hasBodyweight: boolean;
  hasDuration: boolean;
};

export type WorkoutSessionSummary = {
  id: string;
  /** Raw SQL date "YYYY-MM-DD" — date-only, never timezone-shifted. Format with parseDateOnly(). */
  date: string;
  title: string;
  durationSec: number | null;
  /** Trustworthy persisted total_volume, else computed from valid weighted sets only, else null
   *  (never a fabricated zero from bodyweight/empty loads). */
  totalVolume: number | null;
  exerciseCount: number;
  completedSetCount: number;
  muscleGroups: string[];
};

export type CheckIn = {
  sleepHours: number | null;
  soreness: number | null;
  kneePain: number | null;
};

export type WorkoutSessionDetail = WorkoutSessionSummary & {
  notes: string | null;
  exercises: ExercisePerformance[];
  checkIn: CheckIn | null;
  /** Perceived exertion (1..10) when rated, else null. */
  rpe: number | null;
  /** Coarse post-session feel when rated, else null. */
  feel: string | null;
};

/** A date-only value, parsed timezone-safely (no UTC shift). */
export type DateParts = { year: number; month: number; day: number } | null;
