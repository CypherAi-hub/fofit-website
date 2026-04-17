import { CTASection } from "../components/marketing/CTASection";
import { CommunityPreview } from "../components/marketing/CommunityPreview";
import { PlatformShowcase } from "../components/marketing/PlatformShowcase";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { Card } from "../components/ui/Card";
import { SectionHeader } from "../components/ui/SectionHeader";

const communityBlocks = [
  {
    title: "Accountability",
    description:
      "Shared check-ins and visible progress loops can reinforce consistency without turning the product into a noisy social feed.",
  },
  {
    title: "Challenges",
    description:
      "Training-aware challenges worth joining — not empty engagement mechanics.",
  },
  {
    title: "Groups",
    description:
      "Private groups create a bridge between solo training, coach oversight, and team accountability.",
  },
];

export function CommunityPage() {
  return (
    <>
      <PageMeta
        description="See how FoFit can expand into accountability, challenges, shared progress, groups, and coach-ready community structures."
        title="FoFit Community | Accountability, Challenges, and Shared Progress"
      />
      <PageHero
        actions={[
          { label: "Join the waitlist", intent: "waitlist" },
          { label: "See teams", to: "/teams", variant: "secondary" },
        ]}
        compact
        description="Consistency gets easier when your progress is shared with people working toward the same things."
        eyebrow="Community"
        title={
          <>
            Built for accountability,
            <br />
            not empty social noise.
          </>
        }
      />

      <section className="page-section">
        <div className="container">
          <PlatformShowcase
            description="Accountability, challenges, and group structure — built into the platform, not bolted on."
            eyebrow="Momentum systems"
            panels={[
              {
                caption: "Challenges",
                title: "Goal-based challenges that fit real training blocks",
                stats: [
                  { label: "Consistency", value: "Visible" },
                  { label: "Progress", value: "Shared" },
                ],
              },
              {
                caption: "Groups",
                title: "Private circles for teams, crews, and accountability pods",
                stats: [
                  { label: "Groups", value: "Flexible" },
                  { label: "Check-ins", value: "Lightweight" },
                ],
              },
              {
                caption: "Coach-ready",
                title: "A community layer that can support higher-accountability guidance",
                stats: [
                  { label: "Reviews", value: "Expandable" },
                  { label: "Momentum", value: "Stronger" },
                ],
              },
            ]}
            title="Community is the engine for consistency."
          />
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionHeader
            description="A structured community layer designed around training progress, not social noise."
            eyebrow="Community preview"
            title="A structured community layer"
          />
          <CommunityPreview />
        </div>
      </section>

      <section className="page-section page-section--tight">
        <div className="container">
          <div className="detail-grid">
            {communityBlocks.map((block) => (
              <Card className="detail-card reveal" key={block.title}>
                <h3>{block.title}</h3>
                <p>{block.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section--tight">
        <div className="container split-layout">
          <Card className="spotlight-card reveal">
            <span className="eyebrow">Shared progress</span>
            <h3>Community should amplify momentum.</h3>
            <p>
              Shared progress works when it connects people around a training
              goal, challenge block, or team context.
            </p>
          </Card>
          <Card className="spotlight-card reveal">
            <span className="eyebrow">Built with purpose</span>
            <h3>Keep the signal, skip the noise.</h3>
            <p>
              FoFit&apos;s community layer supports consistency, shared progress,
              and accountability without turning training into a distraction.
            </p>
          </Card>
        </div>
      </section>

      <CTASection
        description="Join early and be part of FoFit's founding community."
        pills={["Challenges", "Groups", "Shared progress"]}
        title={
          <>
            Training together
            <br />
            compounds faster than training alone.
          </>
        }
      />
    </>
  );
}
