import { useState } from "react";
import { pricingAssurances, pricingComparison, pricingPlans } from "../../data/pricing";
import { EarlyAccessButton } from "./EarlyAccessButton";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

export function PricingTable() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="pricing-table">
      <div className="pricing-toggle">
        <button
          className={!annual ? "is-active" : ""}
          onClick={() => setAnnual(false)}
          type="button"
        >
          Monthly
        </button>
        <button
          className={annual ? "is-active" : ""}
          onClick={() => setAnnual(true)}
          type="button"
        >
          Annual
        </button>
      </div>

      <div className="pricing-preview">
        {pricingPlans.map((plan) => (
          <Card
            className={`pricing-card reveal ${plan.featured ? "pricing-card--featured" : ""}`}
            key={plan.name}
          >
            <div className="pricing-card__top">
              <span className="pricing-card__name">{plan.name}</span>
              <strong>{annual ? plan.annual : plan.monthly}</strong>
              <p>{annual ? plan.annualNote : plan.tagline}</p>
            </div>
            <p className="pricing-card__description">{plan.description}</p>
            <ul className="pricing-card__list">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <EarlyAccessButton
              variant={plan.featured ? "primary" : "secondary"}
            >
              {plan.cta}
            </EarlyAccessButton>
          </Card>
        ))}
      </div>

      <div className="comparison-table">
        <div className="comparison-table__head">
          <span>Capability</span>
          <span>Starter</span>
          <span>Premium</span>
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
