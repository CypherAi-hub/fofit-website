import { CTASection } from "../components/marketing/CTASection";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { Card } from "../components/ui/Card";
import { roadmapThemes, updateItems } from "../data/updates";

export function UpdatesPage() {
  return (
    <>
      <PageMeta
        description="FoFit Updates previews product shipping notes, changelog-style communication, and the platform themes guiding future releases."
        title="FoFit Updates | Product Progress and Changelog Direction"
      />
      <PageHero
        actions={[
          { label: "Join the waitlist", intent: "waitlist" },
          { label: "See community", to: "/community", variant: "secondary" },
        ]}
        compact
        description="See what FoFit is building, what has shipped, and what the team is sharpening next."
        eyebrow="Updates"
        title={
          <>
            Product momentum
            <br />
            should stay visible.
          </>
        }
      />

      <section className="page-section">
        <div className="container">
          <div className="detail-grid">
            {updateItems.map((item) => (
              <Card className="detail-card reveal" key={item.version}>
                <span className="feature-card__kicker">{item.version}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section--tight">
        <div className="container">
          <Card className="spotlight-card reveal">
            <span className="eyebrow">Roadmap themes</span>
            <h3>What we are building next.</h3>
            <ul className="roadmap-list">
              {roadmapThemes.map((theme) => (
                <li key={theme}>{theme}</li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <CTASection
        description="Join the waitlist to get product updates and early access as new features roll out."
        pills={["Shipping", "Roadmap", "Platform direction"]}
        title={
          <>
            Follow the product
            <br />
            as it gets sharper.
          </>
        }
      />
    </>
  );
}
