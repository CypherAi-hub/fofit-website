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
          { label: "Join early access", intent: "waitlist" },
          { label: "Read insights", to: "/insights", variant: "secondary" },
        ]}
        compact
        description="The FAQ now lives on its own route so it can function like real product support instead of a small accordion block at the bottom of a landing page."
        eyebrow="FAQ"
        title={
          <>
            Product support,
            <br />
            organized for scanning.
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
              <h3>Use the deeper routes.</h3>
              <p>
                The new site structure makes support easier because questions now
                map cleanly to dedicated pages for Product, Pricing, Insights,
                Community, and About.
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
        description="Separating support into its own route makes FoFit feel easier to trust, easier to understand, and much less like a one-page launch site."
        pills={["Product", "Pricing", "Support"]}
        title={
          <>
            Better support starts with
            <br />
            better information architecture.
          </>
        }
      />
    </>
  );
}
