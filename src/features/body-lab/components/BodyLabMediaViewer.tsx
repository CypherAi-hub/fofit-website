import { useEffect, useRef, useState } from "react";

import type { BodyCheckIn } from "../types";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BodyLabMediaViewer({
  checkIn,
  signMediaUrl,
  onClose,
  onDelete,
}: {
  checkIn: BodyCheckIn;
  signMediaUrl: (storagePath: string) => Promise<string>;
  onClose: () => void;
  onDelete: (checkInId: string) => Promise<void>;
}) {
  const [urls, setUrls] = useState<(string | null)[]>([]);
  const [active, setActive] = useState(0);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);

  // Move focus into the modal on open so keyboard + screen-reader users land inside it.
  useEffect(() => {
    innerRef.current?.focus();
  }, []);

  useEffect(() => {
    let alive = true;
    void Promise.all(
      checkIn.media.map((m) => signMediaUrl(m.storagePath).catch(() => null)),
    ).then((signed) => {
      if (alive) setUrls(signed);
    });
    return () => {
      alive = false;
    };
  }, [checkIn, signMediaUrl]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const current = checkIn.media[active];
  const url = urls[active];

  const bf =
    checkIn.bodyFatMin != null
      ? checkIn.bodyFatMax != null && checkIn.bodyFatMax !== checkIn.bodyFatMin
        ? `${checkIn.bodyFatMin}–${checkIn.bodyFatMax}% BF`
        : `${checkIn.bodyFatMin}% BF`
      : null;

  const meta = [
    formatDate(checkIn.capturedAt),
    checkIn.kind,
    current?.pose,
    checkIn.weightKg != null ? `${checkIn.weightKg} kg` : null,
    bf,
  ]
    .filter(Boolean)
    .join(" · ");

  async function handleDelete() {
    if (deleting) return;
    setDeleting(true);
    try {
      await onDelete(checkIn.id);
      onClose();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="bodylab-viewer" role="dialog" aria-modal="true" onClick={onClose}>
      <div
        ref={innerRef}
        tabIndex={-1}
        className="bodylab-viewer__inner"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bodylab-viewer__media">
          {url ? (
            current?.mediaType === "video" ? (
              <video src={url} controls autoPlay playsInline />
            ) : (
              <img src={url} alt={`Progress media — ${meta}`} />
            )
          ) : (
            <div className="bodylab-state">
              <div className="bodylab-spinner" />
            </div>
          )}
        </div>

        {checkIn.media.length > 1 && (
          <div className="bodylab-row" style={{ justifyContent: "center" }}>
            {checkIn.media.map((m, i) => (
              <button
                key={m.id}
                type="button"
                className={`bodylab-seg__btn ${i === active ? "bodylab-seg__btn--on" : ""}`}
                onClick={() => setActive(i)}
              >
                {m.pose}
              </button>
            ))}
          </div>
        )}

        <div className="bodylab-viewer__bar">
          <span>{meta}</span>
          <div className="bodylab-row">
            {confirming ? (
              <>
                <span style={{ alignSelf: "center" }}>Delete permanently?</span>
                <button
                  type="button"
                  className="bodylab-btn bodylab-btn--danger"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? "Deleting…" : "Delete"}
                </button>
                <button
                  type="button"
                  className="bodylab-btn"
                  onClick={() => setConfirming(false)}
                  disabled={deleting}
                >
                  Keep
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="bodylab-btn bodylab-btn--danger"
                  onClick={() => setConfirming(true)}
                >
                  Delete
                </button>
                <button type="button" className="bodylab-btn" onClick={onClose}>
                  Close
                </button>
              </>
            )}
          </div>
        </div>
        {checkIn.note && <p style={{ color: "var(--text-muted)", margin: 0 }}>{checkIn.note}</p>}
      </div>
    </div>
  );
}
