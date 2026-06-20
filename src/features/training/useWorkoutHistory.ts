import { useCallback, useEffect, useRef, useState } from "react";

import { supabase } from "../../lib/supabase";
import { listSessionsPage, type HistoryCursor } from "./trainingService";
import type { WorkoutSessionSummary } from "./models";

type Status = "loading" | "error" | "ready";

const PAGE = 25;

export function useWorkoutHistory() {
  const [status, setStatus] = useState<Status>("loading");
  const [sessions, setSessions] = useState<WorkoutSessionSummary[]>([]);
  const [nextCursor, setNextCursor] = useState<HistoryCursor | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  useEffect(() => {
    setStatus("loading");
    void listSessionsPage(supabase, { limit: PAGE })
      .then((p) => {
        if (!alive.current) return;
        setSessions(p.sessions);
        setNextCursor(p.nextCursor);
        setStatus("ready");
      })
      .catch(() => {
        if (alive.current) setStatus("error");
      });
  }, []);

  const loadMore = useCallback(async () => {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const p = await listSessionsPage(supabase, { limit: PAGE, cursor: nextCursor });
      if (!alive.current) return;
      // Belt-and-suspenders against a duplicate id at the cursor boundary.
      setSessions((cur) => {
        const seen = new Set(cur.map((s) => s.id));
        return [...cur, ...p.sessions.filter((s) => !seen.has(s.id))];
      });
      setNextCursor(p.nextCursor);
    } finally {
      if (alive.current) setLoadingMore(false);
    }
  }, [nextCursor, loadingMore]);

  return { status, sessions, hasMore: nextCursor != null, loadingMore, loadMore };
}
