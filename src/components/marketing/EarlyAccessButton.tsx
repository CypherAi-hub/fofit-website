import type { ButtonHTMLAttributes, ReactNode } from "react";
import { type WaitlistRole, useEarlyAccess } from "../../app/waitlist-context";
import { Button } from "../ui/Button";

type EarlyAccessButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  initialRole?: WaitlistRole;
};

export function EarlyAccessButton({
  children = "Get Early Access",
  initialRole,
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
          open({ initialRole });
        }
      }}
    >
      {children}
    </Button>
  );
}
