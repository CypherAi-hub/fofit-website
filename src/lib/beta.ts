/**
 * iOS beta access submission.
 *
 * Reuses the existing waitlist edge function (VITE_WAITLIST_ENDPOINT) — no new
 * backend. That function stores the entire request body in a `payload` jsonb
 * column, so the beta-specific fields (device, feedback, how-heard) need no
 * schema change or migration.
 *
 * Two known edge-function behaviours are handled here:
 *  - It hardcodes the structured `source` column to "website" and ignores any
 *    `source` we send — so beta signups are tagged `flow: "ios-beta"` inside
 *    the payload. Analytics should query `payload->>'flow' = 'ios-beta'`.
 *  - It upserts on `email`, overwriting structured columns. We always send
 *    name / goal / profile so a returning waitlist row is never null-ed.
 */

const ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export type BetaPayload = {
  name: string;
  email: string;
  device: string;
  fitnessRole: string;
  mainGoal: string;
  willingToFeedback: boolean;
  howHeard: string;
};

export type BetaResult =
  /** captured=false means the lead reached the success state but the
   *  endpoint was not configured, so nothing was persisted. */
  | { kind: "success"; captured: boolean }
  | { kind: "error"; message: string };

export async function joinBeta(payload: BetaPayload): Promise<BetaResult> {
  // Endpoint not configured (e.g. a local preview without env). Don't punish a
  // real tester — let the funnel finish — but flag that the lead wasn't saved.
  if (!ENDPOINT || !ANON_KEY) {
    console.warn(
      "[beta] VITE_WAITLIST_ENDPOINT not configured — lead was not captured.",
    );
    return { kind: "success", captured: false };
  }

  const body = {
    name: payload.name,
    email: payload.email,
    // `role` is constrained to lifter/athlete/coach server-side; the function
    // safely nulls anything else. The raw value is still kept in `payload`.
    role: payload.fitnessRole,
    goal: payload.mainGoal,
    profile: payload.fitnessRole,
    device: payload.device,
    willingToFeedback: payload.willingToFeedback,
    howHeard: payload.howHeard,
    flow: "ios-beta",
    betaInterest: true,
  };

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const data = (await response.json()) as Record<string, unknown>;

    // already_joined is still a success for the beta funnel — the tester is
    // on the list and should still reach the TestFlight link.
    if (data.success || data.ok || data.already_joined) {
      return { kind: "success", captured: true };
    }

    return {
      kind: "error",
      message: String(data.error ?? "Something went wrong. Please try again."),
    };
  } catch (_err) {
    return {
      kind: "error",
      message: "Network issue. Check your connection and retry.",
    };
  }
}
