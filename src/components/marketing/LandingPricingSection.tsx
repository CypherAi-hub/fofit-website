import { foundingBenefits } from "../../data/homepage";
import { EarlyAccessButton } from "./EarlyAccessButton";
import { Revealer } from "../motion/Revealer";

export function LandingPricingSection() {
  return (
    <section className="lp-section lp-pricing" id="pricing">
      <div className="container lp-pricing__inner">
        <Revealer className="lp-section-heading lp-pricing__copy">
          <span className="lp-kicker">Founding 500</span>
          <h2>$12.99/mo founding rate. Locked for early members.</h2>
          <p>
            Premium will grow as Cypher, Fuel, Teams, and progress systems deepen.
            Founding members keep the early rate as the platform gets stronger.
          </p>
        </Revealer>

        <Revealer className="lp-pricing__card" delay="1">
          <div className="lp-pricing__top">
            <span>Premium founding access</span>
            <strong>$12.99</strong>
            <p>per month / founding rate</p>
          </div>
          <ul>
            {foundingBenefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <EarlyAccessButton size="lg">Join the founding waitlist</EarlyAccessButton>
        </Revealer>
      </div>
    </section>
  );
}
