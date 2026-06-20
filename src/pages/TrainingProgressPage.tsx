import { useMemo } from "react";

import { useTrainingHistory } from "../features/training/useTrainingHistory";
import type { WorkoutSession } from "../features/training/types";
import { PageMeta } from "../components/layout/PageMeta";
import "../features/training/training.css";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatDuration(sec: number | null): string | null {
  if (sec == null || sec <= 0) return null;
  const m = Math.round(sec / 60);
  return `${m} min`;
}

function topSet(ex: WorkoutSession["exercises"][number]): string | null {
  let best: { w: number; r: number } | null = null;
  for (const s of ex.sets) {
    const w = parseFloat(s.weight);
    const r = parseFloat(s.reps);
    if (Number.isFinite(w) && Number.isFinite(r) && (!best || w > best.w)) best = { w, r };
  }
  if (!best) return null;
  return `${best.w} × ${best.r}`;
}

/** Volume sparkline — total volume per session, oldest→newest. Dependency-free SVG. */
function VolumeTrend({ sessions }: { sessions: WorkoutSession[] }) {
  const points = useMemo(
    () =>
      [...sessions]
        .filter((s) => s.totalVolume > 0)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((s) => s.totalVolume),
    [sessions],
  );
  if (points.length < 2) return null;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const W = 280;
  const H = 56;
  const pad = 5;
  const x = (i: number) => pad + (i / (points.length - 1)) * (W - 2 * pad);
  const y = (v: number) => pad + (1 - (v - min) / range) * (H - 2 * pad);
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(p).toFixed(1)}`).join(" ");
  return (
    <section className="bodylab-card training-trend">
      <span className="bodylab__eyebrow">◆ Volume trend</span>
      <svg viewBox={`0 0 ${W} ${H}`} className="training-spark" preserveAspectRatio="none" aria-hidden>
        <path d={path} fill="none" stroke="var(--green)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={x(points.length - 1)} cy={y(points[points.length - 1])} r={3} fill="var(--green)" />
      </svg>
      <span className="training-trend__cap">{points.length} sessions of logged volume</span>
    </section>
  );
}

export function TrainingProgressPage() {
  const { state, stats } = useTrainingHistory();

  return (
    <>
      <PageMeta title="Progress | FoFit" description="Your FoFit training history and trends." />
      <div className="training">
        <header className="training__head">
          <span className="bodylab__eyebrow">◆ Progress</span>
          <h1 className="training__title">Your training</h1>
          <p className="training__sub">
            Every session you&apos;ve logged in FoFit — the same data your app tracks, now on the web.
          </p>
        </header>

        {state.status === "loading" && (
          <div className="bodylab-state">
            <div className="bodylab-spinner" />
            <span>Loading your training…</span>
          </div>
        )}

        {state.status === "error" && (
          <div className="bodylab-state">
            <div className="bodylab-state__title">Couldn&apos;t load your training</div>
            <p>Please try again in a moment.</p>
          </div>
        )}

        {state.status === "ready" && stats && (
          <>
            <section className="training-stats">
              <Stat value={stats.total} label="Workouts" />
              <Stat value={stats.last7} label="This week" />
              <Stat value={stats.last30} label="This month" />
              <Stat value={stats.recentActiveDays} label="Active days / 28" />
            </section>

            <VolumeTrend sessions={state.sessions} />

            {state.sessions.length === 0 ? (
              <div className="bodylab-state">
                <div className="bodylab-state__title">No workouts logged yet</div>
                <p>Log a session in the FoFit app and it&apos;ll show up here.</p>
              </div>
            ) : (
              <section className="training-list" aria-label="Workout history">
                {state.sessions.map((s) => {
                  const tops = s.exercises
                    .map((ex) => {
                      const t = topSet(ex);
                      return t ? `${ex.name} ${t}` : null;
                    })
                    .filter(Boolean)
                    .slice(0, 4);
                  const duration = formatDuration(s.durationSeconds);
                  return (
                    <article key={s.id} className="training-row">
                      <div className="training-row__head">
                        <strong>{s.sessionName}</strong>
                        <span className="training-row__date">{formatDate(s.date)}</span>
                      </div>
                      <div className="training-row__meta">
                        {s.totalVolume > 0 && <span>{Math.round(s.totalVolume).toLocaleString()} lb volume</span>}
                        {s.exercises.length > 0 && <span>{s.exercises.length} exercises</span>}
                        {duration && <span>{duration}</span>}
                      </div>
                      {tops.length > 0 && <div className="training-row__lifts">{tops.join(" · ")}</div>}
                      {s.notes && <div className="training-row__notes">{s.notes}</div>}
                    </article>
                  );
                })}
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="training-stat">
      <span className="training-stat__value">{value.toLocaleString()}</span>
      <span className="training-stat__label">{label}</span>
    </div>
  );
}
