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
  selection,
}: {
  checkIns: BodyCheckIn[];
  thumbUrls: Record<string, string>;
  onOpen: (checkIn: BodyCheckIn) => void;
  selection?: {
    active: boolean;
    selectedIds: string[];
    onToggle: (checkIn: BodyCheckIn) => void;
  };
}) {
  return (
    <div className="bodylab-timeline">
      {checkIns.map((checkIn) => {
        const url = thumbUrls[checkIn.id];
        const hasVideo = checkIn.media.some((m) => m.mediaType === "video");
        const onlyVideo = checkIn.media.length > 0 && !checkIn.media.some((m) => m.mediaType === "photo");
        const selecting = selection?.active ?? false;
        const selIndex = selecting ? selection!.selectedIds.indexOf(checkIn.id) : -1;
        const isSelected = selIndex >= 0;
        return (
          <button
            key={checkIn.id}
            type="button"
            className={`bodylab-tile${isSelected ? " bodylab-tile--selected" : ""}`}
            onClick={() => (selecting ? selection!.onToggle(checkIn) : onOpen(checkIn))}
            aria-pressed={selecting ? isSelected : undefined}
            aria-label={
              selecting
                ? `${isSelected ? "Deselect" : "Select"} check-in from ${formatDate(checkIn.capturedAt)}`
                : `Open check-in from ${formatDate(checkIn.capturedAt)}`
            }
          >
            {selecting && (
              <span className={`bodylab-tile__select${isSelected ? " bodylab-tile__select--on" : ""}`}>
                {isSelected ? selIndex + 1 : ""}
              </span>
            )}
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
