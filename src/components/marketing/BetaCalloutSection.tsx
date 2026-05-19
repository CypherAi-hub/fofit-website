import { Link } from "react-router-dom";
import { appScreens } from "../../assets/brand/manifest";
import { Revealer } from "../motion/Revealer";

/**
 * Homepage iOS-beta showcase.
 *
 * Sits right after the product surfaces showcase so the flow is
 * "see the app -> join the beta." Uses its own lp-beta* surface,
 * distinct from the shared inner-page lp-pagecta CTA chrome.
 *
 * The <Link> is raw (not <Button>) because Button drops unknown
 * props on its link branch, and this CTA needs data-cta=
 * "join-ios-beta" for funnel tracking.
 */
const phone = appScreens.cypher.device;

export function BetaCalloutSection() {
  return (
    <section className="lp-beta">
      <Revealer className="container lp-beta__inner">
        <div className="lp-beta__copy">
          <div className="lp-beta__brand">
            <img
              alt="FoFit app icon"
              className="lp-beta__icon"
              src="/app-icon.png"
            />
            <span className="lp-kicker">TestFlight beta</span>
          </div>
          <h2>The iOS beta is open.</h2>
          <p>
            FoFit is in active beta on iPhone through Apple TestFlight — real
            builds, a limited number of spots, and feedback that shapes the
            launch. Get in before the public release.
          </p>
          <div className="lp-beta__actions">
            <Link
              className="button button--primary button--lg"
              data-cta="join-ios-beta"
              to="/beta"
            >
              Join iOS Beta
            </Link>
          </div>
        </div>
        <div className="lp-beta__visual">
          <img alt={phone.alt} loading="lazy" src={phone.src} />
        </div>
      </Revealer>
    </section>
  );
}
