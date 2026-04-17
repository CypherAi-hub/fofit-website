import { useEffect, useState } from "react";

import { appScreens, brandVideos } from "../../assets/brand/manifest";
import { ChapterIntro } from "./ChapterIntro";
import { FigureLabel } from "./FigureLabel";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function prefersReducedMotion() {
  return typeof window !== "undefined"
    && window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function ProductVideo() {
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const posterAsset = brandVideos.heroLoop.poster ?? appScreens.workout.device.src;

  return (
    <section className="page-section editorial-section editorial-section--walkthrough">
      <div className="container">
        <div className="product-video reveal">
          <ChapterIntro
            centered
            description="A quick pass through splash, discovery, Cypher, workout logging, and journey. The product should prove itself before the copy asks for belief."
            index="01"
            label="Walkthrough"
            title={
              <>
                Thirty seconds with the <em>product</em>.
              </>
            }
          />
          <div className="product-video__frame">
            {reducedMotion ? (
              <img
                alt="FoFit workout screen showing Incline Dumbbell Press in progress."
                className="product-video__media product-video__media--poster"
                loading="lazy"
                src={posterAsset}
              />
            ) : (
              <video
                aria-label="Thirty-second FoFit product walkthrough showing splash, discover, Cypher, workout logging, and journey screens."
                autoPlay
                className="product-video__media"
                loop
                muted
                playsInline
                poster={posterAsset}
                preload="metadata"
                src={brandVideos.heroLoop.src}
              />
            )}
          </div>
          <FigureLabel
            caption="Thirty seconds across splash, discovery, Cypher, workout logging, and journey."
            className="product-video__label"
            label="FIG 01.1"
          />
        </div>
      </div>
    </section>
  );
}
