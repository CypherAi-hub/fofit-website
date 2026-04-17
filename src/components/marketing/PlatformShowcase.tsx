import { Card } from "../ui/Card";

type ShowcasePanel = {
  title: string;
  caption: string;
  description?: string;
  stats: { label: string; value: string }[];
  variant?: "calendar" | "chat" | "chart" | "nutrition" | "discover" | "community";
  size?: "standard" | "feature" | "wide" | "tall";
  tone?: "default" | "blue" | "green" | "orange" | "violet";
};

type PlatformShowcaseProps = {
  eyebrow: string;
  title: string;
  description: string;
  panels: ShowcasePanel[];
  className?: string;
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

function NutritionMini() {
  return (
    <div className="showcase-mini showcase-mini--nutrition">
      <div className="device__header">
        <span>Fueling</span>
        <span>Today</span>
      </div>
      <div className="showcase-macro__bars">
        <span />
        <span />
        <span />
      </div>
      <div className="showcase-macro__labels">
        <span>P 165g</span>
        <span>C 220g</span>
        <span>F 58g</span>
      </div>
    </div>
  );
}

function DiscoverMini() {
  return (
    <div className="showcase-mini showcase-mini--discover">
      <div className="device__header">
        <span>Discover</span>
        <span>Ready</span>
      </div>
      <div className="showcase-discover__match">Session match 94%</div>
      <div className="showcase-discover__chips">
        <span>Upper power</span>
        <span>Recovery day</span>
        <span>Hotel gym</span>
      </div>
    </div>
  );
}

function CommunityMini() {
  return (
    <div className="showcase-mini showcase-mini--community">
      <div className="device__header">
        <span>Community</span>
        <span>Live</span>
      </div>
      <div className="showcase-community__stack">
        <div>
          <strong>Squad check-in</strong>
          <span>4 teammates completed today&apos;s lift</span>
        </div>
        <div>
          <strong>Next challenge</strong>
          <span>Consistency streak closes tonight</span>
        </div>
      </div>
    </div>
  );
}

const miniComponents = {
  calendar: CalendarMini,
  chat: ChatMini,
  chart: ChartMini,
  nutrition: NutritionMini,
  discover: DiscoverMini,
  community: CommunityMini,
} as const;

const variantCycle = ["calendar", "chat", "chart"] as const;

export function PlatformShowcase({
  eyebrow,
  title,
  description,
  panels,
  className = "",
}: PlatformShowcaseProps) {
  return (
    <section className={`platform-showcase ${className}`.trim()}>
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
            <Card
              className={`platform-showcase__panel platform-showcase__panel--${panel.size ?? "standard"} platform-showcase__panel--tone-${panel.tone ?? "default"} reveal`}
              key={panel.title}
            >
              <div className="platform-showcase__visual">
                <Mini />
              </div>
              <div className="platform-showcase__content">
                <span className="feature-card__kicker">{panel.caption}</span>
                <h3>{panel.title}</h3>
                {panel.description ? <p>{panel.description}</p> : null}
                {panel.stats.length ? (
                  <div className="platform-showcase__stats">
                    {panel.stats.map((stat) => (
                      <div key={stat.label}>
                        <strong>{stat.value}</strong>
                        <span>{stat.label}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
