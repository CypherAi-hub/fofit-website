import { Card } from "../ui/Card";

export type Pillar = {
  title: string;
  description: string;
};

export function SystemPillars({ items }: { items: Pillar[] }) {
  return (
    <div className="pillars-grid">
      {items.map((item) => (
        <Card className="pillar-card reveal" key={item.title}>
          <span className="pillar-card__line" />
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </Card>
      ))}
    </div>
  );
}
