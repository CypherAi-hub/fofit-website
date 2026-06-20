import { useEffect, useMemo, useState } from "react";

import { supabase } from "../../lib/supabase";
import { listRecentSessions, type OverviewSession } from "./trainingService";
import { parseDateOnly } from "./adapter";

type Status = "loading" | "error" | "ready";

export type ProgressStats = {
  total: number;
  last7: number;
  last30: number;
  totalVolume: number | null;
  totalDurationMin: number | null;
  avgDurationMin: number | null;
  recentActiveDays: number;
};

export type FrequentExercise = { name: string; sessions: number };
export type RecentPR = { name: string; weight: number; reps: number | null; date: string };
export type VolumePoint = { date: string; volume: number };

function daysAgo(dateStr: string): number {
  const p = parseDateOnly(dateStr);
  if (!p) return Infinity;
  const then = new Date(p.year, p.month - 1, p.day).getTime();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Math.round((today - then) / 86_400_000);
}

function computeStats(sessions: OverviewSession[]): ProgressStats {
  let totalVol = 0;
  let hasVol = false;
  let totalDur = 0;
  let durCount = 0;
  const activeDays = new Set<string>();
  let last7 = 0;
  let last30 = 0;
  for (const s of sessions) {
    if (s.totalVolume != null) {
      totalVol += s.totalVolume;
      hasVol = true;
    }
    if (s.durationSec != null) {
      totalDur += s.durationSec;
      durCount += 1;
    }
    const d = daysAgo(s.date);
    if (d <= 7) last7 += 1;
    if (d <= 30) last30 += 1;
    if (d <= 28) activeDays.add(s.date.slice(0, 10));
  }
  return {
    total: sessions.length,
    last7,
    last30,
    totalVolume: hasVol ? totalVol : null,
    totalDurationMin: durCount > 0 ? Math.round(totalDur / 60) : null,
    avgDurationMin: durCount > 0 ? Math.round(totalDur / 60 / durCount) : null,
    recentActiveDays: activeDays.size,
  };
}

function computeFrequent(sessions: OverviewSession[]): FrequentExercise[] {
  const byKey = new Map<string, { name: string; sessions: number }>();
  for (const s of sessions) {
    const seen = new Set<string>();
    for (const ex of s.exercises) {
      if (seen.has(ex.normalizedKey)) continue; // count once per session
      seen.add(ex.normalizedKey);
      const cur = byKey.get(ex.normalizedKey);
      if (cur) cur.sessions += 1;
      else byKey.set(ex.normalizedKey, { name: ex.name, sessions: 1 });
    }
  }
  return [...byKey.values()].sort((a, b) => b.sessions - a.sessions).slice(0, 6);
}

/**
 * Recent PRs — CONSERVATIVE (no fake PRs): an exercise whose heaviest-ever weighted set was hit in
 * the last 30 days, where the exercise has prior weighted history and the max STRICTLY beats every
 * earlier weighted set. One PR per exercise.
 */
function computePRs(sessions: OverviewSession[]): RecentPR[] {
  type Lift = { weight: number; reps: number | null; date: string };
  const byKey = new Map<string, { name: string; lifts: Lift[] }>();
  for (const s of sessions) {
    for (const ex of s.exercises) {
      if (!ex.topSet || ex.topSet.weight == null || ex.topSet.weight <= 0) continue;
      const entry = byKey.get(ex.normalizedKey) ?? { name: ex.name, lifts: [] };
      entry.lifts.push({ weight: ex.topSet.weight, reps: ex.topSet.reps, date: s.date });
      byKey.set(ex.normalizedKey, entry);
    }
  }
  const prs: RecentPR[] = [];
  for (const { name, lifts } of byKey.values()) {
    if (lifts.length < 2) continue; // need history to call something a record
    const max = lifts.reduce((a, b) => (b.weight > a.weight ? b : a));
    const others = lifts.filter((l) => l !== max);
    const priorMax = Math.max(...others.map((l) => l.weight));
    if (max.weight > priorMax && daysAgo(max.date) <= 30) {
      prs.push({ name, weight: max.weight, reps: max.reps, date: max.date });
    }
  }
  return prs.sort((a, b) => daysAgo(a.date) - daysAgo(b.date)).slice(0, 6);
}

function computeVolumeTrend(sessions: OverviewSession[]): VolumePoint[] {
  return [...sessions]
    .filter((s) => s.totalVolume != null && s.totalVolume > 0)
    .map((s) => ({ date: s.date, volume: s.totalVolume as number }))
    .sort((a, b) => {
      const pa = parseDateOnly(a.date);
      const pb = parseDateOnly(b.date);
      return (pa ? pa.year * 10000 + pa.month * 100 + pa.day : 0) - (pb ? pb.year * 10000 + pb.month * 100 + pb.day : 0);
    });
}

export function useProgressOverview() {
  const [status, setStatus] = useState<Status>("loading");
  const [sessions, setSessions] = useState<OverviewSession[]>([]);
  const [capped, setCapped] = useState(false);

  useEffect(() => {
    let alive = true;
    setStatus("loading");
    void listRecentSessions(supabase, 300)
      .then((r) => {
        if (!alive) return;
        setSessions(r.sessions);
        setCapped(r.capped);
        setStatus("ready");
      })
      .catch(() => {
        if (alive) setStatus("error");
      });
    return () => {
      alive = false;
    };
  }, []);

  const derived = useMemo(
    () => ({
      stats: computeStats(sessions),
      frequent: computeFrequent(sessions),
      prs: computePRs(sessions),
      volumeTrend: computeVolumeTrend(sessions),
    }),
    [sessions],
  );

  return { status, capped, sessionCount: sessions.length, ...derived };
}
