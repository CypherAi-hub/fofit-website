import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { supabase } from "../lib/supabase";
import { getSessionDetail } from "../features/training/trainingService";
import { formatDateOnly } from "../features/training/adapter";
import type { SetPerformance, WorkoutSessionDetail } from "../features/training/models";
import { getSignedBodyMediaUrl, listBodyCheckInsForSession } from "../features/body-lab/bodyLabService";
import { PageMeta } from "../components/layout/PageMeta";
import "../features/training/history.css";

type LinkedMedia = { id: string; url: string | null; hasVideo: boolean; date: string };

const FEEL_LABEL: Record<string, string> = {
  too_easy: "Felt easy",
  just_right: "Felt just right",
  too_hard: "Felt hard",
};

function setText(s: SetPerformance): string {
  if (s.kind === "duration" && s.durationSec != null) return `${s.durationSec}s`;
  if (s.kind === "weighted" && s.weight != null) return `${s.weight} × ${s.reps ?? "—"}`;
  if (s.kind === "bodyweight") return `BW × ${s.reps ?? "—"}`;
  if (s.reps != null) return `× ${s.reps}`;
  return "—";
}

export function SessionDetailPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [state, setState] = useState<"loading" | "error" | "missing" | "ready">("loading");
  const [session, setSession] = useState<WorkoutSessionDetail | null>(null);
  const [media, setMedia] = useState<LinkedMedia[]>([]);

  useEffect(() => {
    let alive = true;
    if (!sessionId) {
      setState("missing");
      return;
    }
    setState("loading");
    void getSessionDetail(supabase, sessionId)
      .then((s) => {
        if (!alive) return;
        if (!s) setState("missing");
        else {
          setSession(s);
          setState("ready");
        }
      })
      .catch(() => {
        if (alive) setState("error");
      });
    return () => {
      alive = false;
    };
  }, [sessionId]);

  // Linked Body Lab media (progress photos/videos captured with this session). Signed private URLs
  // only — never raw storage paths; only the user's own media (RLS + the signed-URL owner check).
  useEffect(() => {
    let alive = true;
    if (!sessionId) return;
    void listBodyCheckInsForSession(supabase, sessionId)
      .then(async (checkIns) => {
        const items = await Promise.all(
          checkIns.map(async (ci): Promise<LinkedMedia> => {
            const photo = ci.media.find((m) => m.mediaType === "photo") ?? ci.media[0];
            let url: string | null = null;
            if (photo) {
              try {
                url = await getSignedBodyMediaUrl(supabase, photo.storagePath, 600);
              } catch {
                url = null;
              }
            }
            return {
              id: ci.id,
              url,
              hasVideo: ci.media.some((m) => m.mediaType === "video"),
              date: ci.capturedAt,
            };
          }),
        );
        if (alive) setMedia(items);
      })
      .catch(() => {
        if (alive) setMedia([]);
      });
    return () => {
      alive = false;
    };
  }, [sessionId]);

  return (
    <>
      <PageMeta title="Session | FoFit" description="Your FoFit workout session details." />
      <div className="history session-detail">
        <Link to="/dashboard/history" className="session-back">
          ‹ Back to history
        </Link>

        {state === "loading" && (
          <div className="history-list" aria-busy="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="history-row history-row--skeleton" />
            ))}
          </div>
        )}

        {state === "error" && (
          <div className="bodylab-state">
            <div className="bodylab-state__title">Couldn&apos;t load this session</div>
            <p>Please try again in a moment.</p>
          </div>
        )}

        {state === "missing" && (
          <div className="bodylab-state">
            <div className="bodylab-state__title">Session not found</div>
            <p>It may have been deleted, or it isn&apos;t yours.</p>
          </div>
        )}

        {state === "ready" && session && (
          <>
            <header className="session-head">
              <span className="bodylab__eyebrow">◆ {formatDateOnly(session.date)}</span>
              <h1 className="history__title">{session.title}</h1>
              <div className="session-stats">
                {session.totalVolume != null && <Stat value={`${Math.round(session.totalVolume).toLocaleString()} lb`} label="Volume" />}
                <Stat value={String(session.exerciseCount)} label="Exercises" />
                <Stat value={String(session.completedSetCount)} label="Sets" />
                {session.durationSec != null && <Stat value={`${Math.round(session.durationSec / 60)} min`} label="Duration" />}
                {session.rpe != null && <Stat value={`${session.rpe}/10`} label="RPE" />}
              </div>
              {(session.feel || (session.checkIn && session.checkIn.soreness != null && session.checkIn.soreness > 0)) && (
                <div className="session-chips">
                  {session.feel && <span className="bodylab-tag">{FEEL_LABEL[session.feel] ?? session.feel}</span>}
                  {session.checkIn?.soreness != null && session.checkIn.soreness > 0 && (
                    <span className="bodylab-tag">Soreness {session.checkIn.soreness}/10</span>
                  )}
                </div>
              )}
            </header>

            {session.notes && (
              <section className="session-notes">
                <span className="bodylab-field__label">Note</span>
                <p>{session.notes}</p>
              </section>
            )}

            {media.length > 0 && (
              <section className="session-media">
                <span className="bodylab-field__label">Progress media from this session</span>
                <div className="session-media-grid">
                  {media.map((m) => (
                    <div key={m.id} className="session-media-thumb">
                      {m.url ? (
                        <img src={m.url} alt={`Progress media — ${formatDateOnly(m.date)}`} loading="lazy" />
                      ) : (
                        <span className="session-media-fallback">{m.hasVideo ? "Video" : "—"}</span>
                      )}
                      {m.hasVideo && <span className="session-media-play" aria-hidden>▶</span>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {session.exercises.length === 0 ? (
              <div className="bodylab-state">
                <div className="bodylab-state__title">No exercise detail recorded</div>
                <p>This session was logged without an exercise breakdown.</p>
              </div>
            ) : (
              <section className="session-exercises">
                {session.exercises.map((ex, i) => (
                  <div key={`${ex.normalizedKey}-${i}`} className="session-exercise">
                    <div className="session-exercise__head">
                      <strong>{ex.name}</strong>
                      <span className="session-exercise__count">{ex.completedSetCount} sets</span>
                    </div>
                    <div className="session-sets">
                      {ex.sets.map((s, j) => (
                        <span key={j} className="session-set">
                          {setText(s)}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="session-stat">
      <span className="session-stat__value">{value}</span>
      <span className="session-stat__label">{label}</span>
    </div>
  );
}
