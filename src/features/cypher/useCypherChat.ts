import { useCallback, useEffect, useRef, useState } from "react";

import { supabase } from "../../lib/supabase";
import { listWorkoutSessions } from "../training/trainingService";
import { buildWebCypherPrompt, sendCypherMessage, type CypherMessage } from "./cypherService";

export function useCypherChat() {
  const [messages, setMessages] = useState<CypherMessage[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const systemPromptRef = useRef<string>(buildWebCypherPrompt([]));

  // Build the coaching system prompt from the user's REAL recent training (once on mount), so the
  // web Cypher is grounded in their workouts. Degrades to a generic prompt if training can't load.
  useEffect(() => {
    let alive = true;
    void listWorkoutSessions(supabase, 20)
      .then((sessions) => {
        if (alive) systemPromptRef.current = buildWebCypherPrompt(sessions);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const send = useCallback(
    async (text: string) => {
      const clean = text.trim();
      if (!clean || sending) return;
      setError(null);
      const next: CypherMessage[] = [...messages, { role: "user", content: clean }];
      setMessages(next);
      setSending(true);
      try {
        const reply = await sendCypherMessage(next, systemPromptRef.current);
        setMessages((cur) => [...cur, { role: "assistant", content: reply }]);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Cypher is unavailable right now.");
      } finally {
        setSending(false);
      }
    },
    [messages, sending],
  );

  return { messages, sending, error, send };
}
