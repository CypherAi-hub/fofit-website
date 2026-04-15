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
          { label: "Join early access", intent: "waitlist" },
          { label: "See community", to: "/community", variant: "secondary" },
        ]}
        compact
        description="Shipping visibility matters. Even as a teaser route, Updates makes FoFit feel like a company that iterates with intent instead of a landing page frozen in time."
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
            <h3>The platform direction is bigger than one release cycle.</h3>
            <ul className="roadmap-list">
              {roadmapThemes.map((theme) => (
                <li key={theme}>{theme}</li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <CTASection
        description="The updates page reinforces maturity by showing FoFit as a product that ships, learns, and expands with a visible sense of direction."
        pills={["Shipping", "Roadmap", "Platform direction"]}
        title={
          <>
            Visibility into progress
            <br />
            makes the company feel real.
          </>
        }
      />
    </>
  );
}
