import { Card } from "../ui/Card";

type ComparisonBlockProps = {
  title: string;
  beforeTitle: string;
  afterTitle: string;
  beforeItems: string[];
  afterItems: string[];
};

export function ComparisonBlock({
  title,
  beforeTitle,
  afterTitle,
  beforeItems,
  afterItems,
}: ComparisonBlockProps) {
  return (
    <section className="comparison-block">
      <div className="comparison-block__header">
        <span className="eyebrow">{title}</span>
      </div>
      <div className="comparison-grid">
        <Card className="comparison-card comparison-card--muted">
          <h3>{beforeTitle}</h3>
          <ul>
            {beforeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
        <Card className="comparison-card comparison-card--accent">
          <h3>{afterTitle}</h3>
          <ul>
            {afterItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
