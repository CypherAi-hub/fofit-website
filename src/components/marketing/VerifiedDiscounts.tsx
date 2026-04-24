import { verifiedDiscounts } from "../../data/pricing";

export function VerifiedDiscounts() {
  return (
    <section className="verified-discounts">
      <div className="verified-discounts__header">
        <span className="verified-discounts__eyebrow">FIG 02.1 — VERIFIED PRICING</span>
        <h2 className="verified-discounts__title">
          For students. <em>For those who serve.</em>
        </h2>
        <p className="verified-discounts__lede">
          Same Premium product. Verified once, locked at your rate as long as you qualify.
        </p>
      </div>
      <div className="verified-discounts__grid">
        {verifiedDiscounts.map((tier) => (
          <article className="verified-discount-card" key={tier.name}>
            <div className="verified-discount-card__name">{tier.name}</div>
            <div className="verified-discount-card__price">{tier.price}</div>
            <div className="verified-discount-card__annual">or {tier.annual}</div>
            <p className="verified-discount-card__desc">{tier.description}</p>
            <div className="verified-discount-card__elig">{tier.eligibility}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
