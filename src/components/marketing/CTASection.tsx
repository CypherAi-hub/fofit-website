import type { ReactNode } from "react";
import { EarlyAccessButton } from "./EarlyAccessButton";
import { Button } from "../ui/Button";
import { Pill } from "../ui/Pill";
import { Revealer } from "../motion/Revealer";

type CTAAction = {
  label: string;
  to?: string;
  href?: string;
  intent?: "waitlist";
  variant?: "primary" | "secondary" | "ghost";
};

type CTASectionProps = {
  title: ReactNode;
  description: ReactNode;
  pills?: string[];
  note?: ReactNode;
  noteClassName?: string;
  actions?: CTAAction[];
};

const defaultActions: CTAAction[] = [
  { label: "Join founding 250", intent: "waitlist" },
  { label: "Explore the platform", to: "/product", variant: "secondary" },
];

/**
 * Closing call-to-action shared by every inner page. Rendered on the lp-*
 * system as a contained panel. Props are unchanged — all callers keep working.
 */
export function CTASection({
  title,
  description,
  pills = [],
  note,
  noteClassName,
  actions = defaultActions,
}: CTASectionProps) {
  return (
    <section className="lp-pagecta">
      <Revealer className="container lp-pagecta__inner">
        <div className="lp-pagecta__content">
          <h2>{title}</h2>
          <p>{description}</p>
          {pills.length ? (
            <div className="pill-row">
              {pills.map((pill) => (
                <Pill key={pill}>{pill}</Pill>
              ))}
            </div>
          ) : null}
          {note ? (
            <div className={noteClassName ?? "lp-pagecta__note"}>{note}</div>
          ) : null}
        </div>
        <div className="lp-pagecta__actions">
          {actions.map((action) =>
            action.intent === "waitlist" ? (
              <EarlyAccessButton
                key={action.label}
                size="lg"
                variant={action.variant ?? "primary"}
              >
                {action.label}
              </EarlyAccessButton>
            ) : (
              <Button
                key={action.label}
                href={action.href}
                to={action.to}
                size="lg"
                variant={action.variant ?? "primary"}
              >
                {action.label}
              </Button>
            ),
          )}
        </div>
      </Revealer>
    </section>
  );
}
