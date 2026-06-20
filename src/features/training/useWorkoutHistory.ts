import { useCallback, useEffect, useRef, useState } from "react";

import { supabase } from "../../lib/supabase";
import { listSessionsPage } from "./trainingService";
import type { WorkoutSessionSummary } from "./models";

type Status = "loading" | "error" | "ready";

const PAGE = 25;

export function useWorkoutHistory() {
  const [status, setStatus] = useState<Status>("loading");
  const [sessions, setSessions] = useState<WorkoutSessionSummary[]>([]);
  const [nextBefore, setNextBefore] = useState<string | null>(null);
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
        setNextBefore(p.nextBefore);
        setStatus("ready");
      })
      .catch(() => {
        if (alive.current) setStatus("error");
      });
  }, []);

  const loadMore = useCallback(async () => {
    if (!nextBefore || loadingMore) return;
    setLoadingMore(true);
    try {
      const p = await listSessionsPage(supabase, { limit: PAGE, before: nextBefore });
      if (!alive.current) return;
      // Guard against a duplicate id if a session shares the cursor date boundary.
      setSessions((cur) => {
        const seen = new Set(cur.map((s) => s.id));
        return [...cur, ...p.sessions.filter((s) => !seen.has(s.id))];
      });
      setNextBefore(p.nextBefore);
    } finally {
      if (alive.current) setLoadingMore(false);
    }
  }, [nextBefore, loadingMore]);

  return { status, sessions, hasMore: nextBefore != null, loadingMore, loadMore };
}
