import { CTASection } from "../components/marketing/CTASection";
import { PlatformShowcase } from "../components/marketing/PlatformShowcase";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { Card } from "../components/ui/Card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { StatBand } from "../components/ui/StatBand";
import { roadmapThemes } from "../data/updates";
import { platformStats } from "../data/platform";

const principles = [
  {
    title: "Build around real training behavior",
    description:
      "FoFit is grounded in how people actually train, recover, and stay consistent, not in abstract wellness language.",
  },
  {
    title: "Make guidance practical",
    description:
      "Product quality shows up when advice is actionable in the moment, not only impressive in a pitch deck.",
  },
  {
    title: "Treat depth as a trust signal",
    description:
      "Serious products feel more credible when information architecture and content are both built with care.",
  },
  {
    title: "Design for expansion",
    description:
      "FoFit is being shaped to grow into coaching, community, teams, and ecosystem layers without losing focus.",
  },
];

export function AboutPage() {
  return (
    <>
      <PageMeta
        description="Learn why FoFit exists, who it is for, what makes it different, and where the platform is designed to go next."
        title="About FoFit | Mission, Product Vision, and Platform Direction"
      />
      <PageHero
        actions={[
          { label: "Join early access", intent: "waitlist" },
          { label: "Explore updates", to: "/updates", variant: "secondary" },
        ]}
        compact
        description="The About route should feel like a company page, not a founder note pasted into the bottom of a landing page. It needs polish, clarity, and a future-facing point of view."
        eyebrow="About"
        title={
          <>
            FoFit exists to make
            <br />
            better training feel reachable.
          </>
        }
      />

      <section className="page-section page-section--tight">
        <div className="container split-layout">
          <div className="content-stack reveal">
            <span className="eyebrow">Why FoFit exists</span>
            <h2 className="section-title">Because fragmented fitness tools still leave too much guesswork.</h2>
            <p className="section-description">
              FoFit was created around a simple idea: training gets better when
              structure, guidance, tracking, and direction work together. Most
              products solve one piece of that problem. FoFit is designed to
              connect the system.
            </p>
            <p className="section-description">
              It is for beginners who need clarity, lifters who want better
              structure, and athletes who care about quality, consistency, and
              progress that compounds over time.
            </p>
          </div>
          <Card className="spotlight-card reveal">
            <h3>What makes it different</h3>
            <ul className="check-list">
              <li>More platform depth than a generic AI workout generator</li>
              <li>More structure than a simple tracker</li>
              <li>Clearer future ecosystem potential than a one-dimensional app</li>
            </ul>
          </Card>
        </div>
      </section>

      <StatBand items={platformStats} />

      <section className="page-section page-section--tight">
        <div className="container">
          <PlatformShowcase
            description="About pages feel more like real company pages when they connect mission to product surfaces and future company shape."
            eyebrow="Company in motion"
            panels={[
              {
                caption: "Product conviction",
                title: "A belief that training products should do more than log activity",
                stats: [
                  { label: "Philosophy", value: "System-first" },
                  { label: "Tone", value: "Focused" },
                ],
              },
              {
                caption: "Company direction",
                title: "A clearer path into coaching, content, and premium ecosystem layers",
                stats: [
                  { label: "Roadmap", value: "Visible" },
                  { label: "Expansion", value: "Intentional" },
                ],
              },
              {
                caption: "Audience fit",
                title: "Built for people who want more than a generic workout app",
                stats: [
                  { label: "Beginners", value: "Supported" },
                  { label: "Athletes", value: "Respected" },
                ],
              },
            ]}
            title="The company story should feel as grounded as the product story."
          />
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionHeader
            description="These principles are the bridge between company tone and product decisions. They keep the website from feeling like empty brand language."
            eyebrow="Principles"
            title="What the company is building toward"
          />
          <div className="detail-grid">
            {principles.map((principle) => (
              <Card className="detail-card reveal" key={principle.title}>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section--tight">
        <div className="container split-layout">
          <Card className="founder-note reveal">
            <span className="eyebrow">Founder perspective</span>
            <h3>Built from the problem, not just the market category.</h3>
            <p>
              FoFit started from a simple frustration: too much fitness progress
              still depends on juggling disconnected tools and making hard calls
              without enough context. The long-term ambition is to build a
              system that feels more useful, more focused, and more durable than
              that.
            </p>
          </Card>
          <div className="content-stack reveal">
            <span className="eyebrow">Vision</span>
            <h2 className="section-title">The platform should grow without losing its focus.</h2>
            <ul className="roadmap-list">
              {roadmapThemes.map((theme) => (
                <li key={theme}>{theme}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        description="The About page now frames FoFit as a focused product company with a stronger operating point of view and a believable long-term direction."
        pills={["Mission", "Product clarity", "Future ecosystem"]}
        title={
          <>
            FoFit is being positioned as a company,
            <br />
            not just a launch concept.
          </>
        }
      />
    </>
  );
}
