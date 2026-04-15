import { pricingPlans } from "../../data/pricing";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

export function PricingPreview() {
  return (
    <div className="pricing-preview">
      {pricingPlans.map((plan) => (
        <Card
          className={`pricing-card reveal ${plan.featured ? "pricing-card--featured" : ""}`}
          key={plan.name}
        >
          <div className="pricing-card__top">
            <span className="pricing-card__name">{plan.name}</span>
            <strong>{plan.monthly}</strong>
            <p>{plan.tagline}</p>
          </div>
          <ul className="pricing-card__list">
            {plan.features.slice(0, 4).map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <Button to="/pricing" variant={plan.featured ? "primary" : "secondary"}>
            {plan.cta}
          </Button>
        </Card>
      ))}
    </div>
  );
}
