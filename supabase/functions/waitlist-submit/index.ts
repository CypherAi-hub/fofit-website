import { createClient } from "npm:@supabase/supabase-js@2";

const foundingLimit = 500;
const allowedRoles = new Set(["lifter", "athlete", "coach"]);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  if (req.method === "GET") {
    const countResult = await getWaitlistCount(supabase);
    if (countResult.error) {
      return json({ error: countResult.error.message, limit: foundingLimit }, 500);
    }
    return json({ count: countResult.count ?? 0, limit: foundingLimit });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json();

    const email = String(body.email ?? "").trim().toLowerCase();
    const full_name = String(body.fullName ?? body.name ?? "").trim() || null;
    const role = readRole(body.role);
    const goal = String(body.goal ?? "").trim() || null;
    const profile = String(body.profile ?? body.experience ?? "").trim() || null;
    const referral_code = String(body.referralCode ?? "").trim() || null;
    const referred_by = String(body.referredBy ?? body.ref ?? "").trim() || null;

    if (!email) {
      return json({ error: "Email is required" }, 400);
    }

    const waitlistRow: Record<string, unknown> = {
      email,
      full_name,
      goal,
      profile,
      referral_code,
      referred_by,
      source: "website",
      payload: body,
    };

    if (role) {
      waitlistRow.role = role;
    }

    const { data, error } = await supabase
      .from("waitlist_entries")
      .upsert(
        waitlistRow,
        { onConflict: "email" },
      )
      .select("id, created_at, referral_code")
      .single();

    if (error) {
      return json({ error: error.message }, 500);
    }

    const countResult = await getWaitlistCount(supabase);

    return json({
      ok: true,
      success: true,
      id: data.id,
      referral_code: data.referral_code ?? referral_code,
      count: countResult.count ?? null,
      limit: foundingLimit,
    });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : "Unknown error" }, 500);
  }
});

function readRole(value: unknown) {
  const role = String(value ?? "").trim().toLowerCase();
  return allowedRoles.has(role) ? role : null;
}

async function getWaitlistCount(supabase: ReturnType<typeof createClient>) {
  const { count, error } = await supabase
    .from("waitlist_entries")
    .select("id", { count: "exact", head: true });
  return { count, error };
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
