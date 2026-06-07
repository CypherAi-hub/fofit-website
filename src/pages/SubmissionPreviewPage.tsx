import { ChapterIntro } from "../components/marketing/ChapterIntro";
import { CypherTranscript } from "../components/marketing/CypherTranscript";
import { FounderNote } from "../components/marketing/FounderNote";
import { HeroDeviceMockups } from "../components/marketing/HeroDeviceMockups";
import { ProductVideo } from "../components/marketing/ProductVideo";
import { QuietFinalCTA } from "../components/marketing/QuietFinalCTA";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { EditorialHeading } from "../components/ui/EditorialHeading";
import { DeviceFigure } from "../components/marketing/DeviceFigure";
import { dailyLoopFigures } from "../data/editorial";

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
        description="A training platform for student athletes, written by one. Cypher is the AI layer — remembering the athlete, adapting the next session, keeping progress attached to the real week."
        eyebrow="Submission preview · Handshake Codex Creator Challenge"
        media={<HeroDeviceMockups />}
        mediaClassName="page-hero__media--editorial"
        title={
          <EditorialHeading as="span" className="editorial-heading--hero">
            <span>Train <em>honestly</em>.</span>
            <span>Measure <em>everything</em>.</span>
          </EditorialHeading>
        }
      />

      <ProductVideo />

      <section className="page-section editorial-section">
        <div className="container">
          <ChapterIntro
            centered
            description="Three screens, three moments of the day. Morning read, live session, evening close. All shipping now."
            index="01"
            label="How it works"
            title={
              <>
                One day, three <em>checkpoints</em>.
              </>
            }
          />
          <div className="daily-loop">
            {dailyLoopFigures.map((entry) => (
              <article className="daily-loop__row reveal" key={entry.time}>
                <div className="daily-loop__content">
                  <span className="daily-loop__time">{entry.time}</span>
                  <h3>{entry.title}</h3>
                  <p>{entry.description}</p>
                </div>
                <DeviceFigure asset={entry.asset} className="daily-loop__figure" />
              </article>
            ))}
          </div>
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
          <div className="submission-proof reveal">
            {proofPoints.map((point) => (
              <article className="submission-proof__card" key={point.label}>
                <span className="submission-proof__label">{point.label}</span>
                <h3 className="submission-proof__value">{point.value}</h3>
                <p className="submission-proof__body">{point.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FounderNote />

      <QuietFinalCTA />
    </>
  );
}
