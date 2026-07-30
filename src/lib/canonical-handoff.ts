import { useEffect, useState } from "react";

import { useAuth } from "./auth-context";

// fofit.app is marketing. Accounts live on app.fofit.app, which owns canonical
// browser auth. These helpers move athletes there without dropping the two
// things this origin is still responsible for.

const APP_ORIGIN =
  (import.meta.env.VITE_FOFIT_APP_URL as string | undefined) ?? "https://app.fofit.app";

// Acquisition params we forward so attribution survives the hop. Captured here
// because nothing on this site captured them before — do not assume upstream
// code has already stashed them.
const ACQUISITION_PARAMS = [
  "ref",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

/**
 * Builds the app.fofit.app URL for a path, carrying the current query string
 * plus any acquisition params. `claim` is preserved too — waitlist emails link
 * to /signup?claim=<email> and that prefill must survive the redirect.
 */
export function canonicalUrl(path: string, search = window.location.search): string {
  const target = new URL(path, APP_ORIGIN);
  const incoming = new URLSearchParams(search);

  incoming.forEach((value, key) => {
    if (key === "claim" || ACQUISITION_PARAMS.includes(key)) {
      target.searchParams.set(key, value);
    }
  });

  return target.toString();
}

/**
 * True once this origin has nothing left to do for the athlete.
 *
 * Two jobs must finish BEFORE the hop, which is why /welcome and /dashboard
 * cannot be plain redirects:
 *
 *  1. OAuth and magic-link callbacks land HERE, and the Supabase client is
 *     configured with detectSessionInUrl — the code/hash in the URL is
 *     exchanged for a session on this origin. Redirecting first throws the
 *     exchange away, or worse forwards auth material in the URL.
 *  2. useWaitlistClaim() only runs on these two pages. It calls the
 *     claim-waitlist function and stamps referral_code into auth metadata.
 *     Redirect early and waitlist-to-account conversion dies silently — no
 *     error, just a lost referral.
 *
 * The claim stamps `waitlist_claim_checked`, so that flag is the completion
 * signal. It is bounded: if the edge function is undeployed the claim returns
 * without stamping, and an unbounded wait would strand the athlete on a
 * marketing page forever.
 */
const CLAIM_WAIT_CEILING_MS = 4000;

export function useCanonicalHandoff(path: "/welcome" | "/dashboard") {
  const { user, loading } = useAuth();
  const [waitedOut, setWaitedOut] = useState(false);

  useEffect(() => {
    if (loading) return;

    // No session and no auth material in the URL: nothing to hand off, so go
    // immediately rather than showing a marketing shell to a signed-out visitor.
    const hasAuthMaterial =
      window.location.hash.includes("access_token") ||
      new URLSearchParams(window.location.search).has("code");

    if (!user && !hasAuthMaterial) {
      window.location.replace(canonicalUrl(path));
      return;
    }

    if (!user) return; // exchange still in flight

    if (user.user_metadata?.waitlist_claim_checked) {
      window.location.replace(canonicalUrl(path));
      return;
    }

    const timer = window.setTimeout(() => setWaitedOut(true), CLAIM_WAIT_CEILING_MS);
    return () => window.clearTimeout(timer);
  }, [user, loading, path]);

  // The claim did not report back in time. Hand off anyway: a missed referral
  // stamp is recoverable, a stranded athlete is not.
  useEffect(() => {
    if (waitedOut) {
      window.location.replace(canonicalUrl(path));
    }
  }, [waitedOut, path]);
}
