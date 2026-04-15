type StatBandItem = {
  value: string;
  label: string;
};

export function StatBand({ items }: { items: StatBandItem[] }) {
  return (
    <section className="stat-band">
      <div className="container stat-band__grid">
        {items.map((item) => (
          <div className="stat-band__item" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
