export function AIWorkforce() {
  return (
    <section className="ai-workforce">
      <div className="ai-workforce__intro">
        <span className="eyebrow">Staff · 001 / 003</span>
        <h2 className="ai-workforce__headline">
          Three of our employees are <em>AI</em>. Here they are.
        </h2>
        <p className="ai-workforce__sub">
          FoFit runs on a small team and a working AI workforce. Each one
          sends real emails, from real addresses, every day.
        </p>
      </div>

      <div className="ai-workforce__grid">

        {/* CYPHER */}
        <article className="staff-card staff-card--cypher">
          <div className="staff-card__bar">
            <span><span className="staff-card__dot" />Staff · No. 001</span>
            <span>AI</span>
          </div>
          <div className="staff-card__glyph">
            <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" aria-hidden="true">
              <path d="M 18,100 Q 60,38 102,100" opacity="0.9" />
              <path d="M 24,100 Q 60,50 96,100" opacity="0.75" />
              <path d="M 30,100 Q 60,60 90,100" opacity="0.6" />
              <path d="M 36,100 Q 60,72 84,100" opacity="0.45" />
              <path d="M 42,100 Q 60,84 78,100" opacity="0.3" />
              <line x1="60" y1="34" x2="60" y2="105" strokeDasharray="1.5,3" opacity="0.5" />
              <circle cx="60" cy="34" r="2.5" fill="currentColor" />
              <circle cx="60" cy="34" r="6" opacity="0.3" />
            </svg>
          </div>
          <div className="staff-card__body">
            <div className="staff-card__name">Cypher</div>
            <div className="staff-card__role">AI Chief of Staff</div>
          </div>
          <div className="staff-card__foot">
            <span>Est. MMXXV</span>
            <span>FoFit.app</span>
          </div>
        </article>

        {/* CASEY */}
        <article className="staff-card staff-card--casey">
          <div className="staff-card__bar">
            <span><span className="staff-card__dot" />Staff · No. 002</span>
            <span>AI</span>
          </div>
          <div className="staff-card__glyph">
            <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="0.9" aria-hidden="true">
              <circle cx="60" cy="60" r="52" opacity="0.25" />
              <circle cx="60" cy="60" r="40" opacity="0.45" />
              <circle cx="60" cy="60" r="28" opacity="0.7" />
              <circle cx="60" cy="60" r="16" opacity="0.9" />
              <circle cx="60" cy="60" r="3" fill="currentColor" />
              <line x1="6" y1="60" x2="20" y2="60" opacity="0.4" />
              <line x1="100" y1="60" x2="114" y2="60" opacity="0.4" />
              <line x1="60" y1="6" x2="60" y2="20" opacity="0.4" />
              <line x1="60" y1="100" x2="60" y2="114" opacity="0.4" />
            </svg>
          </div>
          <div className="staff-card__body">
            <div className="staff-card__name">Casey</div>
            <div className="staff-card__role">AI Onboarding Concierge</div>
          </div>
          <div className="staff-card__foot">
            <span>Est. MMXXV</span>
            <span>FoFit.app</span>
          </div>
        </article>

        {/* AVERY */}
        <article className="staff-card staff-card--avery">
          <div className="staff-card__bar">
            <span><span className="staff-card__dot" />Staff · No. 003</span>
            <span>AI</span>
          </div>
          <div className="staff-card__glyph">
            <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="102" x2="96" y2="24" opacity="0.9" />
              <line x1="30" y1="102" x2="96" y2="36" opacity="0.65" />
              <line x1="42" y1="102" x2="96" y2="48" opacity="0.45" />
              <line x1="54" y1="102" x2="96" y2="60" opacity="0.28" />
              <path d="M 84,22 L 98,22 L 98,36" strokeWidth="1" />
              <circle cx="98" cy="22" r="2.5" fill="currentColor" />
              <circle cx="98" cy="22" r="6" opacity="0.3" />
              <line x1="18" y1="108" x2="70" y2="108" opacity="0.2" strokeDasharray="2,3" />
            </svg>
          </div>
          <div className="staff-card__body">
            <div className="staff-card__name">Avery</div>
            <div className="staff-card__role">AI Waitlist Concierge</div>
          </div>
          <div className="staff-card__foot">
            <span>Est. MMXXV</span>
            <span>FoFit.app</span>
          </div>
        </article>

      </div>

      <div className="ai-workforce__founder">
        <span>Built in St. Louis. <em>Trained at Maryville.</em> — Kenan</span>
      </div>
    </section>
  );
}
