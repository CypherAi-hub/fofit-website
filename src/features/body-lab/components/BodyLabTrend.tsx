import { useMemo, useState } from "react";

import type { BodyCheckIn } from "../types";
import { BODY_MEASUREMENTS } from "../measurements";
import { useBodyLabGoals } from "../useBodyLabGoals";

type Point = { t: number; v: number };
type Metric = { key: string; label: string; unit: string; digits: number; points: Point[] };

function buildPoints(checkIns: BodyCheckIn[], get: (c: BodyCheckIn) => number | null | undefined): Point[] {
  return checkIns
    .map((c) => ({ t: new Date(c.capturedAt).getTime(), v: get(c) }))
    .filter((p): p is Point => p.v != null && Number.isFinite(p.t) && Number.isFinite(p.v))
    .sort((a, b) => a.t - b.t);
}

/**
 * A trend over ANY logged body metric (weight, body fat, or a measurement), with an optional
 * GOAL line + progress-to-goal. Dependency-free SVG sparkline. Only metrics with ≥2 real points
 * appear; the card hides when nothing qualifies. Deltas + distance-to-goal are neutral (no
 * good/bad — depends on the user's goal). Never fabricates: only real logged values.
 */
export function BodyLabTrend({ checkIns }: { checkIns: BodyCheckIn[] }) {
  const { goals, setGoal, clearGoal } = useBodyLabGoals();

  const metrics = useMemo<Metric[]>(() => {
    const list: Metric[] = [];
    const weight = buildPoints(checkIns, (c) => c.weightKg);
    if (weight.length >= 2) list.push({ key: "weight", label: "Weight", unit: " kg", digits: 1, points: weight });
    const bodyfat = buildPoints(checkIns, (c) => c.bodyFatMin);
    if (bodyfat.length >= 2) list.push({ key: "bodyfat", label: "Body fat", unit: "%", digits: 0, points: bodyfat });
    for (const m of BODY_MEASUREMENTS) {
      const pts = buildPoints(checkIns, (c) => c.measurements?.[m.key]);
      if (pts.length >= 2) list.push({ key: m.key, label: m.label, unit: " cm", digits: 1, points: pts });
    }
    return list;
  }, [checkIns]);

  const [selectedKey, setSelectedKey] = useState<string>("weight");

  if (metrics.length === 0) return null;

  const active = metrics.find((m) => m.key === selectedKey) ?? metrics[0];
  const { points, unit, digits, label } = active;
  const goal = goals[active.key];

  const values = points.map((p) => p.v);
  const rangeVals = goal != null && goal > 0 ? [...values, goal] : values;
  const min = Math.min(...rangeVals);
  const max = Math.max(...rangeVals);
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
    <section className="bodylab-card bodylab-trend" aria-label={`${label} trend`}>
      <div className="bodylab-trend__head">
        <span className="bodylab__eyebrow">◆ {label} trend</span>
        {metrics.length > 1 && (
          <select
            className="bodylab-input bodylab-trend__select"
            value={active.key}
            onChange={(e) => setSelectedKey(e.target.value)}
            aria-label="Trend metric"
          >
            {metrics.map((m) => (
              <option key={m.key} value={m.key}>
                {m.label}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="bodylab-trend__row">
        <svg viewBox={`0 0 ${W} ${H}`} className="bodylab-trend__spark" preserveAspectRatio="none" aria-hidden>
          {goal != null && goal > 0 && (
            <line
              x1={pad}
              x2={W - pad}
              y1={y(goal)}
              y2={y(goal)}
              stroke="var(--green)"
              strokeWidth={1.5}
              strokeDasharray="4 3"
            />
          )}
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
      <GoalControl
        key={active.key}
        unit={unit}
        digits={digits}
        last={last}
        goal={goal}
        onSet={(target) => setGoal(active.key, target)}
        onClear={() => clearGoal(active.key)}
      />
    </section>
  );
}

function GoalControl({
  unit,
  digits,
  last,
  goal,
  onSet,
  onClear,
}: {
  unit: string;
  digits: number;
  last: number;
  goal: number | undefined;
  onSet: (target: number) => Promise<void>;
  onClear: () => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(goal != null ? String(goal) : "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    const target = parseFloat(input);
    if (!Number.isFinite(target) || target <= 0) {
      setError("Enter a valid target.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await onSet(target);
      setEditing(false);
    } catch {
      setError("Couldn't save your goal.");
    } finally {
      setBusy(false);
    }
  }

  if (goal != null && !editing) {
    const remaining = goal - last;
    const reached = Math.abs(remaining) < (unit === "%" ? 0.5 : 0.5);
    const distance = `${Math.abs(remaining).toFixed(digits).replace(/\.0$/, "")}${unit}`;
    return (
      <div className="bodylab-goal">
        <span className="bodylab-goal__text">
          Goal <strong>{goal}{unit}</strong> · {reached ? "reached 🎯" : `${distance} to go`}
        </span>
        <div className="bodylab-row">
          <button
            type="button"
            className="bodylab-seg__btn"
            onClick={() => {
              setInput(String(goal));
              setEditing(true);
            }}
          >
            Edit
          </button>
          <button
            type="button"
            className="bodylab-seg__btn"
            onClick={() => onClear().catch(() => {})}
          >
            Clear
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bodylab-goal">
      <label className="bodylab-goal__text">
        Set a goal:
        <input
          className="bodylab-input bodylab-goal__input"
          inputMode="decimal"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`target${unit}`}
          aria-label={`Target${unit}`}
          disabled={busy}
        />
      </label>
      <div className="bodylab-row">
        <button type="button" className="bodylab-btn bodylab-btn--primary" onClick={save} disabled={busy}>
          {busy ? "Saving…" : "Save"}
        </button>
        {goal != null && (
          <button type="button" className="bodylab-seg__btn" onClick={() => setEditing(false)} disabled={busy}>
            Cancel
          </button>
        )}
      </div>
      {error && <span className="bodylab-goal__error">{error}</span>}
    </div>
  );
}
