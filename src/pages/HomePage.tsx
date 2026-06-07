import {
  CommunityPreviewSection,
  CypherMemorySection,
  FinalCTA,
  FounderStorySection,
  FutureThreePathsSection,
  HeroFutureOfFitness,
  NutritionPreview,
  PricingSection,
  ProductPillars,
  SystemInMotion,
} from "../components/marketing/FutureHomepageSections";
import { PageMeta } from "../components/layout/PageMeta";

export function HomePage() {
  return (
    <>
      <PageMeta
        description="FoFit combines AI coaching, personalized training, nutrition, and community in one fitness app."
        title="FoFit — The Future of Fitness"
      />
      <HeroFutureOfFitness />
      <ProductPillars />
      <SystemInMotion />
      <CommunityPreviewSection />
      <CypherMemorySection />
      <NutritionPreview />
      <FutureThreePathsSection />
      <PricingSection />
      <FounderStorySection />
      <FinalCTA />
    </>
  );
}
