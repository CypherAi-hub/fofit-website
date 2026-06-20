import { CTASection } from "../components/marketing/CTASection";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import {
  RouteCardGrid,
  RouteFeatureLedger,
  RoutePhoneCluster,
  RouteSection,
  RouteSplitProof,
  RouteStatGrid,
} from "../components/marketing/RouteProofSections";
import {
  communityPreviewCards,
  communitySurfaceRows,
  futureAssets,
} from "../data/future-homepage";

const communityStats = [
  {
    value: "Feed",
    label: "Proof posts",
    detail: "Training, meal prep, questions, replies, and recovery notes have a real surface.",
  },
  {
    value: "Spaces",
    label: "Group context",
    detail: "Community can separate broad discovery from smaller interest or accountability groups.",
  },
  {
    value: "People",
    label: "Discovery",
    detail: "Regular users, verified coaches, and group paths sit in the same community layer.",
  },
  {
    value: "Coach",
    label: "Trust layer",
    detail: "Verified coach content gives the feed a human training backbone.",
  },
] as const;

export function CommunityPage() {
  return (
    <>
      <PageMeta
        description="FoFit Community shows the real product surfaces for proof posts, For You, Following, Spaces, groups, replies, reactions, and verified coaches."
        title="FoFit Community | Feed, Spaces, Groups, and Verified Coaches"
      />
      <PageHero
        actions={[
          { label: "Join founding 250", intent: "waitlist" },
          { label: "See coaches", to: "/coaches", variant: "secondary" },
        ]}
        description="Fitness feels less lonely when progress, questions, groups, and trusted coaches sit beside the plan instead of becoming a noisy social app."
        eyebrow="Community"
        media={
          <RoutePhoneCluster
            images={[
              { image: futureAssets.app.simDiscoverCommunity, label: "Discover" },
              { image: futureAssets.app.simCommunity, label: "Feed" },
              { image: futureAssets.community.support.verifiedCoach, label: "Coach", treatment: "scene" },
            ]}
            label="FoFit community surfaces"
          />
        }
        title={
          <>
            Real community, not empty social noise.
          </>
        }
      />

      <RouteSection
        description="The Community page should prove what the product can show: feed, groups, coach discovery, replies, and profile context."
        kicker="Community Surfaces"
        title="The social layer has actual product jobs."
      >
        <RouteStatGrid stats={[...communityStats]} />
      </RouteSection>

      <RouteSplitProof
        description="FoFit community is built around progress and context. That means the product needs posts, people, groups, comments, reactions, and coach trust to appear as real surfaces."
        kicker="Real Rows"
        media={
          <RoutePhoneCluster
            images={[
              { image: futureAssets.app.simCommunity, label: "Proof Feed" },
              { image: futureAssets.app.profile, label: "Profile" },
            ]}
            label="FoFit feed and profile"
          />
        }
        rows={communitySurfaceRows.map((row) => ({
          label: row.label,
          detail: row.detail,
        }))}
        title="What community actually contains."
      />

      <RouteSection
        className="route-section--soft"
        description="A real community route needs the product proof cards first, then the atmosphere around them."
        kicker="Community Proof"
        title="Feed, reels, profile, groups, and verified coach paths."
      >
        <RouteCardGrid
          cards={communityPreviewCards.map((card) => ({
            label: card.label,
            title: card.title,
            image: card.image,
          }))}
        />
      </RouteSection>

      <RouteSection
        description="The point is not a leaderboard. It is a place where the training loop has people around it."
        kicker="Community Rules"
        title="Keep the signal, skip the shame loop."
      >
        <RouteFeatureLedger
          rows={[
            {
              label: "Post",
              title: "Progress should have context.",
              detail: "Posts make room for the workout, meal, question, recovery note, or update behind the photo.",
            },
            {
              label: "Reply",
              title: "The conversation should be useful.",
              detail: "Replies and reactions are product context, not empty engagement counters.",
            },
            {
              label: "Group",
              title: "People need smaller rooms.",
              detail: "Beginner strength, meal prep, athletes, campus testers, and coach-led groups can each have a clearer lane.",
            },
            {
              label: "Coach",
              title: "Trust needs a human face.",
              detail: "Verified coaches can support the product without turning FoFit into another spreadsheet portal.",
            },
          ]}
        />
      </RouteSection>

      <CTASection
        description="Join founding 250 and help shape FoFit community before it opens broadly."
        pills={["Feed", "Groups", "Reels", "Verified coaches"]}
        title={
          <>
            Training together
            <br />
            should still feel focused.
          </>
        }
      />
    </>
  );
}
