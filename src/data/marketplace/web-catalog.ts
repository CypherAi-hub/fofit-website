/**
 * Web marketplace catalog adapter.
 *
 * Builds web-facing product rows from the SHARED, pure catalog + search engine vendored from
 * the FoFit app (affiliate-search-catalog.ts, product-search.ts — kept byte-identical so the
 * app and site rank products the same way). Affiliate-outbound only: every link opens the
 * merchant's live search (no fabricated price/rating ever).
 */

import {
  AFFILIATE_SEARCH_CATALOG,
  AMAZON_SEARCH_DISCLOSURE,
  EBAY_AFFILIATE_DISCLOSURE,
  resolveAffiliateSearchLinks,
} from "./affiliate-search-catalog";
import { searchProducts, type SearchableProduct } from "./product-search";

export { AMAZON_SEARCH_DISCLOSURE, EBAY_AFFILIATE_DISCLOSURE };

export type WebMerchantLink = { merchant: "eBay" | "Amazon"; url: string; disclosure: string };

export type WebProduct = {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  tags: string[];
  links: WebMerchantLink[];
};

const CATEGORY_LABELS: Record<string, string> = {
  training: "Training",
  recovery: "Recovery",
  nutrition: "Nutrition",
  meal_prep: "Meal Prep",
  supplements: "Supplements",
  apparel: "Apparel",
  home_gym: "Home Gym",
  athlete_gear: "Athlete Gear",
};

export function categoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category.replace(/_/g, " ");
}

export const WEB_PRODUCTS: WebProduct[] = AFFILIATE_SEARCH_CATALOG.map((entry) => {
  const { ebayUrl, amazonUrl } = resolveAffiliateSearchLinks(entry);
  const links: WebMerchantLink[] = [
    { merchant: "eBay", url: ebayUrl, disclosure: EBAY_AFFILIATE_DISCLOSURE },
    ...(amazonUrl
      ? [{ merchant: "Amazon" as const, url: amazonUrl, disclosure: AMAZON_SEARCH_DISCLOSURE }]
      : []),
  ];
  return {
    id: entry.id,
    title: entry.name,
    category: entry.category,
    categoryLabel: categoryLabel(entry.category),
    tags: entry.ebayQuery.split(/\s+/).filter(Boolean),
    links,
  };
});

/** Department list (for the category filter), ordered by product count. */
export const WEB_DEPARTMENTS: { id: string; label: string; count: number }[] = (() => {
  const counts = new Map<string, number>();
  for (const p of WEB_PRODUCTS) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  return [...counts.entries()]
    .map(([id, count]) => ({ id, label: categoryLabel(id), count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
})();

// Search records for the shared engine (anonymous web → no userGoals/intent personalization).
const SEARCH_RECORDS: SearchableProduct[] = AFFILIATE_SEARCH_CATALOG.map((entry) => ({
  id: entry.id,
  title: entry.name,
  brand: "",
  tags: entry.ebayQuery.split(/\s+/).filter(Boolean),
  goalFit: [],
  category: entry.category,
  categoryLabel: categoryLabel(entry.category),
  description: "",
  rankBoost: entry.amazon ? 20 : 10, // dual-network items are slightly more complete (editorial nudge)
  isFeatured: false,
}));

const PRODUCTS_BY_ID = new Map(WEB_PRODUCTS.map((p) => [p.id, p]));

/** Filter by department + relevance-rank via the SAME engine the app uses. Empty query →
 *  curated browse order; query → BM25-lite relevance gate + ranking. */
export function searchWebProducts(query: string, category: string | "all"): WebProduct[] {
  const records =
    category === "all" ? SEARCH_RECORDS : SEARCH_RECORDS.filter((r) => r.category === category);
  return searchProducts(query, records)
    .map((r) => PRODUCTS_BY_ID.get(r.product.id))
    .filter((p): p is WebProduct => Boolean(p));
}

export const WEB_PRODUCT_COUNT = WEB_PRODUCTS.length;

/** Global affiliate disclosure for the page-level notice (FTC). */
export const MARKETPLACE_DISCLOSURE =
  "Some links are affiliate links. FoFit may earn a commission at no extra cost to you. We pick products editorially — placement is not paid.";
