// Web view of the shared `workout_sessions` table (the same training data the mobile app logs).
export type WorkoutSet = { weight: string; reps: string };
export type WorkoutExercise = { name: string; sets: WorkoutSet[] };

export type WorkoutSession = {
  id: string;
  date: string; // ISO date
  sessionName: string;
  dayLabel: string | null;
  notes: string | null;
  exercises: WorkoutExercise[];
  totalVolume: number;
  durationSeconds: number | null;
  muscleGroups: string[];
};
