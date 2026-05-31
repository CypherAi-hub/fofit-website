import { foundingBenefits } from "../../data/homepage";
import { EarlyAccessButton } from "./EarlyAccessButton";
import { Revealer } from "../motion/Revealer";

export function LandingPricingSection() {
  return (
    <section className="lp-section lp-pricing" id="pricing">
      <div className="container lp-pricing__inner">
        <Revealer className="lp-section-heading lp-pricing__copy">
          <span className="lp-kicker">Founding 250</span>
          <h2>$14.99/mo Standard. Student access at $9.99/mo.</h2>
          <p>
            FoFit grows as Cypher, nutrition, community, teams, and progress
            systems deepen. Founding rates stay locked while your subscription
            stays active.
          </p>
        </Revealer>

        <Revealer className="lp-pricing__card" delay="1">
          <div className="lp-pricing__top">
            <span>Standard access</span>
            <strong>$14.99</strong>
            <p>per month / founding path</p>
          </div>
          <ul>
            {foundingBenefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <EarlyAccessButton size="lg">Join founding 250</EarlyAccessButton>
        </Revealer>
      </div>
    </section>
  );
}
