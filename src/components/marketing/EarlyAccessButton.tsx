import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useEarlyAccess } from "../../app/waitlist-context";
import { Button } from "../ui/Button";

type EarlyAccessButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
};

export function EarlyAccessButton({
  children = "Get Early Access",
  onClick,
  ...props
}: EarlyAccessButtonProps) {
  const { open } = useEarlyAccess();

  return (
    <Button
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          open();
        }
      }}
    >
      {children}
    </Button>
  );
}
