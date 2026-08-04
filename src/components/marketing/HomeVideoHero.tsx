import { heroFigure, planFigure, transcriptFigure } from "../../data/editorial";
import { Button } from "../ui/Button";
import { DeviceFigure } from "./DeviceFigure";
import { EarlyAccessButton } from "./EarlyAccessButton";

const heroSignals = [
  {
    label: "Workout",
    detail: "Adaptive sessions around time, soreness, equipment, and goals",
  },
  {
    label: "Nutrition",
    detail: "Food direction that stays tied to the training block",
  },
  {
    label: "Teams",
    detail: "Coach-ready workflow for groups, teams, and athletes",
  },
] as const;

export function HomeVideoHero() {
  return (
    <section className="home-video-hero home-video-hero--product">
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

      <div className="container home-video-hero__inner home-video-hero__inner--product">
        <div className="home-video-hero__content reveal">
          <span className="home-video-hero__eyebrow">FOFIT TRAINING OS</span>
          <h1>
            Your training, nutrition, and progress — finally in one place.
          </h1>
          <p>
            FoFit helps lifters, student-athletes, and coaches turn messy weeks
            into clear training decisions. Cypher remembers the context, adjusts
            the next session, and keeps the next move obvious.
          </p>

          <div className="button-row home-video-hero__actions">
            <EarlyAccessButton size="lg">Join the founding 250</EarlyAccessButton>
            <Button href="#home-product-tour" size="lg" variant="secondary">
              See the app
            </Button>
          </div>

          <div className="home-video-hero__trust home-video-hero__trust--clean" aria-label="FoFit early access status">
            <span className="home-video-hero__pulse" aria-hidden="true" />
            <span>Early access is open</span>
            <span className="home-video-hero__divider" aria-hidden="true" />
            <span>$12.99/mo founding rate locked for early members</span>
          </div>
        </div>

        <div className="home-hero-product reveal reveal--delay-2" aria-label="FoFit app preview">
          <DeviceFigure
            asset={planFigure}
            className="home-hero-product__phone home-hero-product__phone--back"
          />
          <DeviceFigure
            asset={heroFigure}
            className="home-hero-product__phone home-hero-product__phone--main"
          />
          <DeviceFigure
            asset={transcriptFigure}
            className="home-hero-product__phone home-hero-product__phone--front"
          />

          <div className="home-hero-product__status" aria-label="FoFit core product areas">
            {heroSignals.map((signal) => (
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
