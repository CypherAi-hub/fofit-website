import { Link } from "react-router-dom";
import { Revealer } from "../motion/Revealer";

/**
 * Homepage iOS-beta callout.
 *
 * Renders on the lp-pagecta panel — the same contained-CTA surface CTASection
 * uses — so it matches the site with no new CSS. The action is a raw <Link>
 * (not <Button>): Button drops unknown props on its link branch, and this CTA
 * needs data-cta="join-ios-beta" for funnel tracking.
 */
export function BetaCalloutSection() {
  return (
    <section className="lp-pagecta">
      <Revealer className="container lp-pagecta__inner">
        <div className="lp-pagecta__content">
          <h2>The iOS beta is open.</h2>
          <p>
            FoFit is in active beta on iPhone through Apple TestFlight — real
            builds, a limited number of spots, and feedback that shapes the
            launch. Get in before the public release.
          </p>
        </div>
        <div className="lp-pagecta__actions">
          <Link
            className="button button--primary button--lg"
            data-cta="join-ios-beta"
            to="/beta"
          >
            Join iOS Beta
          </Link>
        </div>
      </Revealer>
    </section>
  );
}
