import type { ReactNode } from "react";
import { useInView } from "../../lib/useInView";

type RevealerProps = {
  children: ReactNode;
  className?: string;
  delay?: "0" | "1" | "2" | "3";
};

export function Revealer({ children, className = "", delay = "0" }: RevealerProps) {
  const { ref, visible } = useInView<HTMLDivElement>();

  return (
    <div
      className={`lp-reveal lp-reveal--delay-${delay} ${visible ? "is-visible" : ""} ${className}`.trim()}
      ref={ref}
    >
      {children}
    </div>
  );
}
