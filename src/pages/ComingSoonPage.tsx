import type { ReactNode } from "react";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { CTASection } from "../components/marketing/CTASection";
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
  nutritionCountryRows,
  nutritionLibraryStats,
  nutritionSignals,
  nutritionWorkflowRows,
} from "../data/future-homepage";

type ComingSoonPageProps = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  metaTitle: string;
  metaDescription: string;
};

export function ComingSoonPage({
  eyebrow,
  title,
  description,
  metaTitle,
  metaDescription,
}: ComingSoonPageProps) {
  return (
    <>
      <PageMeta description={metaDescription} title={metaTitle} />
      <PageHero
        actions={[
          { label: "Join the waitlist", intent: "waitlist" },
          { label: "Back to home", to: "/", variant: "secondary" },
        ]}
        compact
        description={description}
        eyebrow={eyebrow}
        title={title}
      />
    </>
  );
}

export function ShopPage() {
  return (
    <ComingSoonPage
      description="A curated shop for FoFit programs, founder gear, and partner kits is on the way. Join the waitlist and we'll hold a spot."
      eyebrow="Shop — coming soon"
      metaDescription="FoFit Shop is coming soon. Programs, gear, and partner kits tied to the training system."
      metaTitle="Shop | FoFit"
      title={
        <>
          Shop, <em>soon</em>.
        </>
      }
    />
  );
}

export function NutritionPage() {
  return (
    <>
      <PageMeta
        description="FoFit Nutrition connects photo food logging, macro targets, recipe country filters, repeat meals, grocery planning, and Cypher context."
        title="FoFit Nutrition | Food Logging, Recipes, Targets, and Grocery Flow"
      />
      <PageHero
        actions={[
          { label: "Join founding 250", intent: "waitlist" },
          { label: "See training", to: "/features", variant: "secondary" },
        ]}
        description="Nutrition is not a separate tracker. FoFit keeps food, targets, meal plans, and Cypher insight attached to the training you are actually doing."
        eyebrow="Nutrition"
        media={
          <RoutePhoneCluster
            images={[
              { image: futureAssets.app.simNutrition, label: "Photo Fuel" },
              { image: futureAssets.app.fuelPlan, label: "Fuel Plan" },
              { image: futureAssets.generated.fuelPrepGlobal, label: "Food", treatment: "scene" },
            ]}
            label="FoFit nutrition surfaces"
          />
        }
        title={
          <>
            Fuel the plan, not just the tracker.
          </>
        }
      />

      <RouteSection
        description="The app has a real seed catalog, country filters, staple search, photo logging, repeat meals, and grocery flow. The page should say that plainly."
        kicker="Fuel Library"
        title="A nutrition surface with food people actually eat."
      >
        <RouteStatGrid stats={[...nutritionLibraryStats]} />
      </RouteSection>

      <RouteSection
        className="route-section--soft"
        description="Country filters make the library feel less like generic fitness food and more like a catalog that can grow with real people."
        kicker="Country Filters"
        title="Recipes across cultures, not one bland meal-prep lane."
      >
        <RouteCardGrid
          cards={nutritionCountryRows.map((recipe) => ({
            label: recipe.country,
            title: recipe.title,
            detail: recipe.detail,
            image: recipe.image,
          }))}
        />
      </RouteSection>

      <RouteSplitProof
        description="Photo logging, search, saved meals, plans, and grocery lists only matter if they feed the next training decision."
        kicker="Workflow"
        media={
          <RoutePhoneCluster
            images={[
              { image: futureAssets.app.simNutrition, label: "Log" },
              { image: futureAssets.app.fuelPlan, label: "Plan" },
            ]}
            label="FoFit nutrition workflow"
          />
        }
        rows={nutritionWorkflowRows.map((row) => ({
          label: row.label,
          detail: row.detail,
        }))}
        title="How logging turns into coaching context."
      />

      <RouteSection
        description="The Nutrition page should make the product behavior obvious before anyone reaches the form."
        kicker="Cypher Context"
        title="Fuel data gives Cypher better decisions."
      >
        <RouteFeatureLedger
          rows={nutritionSignals.map((signal) => ({
            label: "Signal",
            title: signal,
            detail: "This becomes part of the plan context instead of living in a separate food diary.",
          }))}
        />
      </RouteSection>

      <CTASection
        description="Join founding 250 and help shape the food system before launch."
        pills={["Photo Fuel", "Recipes", "Repeat meals", "Grocery"]}
        title={
          <>
            Food should support the work.
            <br />
            FoFit keeps both connected.
          </>
        }
      />
    </>
  );
}
