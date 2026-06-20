import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useWorkoutHistory } from "../features/training/useWorkoutHistory";
import { formatDateOnly, parseDateOnly } from "../features/training/adapter";
import type { WorkoutSessionSummary } from "../features/training/models";
import { PageMeta } from "../components/layout/PageMeta";
import "../features/training/history.css";

function dateNum(d: string): number {
  const p = parseDateOnly(d);
  return p ? p.year * 10000 + p.month * 100 + p.day : 0;
}

export function WorkoutHistoryPage() {
  const { status, sessions, hasMore, loadingMore, loadMore } = useWorkoutHistory();
  const [query, setQuery] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filtered = useMemo<WorkoutSessionSummary[]>(() => {
    const q = query.trim().toLowerCase();
    const fromN = from ? dateNum(from) : 0;
    const toN = to ? dateNum(to) : Infinity;
    return sessions.filter((s) => {
      if (q && !s.title.toLowerCase().includes(q)) return false;
      const dn = dateNum(s.date);
      return dn >= fromN && dn <= toN;
    });
  }, [sessions, query, from, to]);

  const filtering = query.trim() !== "" || from !== "" || to !== "";

  return (
    <>
      <PageMeta title="History | FoFit" description="Your FoFit workout history." />
      <div className="history">
        <header className="history__head">
          <span className="bodylab__eyebrow">◆ History</span>
          <h1 className="history__title">Workout history</h1>
          <p className="history__sub">Every session you&apos;ve logged in FoFit. Tap one to see the details.</p>
        </header>

        {status === "ready" && sessions.length > 0 && (
          <div className="history-filters">
            <input
              className="history-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by workout name…"
              aria-label="Search workouts by name"
            />
            <label className="history-daterange">
              <span>From</span>
              <input className="history-input" type="date" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="From date" />
            </label>
            <label className="history-daterange">
              <span>To</span>
              <input className="history-input" type="date" value={to} onChange={(e) => setTo(e.target.value)} aria-label="To date" />
            </label>
          </div>
        )}

        {status === "loading" && (
          <div className="history-list" aria-busy="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="history-row history-row--skeleton" />
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="bodylab-state">
            <div className="bodylab-state__title">Couldn&apos;t load your history</div>
            <p>Please try again in a moment.</p>
          </div>
        )}

        {status === "ready" && sessions.length === 0 && (
          <div className="bodylab-state">
            <div className="bodylab-state__title">No workouts logged yet</div>
            <p>Log a session in the FoFit app and it&apos;ll show up here.</p>
          </div>
        )}

        {status === "ready" && sessions.length > 0 && (
          <>
            {filtered.length === 0 ? (
              <div className="bodylab-state">
                <div className="bodylab-state__title">No matches</div>
                <p>Nothing matches your search or date range (across the {sessions.length} loaded sessions).</p>
              </div>
            ) : (
              <ul className="history-list">
                {filtered.map((s) => (
                  <li key={s.id}>
                    <Link to={`/dashboard/history/${s.id}`} className="history-row">
                      <div className="history-row__main">
                        <strong>{s.title}</strong>
                        <span className="history-row__date">{formatDateOnly(s.date)}</span>
                      </div>
                      <div className="history-row__meta">
                        {s.totalVolume != null && <span>{Math.round(s.totalVolume).toLocaleString()} lb</span>}
                        <span>{s.exerciseCount} {s.exerciseCount === 1 ? "exercise" : "exercises"}</span>
                        <span>{s.completedSetCount} sets</span>
                        {s.durationSec != null && <span>{Math.round(s.durationSec / 60)} min</span>}
                      </div>
                      <span className="history-row__chevron" aria-hidden>›</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {hasMore && !filtering && (
              <button type="button" className="bodylab-btn history-more" onClick={() => void loadMore()} disabled={loadingMore}>
                {loadingMore ? "Loading…" : "Load older workouts"}
              </button>
            )}
            {filtering && hasMore && (
              <p className="history-note">Search + filters apply to the {sessions.length} loaded sessions. Clear them to load older workouts.</p>
            )}
          </>
        )}
      </div>
    </>
  );
}
