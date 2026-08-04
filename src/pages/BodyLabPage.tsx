import { useEffect, useMemo, useState } from "react";

import type { BodyCheckIn, BodyPose } from "../features/body-lab";
import { useBodyLab } from "../features/body-lab";
import { BodyLabUploadCard } from "../features/body-lab/components/BodyLabUploadCard";
import { BodyLabTimelineGrid } from "../features/body-lab/components/BodyLabTimelineGrid";
import { BodyLabMediaViewer } from "../features/body-lab/components/BodyLabMediaViewer";
import { BodyLabCompare } from "../features/body-lab/components/BodyLabCompare";
import { BodyLabTrend } from "../features/body-lab/components/BodyLabTrend";
import { BodyLabPoseFilter } from "../features/body-lab/components/BodyLabPoseFilter";
import { BodyLabEmptyState } from "../features/body-lab/components/BodyLabEmptyState";
import { BodyLabErrorState } from "../features/body-lab/components/BodyLabErrorState";
import { PageMeta } from "../components/layout/PageMeta";
import "../features/body-lab/bodyLab.css";

export function BodyLabPage() {
  const bodyLab = useBodyLab();
  const [active, setActive] = useState<BodyCheckIn | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [comparing, setComparing] = useState<[BodyCheckIn, BodyCheckIn] | null>(null);

  const checkIns = bodyLab.timeline.status === "ready" ? bodyLab.timeline.checkIns : [];

  // If the timeline drops below 2 (e.g. an external delete + the focus refresh), leave compare
  // mode — its toggle is gated on >=2, so the user would otherwise be stuck in it (review).
  useEffect(() => {
    if (checkIns.length < 2) {
      setCompareMode(false);
      setSelectedIds([]);
    }
  }, [checkIns.length]);

  const [poseFilter, setPoseFilter] = useState<"all" | BodyPose>("all");
  const [poseThumbs, setPoseThumbs] = useState<Record<string, string>>({});

  const availablePoses = useMemo<BodyPose[]>(() => {
    const seen = new Set<BodyPose>();
    checkIns.forEach((c) =>
      c.media.forEach((m) => {
        if (m.mediaType === "photo") seen.add(m.pose);
      }),
    );
    return Array.from(seen);
  }, [checkIns]);

  const filteredCheckIns = useMemo(
    () =>
      poseFilter === "all"
        ? checkIns
        : checkIns.filter((c) =>
            c.media.some((m) => m.mediaType === "photo" && m.pose === poseFilter),
          ),
    [checkIns, poseFilter],
  );

  // If the active pose filter no longer exists in the data (e.g. after a delete), reset to All.
  useEffect(() => {
    if (poseFilter !== "all" && !availablePoses.includes(poseFilter)) setPoseFilter("all");
  }, [availablePoses, poseFilter]);

  // Sign the pose-specific thumbnail per filtered check-in, so a "Front" filter shows the FRONT
  // photo rather than the default first-photo thumbnail. Only runs while actively filtering.
  useEffect(() => {
    if (poseFilter === "all") return;
    let alive = true;
    setPoseThumbs({}); // clear stale previous-pose thumbs so no wrong-pose flash while re-signing
    void Promise.all(
      filteredCheckIns.map(async (c) => {
        const photo = c.media.find((m) => m.mediaType === "photo" && m.pose === poseFilter);
        if (!photo) return null;
        try {
          const url = await bodyLab.signMediaUrl(photo.storagePath);
          return [c.id, url] as const;
        } catch {
          return null;
        }
      }),
    ).then((entries) => {
      if (!alive) return;
      const map: Record<string, string> = {};
      for (const e of entries) if (e) map[e[0]] = e[1];
      setPoseThumbs(map);
    });
    return () => {
      alive = false;
    };
  }, [poseFilter, filteredCheckIns, bodyLab.signMediaUrl]);

  // Compare selection is scoped to the visible (filtered) set — changing the pose filter clears
  // it so you never end up "comparing" check-ins the new filter hid from view.
  useEffect(() => {
    setSelectedIds([]);
  }, [poseFilter]);

  function toggleSelect(c: BodyCheckIn) {
    setSelectedIds((cur) =>
      cur.includes(c.id) ? cur.filter((id) => id !== c.id) : [...cur, c.id].slice(-2),
    );
  }

  function exitCompareMode() {
    setCompareMode(false);
    setSelectedIds([]);
  }

  function openCompare() {
    const picked = selectedIds
      .map((id) => checkIns.find((c) => c.id === id))
      .filter((c): c is BodyCheckIn => Boolean(c));
    if (picked.length !== 2) return;
    const [earlier, later] = [...picked].sort(
      (a, b) => new Date(a.capturedAt).getTime() - new Date(b.capturedAt).getTime(),
    );
    setComparing([earlier, later]);
  }

  const selectHint =
    selectedIds.length === 0
      ? "Select two check-ins to compare."
      : selectedIds.length === 1
        ? "Select one more."
        : "Two selected — compare them.";

  return (
    <>
      <PageMeta title="Body Lab | FoFit" description="Your private FoFit progress photos and timeline." />
      <div className="bodylab">
        <header className="bodylab__head">
          <span className="bodylab__eyebrow">◆ Body Lab</span>
          <h1 className="bodylab__title">Your private progress</h1>
          <p className="bodylab__sub">
            Capture progress and pump photos or video and watch your body change over time.
            Everything here is private to your account — only you can see it.
          </p>
          {checkIns.length >= 2 && (
            <button
              type="button"
              className="bodylab-btn"
              style={{ justifySelf: "start" }}
              onClick={() => (compareMode ? exitCompareMode() : setCompareMode(true))}
            >
              {compareMode ? "Cancel compare" : "Compare progress"}
            </button>
          )}
        </header>

        {!compareMode && (
          <BodyLabUploadCard
            uploadProgress={bodyLab.uploadProgress}
            uploadError={bodyLab.uploadError}
            onUpload={bodyLab.upload}
            onCancel={bodyLab.cancelUpload}
            onClearError={bodyLab.clearUploadError}
          />
        )}

        {compareMode && (
          <div className="bodylab-compare-bar" role="status" aria-live="polite">
            <span>{selectHint}</span>
            <button
              type="button"
              className="bodylab-btn bodylab-btn--primary"
              disabled={selectedIds.length !== 2}
              onClick={openCompare}
            >
              Compare
            </button>
          </div>
        )}

        {!compareMode && bodyLab.timeline.status === "ready" && (
          <BodyLabTrend checkIns={checkIns} />
        )}

        <section aria-label="Your check-in timeline">
          {bodyLab.timeline.status === "loading" && (
            <div className="bodylab-state">
              <div className="bodylab-spinner" />
              <span>Loading your timeline…</span>
            </div>
          )}
          {bodyLab.timeline.status === "error" && (
            <BodyLabErrorState message={bodyLab.timeline.message} onRetry={bodyLab.refresh} />
          )}
          {bodyLab.timeline.status === "ready" &&
            (bodyLab.timeline.checkIns.length === 0 ? (
              <BodyLabEmptyState />
            ) : (
              <div className="bodylab-timeline-wrap">
                <BodyLabPoseFilter
                  available={availablePoses}
                  value={poseFilter}
                  onChange={setPoseFilter}
                />
                <BodyLabTimelineGrid
                  checkIns={filteredCheckIns}
                  thumbUrls={poseFilter === "all" ? bodyLab.thumbUrls : poseThumbs}
                  onOpen={setActive}
                  selection={
                    compareMode
                      ? { active: true, selectedIds, onToggle: toggleSelect }
                      : undefined
                  }
                />
              </div>
            ))}
        </section>
      </div>

      {active && (
        <BodyLabMediaViewer
          checkIn={active}
          signMediaUrl={bodyLab.signMediaUrl}
          onClose={() => setActive(null)}
          onDelete={bodyLab.remove}
        />
      )}

      {comparing && (
        <BodyLabCompare
          earlier={comparing[0]}
          later={comparing[1]}
          signMediaUrl={bodyLab.signMediaUrl}
          onClose={() => {
            setComparing(null);
            exitCompareMode();
          }}
        />
      )}
    </>
  );
}
