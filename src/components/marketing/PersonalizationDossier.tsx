import type { DossierFact } from "../../data/editorial";
import { ChapterIntro } from "./ChapterIntro";

type PersonalizationDossierProps = {
  facts: DossierFact[];
};

export function PersonalizationDossier({ facts }: PersonalizationDossierProps) {
  return (
    <section className="page-section editorial-section">
      <div className="container">
        <div className="dossier-section">
          <ChapterIntro
            index="05"
            label="Memory"
            title={
              <>
                What Cypher <em>remembers</em>.
              </>
            }
            description="Memory is the difference between a fitness chatbot and a training partner. Cypher carries the pattern forward instead of starting from zero."
          />
          <div className="dossier-card reveal">
            <div className="dossier-card__top">
              <span className="dossier-card__eyebrow">Anonymized member record</span>
              <p>This record is private, exportable, and deletable. The point is continuity, not surveillance.</p>
            </div>
            <dl className="dossier-card__grid">
              {facts.map((fact) => (
                <div className="dossier-card__item" key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
