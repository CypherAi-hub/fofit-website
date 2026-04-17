import { ArticleGrid } from "../components/marketing/ArticleGrid";
import { CTASection } from "../components/marketing/CTASection";
import { EcosystemTeaser } from "../components/marketing/EcosystemTeaser";
import { HeroDeviceMockups } from "../components/marketing/HeroDeviceMockups";
import { PlatformShowcase } from "../components/marketing/PlatformShowcase";
import { PricingPreview } from "../components/marketing/PricingPreview";
import { TrustBand } from "../components/marketing/TrustBand";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { SectionHeader } from "../components/ui/SectionHeader";
import { insightArticles } from "../data/insights";

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
        className="page-hero--home"
        description="FoFit plans your week, guides you mid-workout, and shows you what moved."
        eyebrow="Premium fitness platform"
        mediaClassName="page-hero__media--home"
        media={<HeroDeviceMockups />}
        title={
          <span className="home-hero__title-group">
            <span>Train smarter.</span>
            <span className="home-hero__title-accent">Progress faster.</span>
            <span className="home-hero__support-line">Built to train you — not just track you.</span>
          </span>
        }
      />

      <TrustBand />

      <section className="page-section home-section home-section--modules">
        <div className="container">
          <PlatformShowcase
            className="platform-showcase--home"
            description="Planning, adaptive coaching, progress intelligence, nutrition, discover, and community working like one training system instead of five disconnected tools."
            eyebrow="Six modules. One system."
            panels={[
              {
                caption: "Cypher AI",
                description:
                  "Adaptive guidance that adjusts loads, suggests swaps, and explains the call while you train.",
                size: "feature",
                stats: [
                  { label: "Coaching", value: "Adaptive" },
                  { label: "Timing", value: "Mid-session" },
                ],
                title: "Meet Cypher. Coaching that stays useful when the workout gets real.",
                tone: "blue",
                variant: "chat",
              },
              {
                caption: "Progress intelligence",
                description:
                  "Strength trends, consistency, and coverage brought together so every completed block sharpens the next one.",
                size: "tall",
                stats: [
                  { label: "Momentum", value: "Visible" },
                  { label: "Tracking", value: "Compounding" },
                ],
                title: "Progress that tells you what changed — not just what you logged.",
                tone: "green",
                variant: "chart",
              },
              {
                caption: "Planning",
                description:
                  "Programs shaped around schedule, equipment, and real training constraints before the week even starts.",
                size: "wide",
                stats: [
                  { label: "Schedule fit", value: "Personalized" },
                  { label: "Flexibility", value: "Built-in" },
                ],
                title: "A weekly structure you can actually follow when life is not perfectly clean.",
                tone: "default",
                variant: "calendar",
              },
              {
                caption: "Nutrition",
                description:
                  "Food guidance stays close to training demand so nutrition supports the block instead of living in a separate app.",
                stats: [
                  { label: "Direction", value: "Training-linked" },
                  { label: "Logging", value: "Simplified" },
                ],
                title: "Macros without making the system feel heavier.",
                tone: "orange",
                variant: "nutrition",
              },
              {
                caption: "Discover",
                description:
                  "Find the right session, recovery flow, or goal-focused path when the original plan needs to flex.",
                stats: [
                  { label: "Matching", value: "Goal-based" },
                  { label: "Recovery", value: "Included" },
                ],
                title: "The right next session when the week changes.",
                tone: "violet",
                variant: "discover",
              },
              {
                caption: "Community",
                description:
                  "Accountability, challenges, and shared momentum that reinforce the plan instead of distracting from it.",
                stats: [
                  { label: "Challenges", value: "Planned" },
                  { label: "Support", value: "Shared" },
                ],
                title: "Community designed to make consistency easier to keep.",
                tone: "default",
                variant: "community",
              },
            ]}
            title="Everything your training needs. In one place."
          />
        </div>
      </section>

      <section className="page-section home-section home-section--membership">
        <div className="container">
          <div className="home-pricing-shell">
            <div className="home-membership">
              <div className="content-stack reveal home-membership__intro">
                <span className="eyebrow">Membership value</span>
                <h2 className="section-title">A premium system that earns its place in your training every week.</h2>
                <p className="section-description">
                  Planning, adaptive guidance, progress interpretation, and future
                  ecosystem layers under one membership instead of a stack of
                  narrow tools.
                </p>
                <div className="home-membership__points">
                  <span>Structured programming</span>
                  <span>Cypher coaching</span>
                  <span>Progress intelligence</span>
                </div>
              </div>
              <div className="surface-card reveal home-membership__callout">
                <span className="feature-card__kicker">Premium membership</span>
                <h3>Founding members lock in $14/mo for life.</h3>
                <p>Join now and keep the founding rate when launch pricing goes up.</p>
                <div className="home-membership__callout-meta">
                  <strong>One membership</strong>
                  <span>Planning, guidance, progress, and future ecosystem layers.</span>
                </div>
              </div>
            </div>
            <PricingPreview className="pricing-preview--home" />
          </div>
        </div>
      </section>

      <section className="page-section home-section home-section--insights">
        <div className="container">
          <SectionHeader
            description="Practical reads on training, nutrition, recovery, and performance that deepen the system without taking over the page."
            eyebrow="Insights preview"
            title="Training, nutrition, recovery, performance"
          />
          <ArticleGrid articles={insightArticles.slice(0, 3)} />
        </div>
      </section>

      <section className="page-section home-section home-section--ecosystem">
        <div className="container home-ecosystem">
          <div className="content-stack reveal">
            <span className="eyebrow">Ecosystem</span>
            <h2 className="section-title">One training home now. More useful layers as FoFit grows.</h2>
            <p className="section-description">
              Coaching, teams, store, and community should feel like natural
              extensions of the product — not distractions bolted on for the
              sake of feature count.
            </p>
          </div>
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
