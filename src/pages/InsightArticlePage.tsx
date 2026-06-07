import { Fragment } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CTASection } from "../components/marketing/CTASection";
import { PageMeta } from "../components/layout/PageMeta";
import { insightArticles } from "../data/insights";

function renderMarkdownBody(body: string) {
  if (body === "CONTENT_PLACEHOLDER") {
    return (
      <p className="insight-article__placeholder">
        CONTENT_PLACEHOLDER
      </p>
    );
  }

  return body.split(/\n{2,}/).map((block) => {
    const trimmed = block.trim();

    if (!trimmed) {
      return null;
    }

    if (trimmed.startsWith("## ")) {
      return <h2 key={trimmed}>{trimmed.replace(/^##\s+/, "")}</h2>;
    }

    if (/^\[\d+\]/.test(trimmed)) {
      return (
        <p className="insight-article__source" key={trimmed}>
          {trimmed}
        </p>
      );
    }

    return (
      <p key={trimmed}>
        {trimmed.split(/\n/).map((line, index) => (
          <Fragment key={`${line}-${index}`}>
            {index > 0 ? <br /> : null}
            {line}
          </Fragment>
        ))}
      </p>
    );
  });
}

export function InsightArticlePage() {
  const { slug } = useParams();
  const article = insightArticles.find((item) => item.slug === slug);

  if (!article) {
    return <Navigate replace to="/insights" />;
  }

  const related = Array.from(
    new Map(
      [
        ...insightArticles.filter(
          (item) => item.slug !== article.slug && item.category === article.category,
        ),
        ...insightArticles.filter((item) => item.slug !== article.slug),
      ].map((item) => [item.slug, item]),
    ).values(),
  ).slice(0, 3);

  return (
    <>
      <PageMeta
        description={article.excerpt}
        title={`${article.title} | FoFit Insights`}
      />

      <article className="insight-article">
        <header className="insight-article__header container">
          <Link className="insight-article__back" to="/insights">
            Back to insights
          </Link>
          <span className="insight-article__category">{article.category}</span>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
          <div className="insight-article__meta">
            <span>{article.byline}</span>
            <span>{article.readTime}</span>
            {article.sourcesReviewed ? (
              <span>{article.sourcesReviewed} sources reviewed</span>
            ) : null}
            {article.tierBreakdown ? <span>{article.tierBreakdown}</span> : null}
          </div>
        </header>

        <div className="insight-article__body container">
          {renderMarkdownBody(article.body)}
        </div>

        <footer className="insight-article__footer container">
          <div>
            <span className="insight-article__category">Related reading</span>
            <h2>Keep the work connected.</h2>
          </div>
          <div className="insight-article__related">
            {related.map((item) => (
              <Link key={item.slug} to={`/insights/${item.slug}`}>
                <span>{item.category}</span>
                {item.title}
              </Link>
            ))}
          </div>
        </footer>
      </article>

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
