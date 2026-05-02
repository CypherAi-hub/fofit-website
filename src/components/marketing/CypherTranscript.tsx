import { ChapterIntro } from "./ChapterIntro";

const cypherNotes = [
  "Adjusts today without losing the training block.",
  "Keeps class, practice, soreness, and travel attached to the plan.",
  "Turns history into the next useful decision.",
] as const;

export function CypherTranscript() {
  return (
    <section className="page-section editorial-section editorial-section--transcript" id="cypher">
      <div className="container">
        <div className="cypher-action reveal">
          <div className="cypher-action__copy">
            <ChapterIntro
              index="02"
              label="Cypher"
              title={
                <>
                  The part every app <em>fakes</em>.
                </>
              }
              description="Cypher remembers the athlete, the block, and the cost of the next call. It is not a dynamic spreadsheet. It is the right note before a lift, written with the week in view."
            />
            <div className="cypher-action__ledger">
              {cypherNotes.map((note) => (
                <span key={note}>{note}</span>
              ))}
            </div>
          </div>

          <figure className="cypher-action__phone" aria-label="Cypher coaching interface in the FoFit app">
            <video
              aria-hidden="true"
              autoPlay
              className="cypher-action__ambient"
              loop
              muted
              playsInline
              poster="/cypher-poster.jpg"
              preload="metadata"
              src="/cypher-loop.mp4"
            />
            <div className="cypher-action__shell">
              <div className="cypher-action__screen">
                <div className="cypher-action__header">
                  <span>Cypher</span>
                  <strong>AI Coach</strong>
                </div>
                <div className="cypher-action__bubble cypher-action__bubble--athlete">
                  Good morning. Ready to attack today?
                </div>
                <div className="cypher-action__card">
                  <span>Upper Body Strength</span>
                  <strong>45 min · 420 kcal · Medium</strong>
                  <button type="button">View plan</button>
                </div>
                <div className="cypher-action__bubble cypher-action__bubble--cypher">
                  Push volume is trending up. Move bench up five pounds today
                  — last week&apos;s RPE held at 7.
                </div>
                <div className="cypher-action__chips">
                  <button type="button">Let&apos;s do it</button>
                  <button type="button">Adjust intensity</button>
                  <button type="button">Not today</button>
                </div>
              </div>
            </div>
            <figcaption>Cypher adjusts the next move while the athlete is still in the gym.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
