// supabase/functions/notify-waitlist-auth-live/index.ts
//
// One-shot broadcast to every waitlist row that hasn't claimed their
// account yet. Sends a short branded email with a one-click claim CTA.
//
// DO NOT DEPLOY OR INVOKE without explicit approval — this emails real
// people exactly once and has to be right.
//
// Invocation (intended, once ready):
//   POST /functions/v1/notify-waitlist-auth-live
//   Header: Authorization: Bearer <SERVICE_ROLE_KEY>
//   Body (optional): { "dry_run": true, "limit": 50 }
//
// Env required:
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
//   RESEND_API_KEY, RESEND_FROM (e.g. "FoFit <hi@fofit.app>")
//
// Safety:
//   - Auth: requires service-role bearer token (not the anon key)
//   - Supports dry_run=true to return the send plan without sending
//   - Writes one row per attempt into public.waitlist_notifications
//   - Batches 50 rows per burst with a 1s gap between bursts

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const BATCH_SIZE = 50;
const BATCH_DELAY_MS = 1000;
const CLAIM_BASE_URL = "https://fofit.app/signup";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const RESEND_FROM = Deno.env.get("RESEND_FROM") ?? "FoFit <hi@fofit.app>";

  const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "").trim();
  if (!token || token !== SERVICE_KEY) {
    return json({ error: "Forbidden" }, 403);
  }

  const body = await safeJson(req);
  const dryRun = body?.dry_run === true;
  const limit = typeof body?.limit === "number" ? Math.max(1, Math.min(5000, body.limit)) : 5000;

  const admin = createClient(SUPABASE_URL, SERVICE_KEY);

  const { data: rows, error } = await admin
    .from("waitlist_entries")
    .select("id, email, full_name, referral_code")
    .is("claimed_at", null)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) return json({ error: error.message }, 500);
  if (!rows?.length) return json({ ok: true, sent: 0, skipped: 0, dryRun });

  const plan = rows.map((r) => ({
    id: r.id,
    email: r.email,
    name: r.full_name ?? null,
    referral_code: r.referral_code ?? null,
    claim_url: buildClaimUrl(r.id),
  }));

  if (dryRun) {
    return json({ ok: true, dryRun: true, total: plan.length, sample: plan.slice(0, 5) });
  }

  if (!RESEND_API_KEY) return json({ error: "RESEND_API_KEY not set" }, 500);

  let sent = 0;
  let skipped = 0;
  const errors: Array<{ email: string; error: string }> = [];

  for (let i = 0; i < plan.length; i += BATCH_SIZE) {
    const batch = plan.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (target) => {
        const subject = "Your FoFit spot is ready";
        const html = htmlEmail(target);
        const text = plainEmail(target);

        try {
          const resendRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: RESEND_FROM,
              to: target.email,
              subject,
              html,
              text,
              headers: { "X-Entity-Ref-ID": target.id },
            }),
          });
          const status = resendRes.ok ? "sent" : "failed";
          if (status === "sent") sent++;
          else skipped++;

          await admin.from("waitlist_notifications").insert({
            waitlist_id: target.id,
            email: target.email,
            status,
            response: resendRes.ok ? null : await resendRes.text(),
          });
        } catch (err) {
          skipped++;
          errors.push({
            email: target.email,
            error: err instanceof Error ? err.message : "unknown",
          });
          await admin.from("waitlist_notifications").insert({
            waitlist_id: target.id,
            email: target.email,
            status: "error",
            response: err instanceof Error ? err.message : "unknown",
          });
        }
      }),
    );
    if (i + BATCH_SIZE < plan.length) {
      await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY_MS));
    }
  }

  return json({ ok: true, sent, skipped, total: plan.length, errors: errors.slice(0, 20) });
});

function buildClaimUrl(id: string) {
  const u = new URL(CLAIM_BASE_URL);
  u.searchParams.set("claim", id);
  return u.toString();
}

function htmlEmail(target: { name: string | null; claim_url: string }) {
  const greeting = target.name ? `Hey ${escapeHtml(target.name.split(" ")[0])},` : "Hey,";
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#06070A;font-family:-apple-system,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#F8FAFC;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#06070A;padding:48px 16px;">
    <tr><td align="center">
      <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;background:#0B1119;border:1px solid rgba(255,255,255,0.06);border-radius:20px;padding:40px;">
        <tr><td>
          <div style="font-size:12px;letter-spacing:6px;color:#9BB0C9;text-transform:uppercase;">FoFit</div>
          <h1 style="margin:16px 0 8px;font-size:28px;letter-spacing:-0.02em;">You were on the list. Now you&rsquo;re in.</h1>
          <p style="margin:0 0 24px;color:#C4CFDD;line-height:1.6;">${greeting} Your FoFit account is ready to claim. One click — no password. We&rsquo;ll hold your spot in the founding member cohort.</p>
          <a href="${target.claim_url}" style="display:inline-block;background:linear-gradient(135deg,#2A66FF,#58D2FF);color:#fff;text-decoration:none;padding:14px 26px;border-radius:999px;font-weight:600;">Claim your FoFit account</a>
          <p style="margin:28px 0 0;color:#6C7A91;font-size:13px;line-height:1.6;">If that button doesn&rsquo;t work, paste this link into your browser:<br/><span style="color:#9BB0C9;word-break:break-all;">${target.claim_url}</span></p>
        </td></tr>
      </table>
      <p style="margin:24px 0 0;color:#6C7A91;font-size:12px;">FoFit · St. Louis · Built for student athletes</p>
    </td></tr>
  </table>
</body></html>`;
}

function plainEmail(target: { name: string | null; claim_url: string }) {
  const greeting = target.name ? `Hey ${target.name.split(" ")[0]},` : "Hey,";
  return `${greeting}

You were on the list. Now you're in.

Your FoFit account is ready to claim. One click — no password. We'll hold your spot in the founding member cohort.

Claim your account: ${target.claim_url}

— FoFit · Built for student athletes`;
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function safeJson(req: Request): Promise<{ dry_run?: boolean; limit?: number } | null> {
  try {
    return (await req.json()) as { dry_run?: boolean; limit?: number };
  } catch {
    return null;
  }
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
