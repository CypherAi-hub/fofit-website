import type { SupabaseClient } from "@supabase/supabase-js";

import { getSignedBodyMediaUrl, listBodyTimeline } from "./bodyLabService";
import type { BodyCheckIn } from "./types";

export type BodyLabSummary = {
  count: number;
  latest: BodyCheckIn | null;
  latestThumbUrl: string | null;
};

/**
 * Lightweight Body Lab summary for the dashboard preview — a `ready` count + the latest check-in
 * with a signed thumbnail. Degrades to an empty summary on any error (additive surface, never
 * blocks the dashboard). RLS scopes everything to the user; the thumbnail is a signed URL (no raw
 * path), consistent with the rest of Body Lab's privacy model.
 */
export async function getBodyLabSummary(supabase: SupabaseClient): Promise<BodyLabSummary> {
  const empty: BodyLabSummary = { count: 0, latest: null, latestThumbUrl: null };
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return empty;

    const { count } = await supabase
      .from("body_check_ins")
      .select("id", { count: "exact", head: true })
      .eq("status", "ready");

    const list = await listBodyTimeline(supabase, 1).catch(() => [] as BodyCheckIn[]);
    const latest = list[0] ?? null;

    let latestThumbUrl: string | null = null;
    if (latest) {
      const photo = latest.media.find((m) => m.mediaType === "photo") ?? latest.media[0];
      if (photo) {
        latestThumbUrl = await getSignedBodyMediaUrl(supabase, photo.storagePath, 3600).catch(
          () => null,
        );
      }
    }

    return { count: count ?? 0, latest, latestThumbUrl };
  } catch {
    return empty;
  }
}
