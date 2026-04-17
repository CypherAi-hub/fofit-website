import { ArticleGrid } from "../components/marketing/ArticleGrid";
import { CTASection } from "../components/marketing/CTASection";
import { ComparisonBlock } from "../components/marketing/ComparisonBlock";
import { EcosystemTeaser } from "../components/marketing/EcosystemTeaser";
import { FeatureGrid } from "../components/marketing/FeatureGrid";
import { HeroDeviceMockups } from "../components/marketing/HeroDeviceMockups";
import { PricingPreview } from "../components/marketing/PricingPreview";
import { PlatformShowcase } from "../components/marketing/PlatformShowcase";
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
          { label: "Join the waitlist", intent: "waitlist" },
          { label: "See how it works", to: "/product", variant: "secondary" },
        ]}
        description="FoFit plans your week, guides you mid-workout, and shows you what moved. One system instead of five disconnected apps."
        eyebrow="Premium fitness platform"
        media={<HeroDeviceMockups />}
        title={
          <>
            Train smarter.
            <br />
            Progress faster.
            <br />
            Built to train you — not just track you.
          </>
        }
      />
      <TrustBand />
      <StatBand items={platformStats} />

      <section className="page-section">
        <div className="container">
          <SectionHeader
            description="Three connected layers — planning, live guidance, and progress intelligence — working together instead of asking you to stitch tools together."
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
          <PlatformShowcase
            description="Three surfaces doing the work: what to train today, what to adjust mid-session, what changed this month."
            eyebrow="Product showcase"
            panels={[
              {
                caption: "Adaptive planning",
                title: "Training blocks that reshape around the member",
                stats: [
                  { label: "Programs", value: "Custom" },
                  { label: "Adjustments", value: "Session-aware" },
                ],
              },
              {
                caption: "Guidance layer",
                title: "Cypher keeps support close to the training moment",
                stats: [
                  { label: "Coach logic", value: "24/7" },
                  { label: "Recovery cues", value: "Live" },
                ],
              },
              {
                caption: "Performance visibility",
                title: "Progress gets interpreted, not only recorded",
                stats: [
                  { label: "Tracking", value: "Multi-layer" },
                  { label: "Momentum", value: "Visible" },
                ],
              },
            ]}
            title="See the system in motion."
          />
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionHeader
            description="Planning, guidance, and progress tracking — the three layers every serious training system needs."
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
            description="Real people. Real training blocks. Real progress numbers — before you spend a dollar."
            eyebrow="Trust"
            title="Built for people who train seriously"
          />
          <TestimonialGrid />
        </div>
      </section>

      <section className="page-section page-section--tight">
        <div className="container split-layout">
          <div className="content-stack reveal">
            <span className="eyebrow">Membership value</span>
            <h2 className="section-title">A platform that pays for itself in better training decisions.</h2>
            <p className="section-description">
              Structured training blocks, adaptive guidance, richer progress
              visibility, and access to every ecosystem layer as it launches —
              all under one membership.
            </p>
          </div>
          <div className="detail-grid detail-grid--two">
            <article className="surface-card detail-card reveal">
              <h3>Founding-member pricing</h3>
              <p>Lock in $14/mo for life. Price goes up at launch — founding members keep their rate forever.</p>
            </article>
            <article className="surface-card detail-card reveal">
              <h3>Platform-first roadmap</h3>
              <p>Coaching, teams, community, and premium insight layers — all on the way, all included in your membership.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionHeader
            description="Start free. Founding members lock in $14/mo for life. Team and coaching tiers come later."
            eyebrow="Pricing preview"
            title="Simple now. Scalable later."
          />
          <PricingPreview />
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionHeader
            description="Practical reads on training, nutrition, recovery, and performance — written for people who take their results seriously."
            eyebrow="Insights preview"
            title="Training, nutrition, recovery, performance"
          />
          <ArticleGrid articles={insightArticles.slice(0, 3)} />
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionHeader
            description="Coaches, community, store, and teams — each layer is being built deliberately so the whole ecosystem grows without losing focus."
            eyebrow="Ecosystem"
            title="Built to expand beyond one feature set"
          />
          <EcosystemTeaser />
        </div>
      </section>

      <CTASection
        description="Join the waitlist. Founding-member pricing closes at launch."
        pills={["Structured training", "Adaptive guidance", "Future coaching"]}
        title={
          <>
            Training should compound.
            <br />
            So should your tools.
          </>
        }
      />
    </>
  );
}
