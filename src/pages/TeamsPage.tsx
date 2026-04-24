import { CTASection } from "../components/marketing/CTASection";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { Card } from "../components/ui/Card";
import { teamsTiers } from "../data/pricing";

const TEAMS_DEMO_MAILTO = "mailto:teams@fofit.app?subject=FoFit%20Teams%20demo";

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
        description="FoFit Teams — per-team pricing for schools, clubs, and training groups. Every athlete gets Premium. Coach view layered on top."
        title="FoFit Teams | Schools, Clubs, and Group Training Systems"
      />
      <PageHero
        actions={[
          { label: "Book a demo", href: TEAMS_DEMO_MAILTO },
          { label: "Join the waitlist", intent: "waitlist", variant: "secondary" },
        ]}
        compact
        description="Per-team pricing for schools, clubs, and training groups that need structure, visibility, and consistency."
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

      <section className="page-section">
        <div className="container">
          <div className="teams-tiers">
            <div className="teams-tiers__header">
              <span className="teams-tiers__eyebrow">FIG 02 — TEAMS PRICING</span>
              <h2 className="teams-tiers__title">
                Inside <em>FoFit Teams</em>.
              </h2>
              <p className="teams-tiers__lede">
                Per-team pricing, not per-seat. Every athlete on the roster gets Premium included. The coach view layered on top.
              </p>
            </div>

            <div className="teams-tiers__grid">
              {teamsTiers.map((tier) => (
                <article
                  className={`teams-tier-card${tier.featured ? " teams-tier-card--featured" : ""}`}
                  key={tier.name}
                >
                  <div className="teams-tier-card__name">{tier.name}</div>
                  <div className="teams-tier-card__price">{tier.price}</div>
                  <p className="teams-tier-card__fit">{tier.fit}</p>
                  <div className="teams-tier-card__desc">{tier.description}</div>
                </article>
              ))}
            </div>

            <div className="teams-tiers__footnote">
              Founding school partner pilots available for the first cohort of athletic departments. Email teams@fofit.app for terms.
            </div>
          </div>
        </div>
      </section>

      <section className="page-section page-section--tight">
        <div className="container">
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
        actions={[
          { label: "Book a demo", href: TEAMS_DEMO_MAILTO },
          { label: "Join the waitlist", intent: "waitlist", variant: "secondary" },
        ]}
        description="Book a demo if you run a team. Join the waitlist if you train on one."
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
