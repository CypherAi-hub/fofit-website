import { useState } from "react";
import { Link } from "react-router-dom";
import {
  communityPreviewCards,
  communitySurfaceRows,
  cypherMemorySignals,
  founderTrustPoints,
  futureAssets,
  futureHeroSystemProof,
  futureHeroTrust,
  futurePathCards,
  futurePricingPlans,
  nutritionCountryRows,
  nutritionFilterPreviewRows,
  nutritionLibraryStats,
  nutritionSignals,
  nutritionWorkflowRows,
  productPillars,
  realWeekSteps,
  systemTabs,
  testerPathSteps,
} from "../../data/future-homepage";
import { insightArticles } from "../../data/insights";
import { usePointerGlow } from "../../lib/usePointerGlow";
import { Revealer } from "../motion/Revealer";
import { Button } from "../ui/Button";
import { EarlyAccessButton } from "./EarlyAccessButton";

const liveMediaCards = [
  {
    label: "Training atmosphere",
    title: "Movement gives the system a pulse.",
    detail: "Video carries pace, effort, and the real reason the product exists.",
    type: "video",
    src: "/hero.mp4",
    poster: "/hero-poster.jpg",
  },
  {
    label: "Real app UI",
    title: "The product still has to be the proof.",
    detail: "The app-device film keeps the actual FoFit surfaces in motion.",
    type: "video",
    src: "/product-devices.mp4",
    poster: "/product-devices-poster.jpg",
  },
  {
    label: "Training crew",
    title: "People make consistency easier.",
    detail: "The product belongs around real training lives.",
    type: "image",
    image: futureAssets.generated.betaTestersReview,
  },
  {
    label: "Shared fuel",
    title: "Nutrition has to feel livable.",
    detail: "Food support works better when it looks practical, social, and familiar.",
    type: "image",
    image: futureAssets.generated.globalMealPrepTable,
  },
  {
    label: "Recovery",
    title: "Progress needs recovery and support.",
    detail: "The loop makes room for cooldowns, questions, and real people.",
    type: "image",
    image: futureAssets.generated.communityCheckinCircle,
  },
  {
    label: "Built in public",
    title: "Trust needs a visible process.",
    detail: "Product notes, tester feedback, and training context stay close to the build.",
    type: "image",
    image: futureAssets.generated.founderProductWorkSession,
  },
] as const;

export function HeroFutureOfFitness() {
  return (
    <section className="future-hero editorial-hero">
      <img
        alt=""
        aria-hidden="true"
        className="editorial-hero__backdrop"
        src={futureAssets.generated.systemHeroGym.src}
      />

      <div className="container future-hero__inner editorial-hero__inner">
        <Revealer className="future-hero__copy">
          <h1>
            Stop using four fitness apps. <span>Use FoFit.</span>
          </h1>
          <div className="editorial-hero__meta">
            Train <span aria-hidden="true">•</span> Fuel <span aria-hidden="true">•</span> Cypher <span aria-hidden="true">•</span> Community
          </div>
          <p>
            Stop bouncing between a workout planner, food tracker, AI chat, and
            social app. FoFit keeps training, fuel, recovery context, and your
            people in one system.
          </p>
          <div className="future-hero__actions">
            <EarlyAccessButton size="lg">Join founding 250</EarlyAccessButton>
            <a className="button button--secondary button--lg" href="#real-week">
              See the product loop
            </a>
          </div>
          <div className="future-hero__trust" aria-label="FoFit launch focus">
            {futureHeroTrust.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="editorial-hero__system-proof" aria-label="FoFit all-in-one system">
            {futureHeroSystemProof.map((item) => (
              <article key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.detail}</span>
              </article>
            ))}
          </div>
        </Revealer>

        <Revealer className="future-hero__visual editorial-product-hero" delay="1">
          <div className="editorial-product-hero__screens" aria-label="FoFit app preview">
            <img alt={futureAssets.app.simTrain.alt} src={futureAssets.app.simTrain.src} />
            <img alt={futureAssets.app.simNutrition.alt} src={futureAssets.app.simNutrition.src} />
            <img alt={futureAssets.app.simCypher.alt} src={futureAssets.app.simCypher.src} />
            <img alt={futureAssets.app.simDiscoverCommunity.alt} src={futureAssets.app.simDiscoverCommunity.src} />
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
          <h2>A fitness product earns trust by feeling human first.</h2>
          <p>
            Real app screenshots stay the proof. Warmer original media shows
            the people, meals, recovery, and coach conversations around the product.
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
          <h2>What people actually need a fitness app to handle.</h2>
          <p>
            The pattern is clear: make the plan personal, reduce logging
            friction, show progress, support food choices, and keep motivation social.
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
                The next recommendation reflects logged work, food,
                soreness, schedule, preferences, and what changed this week.
              </span>
            </li>
            <li>
              <strong>Human layer</strong>
              <span>
                The technology makes training clearer and more
                supported while people, coaches, and community still matter.
              </span>
            </li>
          </ul>
        </Revealer>
      </div>
    </section>
  );
}

export function RealWeekSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = realWeekSteps[activeIndex];

  return (
    <section className="future-section future-real-week" id="real-week">
      <div className="container future-real-week__inner">
        <Revealer className="future-real-week__copy">
          <span className="lp-kicker">FoFit in a real week</span>
          <h2>A system people can picture using before Friday.</h2>
          <p>
            The promise gets stronger when the site shows the actual loop:
            training, recovery, food, Cypher, and community passing context
            forward through an ordinary week.
          </p>
          <a className="button button--secondary button--lg" href="#system-in-motion">
            See the product loop
          </a>
        </Revealer>

        <Revealer className="future-real-week__stage" delay="1">
          <div className="future-real-week__timeline" aria-label="FoFit week walkthrough">
            {realWeekSteps.map((step, index) => (
              <button
                aria-pressed={index === activeIndex}
                className={index === activeIndex ? "is-active" : ""}
                key={`${step.day}-${step.label}`}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <span>{step.day}</span>
                <strong>{step.label}</strong>
              </button>
            ))}
          </div>

          <div className="future-real-week__proof">
            <div className={`future-real-week__media future-real-week__media--${active.treatment}`} key={active.title}>
              <img alt={active.image.alt} src={active.image.src} />
            </div>
            <div className="future-real-week__caption">
              <span>{active.day} / {active.label}</span>
              <h3>{active.title}</h3>
              <p>{active.detail}</p>
            </div>
          </div>
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
            FoFit works as a complete coaching system, with each
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
              <img alt="" src={futureAssets.generated.recoveryCommunity.src} />
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
            alt={futureAssets.generated.coachTabletReview.alt}
            className="future-device-pair__scene"
            src={futureAssets.generated.coachTabletReview.src}
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
  const [activeFilter, setActiveFilter] = useState("All");
  const activeFilterMeta =
    nutritionFilterPreviewRows.find((row) => row.label === activeFilter) ?? nutritionFilterPreviewRows[0];
  const visibleRecipes =
    activeFilter === "All" || activeFilter === "More filters"
      ? nutritionCountryRows
      : nutritionCountryRows.filter((recipe) => recipe.country === activeFilter);

  return (
    <section className="future-section future-nutrition" id="nutrition">
      <div className="container future-nutrition__inner">
        <Revealer className="future-nutrition__copy">
          <span className="lp-kicker">Nutrition</span>
          <h2>Fuel the plan, not just the tracker.</h2>
          <p>
            Food logging, targets, body metrics, and Cypher nutrition insights
            keep fuel attached to the work you are actually doing. The current
            seed catalog is shown as a library preview, not a finished promise.
          </p>
          <div className="future-signal-list">
            {nutritionSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </Revealer>

        <Revealer className="future-nutrition__visual" delay="1">
          <img
            alt={futureAssets.generated.groupMealPrep.alt}
            className="future-nutrition__scene"
            src={futureAssets.generated.groupMealPrep.src}
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
            The nutrition system has a current seed catalog, country filters,
            staple food search, photo logging, repeat meals, and grocery flow.
            The point is to help people find food they will actually eat.
          </p>
        </Revealer>

        <Revealer className="future-nutrition-filters" delay="1">
          <div className="future-nutrition-filters__buttons" aria-label="Nutrition library preview filters">
            {nutritionFilterPreviewRows.map((row) => (
              <button
                aria-pressed={row.label === activeFilter}
                className={row.label === activeFilter ? "is-active" : ""}
                key={row.label}
                onClick={() => setActiveFilter(row.label)}
                type="button"
              >
                {row.label}
              </button>
            ))}
          </div>
          <p>{activeFilterMeta.detail}</p>
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
            {visibleRecipes.map((recipe) => (
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
          <h2>Three paths into one intelligent fitness system.</h2>
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
          <img alt={futureAssets.generated.founderProductWorkSession.alt} src={futureAssets.generated.founderProductWorkSession.src} />
          <div className="future-founder__mark">
            <img alt={futureAssets.mark.alt} src={futureAssets.mark.src} />
          </div>
        </Revealer>
        <Revealer className="future-founder__copy" delay="1">
          <span className="lp-kicker">Built in public</span>
          <h2>Built close to the people using it.</h2>
          <p>
            FoFit is being built with testers, athletes, coaches, and students
            close to the product. The early Maryville and St. Louis rollout
            keeps feedback close enough to change the app before the story gets
            loud.
          </p>
          <div className="future-founder__note">
            <strong>The founder standard</strong>
            <span>
              FoFit has to help someone know what to do next: train, eat,
              recover, ask, or check in. If the app cannot make that clearer,
              the website does not pretend it can.
            </span>
          </div>
          <div className="future-founder__trust-grid">
            {founderTrustPoints.map((point) => (
              <article key={point.label}>
                <span>{point.label}</span>
                <strong>{point.title}</strong>
                <p>{point.detail}</p>
              </article>
            ))}
          </div>
          <div className="future-founder__facts">
            <span>Maryville roots</span>
            <span>Real app screens</span>
            <span>AI-assisted build</span>
            <span>Tester-led rollout</span>
          </div>
        </Revealer>
      </div>
    </section>
  );
}

export function TesterPathSection() {
  return (
    <section className="future-section future-tester-path" id="tester-path">
      <div className="container future-tester-path__inner">
        <Revealer className="future-tester-path__copy">
          <span className="lp-kicker">After you join</span>
          <h2>Early access has a real path.</h2>
          <p>
            Founding access is not just a form. It routes people into the right
            beta path, keeps device reality clear, and turns useful feedback
            into product work.
          </p>
          <div className="future-tester-path__actions">
            <EarlyAccessButton size="lg">Join founding 250</EarlyAccessButton>
            <Button to="/beta" variant="secondary">See iOS beta</Button>
            <Button to="/signup" variant="ghost">Create account</Button>
          </div>
        </Revealer>

        <Revealer className="future-tester-path__steps" delay="1">
          {testerPathSteps.map((step) => (
            <article className="future-card" key={step.label}>
              <span>{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </Revealer>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="future-final-cta">
      <Revealer className="container future-final-cta__inner">
        <h2>Get early access to the system.</h2>
        <p>
          Join founding 250 and help shape the app becoming your plan, your
          coach, your food system, and your training community.
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
