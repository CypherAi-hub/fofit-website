import { useEffect } from "react";

import { canonicalUrl } from "../lib/canonical-handoff";

/**
 * /login and /signup on fofit.app are now doorways to app.fofit.app, which owns
 * canonical browser auth. Marketing keeps no account state of its own.
 *
 * Unlike /welcome and /dashboard these redirect immediately: no auth exchange
 * or waitlist claim happens on them, so there is nothing to finish first. The
 * query string still travels — waitlist emails link to /signup?claim=<email>,
 * and acquisition params must survive the hop.
 *
 * These routes stay mounted rather than being deleted so existing links, ads
 * and bookmarks keep resolving.
 */
export function CanonicalAuthRedirect({ path }: { path: "/login" | "/signup" }) {
  useEffect(() => {
    window.location.replace(canonicalUrl(path));
  }, [path]);

  return (
    <main className="flex min-h-[50vh] items-center justify-center px-6 text-center">
      <p className="text-sm text-white/70">Opening FoFit…</p>
    </main>
  );
}
