import type { ReactNode } from "react";
import { EarlyAccessButton } from "./EarlyAccessButton";
import { Button } from "../ui/Button";
import { Pill } from "../ui/Pill";

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
  { label: "Join the waitlist", intent: "waitlist" },
  { label: "Explore the platform", to: "/product", variant: "secondary" },
];

export function CTASection({
  title,
  description,
  pills = [],
  note,
  noteClassName,
  actions = defaultActions,
}: CTASectionProps) {
  return (
    <section className="cta-section">
      <div className="container cta-section__inner">
        <div className="cta-section__content">
          <h2>{title}</h2>
          <p>{description}</p>
          {pills.length ? (
            <div className="pill-row">
              {pills.map((pill) => (
                <Pill key={pill}>{pill}</Pill>
              ))}
            </div>
          ) : null}
          {note ? <div className={noteClassName ?? "cta-section__note"}>{note}</div> : null}
        </div>
        <div className="button-row">
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
      </div>
    </section>
  );
}
