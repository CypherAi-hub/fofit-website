import { CTASection } from "../components/marketing/CTASection";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import {
  RouteCardGrid,
  RouteFeatureLedger,
  RoutePhoneCluster,
  RouteSection,
  RouteSplitProof,
} from "../components/marketing/RouteProofSections";
import { futureAssets } from "../data/future-homepage";
import { teamsTiers } from "../data/pricing";

const TEAMS_DEMO_MAILTO = "mailto:teams@fofit.app?subject=FoFit%20Teams%20demo";

const teamRows = [
  {
    label: "Schools",
    title: "Programs need shared structure.",
    detail: "Athletic departments and campus groups need visibility without flattening every athlete into the same plan.",
  },
  {
    label: "Clubs",
    title: "Groups need momentum.",
    detail: "Shared goals, training blocks, and accountability can stay connected to real individual logs.",
  },
  {
    label: "Coaches",
    title: "Guidance needs context.",
    detail: "Coach review becomes sharper when training, recovery, food, and adherence already sit in the system.",
  },
] as const;

export function TeamsPage() {
  return (
    <>
      <PageMeta
        description="FoFit Teams brings training structure, community, coach visibility, and group pricing to schools, clubs, and training groups."
        title="FoFit Teams | Schools, Clubs, Coaches, and Group Training"
      />
      <PageHero
        actions={[
          { label: "Book a demo", href: TEAMS_DEMO_MAILTO },
          { label: "See pricing", to: "/pricing", variant: "secondary" },
        ]}
        description="FoFit Teams is the group layer: full member product for athletes, plus visibility and structure for the people responsible for the room."
        eyebrow="Teams"
        media={
          <RoutePhoneCluster
            images={[
              { image: futureAssets.generated.friendlyTrainingCrew, label: "Group", treatment: "scene" },
              { image: futureAssets.app.simDiscoverCommunity, label: "Community" },
              { image: futureAssets.generated.coachTabletReview, label: "Coach", treatment: "scene" },
            ]}
            label="FoFit teams surfaces"
          />
        }
        title={
          <>
            Structure for the people you train with.
          </>
        }
      />

      <RouteSection
        description="Teams should read like a group-training product, not a pricing footnote."
        kicker="Use Cases"
        title="Schools, clubs, and coaches need different visibility."
      >
        <RouteFeatureLedger rows={[...teamRows]} />
      </RouteSection>

      <RouteSplitProof
        description="The individual product still matters. Teams works because each member has a training, nutrition, Cypher, and community loop underneath the group view."
        kicker="Product Base"
        media={
          <RoutePhoneCluster
            images={[
              { image: futureAssets.app.simTrain, label: "Train" },
              { image: futureAssets.app.simNutrition, label: "Fuel" },
              { image: futureAssets.app.simCommunity, label: "Proof" },
            ]}
            label="FoFit member product inside Teams"
          />
        }
        rows={[
          {
            label: "Member",
            title: "Every person keeps the full FoFit system.",
            detail: "Training, nutrition, Cypher, and community stay personal even when the group needs visibility.",
          },
          {
            label: "Coach",
            title: "Coaches get signal, not noise.",
            detail: "Completion, adherence, and readiness context make review loops easier to trust.",
          },
          {
            label: "Group",
            title: "Shared momentum stays organized.",
            detail: "Groups and programs can support accountability without becoming a separate social tool.",
          },
        ]}
        title="Teams sits on top of the real product."
      />

      <RouteSection
        className="route-section--soft"
        description="Per-team pricing keeps the page simple while the product matures."
        kicker="Team Pricing"
        title="Founding team paths."
      >
        <RouteCardGrid
          cards={teamsTiers.map((tier) => ({
            label: tier.name,
            title: tier.price,
            detail: `${tier.fit} ${tier.description}`,
          }))}
        />
      </RouteSection>

      <RouteSection
        description="The team path should remain grounded in what FoFit already shows well: plans, food context, community proof, and coach trust."
        kicker="Team OS"
        title="What every rollout needs to connect."
      >
        <RouteCardGrid
          cards={[
            {
              label: "Training",
              title: "Shared blocks with personal context.",
              detail: "The group can move together without forcing the same day onto every body.",
              image: futureAssets.app.simTrain,
            },
            {
              label: "Nutrition",
              title: "Fuel context that does not vanish.",
              detail: "Food and recovery signals help explain why the training plan changes.",
              image: futureAssets.app.simNutrition,
            },
            {
              label: "Community",
              title: "A place for proof and support.",
              detail: "Posts, groups, and coach paths make team momentum visible.",
              image: futureAssets.app.simDiscoverCommunity,
            },
          ]}
        />
      </RouteSection>

      <CTASection
        actions={[
          { label: "Book a demo", href: TEAMS_DEMO_MAILTO },
          { label: "Join founding 250", intent: "waitlist", variant: "secondary" },
        ]}
        description="Book a demo if you run a team. Join founding 250 if you train on one."
        pills={["Schools", "Clubs", "Coach groups"]}
        title={
          <>
            Group training,
            <br />
            without losing the individual.
          </>
        }
      />
    </>
  );
}
