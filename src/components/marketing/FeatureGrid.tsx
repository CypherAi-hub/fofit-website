import { Card } from "../ui/Card";

export type FeatureItem = {
  title: string;
  description: string;
  kicker?: string;
};

export function FeatureGrid({ items }: { items: FeatureItem[] }) {
  return (
    <div className="feature-grid">
      {items.map((item) => (
        <Card className="feature-card reveal" key={item.title}>
          {item.kicker ? <span className="feature-card__kicker">{item.kicker}</span> : null}
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </Card>
      ))}
    </div>
  );
}
