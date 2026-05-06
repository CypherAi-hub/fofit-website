import { EarlyAccessButton } from "./EarlyAccessButton";
import { Revealer } from "../motion/Revealer";

export function LandingFinalCTA() {
  return (
    <section className="lp-final">
      <div className="container lp-final__inner">
        <Revealer>
          <h2>
            Stop tracking perfect plans.
            <span>Start training the real week.</span>
          </h2>
          <p>FoFit is for the athletes who tell the truth and still do the work.</p>
          <EarlyAccessButton size="lg">Join the founding waitlist</EarlyAccessButton>
        </Revealer>
      </div>
    </section>
  );
}
