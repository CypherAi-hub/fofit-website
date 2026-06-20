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
  futureAssets,
  futurePathCards,
  systemTabs,
} from "../data/future-homepage";
import { workflowSteps } from "../data/platform";

const productStats = [
  {
    value: "4",
    label: "Connected surfaces",
    detail: "Training, Nutrition, Cypher, and Community stay in the same product loop.",
  },
  {
    value: "6",
    label: "Product modes",
    detail: "Train, Nutrition, Cypher, Community, Reels, and Coach surfaces all carry context.",
  },
  {
    value: "3",
    label: "Entry paths",
    detail: "Members, athletes, and coaches start differently without splitting the system.",
  },
  {
    value: "1",
    label: "Weekly loop",
    detail: "Plan, train, fuel, share, review, and adjust without rebuilding from scratch.",
  },
] as const;

const loopRows = workflowSteps.map((step, index) => ({
  label: String(index + 1).padStart(2, "0"),
  title: step.title,
  detail: step.description,
}));

const surfaceCards = systemTabs.map((tab) => ({
  label: tab.label,
  title: tab.title,
  detail: tab.detail,
  image: tab.image,
}));

export function ProductPage() {
  return (
    <>
      <PageMeta
        description="FoFit connects training, nutrition, Cypher coaching, and community into one product loop with real app surfaces."
        title="FoFit Product | Training, Nutrition, Cypher, and Community"
      />
      <PageHero
        actions={[
          { label: "Join founding 250", intent: "waitlist" },
          { label: "See pricing", to: "/pricing", variant: "secondary" },
        ]}
        description="FoFit is the operating system around the week: what you train, what you eat, what changed, what Cypher remembers, and who is moving with you."
        eyebrow="Product"
        media={
          <RoutePhoneCluster
            images={[
              { image: futureAssets.app.simTrain, label: "Train" },
              { image: futureAssets.app.simCypher, label: "Cypher" },
              { image: futureAssets.app.simNutrition, label: "Nutrition" },
            ]}
            label="FoFit real app surfaces"
          />
        }
        title={
          <>
            One product loop.
            <br />
            No scattered fitness stack.
          </>
        }
      />

      <RouteSection
        description="The product story should show the actual app surfaces. These are the pieces a member sees when the week changes."
        kicker="System Proof"
        title="Training, food, Cypher, and community feed the same decision."
      >
        <RouteStatGrid stats={[...productStats]} />
      </RouteSection>

      <RouteSection
        className="route-section--soft"
        description="The homepage previews the loop. The Product route spells it out with the six surfaces that keep handing context to the next one."
        kicker="Product Surfaces"
        title="Every surface has a job."
      >
        <RouteCardGrid cards={surfaceCards} />
      </RouteSection>

      <RouteSplitProof
        description="FoFit stays personal without becoming fragmented. Members, athletes, and coaches get different starting points while the product keeps one memory."
        kicker="Paths"
        media={
          <RoutePhoneCluster
            images={[
              { image: futureAssets.lifestyle.lifter, label: "Members", treatment: "scene" },
              { image: futureAssets.lifestyle.athlete, label: "Athletes", treatment: "scene" },
              { image: futureAssets.lifestyle.trainer, label: "Coaches", treatment: "scene" },
            ]}
            label="FoFit member, athlete, and coach paths"
          />
        }
        rows={futurePathCards.map((card) => ({
          label: card.label,
          title: card.title,
          detail: card.description,
        }))}
        title="Three paths, same FoFit system."
      />

      <RouteSection
        description="The point is not a pile of features. The point is a week that stays connected after every log, missed meal, sore muscle, and community signal."
        kicker="Weekly Loop"
        title="How FoFit moves through a real week."
      >
        <RouteFeatureLedger rows={loopRows} />
      </RouteSection>

      <CTASection
        description="Join founding 250 and help shape the product loop before launch."
        pills={["Train", "Nutrition", "Cypher", "Community"]}
        title={
          <>
            The product is the loop.
            <br />
            The loop is the advantage.
          </>
        }
      />
    </>
  );
}
