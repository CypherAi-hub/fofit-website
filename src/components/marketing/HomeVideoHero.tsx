import { Button } from "../ui/Button";
import { EarlyAccessButton } from "./EarlyAccessButton";

const foundingLimit = 500;
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
          <span className="home-video-hero__eyebrow">FOR STUDENT ATHLETES</span>
          <h1>
            The training platform that <em>remembers</em> the athlete.
          </h1>
          <p>
            Cypher adapts the next session, keeps progress attached to the real
            week, and shows up before practice. Built for student athletes
            training around class, travel, and a head coach&apos;s schedule.
          </p>

          <div className="button-row home-video-hero__actions">
            <EarlyAccessButton size="lg">Join the founding 500</EarlyAccessButton>
            <Button href="#cypher" size="lg" variant="secondary">
              See Cypher in action
            </Button>
          </div>

          <div className="home-video-hero__trust" aria-label="Founding membership progress">
            <span className="home-video-hero__pulse" aria-hidden="true" />
            <span>
              <strong>{foundingLimit}</strong> founding spots
            </span>
            <span className="home-video-hero__divider" aria-hidden="true" />
            <span>founding rate locked at $12.99/mo for life</span>
          </div>

          <div className="home-video-hero__proof">
            <div className="home-video-hero__avatars" aria-hidden="true">
              <span>ML</span>
              <span>D3</span>
              <span>AT</span>
            </div>
            <span>Built with student athletes from Maryville and 4 other D2 / D3 programs</span>
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
