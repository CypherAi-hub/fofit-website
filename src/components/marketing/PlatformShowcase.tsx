import { Card } from "../ui/Card";

type ShowcasePanel = {
  title: string;
  caption: string;
  stats: { label: string; value: string }[];
};

type PlatformShowcaseProps = {
  eyebrow: string;
  title: string;
  description: string;
  panels: ShowcasePanel[];
};

export function PlatformShowcase({
  eyebrow,
  title,
  description,
  panels,
}: PlatformShowcaseProps) {
  return (
    <section className="platform-showcase">
      <div className="content-stack reveal">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="section-title">{title}</h2>
        <p className="section-description">{description}</p>
      </div>
      <div className="platform-showcase__grid">
        {panels.map((panel) => (
          <Card className="platform-showcase__panel reveal" key={panel.title}>
            <div className="platform-showcase__visual">
              <div className="platform-showcase__window" />
              <div className="platform-showcase__window platform-showcase__window--accent" />
              <div className="platform-showcase__bars">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="platform-showcase__content">
              <span className="feature-card__kicker">{panel.caption}</span>
              <h3>{panel.title}</h3>
              <div className="platform-showcase__stats">
                {panel.stats.map((stat) => (
                  <div key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
