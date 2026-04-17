export function ReadinessScreen() {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const score = 72;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="readiness-screen">
      <div className="readiness-screen__eyebrow">READINESS · 06:42</div>
      <h3 className="readiness-screen__title">Today looks light.</h3>

      <div className="readiness-screen__ring-wrap">
        <svg aria-hidden="true" viewBox="0 0 110 110">
          <circle
            cx="55"
            cy="55"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="6"
          />
          <circle
            cx="55"
            cy="55"
            r={radius}
            fill="none"
            stroke="#2A66FF"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            strokeWidth="6"
            transform="rotate(-90 55 55)"
          />
        </svg>
        <div className="readiness-screen__score">
          <div className="readiness-screen__score-number">{score}</div>
          <div className="readiness-screen__score-label">ready</div>
        </div>
      </div>

      <div className="readiness-screen__rows">
        <div className="readiness-screen__row">
          <span>Sleep</span>
          <span className="readiness-screen__value readiness-screen__value--low">5h 47m</span>
        </div>
        <div className="readiness-screen__row">
          <span>HRV</span>
          <span className="readiness-screen__value readiness-screen__value--warn">−11%</span>
        </div>
        <div className="readiness-screen__row">
          <span>Planned load</span>
          <span className="readiness-screen__value">4 / 5 RPE</span>
        </div>
      </div>

      <div className="readiness-screen__nudge">
        <span className="readiness-screen__nudge-label">Cypher</span>
        <span>Pull intensity. Keep the session.</span>
      </div>
    </div>
  );
}
