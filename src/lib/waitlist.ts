import type { WaitlistRole } from '../app/waitlist-context';

const ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const FOUNDING_LIMIT = 500;

export type WaitlistPayload = {
  name: string;
  email: string;
  role: WaitlistRole | null;
  goal: string;
  profile: string;
};

export type WaitlistResult =
  | { kind: 'success'; referralCode: string | null; newSignup: true; count: number | null }
  | { kind: 'already_joined'; referralCode: string | null; newSignup: false; count: number | null }
  | { kind: 'error'; message: string };

export type WaitlistCountResult =
  | { kind: 'success'; count: number; limit: number }
  | { kind: 'error'; message: string; limit: number };

function readCount(data: Record<string, unknown>) {
  return typeof data.count === 'number' && Number.isFinite(data.count) ? data.count : null;
}

function readReferralCode(data: Record<string, unknown>) {
  const code = data.referral_code ?? data.referralCode;
  return typeof code === 'string' && code.trim() ? code : null;
}

export async function getWaitlistCount(): Promise<WaitlistCountResult> {
  if (!SUPABASE_URL || !ANON_KEY) {
    return { kind: 'error', message: 'Waitlist count is not configured.', limit: FOUNDING_LIMIT };
  }

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/waitlist_entries?select=id&limit=0`,
      {
        method: 'HEAD',
        headers: {
          apikey: ANON_KEY,
          Authorization: `Bearer ${ANON_KEY}`,
          Prefer: 'count=exact',
        },
      },
    );

    if (!response.ok) {
      return {
        kind: 'error',
        message: 'Unable to load waitlist count.',
        limit: FOUNDING_LIMIT,
      };
    }

    const contentRange = response.headers.get('content-range');
    const contentRangeParts = contentRange?.split('/');
    const count = contentRangeParts?.length
      ? Number(contentRangeParts[contentRangeParts.length - 1])
      : NaN;
    if (!Number.isFinite(count)) {
      return { kind: 'error', message: 'Waitlist count was not returned.', limit: FOUNDING_LIMIT };
    }

    return { kind: 'success', count, limit: FOUNDING_LIMIT };
  } catch (_err) {
    return { kind: 'error', message: 'Network issue loading waitlist count.', limit: FOUNDING_LIMIT };
  }
}

export async function joinWaitlist(payload: WaitlistPayload): Promise<WaitlistResult> {
  if (!ENDPOINT || !ANON_KEY) {
    return { kind: 'error', message: 'Waitlist is not configured.' };
  }

  const body = {
    name: payload.name,
    email: payload.email,
    role: payload.role,
    goal: payload.goal,
    profile: payload.profile,
  };

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const data = (await response.json()) as Record<string, unknown>;
    const count = readCount(data);
    const referralCode = readReferralCode(data);

    if (data.already_joined) {
      return {
        kind: 'already_joined',
        referralCode,
        newSignup: false,
        count,
      };
    }

    if (data.success || data.ok) {
      return {
        kind: 'success',
        referralCode,
        newSignup: true,
        count,
      };
    }

    return {
      kind: 'error',
      message: String(data.error ?? 'Something went wrong. Try again?'),
    };
  } catch (_err) {
    return {
      kind: 'error',
      message: 'Network issue. Check your connection and retry.',
    };
  }
}
