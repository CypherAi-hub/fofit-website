import { CTASection } from "../components/marketing/CTASection";
import { FAQAccordion } from "../components/marketing/FAQAccordion";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { faqGroups } from "../data/faqs";

export function FAQPage() {
  return (
    <>
      <PageMeta
        description="Browse FoFit's product, pricing, access, AI guidance, and support FAQs in a dedicated route instead of a small footer section."
        title="FoFit FAQ | Product, Pricing, Support, and Access Questions"
      />
      <PageHero
        actions={[
          { label: "Join the waitlist", intent: "waitlist" },
          { label: "Read insights", to: "/insights", variant: "secondary" },
        ]}
        compact
        description="Get clear answers on pricing, access, guidance, and what FoFit includes."
        eyebrow="FAQ"
        title={
          <>
            Answers first.
            <br />
            Guesswork later.
          </>
        }
      />

      <section className="page-section">
        <div className="container">
          <FAQAccordion groups={faqGroups} />
        </div>
      </section>

      <section className="page-section page-section--tight">
        <div className="container">
          <Card className="support-panel reveal">
            <div>
              <span className="eyebrow">Need more context?</span>
              <h3>See the full picture.</h3>
              <p>
                Explore Product, Pricing, Insights, Community, and About for a
                fuller look at how FoFit works and what it is built to support.
              </p>
            </div>
            <div className="button-row">
              <Button to="/product" variant="secondary">
                Explore product
              </Button>
              <Button to="/pricing">See pricing</Button>
            </div>
          </Card>
        </div>
      </section>

      <CTASection
        description="Start with the answers that matter most, then join the waitlist when you are ready."
        pills={["Product", "Pricing", "Support"]}
        title={
          <>
            Clear information makes
            <br />
            better decisions.
          </>
        }
      />
    </>
  );
}
