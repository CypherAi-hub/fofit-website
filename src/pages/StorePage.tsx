import { CTASection } from "../components/marketing/CTASection";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { Card } from "../components/ui/Card";

const storeModules = [
  {
    title: "Programs and templates",
    description:
      "Specialized training blocks and focused goal packages built on top of the FoFit system.",
  },
  {
    title: "Guides and education",
    description:
      "Practical resources around training structure, nutrition direction, and progress management.",
  },
  {
    title: "Gear and partner kits",
    description:
      "A future layer for curated equipment, recovery essentials, and ecosystem-aligned partner offers.",
  },
  {
    title: "Member bundles",
    description:
      "Combined digital and physical experiences that feel aligned with the platform instead of randomly merch-driven.",
  },
];

export function StorePage() {
  return (
    <>
      <PageMeta
        description="FoFit Store previews a future marketplace for programs, guides, partner offers, and ecosystem-aligned product bundles."
        title="FoFit Store | Marketplace and Ecosystem Expansion Preview"
      />
      <PageHero
        actions={[
          { label: "Join early access", intent: "waitlist" },
          { label: "See coaches", to: "/coaches", variant: "secondary" },
        ]}
        compact
        description="The store route is not about pretending commerce is finished. It is about showing that FoFit can extend into a broader ecosystem without feeling scattered."
        eyebrow="Store"
        title={
          <>
            A marketplace layer
            <br />
            with platform logic behind it.
          </>
        }
      />

      <section className="page-section">
        <div className="container detail-grid">
          {storeModules.map((module) => (
            <Card className="detail-card reveal" key={module.title}>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="page-section page-section--tight">
        <div className="container">
          <Card className="spotlight-card reveal">
            <span className="eyebrow">Why scaffold this now</span>
            <h3>It reinforces the idea that FoFit is building an ecosystem, not a single screen flow.</h3>
            <p>
              When store, coaches, teams, community, and updates all exist as
              intentional routes, the entire company story becomes more mature
              and much less one-dimensional.
            </p>
          </Card>
        </div>
      </section>

      <CTASection
        description="The store route helps FoFit hint at future commerce and partner opportunities without turning the current website into a generic merch play."
        pills={["Programs", "Guides", "Bundles"]}
        title={
          <>
            Marketplace potential feels stronger
            <br />
            when it fits the product narrative.
          </>
        }
      />
    </>
  );
}
