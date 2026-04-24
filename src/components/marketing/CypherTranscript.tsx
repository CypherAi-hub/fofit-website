import { ChapterIntro } from "./ChapterIntro";
import { DeviceFigure } from "./DeviceFigure";
import { realAppScreens } from "../../data/appScreens";

const cypherBriefFigure = {
  src: realAppScreens.cypherBrief.src,
  alt: realAppScreens.cypherBrief.alt,
  label: "",
  caption: "The Cypher Brief that shows up in the app every morning. Real context. Real session priorities. Real voice.",
  frame: "bare" as const,
  tilt: "flat" as const,
};

export function CypherTranscript() {
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
          <DeviceFigure asset={cypherBriefFigure} className="transcript-card__device" />
        </div>
      </div>
    </section>
  );
}
