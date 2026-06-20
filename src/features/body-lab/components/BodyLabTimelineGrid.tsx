import type { BodyCheckIn } from "../types";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function BodyLabTimelineGrid({
  checkIns,
  thumbUrls,
  onOpen,
}: {
  checkIns: BodyCheckIn[];
  thumbUrls: Record<string, string>;
  onOpen: (checkIn: BodyCheckIn) => void;
}) {
  return (
    <div className="bodylab-timeline">
      {checkIns.map((checkIn) => {
        const url = thumbUrls[checkIn.id];
        const hasVideo = checkIn.media.some((m) => m.mediaType === "video");
        const onlyVideo = checkIn.media.length > 0 && !checkIn.media.some((m) => m.mediaType === "photo");
        return (
          <button
            key={checkIn.id}
            type="button"
            className="bodylab-tile"
            onClick={() => onOpen(checkIn)}
            aria-label={`Open check-in from ${formatDate(checkIn.capturedAt)}`}
          >
            {url ? (
              <img src={url} alt="" loading="lazy" />
            ) : (
              <div className="bodylab-tile__fallback">{onlyVideo ? "Video" : "—"}</div>
            )}
            {hasVideo && (
              <span className="bodylab-tile__play" aria-hidden>
                ▶
              </span>
            )}
            <div className="bodylab-tile__meta">
              <span className="bodylab-tile__date">{formatDate(checkIn.capturedAt)}</span>
              <span className="bodylab-tag">{checkIn.kind}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
