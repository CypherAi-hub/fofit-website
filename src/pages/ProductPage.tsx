import { Link, Navigate, useParams } from "react-router-dom";

import { CTASection } from "../components/marketing/CTASection";
import { ChapterIntro } from "../components/marketing/ChapterIntro";
import { DeviceFigure } from "../components/marketing/DeviceFigure";
import { ExerciseLibraryPreview } from "../components/marketing/ExerciseLibraryPreview";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { Card } from "../components/ui/Card";
import { EditorialHeading } from "../components/ui/EditorialHeading";
import { heroFigure, planFigure, progressFigureAsset, transcriptFigure } from "../data/editorial";
import {
  MARKETPLACE_DISCLOSURE,
  getWebProductById,
  siblingsInCategory,
  type WebMerchantLink,
  type WebProduct,
} from "../data/marketplace/web-catalog";
import { workflowSteps } from "../data/platform";
import "../styles/marketplace.css";

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
    eyebrow: "Plan",
    title: "The plan starts with reality.",
    description: "Seven days, forty-one exercises, one structure built from the week you actually have.",
  },
  {
    asset: transcriptFigure,
    eyebrow: "Cypher",
    title: "Cypher stays inside the product.",
    description: "The AI does not live as a floating promise. It sits in the workflow and answers the next real question.",
  },
  {
    asset: progressFigureAsset,
    eyebrow: "Progress",
    title: "Progress is an operating surface.",
    description: "The product explains what changed and what should move next instead of handing you a graph and leaving.",
  },
] as const;

function ProductShopButton({ link }: { link: WebMerchantLink }) {
  return (
    <a
      className={`store-shop-btn store-shop-btn--${link.merchant.toLowerCase()}`}
      href={link.url}
      target="_blank"
      rel="sponsored noopener noreferrer"
    >
      Shop on {link.merchant}
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}

function ProductDetail({ product }: { product: WebProduct }) {
  const siblings = siblingsInCategory(product);

  return (
    <>
      <PageMeta
        description={`${product.title} — browse live listings on ${product.links
          .map((link) => link.merchant)
          .join(" and ")}. Affiliate links; FoFit may earn a commission at no extra cost to you.`}
        title={`${product.title} | FoFit Store`}
      />

      <section className="page-section page-section--tight">
        <div className="container">
          <Link className="product-detail__back" to="/store">
            ← Back to store
          </Link>

          <div className="product-detail">
            <span className="eyebrow store-card-cat product-detail__cat">{product.categoryLabel}</span>
            <h1 className="product-detail__title">{product.title}</h1>
            <p className="product-detail__note">
              We don’t list a price here. Each button opens the merchant’s live search — current
              price, options, and reviews come straight from {product.links.map((l) => l.merchant).join(" or ")}.
            </p>

            <div className="product-detail__buy">
              {product.links.map((link) => (
                <div className="product-detail__buy-row" key={link.merchant}>
                  <ProductShopButton link={link} />
                  <p className="store-card-fineprint product-detail__fineprint">{link.disclosure}</p>
                </div>
              ))}
            </div>

            <p className="store-disclosure product-detail__disclosure">{MARKETPLACE_DISCLOSURE}</p>
          </div>

          {siblings.length > 0 ? (
            <div className="product-detail__rail">
              <h2 className="product-detail__rail-heading">More in {product.categoryLabel}</h2>
              <div className="store-grid">
                {siblings.map((sibling) => (
                  <Card className="store-card reveal" key={sibling.id}>
                    <span className="eyebrow store-card-cat">{sibling.categoryLabel}</span>
                    <h3 className="store-card-title">{sibling.title}</h3>
                    <p className="store-card-note">
                      Browse live listings — current price, options, and reviews on the merchant.
                    </p>
                    <div className="store-card-actions">
                      <Link className="store-details-btn" to={`/product/${sibling.id}`}>
                        View details
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

export function ProductPage() {
  const { id } = useParams();

  if (id) {
    const product = getWebProductById(id);
    if (!product) {
      return <Navigate replace to="/store" />;
    }
    return <ProductDetail product={product} />;
  }

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

      <ExerciseLibraryPreview />

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
