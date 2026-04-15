import { FAQAccordion } from "../components/marketing/FAQAccordion";
import { CTASection } from "../components/marketing/CTASection";
import { PlatformShowcase } from "../components/marketing/PlatformShowcase";
import { PricingTable } from "../components/marketing/PricingTable";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { faqGroups } from "../data/faqs";

export function PricingPage() {
  const pricingFaqs = faqGroups.filter(
    (group) => group.title === "Pricing" || group.title === "Access",
  );

  return (
    <>
      <PageMeta
        description="See FoFit's free and premium plan structure, comparison table, and how the platform is being positioned to scale into team and coaching models."
        title="FoFit Pricing | Clear Plans for a Growing Platform"
      />
      <PageHero
        actions={[
          { label: "Join early access", intent: "waitlist" },
          { label: "See teams", to: "/teams", variant: "secondary" },
        ]}
        compact
        description="Pricing should feel clean, premium, and believable. The structure is simple now, but the page leaves room for teams, coaches, and broader ecosystem layers."
        eyebrow="Pricing"
        title={
          <>
            Clear today.
            <br />
            Built to scale tomorrow.
          </>
        }
      />

      <section className="page-section">
        <div className="container">
          <PlatformShowcase
            description="Pricing converts better when the user sees why the platform feels premium. These panels make the membership value more tangible."
            eyebrow="Premium membership"
            panels={[
              {
                caption: "Guidance",
                title: "Cypher as an always-available premium layer",
                stats: [
                  { label: "Support", value: "Daily" },
                  { label: "Context", value: "Training-aware" },
                ],
              },
              {
                caption: "Analytics",
                title: "Progress intelligence that feels worth paying for",
                stats: [
                  { label: "Trends", value: "Advanced" },
                  { label: "Insights", value: "Useful" },
                ],
              },
              {
                caption: "Ecosystem access",
                title: "Membership that grows with the platform roadmap",
                stats: [
                  { label: "Coaches", value: "Future-ready" },
                  { label: "Community", value: "Priority" },
                ],
              },
            ]}
            title="Premium value should look concrete."
          />
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <PricingTable />
        </div>
      </section>

      <section className="page-section page-section--tight">
        <div className="container split-layout">
          <Card className="spotlight-card reveal">
            <span className="eyebrow">Teams teaser</span>
            <h3>FoFit is not stopping at individual memberships.</h3>
            <p>
              The pricing architecture is intentionally simple at the consumer
              layer while leaving space for team, school, and coaching models as
              the platform matures.
            </p>
            <Button to="/teams" variant="secondary">
              Explore teams
            </Button>
          </Card>
          <div className="content-stack reveal">
            <span className="eyebrow">Billing confidence</span>
            <h2 className="section-title">Pricing should reinforce trust, not friction.</h2>
            <p className="section-description">
              The page now communicates what each plan unlocks, why Premium
              exists, and how the product can extend into broader account types
              without forcing those decisions too early.
            </p>
            <p className="section-description">
              Stronger conversion comes from showing premium membership as the
              operating layer for the full platform, not as a generic paywall.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <FAQAccordion groups={pricingFaqs} />
        </div>
      </section>

      <CTASection
        description="A clearer pricing page helps FoFit feel like a mature consumer product now while leaving room for teams, coaches, and future account structures later."
        pills={["Starter", "Premium", "Team-ready"]}
        title={
          <>
            Pricing now supports the platform story
            <br />
            instead of acting like a landing-page add-on.
          </>
        }
      />
    </>
  );
}
