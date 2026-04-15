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
      "Challenges should feel training-aware and worth joining, not like empty engagement mechanics bolted onto a serious product.",
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
          { label: "Get early access", intent: "waitlist" },
          { label: "See teams", to: "/teams", variant: "secondary" },
        ]}
        compact
        description="Community does not need to be fully live to communicate depth. This route shows how FoFit can become more than a solo training tool while staying intentional."
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
            description="Community needs more than a promise. These showcase panels help the route communicate accountability, momentum, and group structure more concretely."
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
            title="Community should feel like an engine for consistency."
          />
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <SectionHeader
            description="The goal is to show future platform depth with enough clarity that the page feels intentional today."
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
              Shared progress is most useful when it connects people around a
              training goal, challenge block, or team context. That is the kind
              of community FoFit is positioning itself to support.
            </p>
          </Card>
          <Card className="spotlight-card reveal">
            <span className="eyebrow">Rollout note</span>
            <h3>Intentional before fully social.</h3>
            <p>
              This route is a teaser on purpose. It signals where the platform
              is going without pretending the entire community stack is already
              mature.
            </p>
          </Card>
        </div>
      </section>

      <CTASection
        description="Community makes the broader FoFit vision more believable because it shows the platform can support accountability, groups, and shared momentum beyond solo sessions."
        pills={["Challenges", "Groups", "Shared progress"]}
        title={
          <>
            Community is a future layer
            <br />
            that already belongs in the architecture.
          </>
        }
      />
    </>
  );
}
