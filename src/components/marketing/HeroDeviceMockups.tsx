import { heroFigure, planFigure, progressFigureAsset } from "../../data/editorial";
import { DeviceFigure } from "./DeviceFigure";

export function HeroDeviceMockups() {
  return (
    <div className="device-showcase">
      <DeviceFigure asset={planFigure} className="device-showcase__figure device-showcase__figure--left" />
      <DeviceFigure asset={heroFigure} className="device-showcase__figure device-showcase__figure--focus" />
      <DeviceFigure asset={progressFigureAsset} className="device-showcase__figure device-showcase__figure--right" />
    </div>
  );
}
