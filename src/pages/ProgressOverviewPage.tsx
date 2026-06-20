import { useMemo } from "react";

import { useProgressOverview, type VolumePoint } from "../features/training/useProgressOverview";
import { formatDateOnly } from "../features/training/adapter";
import { PageMeta } from "../components/layout/PageMeta";
import "../features/training/history.css";
import "../features/training/progress.css";

function VolumeTrend({ points }: { points: VolumePoint[] }) {
  const path = useMemo(() => {
    if (points.length < 2) return null;
    const vals = points.map((p) => p.volume);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const range = max - min || 1;
    const W = 300;
    const H = 60;
    const pad = 5;
    const x = (i: number) => pad + (i / (points.length - 1)) * (W - 2 * pad);
    const y = (v: number) => pad + (1 - (v - min) / range) * (H - 2 * pad);
    return {
      d: points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(p.volume).toFixed(1)}`).join(" "),
      lastX: x(points.length - 1),
      lastY: y(points[points.length - 1].volume),
      W,
      H,
    };
  }, [points]);
  if (!path) return null;
  return (
    <section className="progress-card">
      <span className="bodylab__eyebrow">◆ Volume trend</span>
      <svg viewBox={`0 0 ${path.W} ${path.H}`} className="progress-spark" preserveAspectRatio="none" aria-hidden>
        <path d={path.d} fill="none" stroke="var(--green)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={path.lastX} cy={path.lastY} r={3} fill="var(--green)" />
      </svg>
      <span className="progress-cap-note">{points.length} sessions of logged volume (oldest → newest)</span>
    </section>
  );
}

export function ProgressOverviewPage() {
  const { status, capped, sessionCount, stats, frequent, prs, volumeTrend } = useProgressOverview();

  return (
    <>
      <PageMeta title="Progress | FoFit" description="Your FoFit training progress and trends." />
      <div className="history">
        <header className="history__head">
          <span className="bodylab__eyebrow">◆ Progress</span>
          <h1 className="history__title">Your training</h1>
          <p className="history__sub">
            Built from your real logged sessions — the same data the FoFit app tracks.
          </p>
        </header>

        {status === "loading" && (
          <div className="progress-stats" aria-busy="true">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="progress-stat history-row--skeleton" style={{ height: 70 }} />
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="bodylab-state">
            <div className="bodylab-state__title">Couldn&apos;t load your progress</div>
            <p>Please try again in a moment.</p>
          </div>
        )}

        {status === "ready" && sessionCount === 0 && (
          <div className="bodylab-state">
            <div className="bodylab-state__title">No workouts logged yet</div>
            <p>Log a session in the FoFit app and your progress shows up here.</p>
          </div>
        )}

        {status === "ready" && sessionCount > 0 && (
          <>
            <section className="progress-stats">
              <Stat value={stats.total} label="Workouts" />
              <Stat value={stats.last7} label="This week" />
              <Stat value={stats.last30} label="This month" />
              <Stat value={stats.recentActiveDays} label="Active days / 28" />
              {stats.totalVolume != null && <Stat value={`${Math.round(stats.totalVolume).toLocaleString()}`} label="Total lb volume" />}
              {stats.avgDurationMin != null && <Stat value={`${stats.avgDurationMin}m`} label="Avg session" />}
            </section>

            <VolumeTrend points={volumeTrend} />

            {prs.length > 0 && (
              <section className="progress-card">
                <span className="bodylab__eyebrow">◆ Recent personal records</span>
                <div className="progress-pr-grid">
                  {prs.map((pr) => (
                    <div key={pr.name} className="progress-pr">
                      <span className="progress-pr__name">{pr.name}</span>
                      <span className="progress-pr__value">
                        {pr.weight} {pr.reps != null ? `× ${pr.reps}` : ""}
                      </span>
                      <span className="progress-pr__date">{formatDateOnly(pr.date)}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {frequent.length > 0 && (
              <section className="progress-card">
                <span className="bodylab__eyebrow">◆ Most trained</span>
                <div className="progress-freq">
                  {frequent.map((f) => (
                    <div key={f.name} className="progress-freq-row">
                      <span>{f.name}</span>
                      <span className="progress-freq-row__count">{f.sessions} sessions</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {capped && (
              <p className="progress-cap-note">Showing your most recent {sessionCount} sessions.</p>
            )}
          </>
        )}
      </div>
    </>
  );
}

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="progress-stat">
      <span className="progress-stat__value">{typeof value === "number" ? value.toLocaleString() : value}</span>
      <span className="progress-stat__label">{label}</span>
    </div>
  );
}
