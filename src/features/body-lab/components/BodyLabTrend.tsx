import { useMemo, useState } from "react";

import type { BodyCheckIn } from "../types";

type Point = { t: number; v: number };
type MetricKey = "weight" | "bodyfat";

function buildPoints(checkIns: BodyCheckIn[], get: (c: BodyCheckIn) => number | null): Point[] {
  return checkIns
    .map((c) => ({ t: new Date(c.capturedAt).getTime(), v: get(c) }))
    .filter((p): p is Point => p.v != null && Number.isFinite(p.t) && Number.isFinite(p.v))
    .sort((a, b) => a.t - b.t);
}

/**
 * Weight + body-fat trend over the check-ins that logged each metric. Dependency-free
 * (hand-rolled SVG sparkline). Each metric self-gates to nothing below 2 real points, and
 * the toggle only appears when BOTH metrics have data. Deltas are neutral (no good/bad
 * coloring — that depends on the user's goal). Never fabricates: only real logged values.
 */
export function BodyLabTrend({ checkIns }: { checkIns: BodyCheckIn[] }) {
  const series = useMemo(
    () => ({
      weight: buildPoints(checkIns, (c) => c.weightKg),
      bodyfat: buildPoints(checkIns, (c) => c.bodyFatMin),
    }),
    [checkIns],
  );

  const hasWeight = series.weight.length >= 2;
  const hasBodyfat = series.bodyfat.length >= 2;
  const [metric, setMetric] = useState<MetricKey>("weight");

  if (!hasWeight && !hasBodyfat) return null;

  // Resolve the metric to one that actually has data (weight preferred).
  const active: MetricKey = metric === "bodyfat" && hasBodyfat ? "bodyfat" : "weight";
  const points = series[active];
  if (points.length < 2) return null;

  const unit = active === "weight" ? " kg" : "%";
  const digits = active === "weight" ? 1 : 0;
  const values = points.map((p) => p.v);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const W = 280;
  const H = 56;
  const pad = 5;
  const x = (i: number) => pad + (i / (points.length - 1)) * (W - 2 * pad);
  const y = (v: number) => pad + (1 - (v - min) / range) * (H - 2 * pad);
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(p.v).toFixed(1)}`).join(" ");

  const last = points[points.length - 1].v;
  const delta = last - points[0].v;
  const deltaStr = `${delta > 0 ? "+" : ""}${delta.toFixed(digits).replace(/\.0$/, "")}${unit}`;

  return (
    <section className="bodylab-card bodylab-trend" aria-label={`${active === "weight" ? "Weight" : "Body fat"} trend`}>
      <div className="bodylab-trend__head">
        <span className="bodylab__eyebrow">◆ {active === "weight" ? "Weight" : "Body fat"} trend</span>
        {hasWeight && hasBodyfat && (
          <div className="bodylab-seg" role="tablist" aria-label="Trend metric">
            <button
              type="button"
              role="tab"
              aria-selected={active === "weight"}
              className={`bodylab-seg__btn ${active === "weight" ? "bodylab-seg__btn--on" : ""}`}
              onClick={() => setMetric("weight")}
            >
              Weight
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={active === "bodyfat"}
              className={`bodylab-seg__btn ${active === "bodyfat" ? "bodylab-seg__btn--on" : ""}`}
              onClick={() => setMetric("bodyfat")}
            >
              Body fat
            </button>
          </div>
        )}
      </div>
      <div className="bodylab-trend__row">
        <svg viewBox={`0 0 ${W} ${H}`} className="bodylab-trend__spark" preserveAspectRatio="none" aria-hidden>
          <path d={path} fill="none" stroke="var(--blue)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          <circle cx={x(points.length - 1)} cy={y(last)} r={3} fill="var(--blue)" />
        </svg>
        <div className="bodylab-trend__stat">
          <strong>
            {last}
            {unit}
          </strong>
          <span>
            {deltaStr} over {points.length} check-ins
          </span>
        </div>
      </div>
    </section>
  );
}
