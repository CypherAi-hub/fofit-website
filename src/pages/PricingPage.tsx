import { FAQAccordion } from "../components/marketing/FAQAccordion";
import { CTASection } from "../components/marketing/CTASection";
import { ChapterIntro } from "../components/marketing/ChapterIntro";
import { PricingTable } from "../components/marketing/PricingTable";
import { VerifiedDiscounts } from "../components/marketing/VerifiedDiscounts";
import { CypherTokens } from "../components/marketing/CypherTokens";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { EditorialHeading } from "../components/ui/EditorialHeading";
import { faqGroups } from "../data/faqs";
import { teamsTiers } from "../data/pricing";

const pricingNotes = [
  "Starter stays free for logging, structure, and a clean place to begin.",
  "Premium is the full individual system — Cypher, adaptive plans, nutrition direction, and deeper feedback.",
  "Founding members keep the early individual rate as the platform gets deeper.",
] as const;

export function PricingPage() {
  const pricingFaqs = faqGroups.filter(
    (group) => group.title === "Pricing" || group.title === "Access",
  );

  return (
    <>
      <PageMeta
        description="FoFit stays simple for individuals. FoFit Teams gives coaches and groups a rollout path without changing the consumer membership."
        title="FoFit Pricing | Clear Plans for a Growing Platform"
      />
      <PageHero
        actions={[
          { label: "Join the founding 500", intent: "waitlist" },
          { label: "See teams", to: "/teams", variant: "secondary" },
        ]}
        compact
        description="FoFit stays simple for individuals. FoFit Teams gives coaches and groups a rollout path without changing the consumer membership."
        eyebrow="007 / Membership"
        title={
          <EditorialHeading accent="early" as="span" className="editorial-heading--compact">
            {"Clear today.\nLocked if you're {italic}."}
          </EditorialHeading>
        }
      />

      <nav className="pricing-section-nav" aria-label="Pricing sections">
        <a href="#fofit-consumer">FoFit</a>
        <a href="#fofit-teams">FoFit Teams</a>
      </nav>

      <section className="page-section editorial-section" id="fofit-consumer">
        <div className="container">
          <div className="pricing-page__intro">
            <ChapterIntro
              description="Starter stays free. Premium is the full individual training system with Cypher, adaptive planning, and deeper feedback."
              index="01"
              label="FoFit"
              title={
                <>
                  FoFit for lifters and <em>athletes</em>.
                </>
              }
            />
            <div className="pricing-page__points reveal">
              {pricingNotes.map((note) => (
                <span key={note}>{note}</span>
              ))}
            </div>
          </div>
          <PricingTable />
          <VerifiedDiscounts />
          <CypherTokens />
        </div>
      </section>

      <section className="page-section editorial-section editorial-section--tight" id="fofit-teams">
        <div className="container">
          <div className="pricing-page__intro">
            <ChapterIntro
              description="Per-team pricing for schools, clubs, and training groups that need structure, visibility, and consistency."
              index="02"
              label="FoFit Teams"
              title={
                <>
                  FoFit Teams for coaches and <em>groups</em>.
                </>
              }
            />
          </div>
          <div className="teams-tiers pricing-teams">
            <div className="teams-tiers__grid">
              {teamsTiers.map((tier) => (
                <article
                  className={`teams-tier-card${tier.featured ? " teams-tier-card--featured" : ""}`}
                  key={tier.name}
                >
                  <div className="teams-tier-card__name">{tier.name}</div>
                  <div className="teams-tier-card__price">{tier.price}</div>
                  <p className="teams-tier-card__fit">{tier.fit}</p>
                  <div className="teams-tier-card__desc">{tier.description}</div>
                </article>
              ))}
            </div>
            <div className="teams-tiers__footnote">
              Team access opens Spring 2026. Email teams@fofit.app for founding school partner terms.
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <FAQAccordion groups={pricingFaqs} />
        </div>
      </section>

      <CTASection
        description="Join the founding 500. The rate never moves."
        pills={["Starter", "Premium", "Teams"]}
        title={
          <>
            Clear today.
            <br />
            Locked for early members.
          </>
        }
      />
    </>
  );
}
