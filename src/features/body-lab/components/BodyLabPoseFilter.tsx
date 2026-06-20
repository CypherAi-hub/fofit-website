import type { BodyPose } from "../types";

const POSE_LABEL: Record<BodyPose, string> = {
  front: "Front",
  side: "Side",
  back: "Back",
  mirror: "Mirror",
  other: "Other",
};

/**
 * Pose filter chips for the timeline. Only renders poses that actually exist in the data
 * (never offers an empty filter), plus "All". A progress timeline mixes angles
 * chronologically; filtering to one pose lets you track that angle over time.
 */
export function BodyLabPoseFilter({
  available,
  value,
  onChange,
}: {
  available: BodyPose[];
  value: "all" | BodyPose;
  onChange: (next: "all" | BodyPose) => void;
}) {
  if (available.length < 2) return null; // nothing to filter between

  return (
    <div className="bodylab-seg" role="tablist" aria-label="Filter by pose">
      <button
        type="button"
        role="tab"
        aria-selected={value === "all"}
        className={`bodylab-seg__btn ${value === "all" ? "bodylab-seg__btn--on" : ""}`}
        onClick={() => onChange("all")}
      >
        All
      </button>
      {available.map((pose) => (
        <button
          key={pose}
          type="button"
          role="tab"
          aria-selected={value === pose}
          className={`bodylab-seg__btn ${value === pose ? "bodylab-seg__btn--on" : ""}`}
          onClick={() => onChange(pose)}
        >
          {POSE_LABEL[pose]}
        </button>
      ))}
    </div>
  );
}
