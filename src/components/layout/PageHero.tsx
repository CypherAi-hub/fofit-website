import type { ReactNode } from "react";
import { Button } from "../ui/Button";
import { EarlyAccessButton } from "../marketing/EarlyAccessButton";
import { Revealer } from "../motion/Revealer";

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
  mediaCaption?: ReactNode;
  compact?: boolean;
  className?: string;
  mediaClassName?: string;
};

/**
 * Shared header for every routed page. Renders on the lp-* design system so
 * inner pages match the homepage: lp-kicker eyebrow, display title, ambient
 * grid, and Revealer entrance motion. Props are intentionally unchanged from
 * the previous version — every page that imports PageHero keeps working.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  actions = [],
  media,
  mediaCaption,
  compact = false,
  className = "",
  mediaClassName = "",
}: PageHeroProps) {
  const sectionClass = [
    "lp-pagehero",
    compact ? "lp-pagehero--compact" : "",
    media ? "lp-pagehero--split" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={sectionClass}>
      <div className="lp-pagehero__ambient" aria-hidden="true" />
      <div className="container lp-pagehero__inner">
        <Revealer className="lp-pagehero__copy">
          <div className="lp-kicker">{eyebrow}</div>
          <h1 className="lp-pagehero__title">{title}</h1>
          <p className="lp-pagehero__lede">{description}</p>
          {actions.length ? (
            <div className="lp-pagehero__actions">
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
                    variant={action.variant ?? "primary"}
                    size="lg"
                  >
                    {action.label}
                  </Button>
                ),
              )}
            </div>
          ) : null}
        </Revealer>
        {media ? (
          <Revealer
            className={`lp-pagehero__media ${mediaClassName}`.trim()}
            delay="1"
          >
            {media}
            {mediaCaption ? (
              <div className="lp-pagehero__media-caption">{mediaCaption}</div>
            ) : null}
          </Revealer>
        ) : null}
      </div>
    </section>
  );
}
