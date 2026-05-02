import { Link } from "react-router-dom";
import type { InsightArticle } from "../../data/insights";
import { Card } from "../ui/Card";

export function ArticleCard({ article }: { article: InsightArticle }) {
  return (
    <Card className="article-card reveal">
      <span className="article-card__category">{article.category}</span>
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
      <div className="article-card__meta">
        <span>{article.byline}</span>
        <span>{article.readTime}</span>
      </div>
      <Link className="article-card__link" to={`/insights/${article.slug}`}>
        Explore insight
      </Link>
    </Card>
  );
}
