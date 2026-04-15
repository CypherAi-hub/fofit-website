import type { ReactNode } from "react";
import { Button } from "../ui/Button";
import { EarlyAccessButton } from "../marketing/EarlyAccessButton";
import { Eyebrow } from "../ui/Eyebrow";

type HeroAction = {
  label: string;
  to?: string;
  href?: string;
  intent?: "waitlist";
  variant?: "primary" | "secondary" | "ghost";
};

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  actions?: HeroAction[];
  media?: ReactNode;
  compact?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  actions = [],
  media,
  compact = false,
}: PageHeroProps) {
  return (
    <section className={`page-hero ${compact ? "page-hero--compact" : ""}`}>
      <div className="hero-orb hero-orb--one" />
      <div className="hero-orb hero-orb--two" />
      <div className="hero-gridlines" />
      <div className="container page-hero__inner">
        <div className="page-hero__content reveal">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="page-hero__title">{title}</h1>
          <p className="page-hero__description">{description}</p>
          {actions.length ? (
            <div className="button-row">
              {actions.map((action) => (
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
                    variant={action.variant ?? "primary"}
                    size="lg"
                  >
                    {action.label}
                  </Button>
                )
              ))}
            </div>
          ) : null}
        </div>
        {media ? <div className="page-hero__media reveal reveal--delay-2">{media}</div> : null}
      </div>
    </section>
  );
}
