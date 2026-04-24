import { ChapterIntro } from "./ChapterIntro";

const FOUNDER_LINKEDIN_URL = "https://www.linkedin.com/in/kenan-larry-993350332";
const FOUNDER_INSTAGRAM_URL = "https://www.instagram.com/jusssskenan";

export function FounderNote() {
  return (
    <section className="page-section editorial-section editorial-section--founder">
      <div className="container">
        <ChapterIntro
          description="FoFit is built by an athlete, not a studio. The product is shaped by training around class, practice, and travel — the same reality it exists to serve."
          index="06"
          label="Built by an athlete"
          title={
            <>
              A student athlete's product, <em>not</em> a pitch deck.
            </>
          }
        />
        <div className="founder-note founder-note--editorial reveal">
          <div className="founder-note__body">
            <p className="founder-note__lede">
              Kenan Larry Jr. — student athlete at Maryville, and the founder
              writing FoFit from inside the problem. The product is what a
              serious training partner would look like if it actually
              understood the week you're having.
            </p>
            <p className="founder-note__meta">
              St. Louis roots. Built with AI agents as teammates, not
              replacements.
            </p>
          </div>
          <div className="founder-note__links">
            <a
              className="founder-note__link"
              href={FOUNDER_LINKEDIN_URL}
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn →
            </a>
            <a
              className="founder-note__link"
              href={FOUNDER_INSTAGRAM_URL}
              rel="noreferrer"
              target="_blank"
            >
              Instagram →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
