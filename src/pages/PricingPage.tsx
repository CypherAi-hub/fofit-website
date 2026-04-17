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
          { label: "Join the waitlist", intent: "waitlist" },
          { label: "See teams", to: "/teams", variant: "secondary" },
        ]}
        compact
        description="Simple pricing today, with enough depth to support more ways to train over time."
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
            description="See what makes Premium feel worth paying for before you compare plans."
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
            title="What makes Premium feel different."
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
            <h3>FoFit can support more than solo training.</h3>
            <p>
              Starter and Premium cover the core experience now. Team and
              coach-supported setups can layer on when the product is ready for
              them.
            </p>
            <Button to="/teams" variant="secondary">
              Explore teams
            </Button>
          </Card>
          <div className="content-stack reveal">
            <span className="eyebrow">Billing confidence</span>
            <h2 className="section-title">Pricing should reinforce trust, not friction.</h2>
            <p className="section-description">
              Know what each plan unlocks, what Premium adds, and where FoFit
              can grow without muddying the offer today.
            </p>
            <p className="section-description">
              The goal is simple: clear value now, room to expand later.
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
        description="Choose the plan that fits how you train today, then join the waitlist to lock in early access."
        pills={["Starter", "Premium", "Team-ready"]}
        title={
          <>
            Pick your plan.
            <br />
            Keep your momentum.
          </>
        }
      />
    </>
  );
}
