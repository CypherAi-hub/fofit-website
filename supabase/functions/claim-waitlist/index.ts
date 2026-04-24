// supabase/functions/claim-waitlist/index.ts
//
// Called once per newly-authenticated user. Looks up any existing waitlist
// row matching the user's email, stamps claimed_at + claimed_by_user_id,
// and returns the referral_code (if any) so the caller can persist it to
// the user's auth metadata. Idempotent — safe to call repeatedly.
//
// Auth: caller must send a bearer token for the signed-in user. We verify
// the token, read the email off the auth.user, and only match that email.
// Never trust an email from the request body.

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) {
    return json({ error: "Missing bearer token" }, 401);
  }

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  // Verify the caller using the token — this gives us a trusted email.
  const userClient = createClient(SUPABASE_URL, SERVICE_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const { data: userData, error: userErr } = await userClient.auth.getUser(token);
  if (userErr || !userData?.user?.email) {
    return json({ error: "Invalid session" }, 401);
  }
  const user = userData.user;
  const email = user.email!.toLowerCase();

  // Elevated client for the write.
  const admin = createClient(SUPABASE_URL, SERVICE_KEY);

  // Find the existing waitlist row, if any.
  const { data: existing } = await admin
    .from("waitlist_entries")
    .select("id, email, referral_code, claimed_at")
    .ilike("email", email)
    .maybeSingle();

  if (!existing) {
    return json({ claimed: false, reason: "no_waitlist_row" });
  }

  if (existing.claimed_at) {
    return json({
      claimed: true,
      already_claimed: true,
      referral_code: existing.referral_code,
    });
  }

  const { error: updateErr } = await admin
    .from("waitlist_entries")
    .update({
      claimed_at: new Date().toISOString(),
      claimed_by_user_id: user.id,
    })
    .eq("id", existing.id);

  if (updateErr) {
    return json({ error: updateErr.message }, 500);
  }

  return json({
    claimed: true,
    already_claimed: false,
    referral_code: existing.referral_code,
  });
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
