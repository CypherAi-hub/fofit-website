import { pricingAssurances, pricingComparison, pricingPlans } from "../../data/pricing";
import { EarlyAccessButton } from "./EarlyAccessButton";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

export function PricingTable() {
  return (
    <div className="pricing-table">
      <div className="pricing-preview">
        {pricingPlans.map((plan) => (
          <Card
            className={`pricing-card reveal ${plan.featured ? "pricing-card--featured" : ""}`}
            key={plan.name}
          >
            <div className="pricing-card__top">
              <span className="pricing-card__name">{plan.name}</span>
              <strong>
                {plan.monthly === "$0" ? "Free" : plan.monthly}
                {plan.monthly.startsWith("$") && <span className="pricing-card__unit">/mo</span>}
              </strong>
              <p>{plan.tagline}</p>
            </div>
            <p className="pricing-card__description">{plan.description}</p>
            <ul className="pricing-card__list">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            {plan.featured ? (
              <EarlyAccessButton variant="primary">
                {plan.cta}
              </EarlyAccessButton>
            ) : plan.name === "Coach / Teams" ? (
              <Button
                href="mailto:teams@fofit.app?subject=FoFit%20Coach%20and%20Teams%20access"
                variant="secondary"
              >
                {plan.cta}
              </Button>
            ) : plan.name === "Starter" ? (
              <Button to="/signup" variant="secondary">
                {plan.cta}
              </Button>
            ) : (
              <EarlyAccessButton variant="secondary">
                {plan.cta}
              </EarlyAccessButton>
            )}
          </Card>
        ))}
      </div>

      <p className="pricing-table__footer">
        Maryville founding access is available for early campus testers at $6.99/mo.
      </p>

      <div className="comparison-table">
        <div className="comparison-table__head">
          <span>Capability</span>
          <span>Starter</span>
          <span>Standard</span>
        </div>
        {pricingComparison.map((row) => (
          <div className="comparison-table__row" key={row.feature}>
            <span>{row.feature}</span>
            <span>{row.starter}</span>
            <span>{row.premium}</span>
          </div>
        ))}
      </div>

      <div className="assurance-list">
        {pricingAssurances.map((item) => (
          <div className="assurance-list__item" key={item}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
