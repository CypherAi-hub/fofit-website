import { Card } from "../ui/Card";

type ShowcasePanel = {
  title: string;
  caption: string;
  stats: { label: string; value: string }[];
  variant?: "calendar" | "chat" | "chart";
};

type PlatformShowcaseProps = {
  eyebrow: string;
  title: string;
  description: string;
  panels: ShowcasePanel[];
};

function CalendarMini() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const filled = [1, 3, 5]; // 0-indexed days that are filled
  const labels = ["Upper", "Lower", "Pull"];
  let filledCount = 0;
  return (
    <div className="showcase-mini showcase-mini--calendar">
      <div className="device__header">
        <span>This week</span>
        <span>Day 4</span>
      </div>
      <div className="showcase-calendar__days">
        {days.map((day, i) => {
          const isFilled = filled.includes(i);
          const label = isFilled ? labels[filledCount++] : undefined;
          return (
            <div
              className={`showcase-calendar__cell ${isFilled ? "showcase-calendar__cell--filled" : ""}`}
              key={i}
            >
              <span className="showcase-calendar__day">{day}</span>
              {label && <span className="showcase-calendar__label">{label}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChatMini() {
  return (
    <div className="showcase-mini showcase-mini--chat">
      <div className="device__header">
        <span>Cypher AI</span>
        <span>Live</span>
      </div>
      <div className="showcase-chat__bubbles">
        <div className="chat-bubble chat-bubble--coach">
          Drop bench to 4×6. Recovery's lower this week.
        </div>
        <div className="chat-bubble chat-bubble--user">What about Friday?</div>
      </div>
    </div>
  );
}

function ChartMini() {
  return (
    <div className="showcase-mini showcase-mini--chart">
      <div className="device__header">
        <span>Progress</span>
        <span>Week 8</span>
      </div>
      <div className="showcase-chart__kicker">+18%</div>
      <div className="mini-chart">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

const miniComponents = {
  calendar: CalendarMini,
  chat: ChatMini,
  chart: ChartMini,
} as const;

const variantCycle = ["calendar", "chat", "chart"] as const;

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
        {panels.map((panel, index) => {
          const variant = panel.variant ?? variantCycle[index % 3];
          const Mini = miniComponents[variant];
          return (
            <Card className="platform-showcase__panel reveal" key={panel.title}>
              <div className="platform-showcase__visual">
                <Mini />
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
          );
        })}
      </div>
    </section>
  );
}
