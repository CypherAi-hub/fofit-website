/**
 * iOS beta funnel config.
 *
 * The TestFlight link is a controlled beta link, not a secret — it is safe to
 * ship in client config. Override per environment with VITE_TESTFLIGHT_URL.
 *
 * NOTE: the original brief suggested NEXT_PUBLIC_TESTFLIGHT_URL. This is a
 * Vite app, not Next.js — client env vars must be VITE_-prefixed and read via
 * import.meta.env. NEXT_PUBLIC_* would be silently ignored here.
 */

const FALLBACK_TESTFLIGHT_URL = "https://testflight.apple.com/join/3UugjuvD";

const envTestflightUrl = import.meta.env.VITE_TESTFLIGHT_URL as
  | string
  | undefined;

export const TESTFLIGHT_URL =
  (envTestflightUrl && envTestflightUrl.trim()) || FALLBACK_TESTFLIGHT_URL;

/**
 * How the funnel reveals the TestFlight link:
 *  - "request_only" — collect details, never show the link
 *  - "post_submit"  — show the link only after a successful submit (default)
 *  - "direct"       — show the link immediately, no form gate
 */
export type BetaMode = "request_only" | "post_submit" | "direct";

export const BETA_MODE: BetaMode = "post_submit";

export type BetaOption = { value: string; label: string };

export const DEVICE_OPTIONS: BetaOption[] = [
  { value: "iphone", label: "iPhone" },
  { value: "android", label: "Android" },
  { value: "both", label: "Both" },
];

export const FITNESS_ROLE_OPTIONS: BetaOption[] = [
  { value: "lifter", label: "Lifter" },
  { value: "athlete", label: "Athlete" },
  { value: "coach", label: "Coach" },
  { value: "beginner", label: "Beginner" },
  { value: "other", label: "Other" },
];

export const GOAL_OPTIONS: BetaOption[] = [
  { value: "build-muscle", label: "Build muscle" },
  { value: "lose-fat", label: "Lose fat" },
  { value: "improve-performance", label: "Improve performance" },
  { value: "get-consistent", label: "Get consistent" },
  { value: "other", label: "Other" },
];

export const HEAR_OPTIONS: BetaOption[] = [
  { value: "", label: "Select one (optional)" },
  { value: "friend", label: "Friend or teammate" },
  { value: "social", label: "Social media" },
  { value: "search", label: "Search" },
  { value: "coach", label: "A coach" },
  { value: "other", label: "Other" },
];

/**
 * TestFlight runs on iOS only. iPhone (or both) testers get the link;
 * Android-only signups are confirmed for the waitlist instead.
 */
export function deviceCanUseTestFlight(device: string): boolean {
  return device === "iphone" || device === "both";
}
