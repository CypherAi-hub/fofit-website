import { cypherMemoryChecks, cypherTranscriptTurns } from "../../data/homepage";
import { Revealer } from "../motion/Revealer";

export function CypherTranscript() {
  return (
    <section className="lp-section lp-transcript" id="cypher">
      <div className="container lp-transcript__shell">
        <Revealer className="lp-section-heading lp-transcript__copy">
          <span className="lp-kicker">Not a chatbot</span>
          <h2>Cypher is the memory layer between the plan and the week.</h2>
          <p>
            It does not just write workouts. It remembers the constraints, explains
            the adjustment, and asks before changing the session.
          </p>
          <div className="lp-transcript__checks" aria-label="Cypher memory checks">
            {cypherMemoryChecks.map((check) => (
              <span key={check}>{check}</span>
            ))}
          </div>
        </Revealer>

        <Revealer className="lp-transcript__panel" delay="1">
          <div className="lp-transcript__header">
            <span>Cypher memory trace</span>
            <strong>Today / Lower Strength</strong>
          </div>
          <div className="lp-transcript__turns">
            {cypherTranscriptTurns.map((turn) => (
              <article className={`lp-turn lp-turn--${turn.speaker}`} key={`${turn.label}-${turn.text}`}>
                <span className="lp-turn__label">{turn.label}</span>
                <p>{turn.text}</p>
              </article>
            ))}
          </div>
        </Revealer>
      </div>
    </section>
  );
}
