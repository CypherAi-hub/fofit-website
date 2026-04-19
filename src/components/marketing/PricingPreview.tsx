import { pricingPlans } from "../../data/pricing";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

type PricingPreviewProps = {
  className?: string;
};

export function PricingPreview({ className = "" }: PricingPreviewProps) {
  return (
    <div className={`pricing-preview ${className}`.trim()}>
      {pricingPlans.map((plan) => (
        <Card
          className={`pricing-card reveal ${plan.featured ? "pricing-card--featured" : ""}`}
          key={plan.name}
        >
          <div className="pricing-card__top">
            {plan.featured ? <span className="pricing-card__badge">Founding member</span> : null}
            <span className="pricing-card__name">{plan.name}</span>
            <strong>{plan.monthly}</strong>
            <span className="pricing-card__billing">{plan.featured ? "/mo for life" : "to start"}</span>
            <p>{plan.tagline}</p>
          </div>
          <p className="pricing-card__description">{plan.description}</p>
          <ul className="pricing-card__list">
            {plan.features.slice(0, 4).map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className="pricing-card__meta">
            <span>{plan.annualNote}</span>
            {plan.featured ? <span>Rate stays locked if you join early</span> : <span>Upgrade when you want the full system</span>}
          </div>
          <Button to="/pricing" variant={plan.featured ? "primary" : "secondary"}>
            {plan.cta}
          </Button>
        </Card>
      ))}
    </div>
  );
}
