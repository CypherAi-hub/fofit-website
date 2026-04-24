import splashFlat from "./app-screens/flat/01-splash.png";
import discoverFlat from "./app-screens/flat/02-discover.png";
import cypherFlat from "./app-screens/flat/03-cypher.png";
import workoutFlat from "./app-screens/flat/04-workout.png";
import journeyFlat from "./app-screens/flat/05-journey.png";

import splashDevice from "./app-screens/device/01-splash.png";
import discoverDevice from "./app-screens/device/02-discover.png";
import cypherDevice from "./app-screens/device/03-cypher.png";
import workoutDevice from "./app-screens/device/04-workout.png";
import journeyDevice from "./app-screens/device/05-journey.png";

import heroLoop from "./video/hero-loop.mp4";
import heroLoopPoster from "./video/hero-loop-poster.jpg";
import socialSquare from "./video/social-square.mp4";
import socialVertical from "./video/social-vertical.mp4";

export type AppScreenScene =
  | "splash"
  | "discover"
  | "cypher"
  | "workout"
  | "journey";

export type AppScreenTreatment = "flat" | "device";

export type BrandScreenAsset = {
  alt: string;
  src: string;
  treatment: AppScreenTreatment;
};

export type BrandVideoAsset = {
  aspect: "landscape" | "square" | "vertical";
  poster?: string;
  src: string;
};

const altCopy = {
  splash: "FoFit splash screen with the FoFit mark centered over a dark green-lit background.",
  discover:
    "FoFit discover screen showing today's workout picks, quick hits, and category tabs.",
  cypher:
    "FoFit Cypher screen showing a coaching exchange with quick action chips inside the app.",
  workout:
    "FoFit workout screen showing Incline Dumbbell Press in progress with set logging controls.",
  journey:
    "FoFit journey screen showing an athlete profile, weekly completion, and recent training milestones.",
} as const satisfies Record<AppScreenScene, string>;

export const appScreens = {
  splash: {
    flat: { alt: altCopy.splash, src: splashFlat, treatment: "flat" },
    device: { alt: altCopy.splash, src: splashDevice, treatment: "device" },
  },
  discover: {
    flat: { alt: altCopy.discover, src: discoverFlat, treatment: "flat" },
    device: { alt: altCopy.discover, src: discoverDevice, treatment: "device" },
  },
  cypher: {
    flat: { alt: altCopy.cypher, src: cypherFlat, treatment: "flat" },
    device: { alt: altCopy.cypher, src: cypherDevice, treatment: "device" },
  },
  workout: {
    flat: { alt: altCopy.workout, src: workoutFlat, treatment: "flat" },
    device: { alt: altCopy.workout, src: workoutDevice, treatment: "device" },
  },
  journey: {
    flat: { alt: altCopy.journey, src: journeyFlat, treatment: "flat" },
    device: { alt: altCopy.journey, src: journeyDevice, treatment: "device" },
  },
} as const satisfies Record<AppScreenScene, Record<AppScreenTreatment, BrandScreenAsset>>;

export const brandVideos = {
  heroLoop: {
    aspect: "landscape",
    poster: heroLoopPoster,
    src: heroLoop,
  },
  socialSquare: {
    aspect: "square",
    src: socialSquare,
  },
  socialVertical: {
    aspect: "vertical",
    src: socialVertical,
  },
} as const satisfies Record<string, BrandVideoAsset>;
