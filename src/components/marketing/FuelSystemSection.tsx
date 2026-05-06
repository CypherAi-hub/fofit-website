import cypherNutritionThread from "../../assets/editorial/cypher-nutrition-thread.png";
import nutritionDashboard from "../../assets/editorial/nutrition-dashboard.jpg";
import nutritionScanning from "../../assets/app-screens/nutrition-scanning.png";
import { fuelCards } from "../../data/homepage";
import { usePointerGlow } from "../../lib/usePointerGlow";
import { Revealer } from "../motion/Revealer";

export function FuelSystemSection() {
  const handlePointerMove = usePointerGlow();

  return (
    <section className="lp-section lp-fuel">
      <div className="container">
        <div className="lp-fuel__intro">
          <Revealer className="lp-section-heading">
            <span className="lp-kicker">FoFit Fuel</span>
            <h2>Nutrition should not live in a separate universe.</h2>
            <p>
              FoFit Fuel connects meals, macros, and training context, from food
              photo scans to athlete-friendly meal ideas.
            </p>
          </Revealer>

          <Revealer className="lp-fuel__visual" delay="1">
            <img alt="" aria-hidden="true" className="lp-fuel__dashboard" src={nutritionDashboard} />
            <img alt="" aria-hidden="true" className="lp-fuel__scan" src={nutritionScanning} />
            <img alt="" aria-hidden="true" className="lp-fuel__thread" src={cypherNutritionThread} />
          </Revealer>
        </div>

        <div className="lp-fuel__grid">
          {fuelCards.map((card, index) => (
            <Revealer delay={String(Math.min(index, 3)) as "0" | "1" | "2" | "3"} key={card.title}>
              <article className="lp-card lp-fuel__card" onPointerMove={handlePointerMove}>
                <span>{card.label}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            </Revealer>
          ))}
        </div>
      </div>
    </section>
  );
}
