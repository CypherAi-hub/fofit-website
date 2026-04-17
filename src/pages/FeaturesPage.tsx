import { CTASection } from "../components/marketing/CTASection";
import { ChapterIntro } from "../components/marketing/ChapterIntro";
import { DeviceFigure } from "../components/marketing/DeviceFigure";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { EditorialHeading } from "../components/ui/EditorialHeading";
import { Card } from "../components/ui/Card";
import { nutritionFigure, progressFigureAsset, transcriptFigure } from "../data/editorial";
import { coreFeatures } from "../data/platform";

export function FeaturesPage() {
  return (
    <>
      <PageMeta
        description="Explore planning, guidance, progress, exercise support, recovery logic, and nutrition as connected FoFit modules instead of disconnected features."
        title="FoFit Features | Platform Depth Across Training and Guidance"
      />
      <PageHero
        actions={[
          { label: "Join the waitlist", intent: "waitlist" },
          { label: "Read the product story", to: "/product", variant: "secondary" },
        ]}
        compact
        description="Every module earns its place by making another one sharper."
        eyebrow="Features"
        title={
          <EditorialHeading accent="clutter" as="span" className="editorial-heading--compact">
            {"Modular depth.\nNo feature {italic}."}
          </EditorialHeading>
        }
      />

      <section className="page-section editorial-section">
        <div className="container">
          <ChapterIntro
            description="Planning, guidance, progress, execution, recovery, nutrition. Six responsibilities, each with a specific job."
            index="01"
            label="Modules"
            title={
              <>
                Every module sharpens the <em>next</em> decision.
              </>
            }
          />
          <div className="feature-ledger">
            {coreFeatures.map((feature, index) => (
              <article className="feature-ledger__item reveal" key={feature.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p>{feature.kicker}</p>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section editorial-section editorial-section--tight">
        <div className="container split-layout split-layout--editorial">
          <div className="content-stack reveal">
            <span className="eyebrow">Recovery and readiness</span>
            <h2 className="section-title">Recovery logic should change the next call, not just decorate a dashboard.</h2>
            <p className="section-description">
              Readiness, training stress, and recovery quality belong in the same conversation. Cypher reads all three before the next session is set.
            </p>
          </div>
          <DeviceFigure asset={progressFigureAsset} className="split-layout__figure" />
        </div>
      </section>

      <section className="page-section editorial-section editorial-section--tight">
        <div className="container split-layout split-layout--editorial">
          <DeviceFigure asset={transcriptFigure} className="split-layout__figure" />
          <Card className="spotlight-card reveal editorial-card">
            <h3>What recovery logic actually does</h3>
            <ul className="check-list">
              <li>Translate recovery context into practical training decisions</li>
              <li>Protect session quality when fatigue is higher than expected</li>
              <li>Keep progression moving without pushing blindly</li>
            </ul>
          </Card>
        </div>
      </section>

      <section className="page-section editorial-section editorial-section--tight">
        <div className="container split-layout split-layout--editorial">
          <Card className="spotlight-card reveal editorial-card">
            <h3>Nutrition as part of the system</h3>
            <ul className="check-list">
              <li>Direction tied to training demand, not generic macro rules</li>
              <li>Enough structure to support goals without making the app heavier</li>
              <li>A clear bridge between daily behavior and long-term progress</li>
            </ul>
          </Card>
          <div className="content-stack reveal">
            <span className="eyebrow">Nutrition</span>
            <h2 className="section-title">Nutrition belongs inside the training loop.</h2>
            <p className="section-description">
              Cypher reads training demand and points at the macro adjustments that keep the block moving.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section editorial-section editorial-section--tight">
        <div className="container split-layout split-layout--editorial">
          <div className="content-stack reveal">
            <span className="eyebrow">Guidance</span>
            <h2 className="section-title">The conversation should stay inside the product.</h2>
            <p className="section-description">
              Cypher is not a separate chatbot garnish. It is part of the workout, the plan, and the review loop.
            </p>
          </div>
          <DeviceFigure asset={nutritionFigure} className="split-layout__figure" />
        </div>
      </section>

      <CTASection
        description="Join the waitlist. Every module points back to the same training system."
        pills={["Planning", "Tracking", "Recovery", "Nutrition"]}
        title={
          <>
            A platform built for
            <br />
            the full picture of training.
          </>
        }
      />
    </>
  );
}
