import { teamsSignals } from "../../data/homepage";
import { Button } from "../ui/Button";
import { Revealer } from "../motion/Revealer";

export function LandingTeamsSection() {
  return (
    <section className="lp-section lp-teams">
      <div className="container lp-teams__inner">
        <Revealer className="lp-section-heading lp-teams__copy">
          <span className="lp-kicker">FoFit Teams</span>
          <h2>Built for the athlete. Expanding for the coach.</h2>
          <p>
            FoFit Teams gives coaches the context most training tools miss:
            readiness, notes, completion, and the story behind the numbers.
          </p>
          <Button href="mailto:teams@fofit.app?subject=FoFit%20Teams%20access" variant="secondary">
            Request team access
          </Button>
        </Revealer>

        <Revealer className="lp-teams__panel" delay="1">
          <div className="lp-teams__table" aria-label="FoFit Teams context preview">
            <div className="lp-teams__row lp-teams__row--head">
              <span>Athlete</span>
              <span>Readiness</span>
              <span>Context</span>
            </div>
            <div className="lp-teams__row">
              <strong>Jordan M.</strong>
              <span>82</span>
              <p>Knee note from Tuesday / lower-body swap ready</p>
            </div>
            <div className="lp-teams__row">
              <strong>Avery K.</strong>
              <span>76</span>
              <p>Travel day / compressed lift window</p>
            </div>
            <div className="lp-teams__row">
              <strong>Sam R.</strong>
              <span>91</span>
              <p>Practice load light / progression approved</p>
            </div>
          </div>

          <div className="lp-teams__signals">
            {teamsSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </Revealer>
      </div>
    </section>
  );
}
