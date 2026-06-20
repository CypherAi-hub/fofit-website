import { startTransition, useState } from "react";
import { Link } from "react-router-dom";
import { ArticleGrid } from "../components/marketing/ArticleGrid";
import { CTASection } from "../components/marketing/CTASection";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import {
  RouteCardGrid,
  RoutePhoneCluster,
  RouteSection,
} from "../components/marketing/RouteProofSections";
import { Card } from "../components/ui/Card";
import { futureAssets } from "../data/future-homepage";
import { insightArticles, insightCategories } from "../data/insights";

type ActiveCategory = "All" | (typeof insightCategories)[number];

export function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("All");

  const visibleArticles =
    activeCategory === "All"
      ? insightArticles
      : insightArticles.filter((article) => article.category === activeCategory);

  const featured =
    insightArticles.find((article) => article.featured) ?? insightArticles[0];

  return (
    <>
      <PageMeta
        description="FoFit Insights is an editorial hub for training, nutrition, recovery, performance, and mindset content that adds trust and platform depth."
        title="FoFit Insights | Editorial Depth for Training, Recovery, and Nutrition"
      />
      <PageHero
        actions={[
          { label: "Explore product", to: "/product" },
          { label: "See FAQ", to: "/faq", variant: "secondary" },
        ]}
        description="Read practical training, nutrition, recovery, and performance notes for lifters, athletes, and coaches building better decisions."
        eyebrow="Insights"
        media={
          <RoutePhoneCluster
            images={[
              { image: futureAssets.app.simTrain, label: "Train" },
              { image: futureAssets.app.simNutrition, label: "Fuel" },
              { image: futureAssets.generated.recoveryCommunity, label: "Recovery", treatment: "scene" },
            ]}
            label="FoFit insights product context"
          />
        }
        title={
          <>
            Training insight
            <br />
            you can actually use.
          </>
        }
      />

      <RouteSection
        description="FoFit content should build trust around the product areas people actually use."
        kicker="Editorial System"
        title="Articles that support the training loop."
      >
        <RouteCardGrid
          cards={[
            {
              label: "Training",
              title: "Progressive overload, exercise selection, and execution.",
              detail: "Training content should help people understand why the next session looks the way it does.",
              image: futureAssets.app.simTrain,
            },
            {
              label: "Nutrition",
              title: "Protein, meal planning, fuel timing, and real food.",
              detail: "Nutrition content should connect back to targets, recipes, and logged meals.",
              image: futureAssets.app.simNutrition,
            },
            {
              label: "Recovery",
              title: "Rest, soreness, readiness, and adaptation.",
              detail: "Recovery writing should explain when training hard makes sense and when the plan should adjust.",
              image: futureAssets.generated.recoveryCommunity,
            },
          ]}
        />
      </RouteSection>

      <section className="page-section page-section--tight">
        <div className="container">
          <Card className="featured-article reveal">
            <span className="featured-article__kicker">{featured.category}</span>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <div className="featured-article__meta">
              <span>FoFit Editorial</span>
              <span>{featured.readTime}</span>
            </div>
            <Link className="article-card__link" to={`/insights/${featured.slug}`}>
              Read this insight
            </Link>
          </Card>
        </div>
      </section>

      <section className="page-section page-section--tight">
        <div className="container">
          <div className="category-filter">
            <button
              className={activeCategory === "All" ? "is-active" : ""}
              onClick={() => startTransition(() => setActiveCategory("All"))}
              type="button"
            >
              All
            </button>
            {insightCategories.map((category) => (
              <button
                className={activeCategory === category ? "is-active" : ""}
                key={category}
                onClick={() => startTransition(() => setActiveCategory(category))}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <ArticleGrid articles={visibleArticles} />
        </div>
      </section>

      <CTASection
        description="Join the waitlist for structured training, adaptive guidance, and the path that fits how you train."
        pills={["Training", "Nutrition", "Recovery", "Mindset"]}
        title={
          <>
            Learn the why.
            <br />
            Train the plan.
          </>
        }
      />
    </>
  );
}
