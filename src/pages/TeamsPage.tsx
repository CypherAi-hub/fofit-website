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
          { label: "Contact FoFit", href: "mailto:hello@fofit.app?subject=FoFit%20Teams" },
          { label: "See community", to: "/community", variant: "secondary" },
        ]}
        compact
        description="This route positions FoFit for schools, clubs, and group contexts without pretending the full enterprise stack is already complete."
        eyebrow="Teams"
        title={
          <>
            The platform can grow into
            <br />
            schools, teams, and groups.
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
            <span className="eyebrow">Why it belongs on the site</span>
            <h2 className="section-title">Teams make the long-term platform vision more credible.</h2>
            <p className="section-description">
              A serious company site should show where the product can expand.
              Teams and schools are one of the clearest signals that FoFit is
              building toward something bigger than a solo workout tool.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        description="The Teams route helps FoFit communicate maturity, broader market potential, and product architecture that can extend beyond individual users."
        pills={["Schools", "Clubs", "Coach-ready groups"]}
        title={
          <>
            Group use cases push the site
            <br />
            closer to real startup maturity.
          </>
        }
      />
    </>
  );
}
