import type { ElementType, ReactNode } from "react";

type EditorialHeadingProps = {
  children: ReactNode;
  accent?: string;
  as?: ElementType;
  className?: string;
};

export function EditorialHeading({
  children,
  accent,
  as: Tag = "h2",
  className = "",
}: EditorialHeadingProps) {
  if (typeof children !== "string" || !accent) {
    return (
      <Tag className={`editorial-heading ${className}`.trim()}>
        {children}
      </Tag>
    );
  }

  const parts = children.split("{italic}");

  return (
    <Tag className={`editorial-heading ${className}`.trim()}>
      <span>
        {parts.map((part, index) => (
          <span key={`${part}-${index}`}>
            {part}
            {index < parts.length - 1 ? <em>{accent}</em> : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}
