import { contextSignals, proofTickerItems } from "../../data/homepage";
import { usePointerGlow } from "../../lib/usePointerGlow";
import { Revealer } from "../motion/Revealer";

export function ContextMemorySection() {
  const handlePointerMove = usePointerGlow();
  const tickerItems = [...proofTickerItems, ...proofTickerItems];

  return (
    <section className="lp-section lp-memory" id="cypher-system">
      <div className="lp-ticker" aria-hidden="true">
        <div className="lp-ticker__track">
          {tickerItems.map((item, index) => (
            <span className="lp-ticker__item" key={`${item}-${index}`}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="container">
        <Revealer className="lp-section-heading">
          <span className="lp-kicker">What FoFit remembers</span>
          <h2>Most apps remember your last set. FoFit remembers why the next one has to change.</h2>
          <p>
            Training is not isolated from your week. Cypher keeps the constraints
            attached, so the next session starts with context instead of amnesia.
          </p>
        </Revealer>

        <div className="lp-memory__grid">
          {contextSignals.map((signal, index) => (
            <Revealer delay={String(Math.min(index, 3)) as "0" | "1" | "2" | "3"} key={signal.title}>
              <article className="lp-card lp-memory__card" onPointerMove={handlePointerMove}>
                <span>{signal.label}</span>
                <h3>{signal.title}</h3>
                <p>{signal.description}</p>
              </article>
            </Revealer>
          ))}
        </div>
      </div>
    </section>
  );
}
