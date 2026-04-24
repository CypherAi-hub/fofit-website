import { cypherTokenPacks } from "../../data/pricing";

export function CypherTokens() {
  return (
    <section className="cypher-tokens">
      <div className="cypher-tokens__header">
        <span className="cypher-tokens__eyebrow">FIG 02.2 — PAY-AS-YOU-GO</span>
        <h2 className="cypher-tokens__title">
          Cypher <em>Tokens</em>.
        </h2>
        <p className="cypher-tokens__lede">
          One token = one Cypher session. Buy once, use whenever. No subscription. Designed for athletes who want to try Cypher without committing.
        </p>
      </div>
      <div className="cypher-tokens__grid">
        {cypherTokenPacks.map((pack) => (
          <article
            className={`cypher-token-pack${pack.featured ? " cypher-token-pack--featured" : ""}`}
            key={pack.count}
          >
            <div className="cypher-token-pack__count">{pack.count}</div>
            <div className="cypher-token-pack__label">{pack.label}</div>
            <div className="cypher-token-pack__price">{pack.price}</div>
            <div className="cypher-token-pack__per">
              {pack.savings ? <span className="cypher-token-pack__savings">{pack.savings} · </span> : null}
              {pack.perSession}
            </div>
          </article>
        ))}
      </div>
      <p className="cypher-tokens__footnote">
        Free Starter members get 5 Cypher sessions per month, refilled on the 1st. Top up anytime with tokens or upgrade to Premium for unlimited.
      </p>
    </section>
  );
}
