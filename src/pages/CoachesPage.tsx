import { CTASection } from "../components/marketing/CTASection";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { Card } from "../components/ui/Card";

const coachRoles = [
  {
    title: "Program review",
    description:
      "Human coaches can validate planning, adjust priorities, and add context where members want a deeper layer than software alone.",
  },
  {
    title: "Accountability",
    description:
      "Check-ins and review loops can turn a good training system into a higher-accountability environment for serious members.",
  },
  {
    title: "Specialized support",
    description:
      "Recovery, performance, body composition, and team contexts all become stronger when the product can connect to expert guidance.",
  },
];

export function CoachesPage() {
  return (
    <>
      <PageMeta
        description="FoFit Coaches previews how expert accountability and coaching reviews can plug into the broader product ecosystem."
        title="FoFit Coaches | Future Expert Guidance and Accountability Layers"
      />
      <PageHero
        actions={[
          { label: "Join the waitlist", intent: "waitlist" },
          { label: "See teams", to: "/teams", variant: "secondary" },
        ]}
        compact
        description="See how coaching, accountability, and expert review can fit around structured training when you want a deeper layer of support."
        eyebrow="Coaches"
        title={
          <>
            Expert guidance
            <br />
            when you want more support.
          </>
        }
      />

      <section className="page-section">
        <div className="container detail-grid">
          {coachRoles.map((role) => (
            <Card className="detail-card reveal" key={role.title}>
              <h3>{role.title}</h3>
              <p>{role.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="page-section page-section--tight">
        <div className="container split-layout">
          <Card className="spotlight-card reveal">
            <span className="eyebrow">Coach flow</span>
            <h3>How coaches can fit into FoFit</h3>
            <ul className="check-list">
              <li>Member context enters through the core training system</li>
              <li>Coach review focuses on higher-value adjustments</li>
              <li>Accountability and progression loops become more consistent</li>
            </ul>
          </Card>
          <Card className="spotlight-card reveal">
            <span className="eyebrow">Why it matters</span>
            <h3>Accountability works better with context.</h3>
            <p>
              Training history, recovery patterns, and plan context give coaches
              more to work with from day one. That makes feedback sharper and
              check-ins more useful.
            </p>
          </Card>
        </div>
      </section>

      <CTASection
        description="Join the waitlist if you want structured training now and coach-supported guidance when it opens."
        pills={["Reviews", "Accountability", "Expert support"]}
        title={
          <>
            Start with the system.
            <br />
            Add coaching when you want more support.
          </>
        }
      />
    </>
  );
}
