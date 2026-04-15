import { CTASection } from "../components/marketing/CTASection";
import { ComparisonBlock } from "../components/marketing/ComparisonBlock";
import { HeroDeviceMockups } from "../components/marketing/HeroDeviceMockups";
import { SystemPillars } from "../components/marketing/SystemPillars";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { Card } from "../components/ui/Card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { StatBand } from "../components/ui/StatBand";
import { platformStats, systemPillars, workflowSteps } from "../data/platform";

const detailCards = [
  {
    title: "Planning engine",
    description:
      "FoFit starts with constraints that actually matter: goal, available time, equipment, experience, and the kind of training life can support consistently.",
  },
  {
    title: "In-session flow",
    description:
      "The workout surface stays useful while someone is training, so the product is not limited to a plan before the session and a graph after it.",
  },
  {
    title: "Progress intelligence",
    description:
      "Progress tracking is framed as decision support. The point is not only to record data but to make the next move clearer.",
  },
  {
    title: "Exercise guidance",
    description:
      "When swaps, modifications, or execution questions show up, the system should stay practical enough to help without derailing the session.",
  },
  {
    title: "Recovery logic",
    description:
      "Training quality depends on knowing when to push and when to preserve. FoFit treats recovery as part of the operating system.",
  },
  {
    title: "Nutrition direction",
    description:
      "Nutrition belongs in the same conversation as training stress, recovery, and physique goals rather than being split off into a disconnected app.",
  },
];

export function ProductPage() {
  return (
    <>
      <PageMeta
        description="See how FoFit connects planning, workout flow, adaptive guidance, progress intelligence, and future ecosystem modules into one product system."
        title="FoFit Product | The System Behind the Platform"
      />
      <PageHero
        actions={[
          { label: "See features", to: "/features" },
          { label: "Explore pricing", to: "/pricing", variant: "secondary" },
        ]}
        description="This page carries the depth that should never have been trapped inside a single landing-page scroll. FoFit works because the layers reinforce one another."
        eyebrow="Product"
        media={<HeroDeviceMockups />}
        title={
          <>
            A connected training system
            <br />
            built around real use.
          </>
        }
      />

      <StatBand items={platformStats} />

      <section className="page-section">
        <div className="container">
          <SectionHeader
            description="These three pillars are still the clearest expression of the product. The difference now is that they live inside a deeper system, not a one-page narrative."
            eyebrow="System architecture"
            title="Three layers, one product logic"
          />
          <SystemPillars items={systemPillars} />
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionHeader
            description="A member should be able to understand how FoFit thinks, not just what the feature names are."
            eyebrow="Workflow"
            title="How the product works together"
          />
          <div className="workflow-grid">
            {workflowSteps.map((step, index) => (
              <Card className="workflow-step reveal" key={step.title}>
                <span className="workflow-step__index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section--tight">
        <div className="container">
          <SectionHeader
            description="This is where the site goes deeper than the homepage: specific layers, clearer responsibilities, and product thinking that feels like platform design."
            eyebrow="Deeper product views"
            title="The product layers in detail"
          />
          <div className="detail-grid">
            {detailCards.map((card) => (
              <Card className="detail-card reveal" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <ComparisonBlock
            afterItems={[
              "Planning, tracking, guidance, and nutrition are designed to reinforce each other",
              "Members get a clearer sense of what to do next instead of more disconnected data",
              "The architecture already supports future coaching, community, and team layers",
            ]}
            afterTitle="A platform mindset"
            beforeItems={[
              "Most fitness products solve one narrow problem and leave the rest fragmented",
              "Tracking without interpretation still leaves the hard decisions to the user",
              "Static plans create drift as soon as schedule, recovery, or progress changes",
            ]}
            beforeTitle="A narrow app mindset"
            title="Why the system matters"
          />
        </div>
      </section>

      <CTASection
        description="FoFit should look and read like a product company with architecture, not like a single-feature experiment with a nice hero section."
        pills={["Planning", "Guidance", "Progress", "Recovery"]}
        title={
          <>
            The product story is now deep enough
            <br />
            to justify the platform claim.
          </>
        }
      />
    </>
  );
}
