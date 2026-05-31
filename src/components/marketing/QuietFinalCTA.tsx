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
          250 founding spots. Founding rates are locked while your subscription stays active.
        </p>

        <EarlyAccessButton className="quiet-final-cta__button" size="lg">
          Join founding 250 →
        </EarlyAccessButton>
      </div>
    </section>
  );
}
