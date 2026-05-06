import { dailyLoopSteps } from "../../data/homepage";
import { Revealer } from "../motion/Revealer";

export function DailyLoopSection() {
  return (
    <section className="lp-section lp-loop">
      <div className="container lp-loop__inner">
        <Revealer className="lp-section-heading lp-loop__heading">
          <span className="lp-kicker">The daily loop</span>
          <h2>The plan is not static. It keeps meeting the week where it is.</h2>
          <p>
            FoFit turns each training day into a feedback loop: context, session,
            adjustment, recap, memory.
          </p>
        </Revealer>

        <div className="lp-loop__rail" aria-label="FoFit daily training loop">
          {dailyLoopSteps.map((step, index) => (
            <Revealer delay={String(Math.min(index, 3)) as "0" | "1" | "2" | "3"} key={step.index}>
              <article className="lp-loop__step">
                <span className="lp-loop__index">{step.index}</span>
                <div>
                  <span className="lp-loop__moment">{step.moment}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            </Revealer>
          ))}
        </div>
      </div>
    </section>
  );
}
