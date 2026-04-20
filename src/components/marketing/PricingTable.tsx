import { useState } from "react";
import { pricingAssurances, pricingComparison, pricingPlans } from "../../data/pricing";
import { EarlyAccessButton } from "./EarlyAccessButton";
import { Card } from "../ui/Card";

export function PricingTable() {
  const [annual, setAnnual] = useState(false);
  const [starterPlan, premiumPlan] = pricingPlans;
  const foundingPrice = annual ? "$120" : "$14";
  const foundingUnit = annual ? "/yr" : "/mo";

  return (
    <div className="pricing-table">
      <div className="pricing-toggle">
        <button
          aria-pressed={!annual}
          className={!annual ? "is-active" : ""}
          onClick={() => setAnnual(false)}
          type="button"
        >
          Monthly
        </button>
        <button
          aria-pressed={annual}
          className={annual ? "is-active" : ""}
          onClick={() => setAnnual(true)}
          type="button"
        >
          Annual
        </button>
      </div>

      <div className="pricing-preview">
        {[starterPlan, premiumPlan].map((plan) => (
          <Card
            className={`pricing-card reveal ${plan.featured ? "pricing-card--featured" : ""}`}
            key={plan.name}
          >
            <div className="pricing-card__top">
              <span className="pricing-card__name">{plan.name}</span>
              <strong>
                {plan.monthly === "$0" ? "Free" : (annual ? plan.annual : plan.monthly)}
                {plan.monthly !== "$0" && <span className="pricing-card__unit">{annual ? "/yr" : "/mo"}</span>}
              </strong>
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
        <Card className="pricing-card pricing-card--editorial reveal">
          <div className="pricing-card__top">
            <span className="pricing-card__name">Founding</span>
            <strong>
              {foundingPrice}
              <span className="pricing-card__unit">{foundingUnit}</span>
            </strong>
            <p>The first 250 members lock the full Premium product at this rate for life.</p>
          </div>
          <p className="pricing-card__description">
            Join before launch and the rate does not move as FoFit adds more coaching, team, and recovery depth.
          </p>
          <ul className="pricing-card__list">
            <li>Everything in Premium</li>
            <li>Price locked at the founding rate</li>
            <li>Priority access as new layers open</li>
            <li>Named as an early supporter inside the app</li>
          </ul>
          <div className="pricing-card__meta">
            <span>{annual ? "$10/mo billed annually" : "Month to month"}</span>
            <span>Rate holds for founding members</span>
          </div>
          <EarlyAccessButton>
            Join the waitlist
          </EarlyAccessButton>
        </Card>
      </div>

      <p className="pricing-table__footer">
        Cancel anytime · export your data in one tap
      </p>

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
