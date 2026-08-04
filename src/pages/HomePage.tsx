import { HomeVideoHero } from "../components/marketing/HomeVideoHero";
import { DeviceFigure } from "../components/marketing/DeviceFigure";
import { EarlyAccessButton } from "../components/marketing/EarlyAccessButton";
import { PricingPreview } from "../components/marketing/PricingPreview";
import { Button } from "../components/ui/Button";
import { PageMeta } from "../components/layout/PageMeta";
import { heroFigure, nutritionFigure, planFigure, transcriptFigure } from "../data/editorial";

const productPillars = [
  {
    label: "01",
    title: "Plan the week",
    description:
      "FoFit keeps the next session connected to your schedule, equipment, soreness, goals, and role.",
  },
  {
    label: "02",
    title: "Train with Cypher",
    description:
      "Cypher turns the plan into one clear decision at a time instead of dumping a giant workout wall on you.",
  },
  {
    label: "03",
    title: "Close the loop",
    description:
      "Workout notes, nutrition direction, and progress signals feed the next call instead of living in separate apps.",
  },
] as const;

const productTour = [
  {
    eyebrow: "Today’s plan",
    title: "Know what to do when you open the app.",
    description:
      "The home screen should answer the only question that matters before training: what am I doing today, and why?",
    asset: planFigure,
  },
  {
    eyebrow: "Live training",
    title: "Log the workout without fighting the screen.",
    description:
      "Sets, swaps, and notes stay focused around the active session so the app feels like a training tool, not homework.",
    asset: heroFigure,
  },
  {
    eyebrow: "Cypher memory",
    title: "Adjust when the week gets messy.",
    description:
      "When sleep, knee pain, class, work, or practice changes the day, Cypher helps adjust the call without throwing away the whole block.",
    asset: transcriptFigure,
  },
  {
    eyebrow: "Nutrition",
    title: "Food guidance that actually belongs with training.",
    description:
      "Macros, meals, and food-photo analysis should support the training block instead of feeling like a disconnected calorie app.",
    asset: nutritionFigure,
  },
] as const;

const audienceCards = [
  {
    role: "Lifters",
    copy: "A cleaner way to build sessions, track progress, and keep momentum without needing a coach every day.",
    cta: "Join as lifter",
    initialRole: "lifter" as const,
  },
  {
    role: "Student-athletes",
    copy: "Training that respects practice, class, soreness, travel, and the pressure of staying ready in-season.",
    cta: "Join as athlete",
    initialRole: "athlete" as const,
  },
  {
    role: "Coaches",
    copy: "A path toward programming, monitoring, and supporting athletes without spreadsheet chaos.",
    cta: "Join as coach",
    initialRole: "coach" as const,
  },
] as const;

const cypherLoop = [
  "Reads the week before it writes the workout",
  "Suggests swaps when time, soreness, or equipment changes",
  "Remembers what happened so the next session is smarter",
] as const;

export function HomePage() {
  return (
    <>
      <PageMeta
        description="FoFit is a training operating system for lifters, student-athletes, and coaches. Plan workouts, train with Cypher, connect nutrition, and track progress in one place."
        title="FoFit | Training, nutrition, and progress in one app"
      />
      <HomeVideoHero />

      <section className="home-redesign-section home-redesign-section--tight">
        <div className="container home-proof-strip reveal">
          <span>Built for messy real weeks</span>
          <span>Workout logging + Cypher guidance</span>
          <span>Nutrition tied to training</span>
          <span>Coach and team path</span>
        </div>
      </section>

      <section className="home-redesign-section">
        <div className="container home-product-pillars">
          <div className="home-redesign-heading reveal">
            <span>THE SIMPLE VERSION</span>
            <h2>FoFit is the command center for the work around the workout.</h2>
            <p>
              Most fitness apps only track what already happened. FoFit is being
              built to help decide what should happen next — training, nutrition,
              recovery, and coaching context in one loop.
            </p>
          </div>

          <div className="home-product-pillars__grid">
            {productPillars.map((pillar) => (
              <article className="home-product-pillar reveal" key={pillar.title}>
                <span>{pillar.label}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-redesign-section home-app-tour" id="home-product-tour">
        <div className="container">
          <div className="home-redesign-heading home-redesign-heading--center reveal">
            <span>REAL APP SURFACES</span>
            <h2>Show the product fast. Then let people choose their path.</h2>
            <p>
              The site should stop burying the app behind a long manifesto. Put
              the core screens up front and explain the value in plain language.
            </p>
          </div>

          <div className="home-app-tour__grid">
            {productTour.map((item, index) => (
              <article className="home-app-card reveal" key={item.title}>
                <div className="home-app-card__copy">
                  <span>{item.eyebrow}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <DeviceFigure
                  asset={item.asset}
                  className={`home-app-card__figure home-app-card__figure--${index + 1}`}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-redesign-section home-cypher-panel">
        <div className="container home-cypher-panel__inner">
          <div className="home-redesign-heading reveal">
            <span>CYPHER</span>
            <h2>Not a random workout generator. A memory layer for training.</h2>
            <p>
              Cypher should feel like the person who already knows your block,
              constraints, and last session — then gives you the next best move.
            </p>
            <div className="button-row">
              <EarlyAccessButton size="lg">Try Cypher early</EarlyAccessButton>
              <Button to="/product" size="lg" variant="secondary">
                Product details
              </Button>
            </div>
          </div>

          <div className="home-cypher-loop reveal reveal--delay-2">
            {cypherLoop.map((item, index) => (
              <div className="home-cypher-loop__item" key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-redesign-section home-audience">
        <div className="container">
          <div className="home-redesign-heading home-redesign-heading--center reveal">
            <span>WHO IT IS FOR</span>
            <h2>One system, three clear entry points.</h2>
            <p>
              The site should make the visitor see themselves quickly. No guessing,
              no scrolling through five disconnected pages before joining.
            </p>
          </div>

          <div className="home-audience__grid">
            {audienceCards.map((card) => (
              <article className="home-audience-card reveal" key={card.role}>
                <h3>{card.role}</h3>
                <p>{card.copy}</p>
                <EarlyAccessButton initialRole={card.initialRole} variant="secondary">
                  {card.cta}
                </EarlyAccessButton>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-redesign-section home-pricing-redesign">
        <div className="container home-pricing-redesign__inner">
          <div className="home-redesign-heading reveal">
            <span>EARLY ACCESS</span>
            <h2>$12.99/mo founding rate for the people who get in early.</h2>
            <p>
              Start free, then move to Premium when you want Cypher, deeper
              planning, training-linked nutrition, and the full FoFit system.
            </p>
          </div>
          <PricingPreview className="pricing-preview--editorial home-pricing-redesign__cards" />
        </div>
      </section>

      <section className="home-final-redesign">
        <div className="container home-final-redesign__inner reveal">
          <span>FOFIT</span>
          <h2>Stop making people decode the product.</h2>
          <p>
            Join the founding 250 and help shape the training operating system
            built for lifters, athletes, and coaches.
          </p>
          <EarlyAccessButton size="lg">Join the founding 250 →</EarlyAccessButton>
        </div>
      </section>
    </>
  );
}
