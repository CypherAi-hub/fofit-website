import { ChapterIntro } from "./ChapterIntro";
import { FigureLabel } from "./FigureLabel";
import type { TranscriptTurn } from "../../data/editorial";

type CypherTranscriptProps = {
  turns: TranscriptTurn[];
};

export function CypherTranscript({ turns }: CypherTranscriptProps) {
  return (
    <section className="page-section editorial-section editorial-section--transcript">
      <div className="container">
        <div className="transcript-card reveal">
          <ChapterIntro
            index="02"
            label="Cypher"
            title={
              <>
                The part every app <em>fakes</em>.
              </>
            }
            description="Cypher remembers the athlete, the block, and the cost of the next call. Here is a real thread, rendered without marketing adjectives."
          />
          <div className="transcript-card__meta">
            <span aria-hidden="true" />
            <span>06:42 / Apr 16 / unedited</span>
            <span aria-hidden="true" />
          </div>
          <div className="transcript-thread" role="list">
            {turns.map((turn, index) => (
              <div
                className={`transcript-thread__turn transcript-thread__turn--${turn.speaker}`}
                key={`${turn.speaker}-${index}`}
                role="listitem"
              >
                {turn.speaker === "cypher" ? <span className="transcript-thread__speaker">Cypher</span> : null}
                <p>{turn.text}</p>
              </div>
            ))}
          </div>
          <FigureLabel
            caption="A real Cypher thread. The decisions above are specific because the product remembers context."
            className="transcript-card__label"
            label=""
          />
        </div>
      </div>
    </section>
  );
}
