const memoryCards = [
  {
    label: "Memory",
    title: "Knee pain on squats",
    detail: "Logged last Tuesday. Cypher avoids heavy knee-dominant work today.",
  },
  {
    label: "Schedule",
    title: "42 minutes available",
    detail: "Session compresses without deleting the main lift.",
  },
  {
    label: "Fuel",
    title: "Protein behind target",
    detail: "Post-lift meal recommendation shifts higher protein.",
  },
] as const;

export function LandingHeroSystem() {
  return (
    <div className="lp-system" aria-label="FoFit product system preview">
      <div className="lp-system__phone">
        <div className="lp-system__phone-top">
          <span>FoFit</span>
          <strong>Today</strong>
        </div>

        <div className="lp-system__score">
          <span>Readiness</span>
          <strong>82</strong>
          <small>Volume adjusted / standards kept</small>
        </div>

        <div className="lp-system__workout">
          <span>Active session</span>
          <strong>Lower Strength</strong>
          <p>Trap bar deadlift / split squat swap / posterior chain finish</p>
        </div>

        <div className="lp-system__chat">
          <p>Cypher</p>
          <span>
            Because your knee flared on squats last week, I shifted today's main
            pattern. Approve?
          </span>
        </div>
      </div>

      <div className="lp-system__memory-stack" aria-hidden="true">
        {memoryCards.map((card, index) => (
          <article className={`lp-system__memory-card lp-system__memory-card--${index + 1}`} key={card.title}>
            <span>{card.label}</span>
            <strong>{card.title}</strong>
            <p>{card.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
