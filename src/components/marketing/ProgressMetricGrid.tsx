import type { ProgressMetric } from "../../data/editorial";

type ProgressMetricGridProps = {
  metrics: ProgressMetric[];
};

export function ProgressMetricGrid({ metrics }: ProgressMetricGridProps) {
  return (
    <div className="progress-metric-grid">
      {metrics.map((metric) => (
        <article className="progress-metric reveal" key={metric.label}>
          <span className="progress-metric__label">{metric.label}</span>
          <strong>{metric.value}</strong>
          <p>{metric.note}</p>
        </article>
      ))}
    </div>
  );
}
