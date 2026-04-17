import type { FigureAsset } from "../../data/editorial";
import { ReadinessScreen } from "./ReadinessScreen";
import { FigureLabel } from "./FigureLabel";

type DeviceFigureProps = {
  asset: FigureAsset;
  className?: string;
};

export function DeviceFigure({ asset, className = "" }: DeviceFigureProps) {
  const content = asset.render === "readiness" ? (
    <div
      aria-label={asset.alt}
      className="device-figure__rendered"
      role="img"
    >
      <ReadinessScreen />
    </div>
  ) : (
    <img
      alt={asset.alt}
      className="device-figure__image"
      loading="lazy"
      src={asset.src}
      style={asset.objectPosition ? { objectPosition: asset.objectPosition } : undefined}
    />
  );

  return (
    <figure
      className={[
        "device-figure",
        `device-figure--${asset.frame ?? "phone"}`,
        `device-figure--${asset.tilt ?? "flat"}`,
        className,
      ].join(" ").trim()}
    >
      <div className="device-figure__shell">
        <div className="device-figure__screen">
          {content}
        </div>
      </div>
      <FigureLabel caption={asset.caption} label={asset.label} />
    </figure>
  );
}
