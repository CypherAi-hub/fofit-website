import { useEffect, useMemo, useState } from "react";

import type { BodyCheckIn, BodyMediaAsset } from "../types";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function daysBetween(aIso: string, bIso: string): number | null {
  const a = new Date(aIso).getTime();
  const b = new Date(bIso).getTime();
  if (Number.isNaN(a) || Number.isNaN(b)) return null;
  return Math.round(Math.abs(b - a) / 86_400_000);
}

/** Photo for compare — the shared pose if both have it, else any photo. NEVER a video:
 *  compare renders an <img>, so a video asset would break it. May be undefined (video-only). */
function comparePhoto(checkIn: BodyCheckIn, sharedPose: string | null): BodyMediaAsset | undefined {
  if (sharedPose) {
    const matched = checkIn.media.find((m) => m.mediaType === "photo" && m.pose === sharedPose);
    if (matched) return matched;
  }
  return checkIn.media.find((m) => m.mediaType === "photo");
}

function fmtDelta(n: number, unit: string, digits = 1): string {
  const v = n.toFixed(digits).replace(/\.0$/, "");
  return `${n > 0 ? "+" : ""}${v}${unit}`;
}

/**
 * Side-by-side before/after of two check-ins — the payoff of a progress timeline.
 * Pose-matched when both check-ins share a pose (front vs front), else each shows its
 * primary photo. Deltas (span, weight, body-fat) are shown NEUTRALLY — never colored
 * good/bad, because whether "−2kg" is progress depends on the user's goal, not ours.
 */
export function BodyLabCompare({
  earlier,
  later,
  signMediaUrl,
  onClose,
}: {
  earlier: BodyCheckIn;
  later: BodyCheckIn;
  signMediaUrl: (storagePath: string) => Promise<string>;
  onClose: () => void;
}) {
  // The pose both check-ins have a photo for (so we compare like-for-like).
  const sharedPose = useMemo(() => {
    const earlierPoses = new Set(
      earlier.media.filter((m) => m.mediaType === "photo").map((m) => m.pose),
    );
    const match = later.media.find((m) => m.mediaType === "photo" && earlierPoses.has(m.pose));
    return match?.pose ?? null;
  }, [earlier, later]);

  const earlierAsset = comparePhoto(earlier, sharedPose);
  const laterAsset = comparePhoto(later, sharedPose);

  const [urls, setUrls] = useState<{ earlier: string | null; later: string | null }>({
    earlier: null,
    later: null,
  });

  useEffect(() => {
    let alive = true;
    void Promise.all([
      earlierAsset ? signMediaUrl(earlierAsset.storagePath).catch(() => null) : Promise.resolve(null),
      laterAsset ? signMediaUrl(laterAsset.storagePath).catch(() => null) : Promise.resolve(null),
    ]).then(([e, l]) => {
      if (alive) setUrls({ earlier: e, later: l });
    });
    return () => {
      alive = false;
    };
  }, [earlierAsset, laterAsset, signMediaUrl]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const span = daysBetween(earlier.capturedAt, later.capturedAt);
  const dWeight =
    earlier.weightKg != null && later.weightKg != null ? later.weightKg - earlier.weightKg : null;
  const dBodyFat =
    earlier.bodyFatMin != null && later.bodyFatMin != null
      ? later.bodyFatMin - earlier.bodyFatMin
      : null;

  return (
    <div className="bodylab-viewer" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="bodylab-compare" onClick={(e) => e.stopPropagation()}>
        <div className="bodylab-compare__head">
          <span className="bodylab__eyebrow">◆ Progress compare</span>
          <div className="bodylab-compare__deltas">
            {span != null && <Delta label="Span" value={`${span}d`} />}
            {dWeight != null && <Delta label="Weight" value={fmtDelta(dWeight, " kg")} />}
            {dBodyFat != null && <Delta label="Body fat" value={fmtDelta(dBodyFat, "%", 0)} />}
            {sharedPose && <Delta label="Pose" value={sharedPose} />}
          </div>
        </div>

        <div className="bodylab-compare__cols">
          <CompareColumn tag="Before" checkIn={earlier} url={urls.earlier} hasPhoto={Boolean(earlierAsset)} />
          <CompareColumn tag="After" checkIn={later} url={urls.later} hasPhoto={Boolean(laterAsset)} />
        </div>

        <button type="button" className="bodylab-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

function Delta({ label, value }: { label: string; value: string }) {
  return (
    <div className="bodylab-compare__delta">
      <span className="bodylab-compare__deltaValue">{value}</span>
      <span className="bodylab-compare__deltaLabel">{label}</span>
    </div>
  );
}

function CompareColumn({
  tag,
  checkIn,
  url,
  hasPhoto,
}: {
  tag: string;
  checkIn: BodyCheckIn;
  url: string | null;
  hasPhoto: boolean;
}) {
  return (
    <div className="bodylab-compare__col">
      <div className="bodylab-compare__media">
        {!hasPhoto ? (
          <div className="bodylab-tile__fallback">No photo</div>
        ) : url ? (
          <img src={url} alt={`${tag} — ${formatDate(checkIn.capturedAt)}`} />
        ) : (
          <div className="bodylab-state">
            <div className="bodylab-spinner" />
          </div>
        )}
        <span className="bodylab-compare__tag">{tag}</span>
      </div>
      <div className="bodylab-compare__caption">
        <strong>{formatDate(checkIn.capturedAt)}</strong>
        <span>
          {[
            checkIn.kind,
            checkIn.weightKg != null ? `${checkIn.weightKg} kg` : null,
            checkIn.bodyFatMin != null ? `${checkIn.bodyFatMin}% BF` : null,
          ]
            .filter(Boolean)
            .join(" · ")}
        </span>
      </div>
    </div>
  );
}
