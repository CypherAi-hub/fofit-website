import { FAQAccordion } from "../components/marketing/FAQAccordion";
import { CTASection } from "../components/marketing/CTASection";
import { ChapterIntro } from "../components/marketing/ChapterIntro";
import { PricingTable } from "../components/marketing/PricingTable";
import { VerifiedDiscounts } from "../components/marketing/VerifiedDiscounts";
import { CypherTokens } from "../components/marketing/CypherTokens";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { EditorialHeading } from "../components/ui/EditorialHeading";
import { Card } from "../components/ui/Card";
import { faqGroups } from "../data/faqs";

const pricingNotes = [
  "Starter is workout logging and structure.",
  "Premium is the full FoFit system — Cypher, adaptive plans, nutrition direction, and deeper analytics.",
  "Founding members keep the early rate as the platform grows.",
] as const;

export function PricingPage() {
  const pricingFaqs = faqGroups.filter(
    (group) => group.title === "Pricing" || group.title === "Access",
  );

  return (
    <>
      <PageMeta
        description="Start free. Premium at $12.99/month. Founding members lock in $12.99/mo for life and keep the full FoFit system as it grows."
        title="FoFit Pricing | Clear Plans for a Growing Platform"
      />
      <PageHero
        actions={[
          { label: "Join the waitlist", intent: "waitlist" },
          { label: "See teams", to: "/teams", variant: "secondary" },
        ]}
        compact
        description="Start free. Premium at $12.99/month. Founding members lock in $12.99/mo for life — the rate never moves."
        eyebrow="007 / Membership"
        title={
          <EditorialHeading accent="early" as="span" className="editorial-heading--compact">
            {"Clear today.\nLocked if you're {italic}."}
          </EditorialHeading>
        }
      />

      <section className="page-section editorial-section">
        <div className="container">
          <div className="pricing-page__intro">
            <ChapterIntro
              description="FoFit is priced like a membership, not a generic feature gate. The product stays simple. The value gets easier to see."
              index="01"
              label="Plans"
              title={
                <>
                  What Premium actually <em>unlocks</em>.
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
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <VerifiedDiscounts />
          <CypherTokens />
        </div>
      </section>

      <section className="page-section editorial-section editorial-section--tight">
        <div className="container split-layout">
          <Card className="spotlight-card reveal editorial-card">
            <span className="eyebrow">Billing confidence</span>
            <h3>Clear first. Premium second.</h3>
            <p>
              Cancel anytime. Export your data. Start free, then move up when
              you want the full FoFit system.
            </p>
          </Card>
          <Card className="spotlight-card reveal editorial-card">
            <span className="eyebrow">Teams and coaches</span>
            <h3>Those tiers get their own launch when they are ready.</h3>
            <p>
              Consumer pricing stays focused on the individual athlete. Teams,
              schools, and coaches get a dedicated offer later.
            </p>
          </Card>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <FAQAccordion groups={pricingFaqs} />
        </div>
      </section>

      <CTASection
        description="Join the founding 500. The rate never moves."
        pills={["Starter", "Premium", "Founding"]}
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
