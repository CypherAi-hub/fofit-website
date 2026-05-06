import { pathCards } from "../../data/homepage";
import { usePointerGlow } from "../../lib/usePointerGlow";
import { Revealer } from "../motion/Revealer";
import { EarlyAccessButton } from "./EarlyAccessButton";

export function ThreePathsSection() {
  const handlePointerMove = usePointerGlow();

  return (
    <section className="lp-section lp-paths" id="three-paths">
      <div className="container">
        <Revealer className="lp-section-heading">
          <span className="lp-kicker">Lifter / Athlete / Coach</span>
          <h2>One memory layer. Three ways to train with it.</h2>
          <p>
            FoFit starts with the role you actually live in. The same training
            memory supports individual progress, seasonal context, and team visibility.
          </p>
        </Revealer>

        <div className="lp-paths__grid" aria-label="FoFit role paths">
          {pathCards.map((card, index) => (
            <Revealer delay={String(Math.min(index, 3)) as "0" | "1" | "2" | "3"} key={card.role}>
              <article className="lp-card lp-path-card" onPointerMove={handlePointerMove}>
                <div className="lp-path-card__top">
                  <span>{card.eyebrow}</span>
                  <strong>{card.role.slice(0, 1).toUpperCase()}</strong>
                </div>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
                <ul>
                  {card.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <EarlyAccessButton initialRole={card.role} variant="secondary">
                  {card.cta}
                </EarlyAccessButton>
              </article>
            </Revealer>
          ))}
        </div>
      </div>
    </section>
  );
}
