import { BetaCalloutSection } from "../components/marketing/BetaCalloutSection";
import { ContextMemorySection } from "../components/marketing/ContextMemorySection";
import { CypherTranscript } from "../components/marketing/CypherTranscript";
import { DailyLoopSection } from "../components/marketing/DailyLoopSection";
import { FoFitScoreLandingSection } from "../components/marketing/FoFitScoreLandingSection";
import { FuelSystemSection } from "../components/marketing/FuelSystemSection";
import { HomeVideoHero } from "../components/marketing/HomeVideoHero";
import { LandingFinalCTA } from "../components/marketing/LandingFinalCTA";
import { LandingPricingSection } from "../components/marketing/LandingPricingSection";
import { LandingTeamsSection } from "../components/marketing/LandingTeamsSection";
import { ProductSurfacesSection } from "../components/marketing/ProductSurfacesSection";
import { ThreePathsSection } from "../components/marketing/ThreePathsSection";
import { PageMeta } from "../components/layout/PageMeta";

export function HomePage() {
  return (
    <>
      <PageMeta
        description="FoFit is the training platform with Cypher — built for lifters, athletes, and coaches who need structure around the real week."
        title="FoFit | Training platform for lifters, athletes, and coaches"
      />
      <HomeVideoHero />
      <ContextMemorySection />
      <ThreePathsSection />
      <CypherTranscript />
      <DailyLoopSection />
      <ProductSurfacesSection />
      <BetaCalloutSection />
      <FuelSystemSection />
      <FoFitScoreLandingSection />
      <LandingTeamsSection />
      <LandingPricingSection />
      <LandingFinalCTA />
    </>
  );
}
