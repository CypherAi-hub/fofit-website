import { CTASection } from "../components/marketing/CTASection";
import { FeatureGrid } from "../components/marketing/FeatureGrid";
import { PlatformShowcase } from "../components/marketing/PlatformShowcase";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { Card } from "../components/ui/Card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { coreFeatures } from "../data/platform";

export function FeaturesPage() {
  return (
    <>
      <PageMeta
        description="Explore FoFit's modular feature set across planning, guidance, tracking, exercise support, recovery concepts, and future nutrition layers."
        title="FoFit Features | Platform Depth Across Training and Guidance"
      />
      <PageHero
        actions={[
          { label: "Get early access", intent: "waitlist" },
          { label: "Read the product story", to: "/product", variant: "secondary" },
        ]}
        compact
        description="This page translates the original landing page's feature fragments into a cleaner modular breakdown of what the platform actually does."
        eyebrow="Features"
        title={
          <>
            Modular depth,
            <br />
            not feature clutter.
          </>
        }
      />

      <section className="page-section">
        <div className="container">
          <PlatformShowcase
            description="Feature pages feel more credible when capabilities are supported by product-looking panels instead of only descriptive text."
            eyebrow="Feature storytelling"
            panels={[
              {
                caption: "Planning module",
                title: "Workout structure that respects the real week",
                stats: [
                  { label: "Equipment logic", value: "Dynamic" },
                  { label: "Training split", value: "Personalized" },
                ],
              },
              {
                caption: "Guidance module",
                title: "Cypher responds like an operating layer, not a chatbot garnish",
                stats: [
                  { label: "Adjustments", value: "Instant" },
                  { label: "Direction", value: "Actionable" },
                ],
              },
              {
                caption: "Tracking module",
                title: "Progress becomes easier to trust when the signal is richer",
                stats: [
                  { label: "Volume", value: "Tracked" },
                  { label: "Coverage", value: "Visible" },
                ],
              },
            ]}
            title="The features should feel expensive in a good way."
          />
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionHeader
            description="The feature system stays tight on purpose. Each module should strengthen the overall platform rather than exist as a random add-on."
            eyebrow="Core modules"
            title="The key product surfaces"
          />
          <FeatureGrid items={coreFeatures} />
        </div>
      </section>

      <section className="page-section page-section--tight">
        <div className="container split-layout">
          <div className="content-stack reveal">
            <span className="eyebrow">Recovery and readiness</span>
            <h2 className="section-title">Training quality depends on more than the plan.</h2>
            <p className="section-description">
              FoFit is positioned to become stronger when readiness, training
              stress, and recovery quality are treated as part of the same
              operating logic. The point is not just to track fatigue. The point
              is to make better decisions while it matters.
            </p>
          </div>
          <Card className="spotlight-card reveal">
            <h3>What this module should do</h3>
            <ul className="check-list">
              <li>Translate recovery context into practical training decisions</li>
              <li>Protect session quality when fatigue is higher than expected</li>
              <li>Keep progression moving without pushing blindly</li>
            </ul>
          </Card>
        </div>
      </section>

      <section className="page-section page-section--tight">
        <div className="container split-layout">
          <Card className="spotlight-card reveal">
            <h3>Nutrition as part of the system</h3>
            <ul className="check-list">
              <li>Direction tied to training demand, not generic macro rules</li>
              <li>Enough structure to support goals without overwhelming the user</li>
              <li>A clean bridge between daily behavior and long-term progress</li>
            </ul>
          </Card>
          <div className="content-stack reveal">
            <span className="eyebrow">Future nutrition support</span>
            <h2 className="section-title">Nutrition should deepen the platform, not distract from it.</h2>
            <p className="section-description">
              The original landing page already hinted at this well. In the
              expanded site, nutrition becomes a credible future product layer
              rather than a single supporting card living inside a one-page
              pitch.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section page-section--tight">
        <div className="container detail-grid detail-grid--two">
          <Card className="detail-card reveal">
            <h3>Why the feature stack matters</h3>
            <p>
              FoFit feels more serious when its modules read like parts of an
              operating system instead of a collection of isolated app features.
            </p>
          </Card>
          <Card className="detail-card reveal">
            <h3>Why premium members care</h3>
            <p>
              Richer guidance, better progress interpretation, and ecosystem
              access should make Premium feel like the natural home for serious
              users.
            </p>
          </Card>
        </div>
      </section>

      <CTASection
        description="The feature page should make platform depth feel organized and intentional. Every module exists to improve clarity, consistency, and long-term trust."
        pills={["Planning", "Tracking", "Recovery", "Nutrition"]}
        title={
          <>
            FoFit now reads like a product
            <br />
            with real surface area.
          </>
        }
      />
    </>
  );
}
