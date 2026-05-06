import { scoreSignals } from "../../data/homepage";
import { Revealer } from "../motion/Revealer";

export function FoFitScoreLandingSection() {
  return (
    <section className="lp-section lp-score">
      <div className="container lp-score__inner">
        <Revealer className="lp-section-heading lp-score__copy">
          <span className="lp-kicker">FoFit Score</span>
          <h2>Your progress gets a pulse.</h2>
          <p>
            FoFit Score turns consistency, training, and activity into a fitness
            identity, not just a chart you forget to open.
          </p>
        </Revealer>

        <Revealer className="lp-score__panel" delay="1">
          <div className="lp-score__total">
            <span>FoFit Score</span>
            <strong>84</strong>
            <p>Honest week / standards intact</p>
          </div>
          <div className="lp-score__signals">
            {scoreSignals.map(([label, value, detail]) => (
              <div className="lp-score__signal" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
                <p>{detail}</p>
              </div>
            ))}
          </div>
        </Revealer>
      </div>
    </section>
  );
}
