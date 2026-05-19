import { appScreens } from "../../assets/brand/manifest";
import { productSurfaces } from "../../data/homepage";
import { Revealer } from "../motion/Revealer";

/**
 * Homepage product showcase.
 *
 * Three device-framed app screens (workout, Cypher, journey) above a
 * four-up grid of the surfaces FoFit covers. The screens use the
 * pre-composited device/* assets — the phone chrome is baked into the
 * image, so no CSS frame is needed.
 */
const showcaseScreens = [
  appScreens.workout.device,
  appScreens.cypher.device,
  appScreens.journey.device,
] as const;

export function ProductSurfacesSection() {
  return (
    <section className="lp-section lp-surfaces">
      <div className="container">
        <Revealer className="lp-section-heading">
          <span className="lp-kicker">Product surfaces</span>
          <h2>Workout, fuel, progress, and teams belong to the same week.</h2>
          <p>
            FoFit is not a pile of tabs. Each surface gives Cypher better context
            for the next training decision.
          </p>
        </Revealer>

        <Revealer className="lp-surfaces__showcase" delay="1">
          {showcaseScreens.map((screen, index) => (
            <div
              className={`lp-surfaces__device lp-surfaces__device--${index + 1}`}
              key={screen.src}
            >
              <img alt={screen.alt} loading="lazy" src={screen.src} />
            </div>
          ))}
        </Revealer>

        <div className="lp-surfaces__grid">
          {productSurfaces.map((surface, index) => (
            <Revealer
              delay={String(Math.min(index, 3)) as "0" | "1" | "2" | "3"}
              key={surface.label}
            >
              <article className="lp-surfaces__item">
                <span>{surface.label}</span>
                <strong>{surface.title}</strong>
                <p>{surface.detail}</p>
              </article>
            </Revealer>
          ))}
        </div>
      </div>
    </section>
  );
}
