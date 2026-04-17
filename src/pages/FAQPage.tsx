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
        description="Browse FoFit's product, pricing, access, AI guidance, and support FAQs in one clear place."
        title="FoFit FAQ | Product, Pricing, Support, and Access Questions"
      />
      <PageHero
        actions={[
          { label: "Join the waitlist", intent: "waitlist" },
          { label: "Read insights", to: "/insights", variant: "secondary" },
        ]}
        compact
        description="Everything about pricing, access, Cypher, data, and support — in one place."
        eyebrow="FAQ"
        title={
          <>
            Questions,
            <br />
            answered.
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
                The deeper answers live where they belong — Product, Pricing,
                Insights, Community, About.
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
        description="We read every email. Reach out and we&apos;ll respond within a business day."
        pills={["Product", "Pricing", "Support"]}
        title={
          <>
            Still have a question?
          </>
        }
      />
    </>
  );
}
