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
      </div>
    </section>
  );
}
