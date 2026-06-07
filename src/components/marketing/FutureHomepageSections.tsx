import { useState } from "react";
import { Link } from "react-router-dom";
import {
  communityPreviewCards,
  cypherMemorySignals,
  futureAssets,
  futureHeroTrust,
  futurePathCards,
  futurePricingPlans,
  nutritionSignals,
  productPillars,
  systemTabs,
} from "../../data/future-homepage";
import { insightArticles } from "../../data/insights";
import { usePointerGlow } from "../../lib/usePointerGlow";
import { Revealer } from "../motion/Revealer";
import { Button } from "../ui/Button";
import { EarlyAccessButton } from "./EarlyAccessButton";

export function HeroFutureOfFitness() {
  return (
    <section className="future-hero">
      <video
        aria-hidden="true"
        autoPlay
        className="future-hero__video"
        loop
        muted
        playsInline
        poster="/hero-poster.jpg"
        preload="metadata"
      >
        <source src="/hero.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"' />
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className="future-hero__scrim" aria-hidden="true" />

      <div className="container future-hero__inner">
        <Revealer className="future-hero__copy">
          <h1>The future of fitness is personal.</h1>
          <p>
            FoFit brings AI coaching, training, nutrition, and community into
            one app — so you always know what to do next.
          </p>
          <div className="future-hero__actions">
            <EarlyAccessButton size="lg">Join founding 250</EarlyAccessButton>
            <a className="button button--secondary button--lg" href="#system-in-motion">
              Explore the product
            </a>
          </div>
          <div className="future-hero__mobile-proof" aria-label="FoFit mobile app proof">
            <img alt={futureAssets.app.trainHome.alt} src={futureAssets.app.trainHome.src} />
            <img alt={futureAssets.app.cypherChat.alt} src={futureAssets.app.cypherChat.src} />
            <img alt={futureAssets.app.nutritionDashboard.alt} src={futureAssets.app.nutritionDashboard.src} />
          </div>
          <div className="future-hero__trust" aria-label="FoFit launch focus">
            {futureHeroTrust.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </Revealer>

        <Revealer className="future-hero__visual" delay="1">
          <div className="future-phone-stack" aria-label="FoFit app preview">
            <img
              alt={futureAssets.app.trainHome.alt}
              className="future-phone-stack__phone future-phone-stack__phone--left"
              src={futureAssets.app.trainHome.src}
            />
            <img
              alt={futureAssets.app.cypherChat.alt}
              className="future-phone-stack__phone future-phone-stack__phone--center"
              src={futureAssets.app.cypherChat.src}
            />
            <img
              alt={futureAssets.app.nutritionDashboard.alt}
              className="future-phone-stack__phone future-phone-stack__phone--right"
              src={futureAssets.app.nutritionDashboard.src}
            />
          </div>
          <div className="future-hero__community-proof" aria-label="FoFit community surfaces preview">
            <img alt={futureAssets.app.discoverHome.alt} src={futureAssets.app.discoverHome.src} />
            <img alt={futureAssets.app.profile.alt} src={futureAssets.app.profile.src} />
          </div>
        </Revealer>
      </div>
    </section>
  );
}

export function ProductPillars() {
  const handlePointerMove = usePointerGlow();

  return (
    <section className="future-section future-pillars">
      <div className="container">
        <Revealer className="future-section__heading">
          <span className="lp-kicker">The FoFit OS</span>
          <h2>Your coach, your plan, your food, and your people.</h2>
          <p>
            FoFit is not just a workout tracker. It is the fitness system that
            keeps the next move connected to the life around it.
          </p>
        </Revealer>
        <div className="future-pillars__grid">
          {productPillars.map((pillar, index) => (
            <Revealer delay={String(Math.min(index, 3)) as "0" | "1" | "2" | "3"} key={pillar.label}>
              <article className="future-card future-pillar-card" onPointerMove={handlePointerMove}>
                <img alt={pillar.image.alt} src={pillar.image.src} />
                <span>{pillar.label}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.detail}</p>
              </article>
            </Revealer>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SystemInMotion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = systemTabs[activeIndex];

  return (
    <section className="future-section future-system-motion" id="system-in-motion">
      <div className="container future-system-motion__inner">
        <Revealer className="future-system-motion__copy">
          <span className="lp-kicker">Product in motion</span>
          <h2>One system. Six surfaces that keep feeding each other.</h2>
          <p>
            The public story has to show the actual app: training, nutrition,
            Cypher, community, reels, and coach trust all working as one.
          </p>
          <div className="future-system-tabs" aria-label="FoFit product surfaces">
            {systemTabs.map((tab, index) => (
              <button
                aria-pressed={index === activeIndex}
                className={index === activeIndex ? "is-active" : ""}
                key={tab.label}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
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
        </Revealer>

        <Revealer className="future-community__gallery" delay="1">
          <article className="future-community-feature future-card">
            <div className="future-community-feature__backdrop" aria-hidden="true">
              <img alt="" src={futureAssets.community.support.groupCircuit.src} />
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
                <img alt={futureAssets.app.discoverHome.alt} src={futureAssets.app.discoverHome.src} />
              </figure>
              <figure className="future-community-shot future-community-shot--secondary">
                <img alt={futureAssets.app.profile.alt} src={futureAssets.app.profile.src} />
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
    <section className="future-section future-cypher">
      <div className="container future-cypher__inner">
        <Revealer className="future-device-pair future-device-pair--with-scene">
          <img
            alt={futureAssets.lifestyle.cypherOrb.alt}
            className="future-device-pair__scene"
            src={futureAssets.lifestyle.cypherOrb.src}
          />
          <img
            alt={futureAssets.app.cypherProposal.alt}
            className="future-device-pair__phone future-device-pair__phone--back"
            src={futureAssets.app.cypherProposal.src}
          />
          <img
            alt={futureAssets.app.cypherChat.alt}
            className="future-device-pair__phone future-device-pair__phone--front"
            src={futureAssets.app.cypherChat.src}
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
    <section className="future-section future-nutrition">
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
            alt={futureAssets.lifestyle.nutrition.alt}
            className="future-nutrition__scene"
            src={futureAssets.lifestyle.nutrition.src}
          />
          <img
            alt={futureAssets.app.nutritionDashboard.alt}
            className="future-nutrition__phone future-nutrition__phone--front"
            src={futureAssets.app.nutritionDashboard.src}
          />
          <img
            alt={futureAssets.app.fuelPlan.alt}
            className="future-nutrition__phone future-nutrition__phone--back"
            src={futureAssets.app.fuelPlan.src}
          />
        </Revealer>
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
          <img alt={futureAssets.lifestyle.trainer.alt} src={futureAssets.lifestyle.trainer.src} />
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
