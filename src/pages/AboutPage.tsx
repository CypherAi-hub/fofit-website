import { CTASection } from "../components/marketing/CTASection";
import { AIWorkforce } from "../components/marketing/AIWorkforce";
import { ChapterIntro } from "../components/marketing/ChapterIntro";
import { DeviceFigure } from "../components/marketing/DeviceFigure";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { Card } from "../components/ui/Card";
import { EditorialHeading } from "../components/ui/EditorialHeading";
import { heroFigure } from "../data/editorial";
import { roadmapThemes } from "../data/updates";


export function AboutPage() {
  return (
    <>
      <PageMeta
        description="FoFit started from a simple frustration: too many disconnected tools, not enough clarity. The company exists to build a more useful training system."
        title="About FoFit | Mission, Product Vision, and Platform Direction"
      />
      <PageHero
        actions={[
          { label: "Join the waitlist", intent: "waitlist" },
          { label: "Explore updates", to: "/updates", variant: "secondary" },
        ]}
        compact
        description="FoFit brings planning, guidance, and progress into one system for lifters, athletes, and teams."
        eyebrow="About"
        title={
          <EditorialHeading accent="concept" as="span" className="editorial-heading--compact">
            {"A training company.\nNot a launch {italic}."}
          </EditorialHeading>
        }
      />

      <section className="page-section editorial-section editorial-section--tight">
        <div className="container split-layout split-layout--editorial">
          <div className="content-stack reveal">
            <ChapterIntro
              description="The paths are different because training context is different. The product stays unified: Cypher, structure, progress, and memory."
              index="01"
              label="Why FoFit exists"
              title={
                <>
                  One product. Three paths into <em>it</em>.
                </>
              }
            />
            <p className="section-description">
              FoFit exists because most people still train across too many
              disconnected tools and too much guesswork.
            </p>
          </div>
          <DeviceFigure asset={heroFigure} className="split-layout__figure about-hero-figure" />
        </div>
      </section>

      <AIWorkforce />

      <section className="page-section editorial-section editorial-section--tight">
        <div className="container split-layout">
          <Card className="founder-note reveal editorial-card">
            <span className="eyebrow">Founder perspective</span>
            <h3>Built from the problem, not just the market category.</h3>
            <p>
              FoFit started from a simple frustration: too much fitness progress
              still depends on juggling disconnected tools and making hard calls
              without enough context. The goal is a training system that feels
              clear, durable, and worth returning to.
            </p>
          </Card>
          <div className="content-stack reveal">
            <span className="eyebrow">Vision</span>
            <h2 className="section-title">Cypher first. Coaches and teams after that.</h2>
            <ul className="roadmap-list">
              {roadmapThemes.map((theme) => (
                <li key={theme}>{theme}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        description="FoFit is building a focused training platform. Lifters, athletes, and teams can start from different paths without leaving the same system."
        pills={["Mission", "Three paths", "Long game"]}
        title={
          <>
            A company,
            <br />
            not a launch concept.
          </>
        }
      />
    </>
  );
}
