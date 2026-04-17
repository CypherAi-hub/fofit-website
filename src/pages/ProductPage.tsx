import { CTASection } from "../components/marketing/CTASection";
import { ChapterIntro } from "../components/marketing/ChapterIntro";
import { DeviceFigure } from "../components/marketing/DeviceFigure";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { EditorialHeading } from "../components/ui/EditorialHeading";
import { heroFigure, planFigure, progressFigureAsset, transcriptFigure } from "../data/editorial";
import { workflowSteps } from "../data/platform";

const operatingLayers = [
  {
    title: "Read the week",
    description: "Schedule, equipment, training age, and constraints become the plan instead of excuses around it.",
  },
  {
    title: "Hold the session",
    description: "Cypher keeps the workout useful when fatigue, pain, or time pressure would normally break the plan.",
  },
  {
    title: "Interpret the signal",
    description: "Volume, strength, adherence, and recovery stay connected so the next decision has context.",
  },
] as const;

const productFigures = [
  {
    asset: planFigure,
    eyebrow: "FIG 02.1",
    title: "The plan starts with reality.",
    description: "Seven days, forty-one exercises, one structure built from the week you actually have.",
  },
  {
    asset: transcriptFigure,
    eyebrow: "FIG 02.2",
    title: "Cypher stays inside the product.",
    description: "The AI does not live as a floating promise. It sits in the workflow and answers the next real question.",
  },
  {
    asset: progressFigureAsset,
    eyebrow: "FIG 02.3",
    title: "Progress is an operating surface.",
    description: "The product explains what changed and what should move next instead of handing you a graph and leaving.",
  },
] as const;

export function ProductPage() {
  return (
    <>
      <PageMeta
        description="Planning, guidance, and progress live in one connected training system. FoFit keeps the plan, the session, and the signal tied together."
        title="FoFit Product | The System Behind the Platform"
      />
      <PageHero
        actions={[
          { label: "Join the waitlist", intent: "waitlist" },
          { label: "Explore pricing", to: "/pricing", variant: "secondary" },
        ]}
        description="Planning, guidance, and progress reinforce each other instead of living in separate apps."
        eyebrow="002 / Product"
        media={<DeviceFigure asset={heroFigure} className="page-hero__single-figure" />}
        mediaClassName="page-hero__media--single"
        title={
          <EditorialHeading accent="surface" as="span" className="editorial-heading--compact">
            {"A system, not a\nsingle {italic}."}
          </EditorialHeading>
        }
      />

      <section className="page-section editorial-section">
        <div className="container">
          <ChapterIntro
            description="Three responsibilities shape the product. Read the week. Hold the session. Interpret the signal."
            index="01"
            label="Operating logic"
            title={
              <>
                The product works like a <em>training desk</em>, not a feature stack.
              </>
            }
          />
          <div className="editorial-ledger">
            {operatingLayers.map((item, index) => (
              <article className="editorial-ledger__item reveal" key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section editorial-section">
        <div className="container">
          <ChapterIntro
            centered
            description="Plan logic, session support, and progress interpretation. The same three layers, just closer and with more consequence."
            index="02"
            label="Figures"
            title={
              <>
                See the system in <em>motion</em>.
              </>
            }
          />
          <div className="editorial-figure-grid editorial-figure-grid--three">
            {productFigures.map((figure) => (
              <article className="editorial-figure-story reveal" key={figure.eyebrow}>
                <DeviceFigure asset={figure.asset} />
                <div className="editorial-figure-story__copy">
                  <span>{figure.eyebrow}</span>
                  <h3>{figure.title}</h3>
                  <p>{figure.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section editorial-section editorial-section--tight">
        <div className="container">
          <ChapterIntro
            description="Intake, plan, session, review, recalibrate. A week should be easy to picture before you ever log the first set."
            index="03"
            label="Workflow"
            title={
              <>
                How the product moves <em>through</em> a week.
              </>
            }
          />
          <div className="workflow-ledger">
            {workflowSteps.map((step, index) => (
              <article className="workflow-ledger__item reveal" key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        description="Join the waitlist. Founding-member pricing closes at launch."
        pills={["Planning", "Guidance", "Progress", "Recovery"]}
        title={
          <>
            A system,
            <br />
            not a single app.
          </>
        }
      />
    </>
  );
}
