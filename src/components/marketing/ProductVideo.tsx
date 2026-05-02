import { ChapterIntro } from "./ChapterIntro";

const weekRows = [
  ["Mon", "Upper strength", "Bench +5 lb", "Ready"],
  ["Tue", "Practice travel", "Volume reduced", "Protected"],
  ["Wed", "Lower power", "Keep intensity", "On plan"],
  ["Thu", "Class-heavy day", "35 min session", "Compressed"],
] as const;

const watchStats = [
  ["Set", "3 / 5"],
  ["Rest", "01:10"],
  ["RPE", "7"],
] as const;

export function ProductVideo() {
  return (
    <section className="page-section editorial-section editorial-section--walkthrough" id="walkthrough">
      <div className="container">
        <div className="product-proof reveal">
          <ChapterIntro
            centered
            description="A code-native look at the surfaces FoFit has to connect: the weekly plan, the live session, and a watch-level training moment for the path you chose."
            index="02"
            label="Walkthrough"
            title={
              <>
                Thirty seconds with the <em>product</em>.
              </>
            }
          />

          <div className="product-proof__stage">
            <video
              aria-hidden="true"
              autoPlay
              className="product-proof__ambient"
              loop
              muted
              playsInline
              poster="/product-devices-poster.jpg"
              preload="metadata"
              src="/product-devices.mp4"
            />
            <div className="product-proof__laptop" aria-label="FoFit weekly planning surface">
              <div className="product-proof__topbar">
                <span>FoFit OS</span>
                <span>Week 12 · Training context</span>
              </div>
              <div className="product-proof__grid">
                <div className="product-proof__brief">
                  <span className="product-proof__label">Cypher brief</span>
                  <h3>Push volume is trending up.</h3>
                  <p>
                    Move bench up five pounds today. Last week&apos;s RPE held
                    at 7 and practice load is light.
                  </p>
                </div>
                <div className="product-proof__week">
                  {weekRows.map(([day, title, change, status]) => (
                    <div className="product-proof__row" key={day}>
                      <span>{day}</span>
                      <strong>{title}</strong>
                      <em>{change}</em>
                      <small>{status}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="product-proof__phone" aria-label="FoFit live session adjustment">
              <div className="product-proof__phone-header">
                <span>Today</span>
                <strong>Upper Body Strength</strong>
              </div>
              <div className="product-proof__set-card">
                <span>Bench press</span>
                <strong>155 lb · 5 reps</strong>
                <p>Cypher raised load after two clean sets.</p>
              </div>
              <button type="button">Log set</button>
            </div>

            <div className="product-proof__watch" aria-label="FoFit watch surface">
              <span>FoFit Watch</span>
              {watchStats.map(([label, value]) => (
                <div key={label}>
                  <small>{label}</small>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
