import type { ReactNode } from "react";

type FigureLabelProps = {
  label: string;
  caption: ReactNode;
  className?: string;
};

export function FigureLabel({ label, caption, className = "" }: FigureLabelProps) {
  return (
    <figcaption className={`figure-label ${className}`.trim()}>
      <span className="figure-label__tag">{label}</span>
      <span className="figure-label__rule" aria-hidden="true" />
      <span className="figure-label__caption">{caption}</span>
    </figcaption>
  );
}
