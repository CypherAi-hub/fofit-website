const ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export type WaitlistResult =
  | { kind: 'success'; referralCode: string; newSignup: true }
  | { kind: 'already_joined'; referralCode: string; newSignup: false }
  | { kind: 'error'; message: string };

export async function joinWaitlist(
  name: string,
  email: string
): Promise<WaitlistResult> {
  if (!ENDPOINT || !ANON_KEY) {
    return { kind: 'error', message: 'Waitlist is not configured.' };
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify({ name, email }),
    });

    const data = await response.json();

    if (data.already_joined) {
      return {
        kind: 'already_joined',
        referralCode: data.referral_code,
        newSignup: false,
      };
    }

    if (data.success) {
      return {
        kind: 'success',
        referralCode: data.referral_code,
        newSignup: true,
      };
    }

    return {
      kind: 'error',
      message: data.error || 'Something went wrong. Try again?',
    };
  } catch (_err) {
    return {
      kind: 'error',
      message: 'Network issue. Check your connection and retry.',
    };
  }
}
