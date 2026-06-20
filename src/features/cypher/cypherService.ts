import { supabase } from "../../lib/supabase";
import type { WorkoutSession } from "../training/types";

const PROXY_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/openai-proxy`;

export type CypherMessage = { role: "user" | "assistant"; content: string };

/** Heaviest set per exercise from a session, for the coaching context. */
function topLift(session: WorkoutSession): string | null {
  let best: { name: string; w: number; r: number } | null = null;
  for (const ex of session.exercises) {
    for (const set of ex.sets) {
      const w = parseFloat(set.weight);
      const r = parseFloat(set.reps);
      if (Number.isFinite(w) && Number.isFinite(r) && w > 0 && (!best || w > best.w)) {
        best = { name: ex.name, w, r };
      }
    }
  }
  return best ? `${best.name} ${best.w}×${best.r}` : null;
}

/**
 * Builds Cypher's web system prompt — self-contained (the openai-proxy does NOT build a chat prompt;
 * the client owns it) and GROUNDED in the user's REAL recent training so the web Cypher is cohesive
 * with the app, not a generic chatbot. Includes the same medical-safety floor the mobile app enforces.
 */
export function buildWebCypherPrompt(sessions: WorkoutSession[]): string {
  const recent = sessions.slice(0, 6).map((s) => {
    const lift = topLift(s);
    const date = new Date(s.date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return `- ${date} ${s.sessionName}${lift ? ` — top set ${lift}` : ""}${
      s.totalVolume > 0 ? ` (${Math.round(s.totalVolume).toLocaleString()} lb volume)` : ""
    }`;
  });
  const trainingBlock = recent.length
    ? `The user's RECENT logged training (most recent first):\n${recent.join("\n")}`
    : "The user has no recent logged training yet — ask what they've been doing.";

  return [
    "You are Cypher, FoFit's AI strength & conditioning coach. You are direct, encouraging, and concrete — a real coach, not a hype bot.",
    "Coach from the user's ACTUAL data below. When you recommend a weight or progression, reference their real last set for that lift and say why today's number differs (recovery, effort, a recent PR). Never invent a number you can't see — if you don't have the data for a lift, ask what they last lifted.",
    "Keep replies tight: 2-5 sentences unless they ask for a full plan. No emojis, no markdown headers.",
    "SAFETY FLOOR (hard rule): your guidance is coaching, not medical advice. If the user mentions real pain, injury, or a medical issue, never tell them to push through — advise easing off and seeing a professional, while respecting their autonomy. Cite general training principles, not diagnoses.",
    "",
    trainingBlock,
  ].join("\n");
}

/** Sends the conversation to the deployed openai-proxy (cypher-chat → Claude) and returns the reply.
 *  Auth = the user's Supabase JWT; the proxy gates + routes. Non-streaming for simplicity. */
export async function sendCypherMessage(
  messages: CypherMessage[],
  systemPrompt: string,
): Promise<string> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.access_token) throw new Error("You're not signed in.");

  const res = await fetch(PROXY_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages,
      systemPrompt,
      type: "cypher-chat",
      purpose: "cypher-chat",
      stream: false,
      maxTokens: 600,
    }),
  });
  if (!res.ok) throw new Error("Cypher is unavailable right now. Please try again.");
  const data = (await res.json().catch(() => null)) as { content?: unknown } | null;
  const text = data && typeof data.content === "string" ? data.content.trim() : "";
  if (!text) throw new Error("Cypher didn't respond. Please try again.");
  return text;
}
