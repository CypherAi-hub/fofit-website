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

const storeModules = [
  {
    title: "Programs and templates",
    description:
      "Specialized training blocks and focused goal packages built on top of the FoFit system.",
  },
  {
    title: "Guides and education",
    description:
      "Practical resources around training structure, nutrition direction, and progress management.",
  },
  {
    title: "Gear and partner kits",
    description:
      "A future layer for curated equipment, recovery essentials, and ecosystem-aligned partner offers.",
  },
  {
    title: "Member bundles",
    description:
      "Combined digital and physical experiences that feel aligned with the platform instead of randomly merch-driven.",
  },
];

export function StorePage() {
  return (
    <>
      <PageMeta
        description="FoFit Store previews a future marketplace for programs, guides, partner offers, and ecosystem-aligned product bundles."
        title="FoFit Store | Marketplace and Ecosystem Expansion Preview"
      />
      <PageHero
        actions={[
          { label: "Join the waitlist", intent: "waitlist" },
          { label: "See coaches", to: "/coaches", variant: "secondary" },
        ]}
        description="Programs, guides, gear, and bundles — aligned with how FoFit trains you. Not open yet."
        eyebrow="Store"
        media={
          <RoutePhoneCluster
            images={[
              { image: futureAssets.app.simTrain, label: "Programs" },
              { image: futureAssets.generated.coachAthleteCheckin, label: "Coach", treatment: "scene" },
              { image: futureAssets.generated.fuelPrepGlobal, label: "Fuel", treatment: "scene" },
            ]}
            label="FoFit store product logic"
          />
        }
        title={
          <>
            A marketplace layer
            <br />
            with platform logic behind it.
          </>
        }
      />

      <RouteSection
        description="The store should not feel like random merch. Every item should earn its place in the training loop."
        kicker="Marketplace Logic"
        title="Programs, guides, gear, and bundles need product context."
      >
        <RouteFeatureLedger
          rows={storeModules.map((module) => ({
            label: "Store",
            title: module.title,
            detail: module.description,
          }))}
        />
      </RouteSection>

      <RouteSplitProof
        description="A store layer only makes sense when it can connect to training blocks, nutrition behavior, and coach trust."
        kicker="Why It Fits"
        media={
          <RoutePhoneCluster
            images={[
              { image: futureAssets.app.simTrain, label: "Training" },
              { image: futureAssets.app.simNutrition, label: "Nutrition" },
            ]}
            label="Store connected to the FoFit loop"
          />
        }
        rows={[
          {
            label: "Programs",
            title: "Digital products should match the plan.",
            detail: "Specialized blocks and coach-built templates belong close to training history.",
          },
          {
            label: "Guides",
            title: "Education should be actionable.",
            detail: "Guides should explain the decision someone is about to make in the app.",
          },
          {
            label: "Kits",
            title: "Physical products should have a job.",
            detail: "Recovery, equipment, and partner kits should support the system instead of distracting from it.",
          },
        ]}
        title="Buy tools that match how you train."
      />

      <RouteSection
        className="route-section--soft"
        description="This is the standard for any future store item."
        kicker="Store Standard"
        title="Every item needs a reason to exist."
      >
        <RouteCardGrid
          cards={[
            {
              label: "Program",
              title: "Attached to training context.",
              detail: "The product should know what the program changes about your week.",
              image: futureAssets.app.simTrain,
            },
            {
              label: "Guide",
              title: "Useful before the next decision.",
              detail: "Education should clarify training, fuel, or recovery at the moment it matters.",
              image: futureAssets.generated.fuelPrepGlobal,
            },
            {
              label: "Coach",
              title: "Backed by trusted humans.",
              detail: "Coach-created resources should carry visible trust and product relevance.",
              image: futureAssets.generated.coachAthleteCheckin,
            },
          ]}
        />
      </RouteSection>

      <CTASection
        description="The store opens with the platform. No generic merch — every item should earn its place in the training loop."
        pills={["Programs", "Guides", "Bundles"]}
        title={
          <>
            Curated programs. Proven guides.
            <br />
            Partner-level gear.
          </>
        }
      />
    </>
  );
}
