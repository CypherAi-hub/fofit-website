import type { ReactNode } from "react";
import { EarlyAccessButton } from "./EarlyAccessButton";
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
          <EarlyAccessButton size="lg">
            Join the waitlist
          </EarlyAccessButton>
          <Button to="/product" size="lg" variant="secondary">
            Explore the platform
          </Button>
        </div>
      </div>
    </section>
  );
}
