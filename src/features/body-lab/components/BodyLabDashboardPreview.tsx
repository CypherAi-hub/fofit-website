import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { supabase } from "../../../lib/supabase";
import { getBodyLabSummary, type BodyLabSummary } from "../dashboardSummary";
import "../bodyLab.css";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/**
 * Dashboard preview of the user's Body Lab progress — surfaces the latest check-in + count so the
 * hub reflects real progress rather than just linking out. Additive + private (signed thumbnail
 * only); degrades to an empty "start tracking" prompt on no data / error.
 */
export function BodyLabDashboardPreview() {
  const [summary, setSummary] = useState<BodyLabSummary | null>(null);

  useEffect(() => {
    let alive = true;
    void getBodyLabSummary(supabase).then((s) => {
      if (alive) setSummary(s);
    });
    return () => {
      alive = false;
    };
  }, []);

  if (summary === null) {
    return (
      <div className="bodylab-card bodylab-dash">
        <div className="bodylab-spinner" />
        <span style={{ color: "var(--text-soft)" }}>Loading your progress…</span>
      </div>
    );
  }

  if (summary.count === 0) {
    return (
      <div className="bodylab-card bodylab-dash">
        <div className="bodylab-dash__body">
          <span className="bodylab__eyebrow">◆ Body Lab</span>
          <span className="bodylab-dash__sub">
            Start your private progress timeline — your first check-in.
          </span>
        </div>
        <Link to="/dashboard/body-lab" className="bodylab-btn bodylab-btn--primary">
          Start tracking
        </Link>
      </div>
    );
  }

  return (
    <Link to="/dashboard/body-lab" className="bodylab-card bodylab-dash bodylab-dash--link">
      {summary.latestThumbUrl ? (
        <img className="bodylab-dash__thumb" src={summary.latestThumbUrl} alt="Latest check-in" />
      ) : (
        <div className="bodylab-dash__thumb bodylab-tile__fallback">—</div>
      )}
      <div className="bodylab-dash__body">
        <span className="bodylab__eyebrow">◆ Body Lab</span>
        <strong className="bodylab-dash__count">
          {summary.count} check-in{summary.count === 1 ? "" : "s"}
        </strong>
        {summary.latest && (
          <span className="bodylab-dash__sub">Last: {formatDate(summary.latest.capturedAt)}</span>
        )}
      </div>
      <span className="bodylab-dash__arrow" aria-hidden>
        →
      </span>
    </Link>
  );
}
