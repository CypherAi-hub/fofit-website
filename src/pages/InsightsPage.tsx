import { startTransition, useState } from "react";
import { ArticleGrid } from "../components/marketing/ArticleGrid";
import { CTASection } from "../components/marketing/CTASection";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { Card } from "../components/ui/Card";
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
        compact
        description="This route turns the old article preview into a true editorial hub. That matters because content gives FoFit seriousness, trust, and a broader company feel."
        eyebrow="Insights"
        title={
          <>
            Editorial depth
            <br />
            that reinforces the platform.
          </>
        }
      />

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
        description="The insights hub should signal that FoFit is building real product intelligence around training, recovery, performance, and long-term behavior."
        pills={["Training", "Nutrition", "Recovery", "Mindset"]}
        title={
          <>
            Content adds more than polish.
            <br />
            It adds product trust.
          </>
        }
      />
    </>
  );
}
