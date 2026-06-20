import { CTASection } from "../components/marketing/CTASection";
import { FAQAccordion } from "../components/marketing/FAQAccordion";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import {
  RouteCardGrid,
  RoutePhoneCluster,
  RouteSection,
} from "../components/marketing/RouteProofSections";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { faqGroups } from "../data/faqs";
import { futureAssets } from "../data/future-homepage";

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
        description="Everything about pricing, access, Cypher, the three paths, Teams, data, and support — in one place."
        eyebrow="FAQ"
        media={
          <RoutePhoneCluster
            images={[
              { image: futureAssets.app.simCypher, label: "Cypher" },
              { image: futureAssets.app.simTrain, label: "Training" },
              { image: futureAssets.app.simNutrition, label: "Nutrition" },
            ]}
            label="FoFit FAQ product context"
          />
        }
        title={
          <>
            Questions,
            <br />
            answered.
          </>
        }
      />

      <RouteSection
        description="The answers are organized around the actual FoFit system, not around abstract app categories."
        kicker="Question Map"
        title="Start from the product area you care about."
      >
        <RouteCardGrid
          cards={[
            {
              label: "Product",
              title: "Training, nutrition, Cypher, and community.",
              detail: "How the loop works, what is real now, and what each surface is responsible for.",
              image: futureAssets.app.simTrain,
            },
            {
              label: "Access",
              title: "Founding 250, beta, pricing, and students.",
              detail: "How to get in early, what the current membership paths mean, and what is locked at launch.",
              image: futureAssets.mark,
            },
            {
              label: "Teams",
              title: "Coaches, groups, schools, and clubs.",
              detail: "Where the coach/team layer fits around the member product.",
              image: futureAssets.community.support.verifiedCoach,
            },
          ]}
        />
      </RouteSection>

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
