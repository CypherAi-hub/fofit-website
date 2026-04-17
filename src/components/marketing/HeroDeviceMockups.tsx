export function HeroDeviceMockups() {
  return (
    <div className="device-showcase">
      <article className="device device--left">
        <header className="device__header">
          <span>Today&apos;s plan</span>
          <span>Week 8</span>
        </header>
        <div className="device__body">
          <p className="device__eyebrow">Planning engine</p>
          <p className="device__title">Upper body power</p>
          <div className="device__week">
            <span className="device__week-pill device__week-pill--filled">Mon</span>
            <span className="device__week-pill">Tue</span>
            <span className="device__week-pill device__week-pill--filled">Wed</span>
            <span className="device__week-pill">Thu</span>
            <span className="device__week-pill device__week-pill--filled">Fri</span>
          </div>
          <div className="device__rows">
            <div>
              <span>Target</span>
              <strong>4 x 6-8</strong>
            </div>
            <div>
              <span>Focus</span>
              <strong>Chest + shoulders</strong>
            </div>
            <div>
              <span>Constraint</span>
              <strong>55 minutes</strong>
            </div>
          </div>
        </div>
      </article>
      <article className="device device--focus">
        <header className="device__header">
          <span>Cypher AI</span>
          <span>Live</span>
        </header>
        <div className="device__signal">
          <span className="device__signal-dot" />
          Recovery lower than usual. Adjusting volume.
        </div>
        <div className="device__chat">
          <div className="chat-bubble chat-bubble--coach">
            Your push volume is trending up. Move bench up five pounds if last
            week stayed inside target effort.
          </div>
          <div className="chat-bubble chat-bubble--user">
            Cardio today or keep recovery high?
          </div>
          <div className="chat-bubble chat-bubble--coach">
            Keep recovery high. The better call is a clean lift plus quality
            sleep tonight.
          </div>
        </div>
        <div className="device__prompt">Ask about form, volume, or recovery...</div>
      </article>
      <article className="device device--right">
        <header className="device__header">
          <span>Progress</span>
          <span>Week 8</span>
        </header>
        <div className="device__body">
          <p className="device__eyebrow">Progress intelligence</p>
          <p className="device__title">Bench up 15% this month</p>
          <div className="device__stats">
            <div>
              <strong>24</strong>
              <span>Sessions</span>
            </div>
            <div>
              <strong>+18%</strong>
              <span>Strength</span>
            </div>
            <div>
              <strong>12</strong>
              <span>PRs</span>
            </div>
          </div>
          <div className="mini-chart">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="coverage-list">
            <div>
              <label>Chest</label>
              <div><i style={{ width: "84%" }} /></div>
            </div>
            <div>
              <label>Back</label>
              <div><i style={{ width: "71%" }} /></div>
            </div>
            <div>
              <label>Legs</label>
              <div><i style={{ width: "58%" }} /></div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
