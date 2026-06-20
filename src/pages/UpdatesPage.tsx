import { CTASection } from "../components/marketing/CTASection";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import {
  RouteCardGrid,
  RouteFeatureLedger,
  RoutePhoneCluster,
  RouteSection,
} from "../components/marketing/RouteProofSections";
import { futureAssets } from "../data/future-homepage";
import { roadmapThemes, updateItems } from "../data/updates";

export function UpdatesPage() {
  return (
    <>
      <PageMeta
        description="FoFit Updates previews product shipping notes, changelog-style communication, and the platform themes guiding future releases."
        title="FoFit Updates | Product Progress and Changelog Direction"
      />
      <PageHero
        actions={[
          { label: "Join the waitlist", intent: "waitlist" },
          { label: "See community", to: "/community", variant: "secondary" },
        ]}
        description="See what FoFit is building, what has shipped, and what the team is sharpening next."
        eyebrow="Updates"
        media={
          <RoutePhoneCluster
            images={[
              { image: futureAssets.app.simTrain, label: "Train" },
              { image: futureAssets.app.simCypher, label: "Cypher" },
              { image: futureAssets.app.simDiscoverCommunity, label: "Community" },
            ]}
            label="FoFit update surfaces"
          />
        }
        title={
          <>
            Product momentum
            <br />
            should stay visible.
          </>
        }
      />

      <RouteSection
        description="Updates should make the product feel like it is moving in public, with clear surfaces and visible priorities."
        kicker="Shipping Notes"
        title="What has changed recently."
      >
        <RouteCardGrid
          cards={updateItems.map((item) => ({
            label: item.version,
            title: item.title,
            detail: item.description,
          }))}
        />
      </RouteSection>

      <RouteSection
        className="route-section--soft"
        description="These themes keep the public story connected to what the app has to prove."
        kicker="Roadmap Themes"
        title="What we are sharpening next."
      >
        <RouteFeatureLedger
          rows={roadmapThemes.map((theme, index) => ({
            label: String(index + 1).padStart(2, "0"),
            title: theme,
            detail: "This is a product direction, not a loose marketing promise.",
          }))}
        />
      </RouteSection>

      <CTASection
        description="Join the waitlist to get product updates and early access as new features roll out."
        pills={["Shipping", "Roadmap", "Platform direction"]}
        title={
          <>
            Follow the product
            <br />
            as it ships.
          </>
        }
      />
    </>
  );
}
