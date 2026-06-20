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
import {
  founderTrustPoints,
  futureAssets,
  futurePathCards,
  productPillars,
} from "../data/future-homepage";

const companyRows = [
  {
    label: "Built in public",
    title: "Real testers shape the product.",
    detail: "FoFit is being built with people training, logging, questioning, and correcting what does not feel useful.",
  },
  {
    label: "St. Louis roots",
    title: "Local first, broader ambition.",
    detail: "The early rollout starts close enough to learn from real behavior before scaling the product story.",
  },
  {
    label: "Product honesty",
    title: "The claim has to match the app.",
    detail: "Training, nutrition, Cypher, and community show up as real product surfaces before the brand says they matter.",
  },
  {
    label: "AI-assisted build",
    title: "Agents help ship. People shape the standard.",
    detail: "FoFit can use AI to move faster, but testers decide whether the product actually makes training clearer.",
  },
] as const;

export function AboutPage() {
  return (
    <>
      <PageMeta
        description="FoFit is building an AI fitness system around training, nutrition, Cypher coaching, and community with real product surfaces and St. Louis roots."
        title="About FoFit | Built in Public from St. Louis"
      />
      <PageHero
        actions={[
          { label: "Join founding 250", intent: "waitlist" },
          { label: "Read insights", to: "/insights", variant: "secondary" },
        ]}
        description="FoFit exists because fitness progress still gets split across too many disconnected tools. The product brings the week back into one place while the first testers stay close to the build."
        eyebrow="About"
        media={
          <RoutePhoneCluster
            images={[
              { image: futureAssets.generated.founderProductWorkSession, label: "Built in public", treatment: "scene" },
              { image: futureAssets.app.simCypher, label: "Cypher" },
              { image: futureAssets.mark, label: "FoFit", treatment: "mark" },
            ]}
            label="FoFit company story"
          />
        }
        title={
          <>
            Built with real people close to the product.
          </>
        }
      />

      <RouteSection
        description="The About page tells the truth behind the product: real testers, real app surfaces, and a system that earns the brand line."
        kicker="Company Standard"
        title="The product has to help real people before the story gets loud."
      >
        <RouteFeatureLedger rows={[...companyRows]} />
      </RouteSection>

      <RouteSection
        className="route-section--soft"
        description="FoFit is being shaped close to training rooms, campus testers, coaches, and the actual app surfaces people will use."
        kicker="Trust Layer"
        title="The build process is part of the brand."
      >
        <RouteCardGrid
          cards={founderTrustPoints.map((point) => ({
            label: point.label,
            title: point.title,
            detail: point.detail,
          }))}
        />
      </RouteSection>

      <RouteSplitProof
        description="FoFit is not trying to be one more tracker. The brand is built around the same four surfaces the app needs to connect."
        kicker="FoFit OS"
        media={
          <RoutePhoneCluster
            images={[
              { image: futureAssets.app.simTrain, label: "Train" },
              { image: futureAssets.app.simNutrition, label: "Fuel" },
              { image: futureAssets.app.simCommunity, label: "Community" },
            ]}
            label="FoFit OS surfaces"
          />
        }
        rows={productPillars.map((pillar) => ({
          label: pillar.label,
          title: pillar.title,
          detail: pillar.detail,
        }))}
        title="Training, nutrition, Cypher, and community are the company."
      />

      <RouteSection
        description="The product stays unified while the entry path changes by audience."
        kicker="Who FoFit Serves"
        title="Members, athletes, and coaches start from different needs."
      >
        <RouteCardGrid
          cards={futurePathCards.map((card) => ({
            label: card.label,
            title: card.title,
            detail: card.description,
            image: card.image,
          }))}
        />
      </RouteSection>

      <CTASection
        description="Join founding 250 and help shape FoFit before launch."
        pills={["St. Louis roots", "Tester-led", "Real app screens"]}
        title={
          <>
            Help shape FoFit
            <br />
            while the loop is still close.
          </>
        }
      />
    </>
  );
}
