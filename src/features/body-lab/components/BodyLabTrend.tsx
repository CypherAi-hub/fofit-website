import { useMemo } from "react";

import type { BodyCheckIn } from "../types";

/**
 * A lightweight weight trend over the check-ins that logged a weight. Dependency-free
 * (hand-rolled SVG sparkline) — no charting lib. Renders nothing until there are ≥2
 * weight points, and never fabricates: only real logged weights are plotted. The delta
 * is shown neutrally (no good/bad coloring — that depends on the user's goal).
 */
export function BodyLabTrend({ checkIns }: { checkIns: BodyCheckIn[] }) {
  const points = useMemo(
    () =>
      checkIns
        .filter((c): c is BodyCheckIn & { weightKg: number } => c.weightKg != null)
        .map((c) => ({ t: new Date(c.capturedAt).getTime(), w: c.weightKg }))
        .filter((p) => Number.isFinite(p.t) && Number.isFinite(p.w))
        .sort((a, b) => a.t - b.t),
    [checkIns],
  );

  if (points.length < 2) return null;

  const weights = points.map((p) => p.w);
  const min = Math.min(...weights);
  const max = Math.max(...weights);
  const range = max - min || 1;
  const W = 280;
  const H = 56;
  const pad = 5;
  const x = (i: number) => pad + (i / (points.length - 1)) * (W - 2 * pad);
  const y = (w: number) => pad + (1 - (w - min) / range) * (H - 2 * pad);
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(p.w).toFixed(1)}`).join(" ");

  const first = points[0].w;
  const last = points[points.length - 1].w;
  const delta = last - first;
  const deltaStr = `${delta > 0 ? "+" : ""}${delta.toFixed(1).replace(/\.0$/, "")} kg`;

  return (
    <section className="bodylab-card bodylab-trend" aria-label="Weight trend">
      <span className="bodylab__eyebrow">◆ Weight trend</span>
      <div className="bodylab-trend__row">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="bodylab-trend__spark"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d={path} fill="none" stroke="var(--blue)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          <circle cx={x(points.length - 1)} cy={y(last)} r={3} fill="var(--blue)" />
        </svg>
        <div className="bodylab-trend__stat">
          <strong>{last} kg</strong>
          <span>
            {deltaStr} over {points.length} check-ins
          </span>
        </div>
      </div>
    </section>
  );
}
