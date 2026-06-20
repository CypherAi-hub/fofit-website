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

const coachRows = [
  {
    label: "Verified presence",
    title: "Trust starts with a real coach profile.",
    detail: "Coach identity, specialties, groups, and programs can live beside the member experience.",
  },
  {
    label: "Groups",
    title: "Coaches can support communities, not just individuals.",
    detail: "Groups let coaches answer patterns, guide people, and build trust without another scattered chat.",
  },
  {
    label: "Programs",
    title: "Training should be deliverable.",
    detail: "Programs and templates make coach guidance useful without forcing every adjustment into a spreadsheet.",
  },
  {
    label: "Context",
    title: "FoFit gives coaches the week, not a blank check-in.",
    detail: "Training, nutrition, adherence, and recovery context make reviews sharper from the first conversation.",
  },
] as const;

export function CoachesPage() {
  return (
    <>
      <PageMeta
        description="FoFit Coaches shows how verified coach profiles, groups, programs, and team visibility fit into the FoFit product."
        title="FoFit Coaches | Verified Profiles, Groups, Programs, and Trust"
      />
      <PageHero
        actions={[
          { label: "Request coach access", href: "mailto:teams@fofit.app?subject=FoFit%20Coach%20access" },
          { label: "See teams", to: "/teams", variant: "secondary" },
        ]}
        description="FoFit starts with the product loop. Coaches add trust, review, programs, groups, and higher-accountability guidance around it."
        eyebrow="Coaches"
        media={
          <RoutePhoneCluster
            images={[
              { image: futureAssets.generated.coachTabletReview, label: "Coach", treatment: "scene" },
              { image: futureAssets.generated.recoveryCommunity, label: "Community", treatment: "scene" },
              { image: futureAssets.app.simDiscoverCommunity, label: "Groups" },
            ]}
            label="FoFit coach surfaces"
          />
        }
        title={
          <>
            Verified coaches with real product context.
          </>
        }
      />

      <RouteSection
        description="A coach page should make the trust layer clear: profile, group, program, and review loops."
        kicker="Coach System"
        title="Coaches should not need another spreadsheet."
      >
        <RouteFeatureLedger rows={[...coachRows]} />
      </RouteSection>

      <RouteSplitProof
        description="The community surface gives coaches a place to be discovered and trusted before the Teams layer opens."
        kicker="Coach Discovery"
        media={
          <RoutePhoneCluster
            images={[
              { image: futureAssets.app.simDiscoverCommunity, label: "Discover" },
              { image: futureAssets.generated.coachTabletReview, label: "Review", treatment: "scene" },
            ]}
            label="Coach discovery inside FoFit"
          />
        }
        rows={[
          {
            label: "Profile",
            title: "Identity and proof stay visible.",
            detail: "Profiles can carry training highlights, specialties, and trust signals.",
          },
          {
            label: "Groups",
            title: "Community gives coaches leverage.",
            detail: "Group support helps coaches answer common questions and keep people moving.",
          },
          {
            label: "Teams",
            title: "Programs can scale when the group is ready.",
            detail: "Teams turns coach visibility into a structured group-training system.",
          },
        ]}
        title="Coach trust starts inside the app."
      />

      <RouteSection
        className="route-section--soft"
        description="The route uses real FoFit imagery and surfaces so it works as a product path, not a someday promise."
        kicker="Proof Points"
        title="What coach access can contain."
      >
        <RouteCardGrid
          cards={[
            {
              label: "Verified Coach",
              title: "A human face behind the advice.",
              detail: "FoFit can show trusted coaches directly in the product ecosystem.",
              image: futureAssets.generated.coachTabletReview,
            },
            {
              label: "Groups",
              title: "A place to support more than one member.",
              detail: "Discovery, groups, and community prompts help coaches scale support.",
              image: futureAssets.app.simDiscoverCommunity,
            },
            {
              label: "Program Context",
              title: "Training history before the check-in.",
              detail: "Coach review is stronger when plan, fuel, and consistency context already exists.",
              image: futureAssets.app.simTrain,
            },
          ]}
        />
      </RouteSection>

      <CTASection
        description="Request early coach access or join the FoFit founding member list."
        pills={["Profiles", "Groups", "Programs", "Teams"]}
        title={
          <>
            Human guidance works better
            <br />
            with product memory.
          </>
        }
      />
    </>
  );
}
