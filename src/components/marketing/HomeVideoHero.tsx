import { Button } from "../ui/Button";
import { EarlyAccessButton } from "./EarlyAccessButton";

const ecosystemSignals = [
  { label: "Phone", detail: "Cypher brief before practice" },
  { label: "Watch", detail: "Log sets without carrying the phone" },
  { label: "Teams", detail: "D2 / D3 rollout path" },
] as const;

export function HomeVideoHero() {
  return (
    <section className="home-video-hero">
      <video
        aria-hidden="true"
        autoPlay
        className="home-video-hero__media home-video-hero__video"
        loop
        muted
        playsInline
        poster="/hero-poster.jpg"
        preload="metadata"
      >
        <source src="/hero.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"' />
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <img
        alt=""
        aria-hidden="true"
        className="home-video-hero__media home-video-hero__poster"
        src="/hero-poster.jpg"
      />
      <div className="home-video-hero__shade" />

      <div className="container home-video-hero__inner">
        <div className="home-video-hero__content reveal">
          <span className="home-video-hero__eyebrow">TRAIN WITH STRUCTURE</span>
          <h1>
            The training platform that <em>remembers</em> you.
          </h1>
          <p>
            For lifters, athletes, and coaches who want training that actually
            fits the real week. Cypher remembers the context, adapts the next
            session, and shows up before you do.
          </p>

          <div className="button-row home-video-hero__actions">
            <EarlyAccessButton size="lg">Join the founding 250</EarlyAccessButton>
            <Button href="#three-paths" size="lg" variant="secondary">
              Choose your path
            </Button>
          </div>

          <div className="home-video-hero__trust" aria-label="Founding membership terms">
            <span className="home-video-hero__pulse" aria-hidden="true" />
            <span>Founding rate locked at $12.99/mo for life</span>
            <span className="home-video-hero__divider" aria-hidden="true" />
            <span>250 spots total</span>
          </div>

          <div className="home-video-hero__ecosystem" aria-label="FoFit device and team surfaces">
            {ecosystemSignals.map((signal) => (
              <span key={signal.label}>
                <strong>{signal.label}</strong>
                {signal.detail}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
