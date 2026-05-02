const stats = [
  { value: "500", label: "Founding member spots" },
  { value: "$12.99", label: "Founding rate, locked for life" },
  { value: "7 days", label: "Free trial, no card" },
  { value: "Cypher", label: "The AI that remembers" },
] as const;

export function FoundingStatsBand() {
  return (
    <section className="founding-stats" aria-label="FoFit founding membership facts">
      <div className="container founding-stats__grid">
        {stats.map((stat) => (
          <div className="founding-stats__item reveal" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
