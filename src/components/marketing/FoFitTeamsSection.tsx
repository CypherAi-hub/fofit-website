import { Button } from "../ui/Button";

const teamsFeatures = [
  {
    title: "Athletes log on their phone",
    description: "Coaches see completion, notes, and readiness on the web without changing the athlete flow.",
  },
  {
    title: "Build programs with adaptive blocks",
    description: "Cypher drafts what fits around roster load, calendar friction, and the week athletes actually have.",
  },
  {
    title: "Compliance visibility without spreadsheets",
    description: "Roster status, training completion, and coach context stay visible before check-ins turn manual.",
  },
] as const;

export function FoFitTeamsSection() {
  return (
    <section className="v3-teams" id="teams">
      <div className="container v3-teams__inner">
        <div className="v3-teams__copy">
          <div className="v3-section-kicker">04 / FOFIT TEAMS</div>
          <h2>For the coaches building the next program.</h2>
          <p>
            FoFit Teams gives S&amp;C coaches the dashboard, athlete logging,
            and compliance visibility their program actually needs — without
            forcing athletes off the FoFit they already use.
          </p>
          <div className="button-row">
            <Button to="/teams">See FoFit Teams</Button>
            <Button href="mailto:teams@fofit.app" variant="secondary">
              Talk to us
            </Button>
          </div>
        </div>

        <div className="v3-teams__feature-row">
          {teamsFeatures.map((feature) => (
            <article className="v3-teams__feature reveal" key={feature.title}>
              <span>{feature.title}</span>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
