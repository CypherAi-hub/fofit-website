import type { ReactNode } from "react";
import { Revealer } from "../motion/Revealer";

type ChapterIntroProps = {
  index: string;
  label: string;
  title: ReactNode;
  description: ReactNode;
  centered?: boolean;
  className?: string;
};

/**
 * Section-intro block (eyebrow + heading + lede). Emits the lp-section-heading
 * pattern so inner-page section intros match the homepage's section headings.
 * Props are unchanged — every ChapterIntro caller keeps working.
 */
export function ChapterIntro({
  index,
  label,
  title,
  description,
  centered = false,
  className = "",
}: ChapterIntroProps) {
  const headingClass = [
    "lp-section-heading",
    centered ? "lp-section-heading--centered" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Revealer className={headingClass}>
      <span className="lp-kicker">
        {index} / {label}
      </span>
      <h2>{title}</h2>
      <p>{description}</p>
    </Revealer>
  );
}
