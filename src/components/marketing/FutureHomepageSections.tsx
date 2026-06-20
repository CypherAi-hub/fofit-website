import { useState } from "react";
import { Link } from "react-router-dom";
import {
  communityPreviewCards,
  communitySurfaceRows,
  cypherMemorySignals,
  futureAssets,
  futureHeroTrust,
  futurePathCards,
  futurePricingPlans,
  nutritionCountryRows,
  nutritionLibraryStats,
  nutritionSignals,
  nutritionWorkflowRows,
  productPillars,
  systemTabs,
} from "../../data/future-homepage";
import { insightArticles } from "../../data/insights";
import { usePointerGlow } from "../../lib/usePointerGlow";
import { Revealer } from "../motion/Revealer";
import { Button } from "../ui/Button";
import { EarlyAccessButton } from "./EarlyAccessButton";

const liveMediaCards = [
  {
    label: "Training atmosphere",
    title: "The work should move.",
    detail: "Video carries sweat, pace, and the reason the product exists.",
    type: "video",
    src: "/hero.mp4",
    poster: "/hero-poster.jpg",
  },
  {
    label: "Real app UI",
    title: "Show the product, not a promise.",
    detail: "The app-device film keeps the actual FoFit surfaces in motion.",
    type: "video",
    src: "/product-devices.mp4",
    poster: "/product-devices-poster.jpg",
  },
  {
    label: "Fuel prep",
    title: "Nutrition needs texture.",
    detail: "Food stays cultural, practical, and connected to training.",
    type: "image",
    image: futureAssets.generated.fuelPrepGlobal,
  },
  {
    label: "Coach check-in",
    title: "Trust needs a human moment.",
    detail: "The coach path feels stronger when the site shows actual guidance energy.",
    type: "image",
    image: futureAssets.generated.coachAthleteCheckin,
  },
] as const;

export function HeroFutureOfFitness() {
  return (
    <section className="future-hero editorial-hero">
      <div className="container editorial-goal-band" aria-label="FoFit goals">
        <div>
          <span>START WHERE YOU ARE</span>
          <h2>Pick the lane FoFit should personalize first.</h2>
          <p>Training, food, Cypher, and community stay connected after that.</p>
        </div>
        <div className="editorial-goal-band__choices">
          <a href="#training">Build strength</a>
          <a href="#nutrition">Eat smarter</a>
          <a href="#cypher">Ask Cypher</a>
          <a href="#community">Find community</a>
        </div>
      </div>

      <div className="container future-hero__inner editorial-hero__inner">
        <Revealer className="future-hero__copy">
          <h1>Training, food, Cypher, and community in one loop.</h1>
          <div className="editorial-hero__meta">
            FoFit founding access <span aria-hidden="true">•</span> Real product surfaces
          </div>
          <p>
            FoFit keeps the week connected: what you trained, what you ate,
            what changed, what Cypher remembers, and who is moving with you.
          </p>
          <div className="future-hero__actions">
            <EarlyAccessButton size="lg">Join founding 250</EarlyAccessButton>
            <a className="button button--secondary button--lg" href="#system-in-motion">
              Explore the product
            </a>
          </div>
          <div className="future-hero__trust" aria-label="FoFit launch focus">
            {futureHeroTrust.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </Revealer>

        <Revealer className="future-hero__visual editorial-product-hero" delay="1">
          <div className="editorial-product-hero__media-row">
            <video
              aria-label="FoFit training atmosphere video"
              autoPlay
              className="editorial-product-hero__video"
              loop
              muted
              playsInline
              poster="/hero-poster.jpg"
              preload="metadata"
            >
              <source src="/hero.mp4" type="video/mp4" />
            </video>
            <img
              alt={futureAssets.generated.communityCircuitLive.alt}
              className="editorial-product-hero__photo"
              src={futureAssets.generated.communityCircuitLive.src}
            />
          </div>
          <div className="editorial-product-hero__screens" aria-label="FoFit app preview">
            <img alt={futureAssets.app.simTrain.alt} src={futureAssets.app.simTrain.src} />
            <img alt={futureAssets.app.simCypher.alt} src={futureAssets.app.simCypher.src} />
            <img alt={futureAssets.app.simNutrition.alt} src={futureAssets.app.simNutrition.src} />
          </div>
        </Revealer>
      </div>
    </section>
  );
}

export function LiveMediaSection() {
  return (
    <section className="future-section future-live-media" aria-label="FoFit media system">
      <div className="container future-live-media__inner">
        <Revealer className="future-live-media__copy">
          <span className="lp-kicker">Media System</span>
          <h2>FoFit comes alive before anyone taps download.</h2>
          <p>
            Real app screenshots stay the proof. Motion and original support
            media give the brand pace, sweat, food, and human coaching energy.
          </p>
        </Revealer>

        <Revealer className="future-live-media__grid" delay="1">
          {liveMediaCards.map((card, index) => (
            <article
              className={`future-live-card future-live-card--${card.type} ${
                index === 0 ? "future-live-card--wide" : ""
              }`}
              key={card.label}
            >
              <div className="future-live-card__media">
                {card.type === "video" ? (
                  <video
                    aria-label={card.title}
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={card.poster}
                    preload="metadata"
                    src={card.src}
                  />
                ) : (
                  <img alt={card.image.alt} src={card.image.src} />
                )}
              </div>
              <div className="future-live-card__caption">
                <span>{card.label}</span>
                <h3>{card.title}</h3>
                <p>{card.detail}</p>
              </div>
            </article>
          ))}
        </Revealer>
      </div>
    </section>
  );
}

export function ProductPillars() {
  return (
    <section className="future-section future-pillars editorial-takeaways" id="training">
      <div className="container editorial-article-grid">
        <Revealer className="future-section__heading">
          <h2>What FoFit is actually built around.</h2>
          <p>
            The product should show its own spine: real app screens, real media,
            and a loop that connects the decisions people make every day.
          </p>
        </Revealer>
        <Revealer className="editorial-takeaways__list" delay="1">
          <ul>
            {productPillars.map((pillar) => (
              <li key={pillar.label}>
                <strong>{pillar.label}</strong>
                <span>{pillar.detail}</span>
              </li>
            ))}
            <li>
              <strong>Adaptive loop</strong>
              <span>
                The next recommendation should reflect the user&apos;s logged
                work, food, soreness, schedule, and preferences.
              </span>
            </li>
            <li>
              <strong>Product proof</strong>
              <span>
                FoFit needs to show real app surfaces first, with polished
                imagery supporting the product instead of replacing it.
              </span>
            </li>
          </ul>
        </Revealer>
      </div>
    </section>
  );
}

export function SystemInMotion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = systemTabs[activeIndex];

  return (
    <section className="future-section future-system-motion editorial-toc-section" id="system-in-motion">
      <div className="container future-system-motion__inner">
        <Revealer className="future-system-motion__copy editorial-toc">
          <h2>Inside the FoFit loop</h2>
          <p>
            FoFit should read like a complete coaching system, with each
            surface explaining how the next decision gets better.
          </p>
          <ol className="future-system-tabs" aria-label="FoFit product surfaces">
            {systemTabs.map((tab, index) => (
              <li key={tab.label}>
                <button
                  aria-pressed={index === activeIndex}
                  className={index === activeIndex ? "is-active" : ""}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                >
                  {tab.title}
                </button>
              </li>
            ))}
          </ol>
        </Revealer>

        <Revealer className="future-system-preview" delay="1">
          <div className={`future-system-preview__media future-system-preview__media--${active.treatment}`}>
            <img alt={active.image.alt} src={active.image.src} />
          </div>
          <div className="future-system-preview__caption">
            <span>{active.label}</span>
            <h3>{active.title}</h3>
            <p>{active.detail}</p>
          </div>
        </Revealer>
      </div>
    </section>
  );
}

export function CommunityPreviewSection() {
  return (
    <section className="future-section future-community" id="community">
      <div className="container future-community__inner">
        <Revealer className="future-community__copy">
          <span className="lp-kicker">Community</span>
          <h2>Fitness feels less lonely.</h2>
          <p>
            Join groups, follow verified coaches, share progress, ask questions,
            and find people training for the same thing — without toxic
            leaderboards or shame streaks.
          </p>
          <div className="future-community__points">
            <span>Groups</span>
            <span>Feed</span>
            <span>Reels</span>
            <span>Verified coaches</span>
          </div>
          <div className="future-community__feature-list" aria-label="Real FoFit community features">
            {communitySurfaceRows.map((row) => (
              <article key={row.label}>
                <strong>{row.label}</strong>
                <p>{row.detail}</p>
              </article>
            ))}
          </div>
        </Revealer>

        <Revealer className="future-community__gallery" delay="1">
          <article className="future-community-feature future-card">
            <div className="future-community-feature__backdrop" aria-hidden="true">
              <img alt="" src={futureAssets.generated.communityCircuitLive.src} />
            </div>
            <div className="future-community-feature__intro">
              <span>Featured community proof</span>
              <h3>Real product surfaces, not a single poster pretending to do everything.</h3>
              <p>
                The community story now leans on sharp screenshots first, with
                real FoFit imagery supporting the atmosphere instead of faking
                the interface.
              </p>
            </div>
            <div className="future-community-feature__media">
              <figure className="future-community-shot future-community-shot--primary">
                <img alt={futureAssets.app.simDiscoverCommunity.alt} src={futureAssets.app.simDiscoverCommunity.src} />
              </figure>
              <figure className="future-community-shot future-community-shot--secondary">
                <img alt={futureAssets.app.simCommunity.alt} src={futureAssets.app.simCommunity.src} />
              </figure>
            </div>
          </article>

          <div className="future-community__rail" aria-label="Community proof cards">
            {communityPreviewCards.map((card) => (
              <article
                className={`future-community-card future-card future-community-card--${card.tone}`}
                key={card.label}
              >
                <div className="future-community-card__eyebrow">{card.label}</div>
                <div className="future-community-card__media">
                  <img alt={card.image.alt} src={card.image.src} />
                </div>
                <p>{card.title}</p>
              </article>
            ))}
          </div>
        </Revealer>
      </div>
    </section>
  );
}

export function CypherMemorySection() {
  return (
    <section className="future-section future-cypher" id="cypher">
      <div className="container future-cypher__inner">
        <Revealer className="future-device-pair future-device-pair--with-scene">
          <img
            alt={futureAssets.generated.coachAthleteCheckin.alt}
            className="future-device-pair__scene"
            src={futureAssets.generated.coachAthleteCheckin.src}
          />
          <img
            alt={futureAssets.app.simTrain.alt}
            className="future-device-pair__phone future-device-pair__phone--back"
            src={futureAssets.app.simTrain.src}
          />
          <img
            alt={futureAssets.app.simCypher.alt}
            className="future-device-pair__phone future-device-pair__phone--front"
            src={futureAssets.app.simCypher.src}
          />
        </Revealer>

        <Revealer className="future-cypher__copy" delay="1">
          <span className="lp-kicker">Cypher</span>
          <h2>The coach that remembers the week.</h2>
          <p>
            Cypher adapts around soreness, class, practice, travel, nutrition,
            and consistency. The point is not a clever chatbot. The point is a
            plan that knows what changed.
          </p>
          <div className="future-signal-list">
            {cypherMemorySignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </Revealer>
      </div>
    </section>
  );
}

export function NutritionPreview() {
  return (
    <section className="future-section future-nutrition" id="nutrition">
      <div className="container future-nutrition__inner">
        <Revealer className="future-nutrition__copy">
          <span className="lp-kicker">Nutrition</span>
          <h2>Fuel the plan, not just the tracker.</h2>
          <p>
            Food logging, targets, body metrics, and Cypher nutrition insights
            keep fuel attached to the work you are actually doing.
          </p>
          <div className="future-signal-list">
            {nutritionSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </Revealer>

        <Revealer className="future-nutrition__visual" delay="1">
          <img
            alt={futureAssets.generated.fuelPrepGlobal.alt}
            className="future-nutrition__scene"
            src={futureAssets.generated.fuelPrepGlobal.src}
          />
          <img
            alt={futureAssets.app.simNutrition.alt}
            className="future-nutrition__phone future-nutrition__phone--front"
            src={futureAssets.app.simNutrition.src}
          />
          <img
            alt={futureAssets.app.fuelPlan.alt}
            className="future-nutrition__phone future-nutrition__phone--back"
            src={futureAssets.app.fuelPlan.src}
          />
        </Revealer>
      </div>

      <div className="container future-nutrition-library">
        <Revealer className="future-nutrition-library__intro">
          <span className="lp-kicker">Fuel Library</span>
          <h3>Food is not just a macro box.</h3>
          <p>
            The nutrition system has a real recipe catalog, country filters,
            staple food search, photo logging, repeat meals, and grocery flow.
            The point is to help people find food they will actually eat.
          </p>
        </Revealer>

        <Revealer className="future-nutrition-stats" delay="1">
          {nutritionLibraryStats.map((stat) => (
            <article className="future-card future-nutrition-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
              <p>{stat.detail}</p>
            </article>
          ))}
        </Revealer>

        <div className="future-nutrition-depth">
          <Revealer className="future-recipe-grid" delay="1">
            {nutritionCountryRows.map((recipe) => (
              <article className="future-recipe-card" key={`${recipe.country}-${recipe.title}`}>
                <img alt={recipe.image.alt} src={recipe.image.src} />
                <div>
                  <span>{recipe.country}</span>
                  <h4>{recipe.title}</h4>
                  <p>{recipe.detail}</p>
                </div>
              </article>
            ))}
          </Revealer>

          <Revealer className="future-nutrition-workflow" delay="2">
            <h4>How logging turns into coaching context</h4>
            <ul>
              {nutritionWorkflowRows.map((row) => (
                <li key={row.label}>
                  <strong>{row.label}</strong>
                  <span>{row.detail}</span>
                </li>
              ))}
            </ul>
          </Revealer>
        </div>
      </div>
    </section>
  );
}

export function FutureThreePathsSection() {
  const handlePointerMove = usePointerGlow();

  return (
    <section className="future-section future-paths" id="three-paths">
      <div className="container">
        <Revealer className="future-section__heading">
          <span className="lp-kicker">Members / Athletes / Coaches</span>
          <h2>Three paths into the same fitness OS.</h2>
          <p>
            FoFit stays personal without becoming fragmented. Members,
            athletes, and coaches start from different needs and stay inside
            one system.
          </p>
        </Revealer>
        <div className="future-paths__grid">
          {futurePathCards.map((card, index) => (
            <Revealer delay={String(Math.min(index, 3)) as "0" | "1" | "2" | "3"} key={card.label}>
              <article className="future-card future-path-card" onPointerMove={handlePointerMove}>
                <img alt={card.image.alt} className="future-path-card__media" src={card.image.src} />
                <span>{card.label}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <ul>
                  {card.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <EarlyAccessButton initialRole={card.role} variant="secondary">
                  {card.cta}
                </EarlyAccessButton>
              </article>
            </Revealer>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
    <section className="future-section future-pricing" id="pricing">
      <div className="container">
        <Revealer className="future-section__heading">
          <span className="lp-kicker">Pricing</span>
          <h2>Simple public pricing. Campus access stays clear.</h2>
          <p>
            Founding rates are locked while your subscription stays active.
            Maryville founding access is available for early campus testers.
          </p>
        </Revealer>
        <div className="future-pricing__grid">
          {futurePricingPlans.map((plan) => (
            <article
              className={`future-card future-pricing-card ${plan.featured ? "future-pricing-card--featured" : ""}`}
              key={plan.name}
            >
              <span>{plan.name}</span>
              <strong>{plan.price}</strong>
              <p>{plan.audience}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              {plan.name === "Starter" ? (
                <Button to="/signup" variant="secondary">
                  {plan.cta}
                </Button>
              ) : plan.name === "Coach / Teams" ? (
                <Button href="mailto:teams@fofit.app?subject=FoFit%20Coach%20and%20Teams%20access" variant="secondary">
                  {plan.cta}
                </Button>
              ) : (
                <EarlyAccessButton variant={plan.featured ? "primary" : "secondary"}>
                  {plan.cta}
                </EarlyAccessButton>
              )}
            </article>
          ))}
        </div>
        <Revealer className="future-pricing__campus-note" delay="1">
          <strong>Maryville founding access</strong>
          <span>$6.99/mo is available for early campus testers during the Maryville rollout.</span>
        </Revealer>
      </div>
    </section>
  );
}

export function InsightsHubSection() {
  const featured = insightArticles.slice(0, 3);

  return (
    <section className="future-section future-insights">
      <div className="container">
        <Revealer className="future-section__heading">
          <span className="lp-kicker">Insights</span>
          <h2>A fitness company needs a point of view.</h2>
          <p>
            Training, nutrition, recovery, performance, and mindset content make
            FoFit read like a brand with depth, not just another app waitlist.
          </p>
        </Revealer>
        <div className="future-insights__grid">
          {featured.map((article) => (
            <Link className="future-card future-insight-card" key={article.slug} to={`/insights/${article.slug}`}>
              <span>{article.category}</span>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <small>{article.readTime}</small>
            </Link>
          ))}
        </div>
        <Revealer className="future-insights__footer" delay="1">
          <Button to="/insights" variant="secondary">
            Read FoFit Insights
          </Button>
        </Revealer>
      </div>
    </section>
  );
}

export function FounderStorySection() {
  return (
    <section className="future-section future-founder">
      <div className="container future-founder__inner">
        <Revealer className="future-founder__visual">
          <img alt={futureAssets.generated.coachAthleteCheckin.alt} src={futureAssets.generated.coachAthleteCheckin.src} />
          <div className="future-founder__mark">
            <img alt={futureAssets.mark.alt} src={futureAssets.mark.src} />
          </div>
        </Revealer>
        <Revealer className="future-founder__copy" delay="1">
          <span className="lp-kicker">Built in public</span>
          <h2>Built in public from St. Louis.</h2>
          <p>
            FoFit is being built with real testers, athletes, coaches, and
            students. Join early and help shape the Future of Fitness before it
            becomes another app you hear about after the fact.
          </p>
          <div className="future-founder__facts">
            <span>Maryville roots</span>
            <span>Real app screens</span>
            <span>Tester-led rollout</span>
          </div>
        </Revealer>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="future-final-cta">
      <Revealer className="container future-final-cta__inner">
        <h2>Get early access before launch.</h2>
        <p>
          Join founding 250 and help shape the app becoming your coach, your
          plan, your food, and your people.
        </p>
        <div className="future-final-cta__actions">
          <EarlyAccessButton size="lg">Join founding 250</EarlyAccessButton>
          <a className="button button--secondary button--lg" href="#system-in-motion">
            Explore the product
          </a>
        </div>
      </Revealer>
    </section>
  );
}
