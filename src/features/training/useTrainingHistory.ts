import { useEffect, useMemo, useState } from "react";

import { supabase } from "../../lib/supabase";
import { listWorkoutSessions } from "./trainingService";
import type { WorkoutSession } from "./types";

export type TrainingState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; sessions: WorkoutSession[] };

export type TrainingStats = {
  total: number;
  last7: number;
  last30: number;
  totalVolume: number;
  /** Distinct training days in the last 28 (forgiving rhythm — matches the app's streak metric). */
  recentActiveDays: number;
};

function withinDays(iso: string, days: number): boolean {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return false;
  return Date.now() - t <= days * 86_400_000;
}

export function useTrainingHistory() {
  const [state, setState] = useState<TrainingState>({ status: "loading" });

  useEffect(() => {
    let alive = true;
    setState({ status: "loading" });
    void listWorkoutSessions(supabase, 100)
      .then((sessions) => {
        if (alive) setState({ status: "ready", sessions });
      })
      .catch(() => {
        if (alive) setState({ status: "error" });
      });
    return () => {
      alive = false;
    };
  }, []);

  const stats = useMemo<TrainingStats | null>(() => {
    if (state.status !== "ready") return null;
    const s = state.sessions;
    const activeDays = new Set(
      s.filter((x) => withinDays(x.date, 28)).map((x) => x.date.slice(0, 10)),
    );
    return {
      total: s.length,
      last7: s.filter((x) => withinDays(x.date, 7)).length,
      last30: s.filter((x) => withinDays(x.date, 30)).length,
      totalVolume: s.reduce((sum, x) => sum + (x.totalVolume || 0), 0),
      recentActiveDays: activeDays.size,
    };
  }, [state]);

  return { state, stats };
}
