import { ChapterIntro } from "../components/marketing/ChapterIntro";
import { CypherTranscript } from "../components/marketing/CypherTranscript";
import { FounderNote } from "../components/marketing/FounderNote";
import { ProductVideo } from "../components/marketing/ProductVideo";
import { QuietFinalCTA } from "../components/marketing/QuietFinalCTA";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import {
  RouteCardGrid,
  RouteFeatureLedger,
  RoutePhoneCluster,
} from "../components/marketing/RouteProofSections";
import { futureAssets } from "../data/future-homepage";

const proofPoints = [
  {
    label: "Real product",
    value: "Not a pitch",
    body: "Every screenshot on this page is a screen from the shipping app. No figma renders, no AI composites posing as UI.",
  },
  {
    label: "Built by an athlete",
    value: "Maryville",
    body: "Kenan Larry Jr., student athlete at Maryville University, writing FoFit from inside the problem it exists to solve.",
  },
  {
    label: "Built with AI agents",
    value: "Cypher + Claude + Codex",
    body: "A solo founder shipping a platform-scale product by coordinating multiple AI coding agents. This is the creator challenge, made literal.",
  },
];

const submissionRows = [
  {
    label: "Morning",
    title: "The plan reads the week first.",
    detail:
      "FoFit opens with readiness, recovery context, and the training day in view before asking the athlete to work.",
  },
  {
    label: "Session",
    title: "The workout is close enough to act on.",
    detail:
      "Set logging, exercise detail, and Cypher guidance stay connected instead of living in separate tools.",
  },
  {
    label: "Close",
    title: "Progress rolls forward.",
    detail:
      "Training, food, recovery, and community context become inputs for the next decision, not stale recap data.",
  },
] as const;

const submissionMomentCards = [
  {
    label: "Morning",
    title: "Read the day before you train.",
    detail:
      "The Train surface shows the session, recovery context, quick log paths, and the next useful action.",
    image: futureAssets.app.simTrain,
  },
  {
    label: "Session",
    title: "Ask Cypher before the plan drifts.",
    detail:
      "Cypher keeps athlete context visible while it explains why a block, adjustment, or recovery move makes sense.",
    image: futureAssets.app.simCypher,
  },
  {
    label: "Close",
    title: "Fuel and community stay in the loop.",
    detail:
      "Nutrition and community are not separate posters; they give the next training decision better context.",
    image: futureAssets.app.simNutrition,
  },
] as const;

export function SubmissionPreviewPage() {
  return (
    <>
      <PageMeta
        description="FoFit submission preview — a judge-optimized scroll through the product, the build, and the case."
        title="FoFit — Submission Preview"
      />
      <PageHero
        actions={[
          { label: "Join the waitlist", intent: "waitlist" },
          { label: "Open the home page", to: "/", variant: "secondary" },
        ]}
        className="page-hero--editorial"
        description="A personalized fitness intelligence app for student athletes, written by one. Cypher is the AI layer — remembering the athlete, adapting the next session, and keeping progress attached to the real week."
        eyebrow="Submission preview"
        media={
          <RoutePhoneCluster
            images={[
              {
                image: futureAssets.app.simTrain,
                label: "Train",
                treatment: "phone",
              },
              {
                image: futureAssets.app.simCypher,
                label: "Cypher",
                treatment: "phone",
              },
              {
                image: futureAssets.app.simNutrition,
                label: "Nutrition",
                treatment: "phone",
              },
            ]}
            label="FoFit submission preview app surfaces"
          />
        }
        title={<>Train honestly. Measure everything.</>}
      />

      <ProductVideo />

      <section className="page-section editorial-section">
        <div className="container">
          <ChapterIntro
            centered
            description="Three moments of the day. Morning read, live session, evening close. The route still exists for the creator challenge, but the proof is the same real FoFit product system."
            index="01"
            label="How it works"
            title={
              <>
                One day, three <em>checkpoints</em>.
              </>
            }
          />
          <RouteFeatureLedger rows={submissionRows} />
          <RouteCardGrid cards={submissionMomentCards} />
        </div>
      </section>

      <CypherTranscript />

      <section className="page-section editorial-section editorial-section--quiet">
        <div className="container">
          <ChapterIntro
            description="Three reasons this site is worth a second scroll, laid out flat."
            index="02"
            label="Proof"
            title={
              <>
                Why this is <em>real</em>.
              </>
            }
          />
          <RouteCardGrid
            cards={proofPoints.map((point, index) => ({
              detail: point.body,
              image:
                index === 0
                  ? futureAssets.app.simTrain
                  : index === 1
                    ? futureAssets.generated.friendlyTrainingCrew
                    : futureAssets.app.simCypher,
              label: point.label,
              title: point.value,
            }))}
          />
        </div>
      </section>

      <FounderNote />

      <QuietFinalCTA />
    </>
  );
}
