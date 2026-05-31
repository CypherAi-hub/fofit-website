import { FAQAccordion } from "../components/marketing/FAQAccordion";
import { CTASection } from "../components/marketing/CTASection";
import { ChapterIntro } from "../components/marketing/ChapterIntro";
import { PricingTable } from "../components/marketing/PricingTable";
import { VerifiedDiscounts } from "../components/marketing/VerifiedDiscounts";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { EditorialHeading } from "../components/ui/EditorialHeading";
import { faqGroups } from "../data/faqs";
import { teamsTiers } from "../data/pricing";

const pricingNotes = [
  "Starter stays free for logging, structure, and a clean place to begin.",
  "Standard is the full individual system — Cypher, adaptive training, nutrition, community, and coach discovery.",
  "Founding rates are locked while your subscription stays active.",
] as const;

export function PricingPage() {
  const pricingFaqs = faqGroups.filter(
    (group) => group.title === "Pricing" || group.title === "Access",
  );

  return (
    <>
      <PageMeta
        description="FoFit pricing for AI coaching, personalized training, nutrition, community, students, and coach or team access."
        title="FoFit Pricing | Starter, Student, Standard, and Teams"
      />
      <PageHero
        actions={[
          { label: "Join founding 250", intent: "waitlist" },
          { label: "See teams", to: "/teams", variant: "secondary" },
        ]}
        compact
        description="FoFit stays simple for individuals while giving students, coaches, and teams a clear path into the platform."
        eyebrow="007 / Membership"
        title={
          <EditorialHeading accent="early" as="span" className="editorial-heading--compact">
            {"Simple pricing.\nBuilt for the {italic}."}
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
              description="Starter stays free. Standard is the full FoFit system with Cypher, adaptive training, nutrition, and community."
              index="01"
              label="FoFit"
              title={
                <>
                  FoFit for members, students, and <em>athletes</em>.
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
        description="Join founding 250. Founding rates are locked while your subscription stays active."
        pills={["Starter", "Student", "Standard", "Teams"]}
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
