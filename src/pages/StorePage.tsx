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
          { label: "Join the waitlist", intent: "waitlist" },
          { label: "See coaches", to: "/coaches", variant: "secondary" },
        ]}
        compact
        description="Programs, guides, gear, and bundles — all aligned with how FoFit trains you."
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
            <span className="eyebrow">Why it fits</span>
            <h3>Buy tools that match how you train.</h3>
            <p>
              Programs, guides, and bundles should support the same training
              system you already use instead of feeling like random add-ons.
            </p>
          </Card>
        </div>
      </section>

      <CTASection
        description="Everything in the store is built around how FoFit members actually train."
        pills={["Programs", "Guides", "Bundles"]}
        title={
          <>
            Curated programs. Proven guides.
            <br />
            Partner-level gear.
          </>
        }
      />
    </>
  );
}
