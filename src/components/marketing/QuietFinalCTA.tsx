import { EditorialHeading } from "../ui/EditorialHeading";
import { EarlyAccessButton } from "./EarlyAccessButton";

export function QuietFinalCTA() {
  return (
    <section className="quiet-final-cta">
      <div className="quiet-final-cta__inner">
        <EditorialHeading
          accent="honestly"
          as="p"
          className="quiet-final-cta__line"
        >
          {"Train {italic}. Or keep tracking."}
        </EditorialHeading>

        <p className="quiet-final-cta__sub">
          500 founding spots. Founding rate locked at $12.99/mo for life.
        </p>

        <EarlyAccessButton className="quiet-final-cta__button" size="lg">
          Join the founding 500 →
        </EarlyAccessButton>
      </div>
    </section>
  );
}
