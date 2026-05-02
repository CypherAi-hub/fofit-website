import { CTASection } from "../components/marketing/CTASection";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

const TEAMS_PILOT_MAILTO = "mailto:teams@fofit.app?subject=FoFit%20Teams%20pilot";

const teamsSections = [
  {
    eyebrow: "01 / THE DASHBOARD",
    title: "A coach view for the whole room.",
    // TODO: Replace placeholder dashboard copy with real FoFit Teams product detail.
    description:
      "Coaches get a single place to see roster status, assigned blocks, completion, and athlete notes before the next lift starts.",
  },
  {
    eyebrow: "02 / ATHLETE EXPERIENCE",
    title: "Programs land where athletes already train.",
    // TODO: Replace placeholder athlete-flow copy with real FoFit Teams product detail.
    description:
      "Athletes keep the FoFit mobile experience while coach-built sessions, Cypher adjustments, and logging stay connected.",
  },
  {
    eyebrow: "03 / ORG STRUCTURE",
    title: "Built for head coaches, assistants, and AD visibility.",
    // TODO: Replace placeholder org copy with real FoFit Teams product detail.
    description:
      "Role-aware access can support head coach oversight, assistant workflows, and FERPA-aware department visibility.",
  },
] as const;

function TeamsDashboardMockup() {
  return (
    <div className="teams-dashboard-mockup" aria-label="FoFit Teams dashboard mockup">
      <div className="teams-dashboard-mockup__top">
        <span>FoFit Teams</span>
        <strong>Women&apos;s Soccer</strong>
      </div>
      <div className="teams-dashboard-mockup__stats">
        <div>
          <span>Logged</span>
          <strong>86%</strong>
        </div>
        <div>
          <span>Flagged</span>
          <strong>7</strong>
        </div>
        <div>
          <span>Ready</span>
          <strong>24</strong>
        </div>
      </div>
      <div className="teams-dashboard-mockup__rows">
        {["M. Carter", "J. Ellis", "T. Moore"].map((athlete, index) => (
          <div className="teams-dashboard-mockup__row" key={athlete}>
            <span>{athlete}</span>
            <div>
              <i style={{ width: `${82 - index * 14}%` }} />
            </div>
            <strong>{index === 1 ? "Adjust" : "On plan"}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TeamsPage() {
  return (
    <>
      <PageMeta
        description="FoFit Teams gives S&C coaches a dashboard, athlete logging, and compliance visibility without changing the athlete mobile experience."
        title="FoFit Teams | Built for Coaches Who Build"
      />
      <PageHero
        actions={[
          { label: "Schedule a pilot conversation", href: TEAMS_PILOT_MAILTO },
          { label: "See pricing", to: "/pricing#fofit-teams", variant: "secondary" },
        ]}
        description="A coach-facing layer for roster training, athlete logging, adaptive blocks, and the visibility programs need before spreadsheets take over."
        eyebrow="FoFit Teams"
        media={<TeamsDashboardMockup />}
        mediaClassName="teams-page-hero__media"
        title={
          <>
            FoFit Teams.
            <br />
            Built for the coaches who actually build.
          </>
        }
      />

      <section className="page-section teams-page-proof">
        <div className="container teams-page-proof__grid">
          {teamsSections.map((section) => (
            <Card className="teams-page-proof__card reveal" key={section.eyebrow}>
              <span>{section.eyebrow}</span>
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="page-section page-section--tight">
        <div className="container">
          <div className="teams-page-pricing reveal">
            <span>FIG 04 — PILOT PRICING</span>
            <h2>Per-team or per-athlete pricing.</h2>
            <p>
              Pilot programs available for D2/D3/NAIA athletic departments.
            </p>
            <Button href={TEAMS_PILOT_MAILTO} size="lg">
              Schedule a pilot conversation
            </Button>
          </div>
        </div>
      </section>

      <CTASection
        actions={[
          { label: "Schedule a pilot conversation", href: TEAMS_PILOT_MAILTO },
          { label: "Join the waitlist", intent: "waitlist", variant: "secondary" },
        ]}
        description="Book a pilot conversation if you lead a program. Join the waitlist if you train inside one."
        pills={["S&C coaches", "Athlete logging", "Program visibility"]}
        title={
          <>
            Build the program.
            <br />
            Keep the athletes moving.
          </>
        }
      />
    </>
  );
}
