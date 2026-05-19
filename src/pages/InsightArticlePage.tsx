import { Link, Navigate, useParams } from "react-router-dom";
import { CTASection } from "../components/marketing/CTASection";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { insightArticles } from "../data/insights";

/**
 * /insights/:slug article reader.
 *
 * Reads the slug param, finds the matching InsightArticle, and renders
 * its body as a long-read. Unknown slugs redirect back to the /insights
 * index — the site has no 404 page yet (Phase 5 cleanup), and silent
 * fallback to HomePage via the * route would be confusing here.
 */
export function InsightArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = insightArticles.find((entry) => entry.slug === slug);

  if (!article) {
    return <Navigate replace to="/insights" />;
  }

  return (
    <>
      <PageMeta
        description={article.excerpt}
        title={`${article.title} | FoFit Insights`}
      />
      <PageHero
        actions={[
          { label: "All insights", to: "/insights", variant: "secondary" },
        ]}
        compact
        description={article.excerpt}
        eyebrow={`${article.category} · ${article.readTime}`}
        title={<>{article.title}</>}
      />

      <section className="page-section page-section--tight">
        <div className="container">
          <article className="article-detail reveal">
            {article.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <Link className="article-card__link" to="/insights">
              Back to all insights
            </Link>
          </article>
        </div>
      </section>

      <CTASection
        description="Join the waitlist for structured training, adaptive guidance, and the path that fits how you train."
        pills={[article.category]}
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
