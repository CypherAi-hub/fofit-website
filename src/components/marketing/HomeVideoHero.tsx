import { heroTrustItems } from "../../data/homepage";
import { Button } from "../ui/Button";
import { EarlyAccessButton } from "./EarlyAccessButton";
import { LandingHeroSystem } from "./LandingHeroSystem";
import { Revealer } from "../motion/Revealer";

export function HomeVideoHero() {
  return (
    <section className="lp-hero">
      <div className="lp-hero__ambient" aria-hidden="true" />
      <video
        aria-hidden="true"
        autoPlay
        className="lp-hero__video"
        loop
        muted
        playsInline
        poster="/hero-poster.jpg"
        preload="metadata"
      >
        <source src="/hero.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"' />
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div className="container lp-hero__inner">
        <Revealer className="lp-hero__copy">
          <div className="lp-kicker">For lifters, athletes, and coaches</div>
          <h1 className="lp-hero__title">
            Train <em>honestly.</em>
            <span>Cypher remembers the week your plan forgot.</span>
          </h1>
          <p className="lp-hero__subcopy">
            FoFit is a training platform built around real life: soreness,
            schedule changes, equipment, nutrition, progress, and team context.
            Cypher keeps the plan moving without pretending your week was perfect.
          </p>

          <div className="lp-hero__actions">
            <EarlyAccessButton size="lg">Join the founding waitlist</EarlyAccessButton>
            <Button href="#cypher-system" size="lg" variant="secondary">
              Watch the system work
            </Button>
          </div>

          <div className="lp-hero__trust" aria-label="FoFit launch facts">
            {heroTrustItems.map((item) => (
              <span key={item}>
                {item}
              </span>
            ))}
          </div>
        </Revealer>

        <Revealer className="lp-hero__product" delay="1">
          <LandingHeroSystem />
        </Revealer>
      </div>
    </section>
  );
}
