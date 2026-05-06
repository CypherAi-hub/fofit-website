import workoutHome from "../../assets/app-screens/workout-home.png";
import cypherBrief from "../../assets/app-screens/cypher-brief.png";
import nutritionTracking from "../../assets/app-screens/nutrition-tracking.png";
import { productSurfaces } from "../../data/homepage";
import { Revealer } from "../motion/Revealer";

const surfaceImages = [workoutHome, nutritionTracking, cypherBrief] as const;

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

        <div className="lp-surfaces__stage" aria-label="FoFit product surfaces preview">
          <div className="lp-surfaces__screens">
            {surfaceImages.map((image, index) => (
              <img
                alt=""
                aria-hidden="true"
                className={`lp-surfaces__screen lp-surfaces__screen--${index + 1}`}
                key={image}
                src={image}
              />
            ))}
          </div>

          <div className="lp-surfaces__list">
            {productSurfaces.map((surface, index) => (
              <Revealer delay={String(Math.min(index, 3)) as "0" | "1" | "2" | "3"} key={surface.label}>
                <article className="lp-surfaces__item">
                  <span>{surface.label}</span>
                  <strong>{surface.title}</strong>
                  <p>{surface.detail}</p>
                </article>
              </Revealer>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
