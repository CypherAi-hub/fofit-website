import { ArticleGrid } from "../components/marketing/ArticleGrid";
import { ChapterIntro } from "../components/marketing/ChapterIntro";
import { CypherTranscript } from "../components/marketing/CypherTranscript";
import { DeviceFigure } from "../components/marketing/DeviceFigure";
import { FounderNote } from "../components/marketing/FounderNote";
import { HeroDeviceMockups } from "../components/marketing/HeroDeviceMockups";
import { PersonalizationDossier } from "../components/marketing/PersonalizationDossier";
import { PricingPreview } from "../components/marketing/PricingPreview";
import { ProgressMetricGrid } from "../components/marketing/ProgressMetricGrid";
import { ProductWalkthrough } from "../components/marketing/ProductWalkthrough";
import { QuietFinalCTA } from "../components/marketing/QuietFinalCTA";
import { TrustBand } from "../components/marketing/TrustBand";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { EditorialHeading } from "../components/ui/EditorialHeading";
import { Link } from "react-router-dom";
import {
  dailyLoopFigures,
  personalizationFacts,
  progressFigureAsset,
  progressMetrics,
} from "../data/editorial";
import { insightArticles } from "../data/insights";

const roadmapRows = [
  {
    label: "Coach layer",
    timeline: "Summer 2026",
    description: "Human coaches on top of Cypher for members who want both software and direct accountability.",
    to: "/coaches",
  },
  {
    label: "Teams",
    timeline: "Fall 2026",
    description: "Shared programming, completion visibility, and leaderboards for schools, clubs, and squads.",
    to: "/teams",
  },
  {
    label: "Field Notes",
    timeline: "Open now",
    description: "A training publication shaped around the same system thinking as the product.",
    to: "/insights",
  },
] as const;

export function HomePage() {
  return (
    <>
      <PageMeta
        description="FoFit is the training platform with Cypher — built for student athletes who train around class, practice, and the rest of a real week."
        title="FoFit | Training platform for student athletes"
      />
      <PageHero
        actions={[
          { label: "Join the waitlist", intent: "waitlist" },
          { label: "See how it works", to: "/product", variant: "secondary" },
        ]}
        className="page-hero--editorial"
        description="FoFit is the training platform with Cypher — an AI that remembers the athlete, adapts the next session, and keeps progress attached to the real week. Built for student athletes training around class, practice, and travel."
        eyebrow="For student athletes"
        media={<HeroDeviceMockups />}
        mediaClassName="page-hero__media--editorial"
        title={
          <EditorialHeading as="span" className="editorial-heading--hero">
            <span>Train <em>honestly</em>.</span>
            <span>Measure <em>everything</em>.</span>
          </EditorialHeading>
        }
      />

      <TrustBand />

      <ProductWalkthrough />

      <CypherTranscript />

      <section className="page-section editorial-section">
        <div className="container">
          <ChapterIntro
            centered
            description="Morning read, training session, evening close. The point is not more surfaces. The point is a day that makes sense."
            index="03"
            label="A day with FoFit"
            title={
              <>
                The daily loop, kept <em>tight</em>.
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

      <PersonalizationDossier facts={personalizationFacts} />

      <section className="page-section editorial-section">
        <div className="container">
          <ChapterIntro
            description="The app does not just hold data. It tells you what changed, what is holding, and where the next push makes sense."
            index="05"
            label="Progress"
            title={
              <>
                Twelve weeks, <em>measured</em>.
              </>
            }
          />
          <div className="progress-editorial">
            <ProgressMetricGrid metrics={progressMetrics} />
            <DeviceFigure asset={progressFigureAsset} className="progress-editorial__figure" />
          </div>
        </div>
      </section>

      <FounderNote />

      <section className="page-section editorial-section editorial-section--pricing">
        <div className="container">
          <div className="editorial-pricing-intro">
            <ChapterIntro
              description="Start free. Move to Premium when you want the full FoFit system. Join early and the founding rate stays locked."
              index="07"
              label="Membership"
              title={
                <>
                  Fourteen dollars. <em>Forever</em>, if you&apos;re early.
                </>
              }
            />
            <div className="editorial-pricing-intro__note reveal">
              <span>FoFit Premium is $14/month or $119/year.</span>
              <p>The first members keep that rate even as Cypher, recovery, teams, and coaching get deeper.</p>
            </div>
          </div>
          <PricingPreview className="pricing-preview--editorial" />
        </div>
      </section>

      <section className="page-section editorial-section editorial-section--quiet">
        <div className="container">
          <ChapterIntro
            description="Three extensions, shown in the order they are most likely to ship. No vaporware, no vague ecosystem theater."
            index="08"
            label="On the horizon"
            title={
              <>
                What comes <em>next</em>.
              </>
            }
          />
          <div className="roadmap-rows">
            {roadmapRows.map((row) => (
              <Link className="roadmap-row reveal" key={row.label} to={row.to}>
                <div>
                  <span className="roadmap-row__label">{row.label}</span>
                  <h3>{row.timeline}</h3>
                </div>
                <p>{row.description}</p>
                <span className="roadmap-row__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section editorial-section editorial-section--notes">
        <div className="container">
          <ChapterIntro
            description="Short reads on training, recovery, nutrition, and the decisions that keep a block moving."
            index="09"
            label="Field notes"
            title={
              <>
                The publication side of the <em>system</em>.
              </>
            }
          />
          <ArticleGrid articles={insightArticles.slice(0, 3)} />
        </div>
      </section>

      <QuietFinalCTA />
    </>
  );
}
