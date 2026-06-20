import type { SupabaseClient } from "@supabase/supabase-js";

/** A user's target value per metric key (weight/bodyfat/waist/...). */
export type BodyLabGoals = Record<string, number>;

/**
 * Read all of the signed-in user's metric goals. Returns {} on any error (including the table
 * not existing yet) so the UI degrades to "no goals" rather than throwing — goals are additive,
 * never load-bearing for the rest of Body Lab. RLS scopes this to the user; the user_id filter
 * is defense-in-depth.
 */
export async function getBodyLabGoals(supabase: SupabaseClient): Promise<BodyLabGoals> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return {};
  const { data, error } = await supabase
    .from("body_lab_goals")
    .select("metric, target_value")
    .eq("user_id", user.id);
  if (error || !data) return {};
  const out: BodyLabGoals = {};
  for (const row of data as { metric: string; target_value: number }[]) {
    const v = Number(row.target_value);
    if (Number.isFinite(v)) out[String(row.metric)] = v;
  }
  return out;
}

export async function setBodyLabGoal(
  supabase: SupabaseClient,
  metric: string,
  target: number,
): Promise<void> {
  if (!Number.isFinite(target) || target <= 0) throw new Error("Enter a valid target.");
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("You're not signed in.");
  const { error } = await supabase
    .from("body_lab_goals")
    .upsert(
      { user_id: user.id, metric, target_value: target, set_at: new Date().toISOString() },
      { onConflict: "user_id,metric" },
    );
  if (error) throw error;
}

export async function deleteBodyLabGoal(supabase: SupabaseClient, metric: string): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from("body_lab_goals").delete().eq("user_id", user.id).eq("metric", metric);
}
