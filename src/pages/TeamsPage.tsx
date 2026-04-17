import { CTASection } from "../components/marketing/CTASection";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { Card } from "../components/ui/Card";

const teamUseCases = [
  {
    title: "Schools and athletic programs",
    description:
      "A cleaner system for consistent training structures, group momentum, and broader performance visibility.",
  },
  {
    title: "Clubs and communities",
    description:
      "Shared challenges, progress loops, and accountability structures for people training toward common goals.",
  },
  {
    title: "Coaches and performance groups",
    description:
      "A scalable layer where structured training, member context, and coach oversight can work together.",
  },
];

export function TeamsPage() {
  return (
    <>
      <PageMeta
        description="FoFit Teams previews how the platform can expand into schools, clubs, and high-accountability training groups."
        title="FoFit Teams | Schools, Clubs, and Group Training Systems"
      />
      <PageHero
        actions={[
          { label: "Join the waitlist", intent: "waitlist" },
          { label: "See community", to: "/community", variant: "secondary" },
        ]}
        compact
        description="See how FoFit can support schools, clubs, and training groups that need structure, visibility, and consistency."
        eyebrow="Teams"
        title={
          <>
            Bring structure to
            <br />
            the people you train with.
          </>
        }
      />

      <section className="page-section">
        <div className="container detail-grid">
          {teamUseCases.map((useCase) => (
            <Card className="detail-card reveal" key={useCase.title}>
              <h3>{useCase.title}</h3>
              <p>{useCase.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="page-section page-section--tight">
        <div className="container split-layout">
          <Card className="spotlight-card reveal">
            <span className="eyebrow">Admin concepts</span>
            <h3>What a future team layer could include</h3>
            <ul className="check-list">
              <li>Shared dashboards and completion visibility</li>
              <li>Group challenge structures and progress views</li>
              <li>Coach-ready oversight without losing the member experience</li>
            </ul>
          </Card>
          <div className="content-stack reveal">
            <span className="eyebrow">Why teams need this</span>
            <h2 className="section-title">Training groups need more than a shared spreadsheet.</h2>
            <p className="section-description">
              Coaches, captains, and group leaders need visibility into
              completion, progress, and readiness without losing the individual
              training experience.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        description="Join the waitlist if you want FoFit for a school, club, or accountability-driven training group."
        pills={["Schools", "Clubs", "Coach-ready groups"]}
        title={
          <>
            Train together
            <br />
            without losing structure.
          </>
        }
      />
    </>
  );
}
