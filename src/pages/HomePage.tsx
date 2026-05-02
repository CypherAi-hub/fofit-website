import { ArticleGrid } from "../components/marketing/ArticleGrid";
import { CypherTranscript } from "../components/marketing/CypherTranscript";
import { EarlyAccessButton } from "../components/marketing/EarlyAccessButton";
import { FoundingStatsBand } from "../components/marketing/FoundingStatsBand";
import { HomeVideoHero } from "../components/marketing/HomeVideoHero";
import { PricingPreview } from "../components/marketing/PricingPreview";
import { ProductVideo } from "../components/marketing/ProductVideo";
import { PageMeta } from "../components/layout/PageMeta";
import { Button } from "../components/ui/Button";
import { insightArticles } from "../data/insights";

const operatingCards = [
  {
    label: "Before practice",
    title: "Cypher reads the real week first.",
    description: "Class blocks, travel, soreness, and practice load stay attached to the next training call.",
  },
  {
    label: "During the lift",
    title: "The plan can move without falling apart.",
    description: "Miss a rep target, lose time, or feel beat up. Cypher adjusts the set, not the whole identity of the block.",
  },
  {
    label: "After the session",
    title: "Progress becomes memory.",
    description: "The system keeps what changed, why it mattered, and what should happen next time.",
  },
] as const;

const weekSignals = [
  "Monday lift moved after film",
  "Protein target follows dining hall reality",
  "Sleep debt changes volume, not standards",
  "Travel day switches equipment automatically",
  "Coach dashboard path for D2 / D3 teams",
] as const;

const comparisonRows = [
  ["Legacy tracker", "Records what happened"],
  ["Generic AI plan", "Writes a workout in isolation"],
  ["FoFit with Cypher", "Remembers the athlete and the week"],
] as const;

export function HomePage() {
  return (
    <>
      <PageMeta
        description="FoFit is the training platform with Cypher — built for student athletes who train around class, practice, and the rest of a real week."
        title="FoFit | Training platform for student athletes"
      />
      <HomeVideoHero />

      <FoundingStatsBand />

      <ProductVideo />

      <CypherTranscript />

      <section className="v3-system">
        <div className="container v3-system__inner">
          <div className="v3-section-kicker">03 / OPERATING SYSTEM</div>
          <div className="v3-system__header">
            <h2>Built around the week that normal fitness apps ignore.</h2>
            <p>
              D2 and D3 athletes do not train in a clean spreadsheet. FoFit
              treats practice, class, travel, soreness, and equipment as part of
              the plan instead of excuses outside it.
            </p>
          </div>
          <div className="v3-operating-grid">
            {operatingCards.map((card) => (
              <article className="v3-operating-card reveal" key={card.label}>
                <span>{card.label}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v3-week">
        <div className="container v3-week__inner">
          <div className="v3-week__copy">
            <div className="v3-section-kicker">04 / COLLEGIATE MEMORY</div>
            <h2>Cypher is more valuable because the week is messy.</h2>
            <p>
              Most apps record the lift after it happens. Cypher changes the
              next call while the week is still moving, especially for athletes
              training without a full D1 staff around them.
            </p>
          </div>
          <div className="v3-week__rail" aria-label="Student athlete week signals">
            {weekSignals.map((signal, index) => (
              <div className="v3-week__signal reveal" key={signal}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {signal}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="v3-contrast">
        <div className="container v3-contrast__inner">
          <div className="v3-section-kicker">05 / POSITIONING</div>
          <h2>Not a tracker with nicer charts. Not a prompt box with reps.</h2>
          <div className="v3-contrast__rows">
            {comparisonRows.map(([label, detail]) => (
              <div className="v3-contrast__row reveal" key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="v3-teams">
        <div className="container v3-teams__inner">
          <div>
            <div className="v3-section-kicker">06 / FOR TEAMS</div>
            <h2>D2 / D3 programs need infrastructure, not another consumer app.</h2>
          </div>
          <p>
            Team access opens Spring 2026 for coaches who need shared
            programming, completion visibility, and training context without
            hiring a full performance department.
          </p>
          <Button href="mailto:teams@fofit.app?subject=FoFit%20Teams%20access" variant="secondary">
            Request team access
          </Button>
        </div>
      </section>

      <section className="v3-pricing">
        <div className="container">
          <div className="v3-pricing__header">
            <div className="v3-section-kicker">07 / MEMBERSHIP</div>
            <h2>$12.99/mo. Forever, if you&apos;re early.</h2>
            <p>
              Start free. Move to Premium when you want the full FoFit system.
              Founding members keep the rate forever as Cypher, recovery, teams,
              and coaching get deeper.
            </p>
          </div>
          <PricingPreview className="pricing-preview--editorial v3-pricing__cards" />
        </div>
      </section>

      <section className="v3-notes">
        <div className="container v3-notes__inner">
          <div className="v3-notes__header">
            <div className="v3-section-kicker">08 / FIELD NOTES</div>
            <h2>The publication side of the training system.</h2>
            <p>
              Short reads on training, recovery, nutrition, and the decisions
              that keep a block moving.
            </p>
          </div>
          <ArticleGrid articles={insightArticles.slice(0, 3)} />
        </div>
      </section>

      <section className="v3-final">
        <div className="container v3-final__inner">
          <h2>Train honestly. Or keep tracking.</h2>
          <p>500 founding spots. Founding rate locked at $12.99/mo for life.</p>
          <EarlyAccessButton size="lg">Join the founding 500 →</EarlyAccessButton>
        </div>
      </section>
    </>
  );
}
