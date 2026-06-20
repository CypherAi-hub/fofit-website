import {
  CommunityPreviewSection,
  CypherMemorySection,
  FinalCTA,
  FounderStorySection,
  FutureThreePathsSection,
  HeroFutureOfFitness,
  LiveMediaSection,
  NutritionPreview,
  PricingSection,
  ProductPillars,
  RealWeekSection,
  SystemInMotion,
  TesterPathSection,
} from "../components/marketing/FutureHomepageSections";
import { PageMeta } from "../components/layout/PageMeta";

export function HomePage() {
  return (
    <>
      <PageMeta
        description="FoFit combines personalized training, nutrition, Cypher coaching, progress memory, and community support in one fitness app."
        title="FoFit — Personalized Fitness Intelligence"
      />
      <HeroFutureOfFitness />
      <LiveMediaSection />
      <ProductPillars />
      <RealWeekSection />
      <SystemInMotion />
      <CommunityPreviewSection />
      <CypherMemorySection />
      <NutritionPreview />
      <FutureThreePathsSection />
      <PricingSection />
      <FounderStorySection />
      <TesterPathSection />
      <FinalCTA />
    </>
  );
}
