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
          { label: "See community", to: "/community" },
          { label: "See teams", to: "/teams", variant: "secondary" },
        ]}
        compact
        description="This route is a teaser for the human side of the ecosystem. It shows how FoFit can expand from adaptive software into deeper coach-supported systems."
        eyebrow="Coaches"
        title={
          <>
            Expert guidance
            <br />
            layered onto the platform.
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
            <span className="eyebrow">Why this matters</span>
            <h3>It makes the platform feel expandable.</h3>
            <p>
              Even if coaching is not fully live yet, scaffolding the route helps
              FoFit feel like a broader fitness company with room for high-touch
              offerings.
            </p>
          </Card>
        </div>
      </section>

      <CTASection
        description="The coaches route gives FoFit a cleaner story around accountability, higher-touch support, and where the platform can go beyond software-only guidance."
        pills={["Reviews", "Accountability", "Expert support"]}
        title={
          <>
            Coaching is not a side idea.
            <br />
            It is part of the ecosystem story.
          </>
        }
      />
    </>
  );
}
