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
          { label: "Join the waitlist", intent: "waitlist" },
          { label: "Read the product story", to: "/product", variant: "secondary" },
        ]}
        compact
        description="Six focused modules — planning, guidance, tracking, exercise support, recovery, and nutrition — built to work as one system."
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
            description="Each module earns its place by making the next decision easier."
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
            title="Built to feel like a platform, not a feature list."
          />
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionHeader
            description="Every feature connects to the whole. Nothing is filler."
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
            <h3>What recovery intelligence does</h3>
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
              Nutrition connected to your actual training demand — not generic
              macro rules layered on top of a separate app.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section page-section--tight">
        <div className="container detail-grid detail-grid--two">
          <Card className="detail-card reveal">
            <h3>Why the feature stack matters</h3>
            <p>
              Six connected modules built to improve every training decision you
              make — from the plan to the session to the week's recap.
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
        description="Join early. Every module ships from day one."
        pills={["Planning", "Tracking", "Recovery", "Nutrition"]}
        title={
          <>
            A platform built for
            <br />
            the full picture of your training.
          </>
        }
      />
    </>
  );
}
