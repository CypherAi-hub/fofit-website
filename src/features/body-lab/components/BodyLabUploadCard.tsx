import { useEffect, useRef, useState } from "react";

import type {
  BodyCheckInDraft,
  BodyCheckInKind,
  BodyPose,
  BrowserBodyMedia,
  UploadProgress,
} from "../types";
import { BODY_MEASUREMENTS, parseMeasurements } from "../measurements";

const ACCEPTED = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/quicktime",
  "video/webm",
];

const POSES: { value: BodyPose; label: string }[] = [
  { value: "front", label: "Front" },
  { value: "side", label: "Side" },
  { value: "back", label: "Back" },
  { value: "mirror", label: "Mirror" },
  { value: "other", label: "Other" },
];

type PendingItem = {
  id: string;
  file: File;
  mediaType: "photo" | "video";
  pose: BodyPose;
  previewUrl: string;
};

type Props = {
  uploadProgress: UploadProgress | null;
  uploadError: string | null;
  onUpload: (draft: BodyCheckInDraft, media: BrowserBodyMedia[]) => Promise<boolean>;
  onCancel: () => void;
  onClearError: () => void;
};

export function BodyLabUploadCard({
  uploadProgress,
  uploadError,
  onUpload,
  onCancel,
  onClearError,
}: Props) {
  const [items, setItems] = useState<PendingItem[]>([]);
  const [kind, setKind] = useState<BodyCheckInKind>("pump");
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [note, setNote] = useState("");
  const [consent, setConsent] = useState(false);
  const [measurements, setMeasurements] = useState<Record<string, string>>({});
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Revoke object URLs on UNMOUNT only (via a ref). With [items] deps the cleanup ran on
  // every add and revoked a preview that was still on screen (review). Per-item revoke on
  // remove + on successful submit already handles in-session cleanup.
  const itemsRef = useRef(items);
  itemsRef.current = items;
  useEffect(
    () => () => {
      itemsRef.current.forEach((i) => URL.revokeObjectURL(i.previewUrl));
    },
    [],
  );

  const uploading = uploadProgress != null;

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    setLocalError(null);
    const next: PendingItem[] = [];
    const rejected: string[] = [];
    for (const file of Array.from(fileList)) {
      if (!ACCEPTED.includes(file.type)) {
        rejected.push(file.name || file.type || "file");
        continue;
      }
      next.push({
        id: crypto.randomUUID(),
        file,
        mediaType: file.type.startsWith("video/") ? "video" : "photo",
        pose: "front",
        previewUrl: URL.createObjectURL(file),
      });
    }
    if (rejected.length) {
      setLocalError(
        `Unsupported format: ${rejected.join(", ")}. Use JPG, PNG, WebP, MP4, MOV, or WebM (HEIC isn't supported on web yet).`,
      );
    }
    if (next.length) setItems((cur) => [...cur, ...next]);
  }

  function setPose(id: string, pose: BodyPose) {
    setItems((cur) => cur.map((i) => (i.id === id ? { ...i, pose } : i)));
  }

  function removeItem(id: string) {
    setItems((cur) => {
      const found = cur.find((i) => i.id === id);
      if (found) URL.revokeObjectURL(found.previewUrl);
      return cur.filter((i) => i.id !== id);
    });
  }

  function parseRange(input: string): { min: number | null; max: number | null } {
    const nums = input
      .split(/[-–—to]+/i)
      .map((s) => parseFloat(s.trim()))
      .filter((n) => Number.isFinite(n));
    if (nums.length === 0) return { min: null, max: null };
    if (nums.length === 1) return { min: nums[0], max: nums[0] };
    return { min: Math.min(nums[0], nums[1]), max: Math.max(nums[0], nums[1]) };
  }

  async function submit() {
    if (items.length === 0 || uploading) return;
    const weightKg = weight.trim() ? parseFloat(weight) : null;
    const bf = parseRange(bodyFat);
    const draft: BodyCheckInDraft = {
      kind,
      weightKg: weightKg != null && Number.isFinite(weightKg) ? weightKg : null,
      bodyFatMin: bf.min,
      bodyFatMax: bf.max,
      note: note.trim() || null,
      cypherAnalysisConsent: consent,
      measurements: parseMeasurements(measurements),
    };
    const media: BrowserBodyMedia[] = items.map((i) => ({
      file: i.file,
      mediaType: i.mediaType,
      pose: i.pose,
    }));
    const ok = await onUpload(draft, media);
    if (ok) {
      items.forEach((i) => URL.revokeObjectURL(i.previewUrl));
      setItems([]);
      setWeight("");
      setBodyFat("");
      setNote("");
      setConsent(false);
      setMeasurements({});
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <section className="bodylab-card bodylab-upload__grid">
      <div className="bodylab-seg" role="tablist" aria-label="Check-in type">
        {(["pump", "standard"] as BodyCheckInKind[]).map((k) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={kind === k}
            className={`bodylab-seg__btn ${kind === k ? "bodylab-seg__btn--on" : ""}`}
            onClick={() => setKind(k)}
          >
            {k === "pump" ? "Pump photo" : "Standard progress"}
          </button>
        ))}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        multiple
        hidden
        onChange={(e) => addFiles(e.target.files)}
      />
      <button
        type="button"
        className="bodylab-dropzone"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        <strong>Add photos or video</strong>
        <div className="bodylab-dropzone__hint">
          JPG · PNG · WebP · MP4 · MOV · WebM — stays private to your account
        </div>
      </button>

      {(localError || uploadError) && (
        <div className="bodylab-banner" role="alert">
          <span>{localError ?? uploadError}</span>
          <button
            type="button"
            className="bodylab-btn"
            onClick={() => {
              setLocalError(null);
              onClearError();
            }}
          >
            Dismiss
          </button>
        </div>
      )}

      {items.length > 0 && (
        <div className="bodylab-previews">
          {items.map((item) => (
            <div key={item.id} className="bodylab-preview">
              {item.mediaType === "video" ? (
                <video src={item.previewUrl} muted playsInline />
              ) : (
                <img src={item.previewUrl} alt="Selected progress media" />
              )}
              <button
                type="button"
                className="bodylab-preview__remove"
                aria-label="Remove"
                onClick={() => removeItem(item.id)}
                disabled={uploading}
              >
                ×
              </button>
              <select
                className="bodylab-preview__badge"
                value={item.pose}
                onChange={(e) => setPose(item.id, e.target.value as BodyPose)}
                disabled={uploading}
                aria-label="Pose"
              >
                {POSES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      <div className="bodylab-row">
        <label className="bodylab-field" style={{ flex: "1 1 140px" }}>
          <span className="bodylab-field__label">Weight (kg) — optional</span>
          <input
            className="bodylab-input"
            inputMode="decimal"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 82.5"
            disabled={uploading}
          />
        </label>
        <label className="bodylab-field" style={{ flex: "1 1 140px" }}>
          <span className="bodylab-field__label">Body-fat % range — optional</span>
          <input
            className="bodylab-input"
            value={bodyFat}
            onChange={(e) => setBodyFat(e.target.value)}
            placeholder="e.g. 14-16"
            disabled={uploading}
          />
        </label>
      </div>

      <label className="bodylab-field">
        <span className="bodylab-field__label">Note — optional</span>
        <textarea
          className="bodylab-textarea"
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Lighting, conditions, how you felt…"
          disabled={uploading}
        />
      </label>

      <div className="bodylab-field">
        <span className="bodylab-field__label">Measurements (cm) — optional</span>
        <div className="bodylab-measure-grid">
          {BODY_MEASUREMENTS.map((m) => (
            <label key={m.key} className="bodylab-measure">
              <span>{m.label}</span>
              <input
                className="bodylab-input"
                inputMode="decimal"
                value={measurements[m.key] ?? ""}
                onChange={(e) =>
                  setMeasurements((cur) => ({ ...cur, [m.key]: e.target.value }))
                }
                placeholder="–"
                disabled={uploading}
                aria-label={`${m.label} in centimeters`}
              />
            </label>
          ))}
        </div>
      </div>

      <label className="bodylab-consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          disabled={uploading}
        />
        <span>
          Allow Cypher to analyze the images in this check-in. Off by default — your private
          media is never sent to Cypher unless you turn this on.
        </span>
      </label>

      {uploading ? (
        <div className="bodylab-progress" role="status" aria-live="polite">
          <div className="bodylab-progress__bar">
            <div
              className="bodylab-progress__fill"
              style={{ width: `${Math.round(uploadProgress!.overallPercent)}%` }}
            />
          </div>
          <div className="bodylab-progress__label">
            <span>
              Uploading {uploadProgress!.assetIndex + 1}/{uploadProgress!.assetCount} —{" "}
              {uploadProgress!.fileName}
            </span>
            <span>{Math.round(uploadProgress!.overallPercent)}%</span>
          </div>
          <button type="button" className="bodylab-btn bodylab-btn--danger" onClick={onCancel}>
            Cancel upload
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="bodylab-btn bodylab-btn--primary"
          onClick={submit}
          disabled={items.length === 0}
        >
          Save check-in ({items.length})
        </button>
      )}
    </section>
  );
}
