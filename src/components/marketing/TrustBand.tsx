import { testimonials } from "../../data/testimonials";

const trustItems = [
  "Structured training architecture",
  "Adaptive guidance from session to session",
  "Progress, nutrition, and future coaching under one roof",
];

export function TrustBand() {
  return (
    <section className="trust-band">
      <div className="container trust-band__inner">
        <div className="trust-band__items">
          {trustItems.map((item) => (
            <span className="trust-chip" key={item}>
              {item}
            </span>
          ))}
        </div>
        <div className="trust-band__quote">
          <p>{testimonials[0].quote}</p>
          <span>
            {testimonials[0].name} · {testimonials[0].role}
          </span>
        </div>
      </div>
    </section>
  );
}
