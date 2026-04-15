import type { InsightArticle } from "../../data/insights";
import { ArticleCard } from "./ArticleCard";

export function ArticleGrid({ articles }: { articles: InsightArticle[] }) {
  return (
    <div className="article-grid">
      {articles.map((article) => (
        <ArticleCard article={article} key={article.slug} />
      ))}
    </div>
  );
}
