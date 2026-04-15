import { Card } from "../ui/Card";

const modules = [
  {
    title: "Accountability loops",
    description:
      "Personal streaks, check-ins, and small nudges that keep consistency from becoming a solo effort.",
  },
  {
    title: "Challenge systems",
    description:
      "Structured challenges tied to training goals, blocks, or monthly themes instead of random engagement gimmicks.",
  },
  {
    title: "Groups and shared progress",
    description:
      "Private circles, team structures, and visible momentum for people training toward something together.",
  },
];

export function CommunityPreview() {
  return (
    <div className="community-preview">
      <div className="community-preview__feed reveal">
        <div className="feed-card">
          <span>Weekly challenge</span>
          <strong>Four high-quality sessions. One shared leaderboard.</strong>
          <p>Built to reward consistency, execution quality, and recovery discipline.</p>
        </div>
        <div className="feed-stream">
          <div>
            <strong>Northside Strength</strong>
            <span>Shared 89% weekly completion</span>
          </div>
          <div>
            <strong>Coach review ready</strong>
            <span>3 plans queued for feedback</span>
          </div>
          <div>
            <strong>Recovery alert</strong>
            <span>Two athletes moved to lower-stress sessions</span>
          </div>
        </div>
      </div>
      <div className="community-preview__grid">
        {modules.map((module) => (
          <Card className="feature-card reveal" key={module.title}>
            <h3>{module.title}</h3>
            <p>{module.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
