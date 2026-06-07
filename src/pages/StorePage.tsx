import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { Card } from "../components/ui/Card";
import {
  MARKETPLACE_DISCLOSURE,
  WEB_DEPARTMENTS,
  WEB_PRODUCT_COUNT,
  searchWebProducts,
  type WebMerchantLink,
} from "../data/marketplace/web-catalog";
import "../styles/marketplace.css";

function ShopButton({ link }: { link: WebMerchantLink }) {
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

export function StorePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const results = useMemo(() => searchWebProducts(query, category), [query, category]);

  return (
    <>
      <PageMeta
        description="FoFit Store — curated training gear, recovery tools, supplements, and apparel. Browse live listings on eBay and Amazon. Affiliate links; we earn a commission at no extra cost to you."
        title="FoFit Store | Curated Training Gear & Recovery Marketplace"
      />
      <PageHero
        actions={[
          { label: "Get the app", intent: "waitlist" },
          { label: "See coaches", to: "/coaches", variant: "secondary" },
        ]}
        compact
        description={`Curated equipment, recovery, supplements, and apparel — aligned with how FoFit trains you. ${WEB_PRODUCT_COUNT} products across ${WEB_DEPARTMENTS.length} categories, real listings on eBay and Amazon.`}
        eyebrow="Store"
        title={
          <>
            Gear that matches
            <br />
            how you train.
          </>
        }
      />

      <section className="page-section page-section--tight">
        <div className="container">
          <div className="store-controls">
            <input
              aria-label="Search the FoFit store"
              className="store-search"
              inputMode="search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search gear, recovery, supplements…"
              type="search"
              value={query}
            />
            <div className="store-chips" role="tablist" aria-label="Categories">
              <button
                className={`store-chip${category === "all" ? " store-chip--active" : ""}`}
                onClick={() => setCategory("all")}
                type="button"
              >
                All <span className="store-chip-count">{WEB_PRODUCT_COUNT}</span>
              </button>
              {WEB_DEPARTMENTS.map((dept) => (
                <button
                  className={`store-chip${category === dept.id ? " store-chip--active" : ""}`}
                  key={dept.id}
                  onClick={() => setCategory(dept.id)}
                  type="button"
                >
                  {dept.label} <span className="store-chip-count">{dept.count}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="store-disclosure">{MARKETPLACE_DISCLOSURE}</p>

          {results.length === 0 ? (
            <Card className="store-empty">
              <h3>No matches</h3>
              <p>Try a broader term — like “dumbbell”, “recovery”, or “protein”.</p>
            </Card>
          ) : (
            <div className="store-grid">
              {results.map((product) => (
                <Card className="store-card reveal" key={product.id}>
                  <span className="eyebrow store-card-cat">{product.categoryLabel}</span>
                  <h3 className="store-card-title">
                    <Link className="store-card-title-link" to={`/product/${product.id}`}>
                      {product.title}
                    </Link>
                  </h3>
                  <p className="store-card-note">Browse live listings — current price, options, and reviews on the merchant.</p>
                  <div className="store-card-actions">
                    {product.links.map((link) => (
                      <ShopButton key={link.merchant} link={link} />
                    ))}
                  </div>
                  <Link className="store-card-details" to={`/product/${product.id}`}>
                    View details →
                  </Link>
                  <p className="store-card-fineprint">{product.links[0]?.disclosure}</p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
