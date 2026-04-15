import type { ReactNode } from "react";
import { Button } from "../ui/Button";
import { Pill } from "../ui/Pill";

type CTASectionProps = {
  title: ReactNode;
  description: ReactNode;
  pills?: string[];
};

export function CTASection({ title, description, pills = [] }: CTASectionProps) {
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
        </div>
        <div className="button-row">
          <Button href="mailto:hello@fofit.app?subject=FoFit%20Early%20Access" size="lg">
            Join Early Access
          </Button>
          <Button to="/product" size="lg" variant="secondary">
            Explore the platform
          </Button>
        </div>
      </div>
    </section>
  );
}
