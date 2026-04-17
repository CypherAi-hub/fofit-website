import type { ReactNode } from "react";

type ChapterIntroProps = {
  index: string;
  label: string;
  title: ReactNode;
  description: ReactNode;
  centered?: boolean;
  className?: string;
};

export function ChapterIntro({
  index,
  label,
  title,
  description,
  centered = false,
  className = "",
}: ChapterIntroProps) {
  return (
    <div className={`chapter-intro ${centered ? "chapter-intro--centered" : ""} ${className}`.trim()}>
      <span className="chapter-intro__eyebrow">{index} / {label}</span>
      <h2 className="chapter-intro__title">{title}</h2>
      <p className="chapter-intro__description">{description}</p>
    </div>
  );
}
