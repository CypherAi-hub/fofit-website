import { useEffect, useRef, useState } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const SCENE_DURATION_MS = 6000;
const CYPHER_SCENE_INDEX = 2;

type SceneKind = "splash" | "discover" | "cypher" | "logging" | "journey";

type SceneProps = {
  active: boolean;
  index: number;
  kind: SceneKind;
};

function getPrefersReducedMotion() {
  return typeof window !== "undefined"
    && window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function Scene({ active, index, kind }: SceneProps) {
  const className = `scene scene--${kind}${active ? " is-active" : ""}`;

  if (kind === "splash") {
    return (
      <div aria-hidden={!active} className={className} data-scene={index}>
        <div className="scene-splash__glow" />
        <div className="scene-splash__mark">FoFit</div>
        <div className="scene-splash__line">Train honestly.</div>
      </div>
    );
  }

  if (kind === "discover") {
    return (
      <div aria-hidden={!active} className={className} data-scene={index}>
        <div className="scene-status">
          <span>8:24</span>
          <span>LTE 98%</span>
        </div>
        <div className="scene-discover__body">
          <span className="scene-kicker">Today</span>
          <h3>Discover</h3>
          {["Strength block ready", "Protein target adjusted", "Recovery window found"].map((label, cardIndex) => (
            <div className="scene-discover__card" key={label}>
              <span className="scene-discover__icon" />
              <div>
                <strong>{label}</strong>
                <p>{cardIndex === 0 ? "Four lifts, 45 minutes" : cardIndex === 1 ? "Lunch fits the plan" : "Sleep debt accounted for"}</p>
              </div>
              <span className="scene-discover__arrow">→</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "cypher") {
    return (
      <div aria-hidden={!active} className={className} data-scene={index}>
        <div className="scene-cypher__header">
          <div>
            <span className="scene-cypher__title">
              <span className="scene-cypher__dot" />
              Cypher
            </span>
            <span className="scene-cypher__time">Today, 8:24 AM</span>
          </div>
        </div>
        <div className="scene-cypher__thread">
          <div className="scene-cypher__bubble scene-cypher__bubble--user">Can I lift after practice?</div>
          <div className="scene-cypher__bubble scene-cypher__bubble--ai">
            <span className="scene-cypher__badge">Cypher Coach</span>
            Keep the session, lower volume by one set, and protect tomorrow&apos;s sprint work.
          </div>
          <div className="scene-cypher__options">
            <button type="button">Adjust workout</button>
            <button type="button">Explain why</button>
          </div>
        </div>
        <div className="scene-cypher__input">
          <span>Ask Cypher anything</span>
          <span className="scene-cypher__send">↗</span>
        </div>
      </div>
    );
  }

  if (kind === "logging") {
    return (
      <div aria-hidden={!active} className={className} data-scene={index}>
        <div className="scene-logging__top">
          <span>Incline Press</span>
          <strong>Set 3</strong>
        </div>
        <div className="scene-logging__timer">
          <svg aria-hidden="true" viewBox="0 0 120 120">
            <circle className="scene-logging__ring-bg" cx="60" cy="60" r="52" />
            <circle className="scene-logging__ring" cx="60" cy="60" r="52" />
          </svg>
          <span>00:45</span>
        </div>
        <div className="scene-logging__controls">
          <div className="scene-logging__row">
            <span>Reps</span>
            <div>
              <button type="button">−</button>
              <strong>8</strong>
              <button type="button">+</button>
            </div>
          </div>
          <div className="scene-logging__row">
            <span>Weight</span>
            <strong>55 lb</strong>
          </div>
          <button className="scene-logging__submit" type="button">Log Set ✓</button>
        </div>
      </div>
    );
  }

  return (
    <div aria-hidden={!active} className={className} data-scene={index}>
      <div className="scene-journey__header">
        <span className="scene-kicker">Journey</span>
        <h3>Week 12</h3>
      </div>
      <div className="scene-journey__timeline">
        {["Baseline", "Volume", "Recovery", "New PR"].map((label) => (
          <div className="scene-journey__item" key={label}>
            <span className="scene-journey__dot" />
            <div>
              <strong>{label}</strong>
              <p>{label === "New PR" ? "+18% press strength" : "Logged and learned"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductWalkthrough() {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [activeScene, setActiveScene] = useState(() => (
    getPrefersReducedMotion() ? CYPHER_SCENE_INDEX : 0
  ));
  const [isCanvasActive, setIsCanvasActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(getPrefersReducedMotion);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
      if (event.matches) {
        setActiveScene(CYPHER_SCENE_INDEX);
      }
    };

    setReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setActiveScene(CYPHER_SCENE_INDEX);
    }

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof IntersectionObserver === "undefined") {
      setIsCanvasActive(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCanvasActive(entry.isIntersecting && entry.intersectionRatio >= 0.4);
      },
      { threshold: [0, 0.4] },
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isCanvasActive || reducedMotion) {
      return undefined;
    }

    const sceneTimer = window.setInterval(() => {
      setActiveScene((currentScene) => (currentScene + 1) % 5);
    }, SCENE_DURATION_MS);

    return () => {
      window.clearInterval(sceneTimer);
    };
  }, [isCanvasActive, reducedMotion]);

  return (
    <section className="walkthrough" id="walkthrough">
      <div className="walkthrough__header">
        <span className="walkthrough__eyebrow">01 / Walkthrough</span>
        <h2 className="walkthrough__title">
          Thirty seconds with the <em>product</em>.
        </h2>
        <p className="walkthrough__lede">
          A quick pass through splash, discovery, Cypher, workout logging, and journey. The product should
          prove itself before the copy asks for belief.
        </p>
      </div>

      <div
        className={`walkthrough__canvas${isCanvasActive && !reducedMotion ? " walkthrough__canvas--active" : ""}`}
        ref={canvasRef}
      >
        <div className="walkthrough__phone">
          <div className="walkthrough__notch" />
          <div className="walkthrough__screen">
            <Scene active={activeScene === 0} index={0} kind="splash" />
            <Scene active={activeScene === 1} index={1} kind="discover" />
            <Scene active={activeScene === 2} index={2} kind="cypher" />
            <Scene active={activeScene === 3} index={3} kind="logging" />
            <Scene active={activeScene === 4} index={4} kind="journey" />
          </div>
        </div>

        <div aria-label="Walkthrough chapters" className="walkthrough__chapters">
          {["Splash", "Discover", "Cypher", "Log", "Journey"].map((label, index) => (
            <button
              aria-pressed={activeScene === index}
              className={`walkthrough__chapter${activeScene === index ? " is-active" : ""}`}
              key={label}
              onClick={() => setActiveScene(index)}
              type="button"
            >
              <span className="walkthrough__chapter-index">0{index + 1}</span>
              <span className="walkthrough__chapter-label">{label}</span>
              <span className="walkthrough__chapter-bar" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
