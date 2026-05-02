import { waitlistRoles } from "../../data/waitlist";
import { EarlyAccessButton } from "./EarlyAccessButton";

export function ThreePathsSection() {
  return (
    <section className="three-paths-section" id="three-paths">
      <div className="container three-paths-section__inner">
        <div className="three-paths-section__header">
          <div className="v3-section-kicker">01 / THREE PATHS</div>
          <h2>One platform. Three ways in.</h2>
          <p>
            Start as a lifter, train as an athlete, or bring FoFit to the
            people you lead. The same Cypher brain sits underneath each path.
          </p>
        </div>

        <div className="three-paths-grid" aria-label="FoFit role paths">
          {waitlistRoles.map((role) => (
            <article className="three-path-card reveal" key={role.value}>
              <div className="three-path-card__glyph" aria-hidden="true">
                {role.label.slice(0, 1)}
              </div>
              <div>
                <h3>{role.label}</h3>
                <p>{role.forText}</p>
              </div>
              <ul>
                {role.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
              <EarlyAccessButton initialRole={role.value} variant="secondary">
                {role.cta}
              </EarlyAccessButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
