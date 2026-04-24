import { useEffect } from "react";
import { supabase } from "./supabase";
import { useAuth } from "./auth-context";

const CLAIM_ENDPOINT = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/claim-waitlist`;

type ClaimResult =
  | { claimed: true; already_claimed: boolean; referral_code: string | null }
  | { claimed: false; reason: string }
  | { error: string };

async function claimWaitlistForCurrentUser(): Promise<ClaimResult | null> {
  const { data: sessionData } = await supabase.auth.getSession();
  const accessToken = sessionData.session?.access_token;
  if (!accessToken) return null;

  try {
    const res = await fetch(CLAIM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: "{}",
    });
    if (!res.ok) return null;
    return (await res.json()) as ClaimResult;
  } catch {
    return null;
  }
}

/**
 * Fire the claim-waitlist edge function exactly once for a newly-authed user.
 * If the user has a matching waitlist row, stamp it claimed and copy the
 * referral_code into the user's auth metadata. No-op if the function or the
 * underlying schema isn't deployed yet — the auth flow still works.
 */
export function useWaitlistClaim() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading || !user) return;
    // Already recorded on this user → skip.
    if (user.user_metadata?.waitlist_claim_checked) return;

    let cancelled = false;
    (async () => {
      const result = await claimWaitlistForCurrentUser();
      if (cancelled || !result) return;

      const patch: Record<string, unknown> = {
        waitlist_claim_checked: true,
      };
      if ("claimed" in result && result.claimed && result.referral_code) {
        patch.referral_code = result.referral_code;
      }

      await supabase.auth.updateUser({ data: patch });
    })();

    return () => {
      cancelled = true;
    };
  }, [user, loading]);
}
