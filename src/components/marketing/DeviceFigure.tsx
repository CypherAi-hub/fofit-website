import type { FigureAsset } from "../../data/editorial";
import { FigureLabel } from "./FigureLabel";

type DeviceFigureProps = {
  asset: FigureAsset;
  className?: string;
};

export function DeviceFigure({ asset, className = "" }: DeviceFigureProps) {
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
          <img
            alt={asset.alt}
            className="device-figure__image"
            loading="lazy"
            src={asset.src}
            style={asset.objectPosition ? { objectPosition: asset.objectPosition } : undefined}
          />
        </div>
      </div>
      <FigureLabel caption={asset.caption} label={asset.label} />
    </figure>
  );
}
