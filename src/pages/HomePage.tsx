import { ArticleGrid } from "../components/marketing/ArticleGrid";
import { CTASection } from "../components/marketing/CTASection";
import { ComparisonBlock } from "../components/marketing/ComparisonBlock";
import { EcosystemTeaser } from "../components/marketing/EcosystemTeaser";
import { FeatureGrid } from "../components/marketing/FeatureGrid";
import { HeroDeviceMockups } from "../components/marketing/HeroDeviceMockups";
import { PricingPreview } from "../components/marketing/PricingPreview";
import { SystemPillars } from "../components/marketing/SystemPillars";
import { TestimonialGrid } from "../components/marketing/TestimonialGrid";
import { TrustBand } from "../components/marketing/TrustBand";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { SectionHeader } from "../components/ui/SectionHeader";
import { StatBand } from "../components/ui/StatBand";
import { insightArticles } from "../data/insights";
import { coreFeatures, platformStats, systemPillars } from "../data/platform";

export function HomePage() {
  return (
    <>
      <PageMeta
        description="FoFit is a premium fitness platform that connects personalized planning, adaptive guidance, progress intelligence, and future coaching layers."
        title="FoFit | Premium Fitness Platform"
      />
      <PageHero
        actions={[
          { label: "Get Early Access", href: "mailto:hello@fofit.app?subject=FoFit%20Early%20Access" },
          { label: "See the platform", to: "/product", variant: "secondary" },
        ]}
        description="FoFit combines structured training, adaptive AI guidance, progress tracking, nutrition direction, and future coaching surfaces into one focused system."
        eyebrow="Premium fitness platform"
        media={<HeroDeviceMockups />}
        title={
          <>
            Train smarter.
            <br />
            Progress faster.
            <br />
            Built as a real platform.
          </>
        }
      />
      <TrustBand />
      <StatBand items={platformStats} />

      <section className="page-section">
        <div className="container">
          <SectionHeader
            description="The best parts of the original landing page belong here: a clear system thesis, strong hierarchy, and a more mature sense of product depth."
            eyebrow="The system"
            title={
              <>
                A fitness platform.
                <br />
                Not just an app.
              </>
            }
          />
          <SystemPillars items={systemPillars} />
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <ComparisonBlock
            afterItems={[
              "One connected system for planning, guidance, and progress",
              "A product that adapts around the member instead of forcing generic structure",
              "Training direction that extends beyond the session itself",
              "A clear foundation for community, coaching, teams, and future ecosystem layers",
            ]}
            afterTitle="FoFit as a platform"
            beforeItems={[
              "Workout logging in one app, nutrition in another, and guidance nowhere",
              "Plans that stop feeling relevant the moment real life changes",
              "Progress data that exists without helping the next decision",
              "No sense of where the product can grow beyond a single feature",
            ]}
            beforeTitle="The fragmented status quo"
            title="Why FoFit"
          />
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionHeader
            description="Home should preview the platform, not try to explain every module at once. These are the most important layers to understand first."
            eyebrow="Platform depth"
            title="The core modules preview"
          />
          <FeatureGrid items={coreFeatures.slice(0, 4)} />
        </div>
      </section>

      <section className="page-section page-section--tight">
        <div className="container">
          <SectionHeader
            align="center"
            description="The product should feel credible even before a user touches it. That comes from a consistent structure and believable product language."
            eyebrow="Trust"
            title="A more serious front door for the brand"
          />
          <TestimonialGrid />
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionHeader
            description="The site now treats pricing as part of a broader product story: clear plans, confident positioning, and room to scale into teams."
            eyebrow="Pricing preview"
            title="Simple now. Scalable later."
          />
          <PricingPreview />
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionHeader
            description="Editorial depth matters because it makes the platform feel informed, durable, and worth trusting over the long term."
            eyebrow="Insights preview"
            title="Training, nutrition, recovery, performance"
          />
          <ArticleGrid articles={insightArticles.slice(0, 3)} />
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionHeader
            description="FoFit should already hint at where it is going: coaches, community, store, updates, and teams all reinforce the idea of a broader fitness ecosystem."
            eyebrow="Ecosystem"
            title="Built to expand beyond one feature set"
          />
          <EcosystemTeaser />
        </div>
      </section>

      <CTASection
        description="The goal is not to look like a launch page forever. The goal is to establish FoFit as a company with a focused product, a credible roadmap, and room to become much bigger."
        pills={["Structured training", "Adaptive guidance", "Future coaching"]}
        title={
          <>
            FoFit should feel like a company
            <br />
            building something durable.
          </>
        }
      />
    </>
  );
}
