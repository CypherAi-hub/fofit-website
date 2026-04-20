import { appScreens } from "../assets/brand/manifest";
import { realAppScreens } from "./appScreens";

export type FigureAsset = {
  alt: string;
  label: string;
  caption: string;
  src: string;
  frame?: "phone" | "window" | "bare";
  tilt?: "left" | "right" | "flat";
  objectPosition?: string;
  treatment?: "flat" | "device";
};

export type TranscriptTurn = {
  speaker: "user" | "cypher";
  text: string;
};

export type DossierFact = {
  label: string;
  value: string;
};

export type ProgressMetric = {
  label: string;
  value: string;
  note: string;
};

export type ProofOutcome = {
  name: string;
  metric: string;
  timeframe: string;
};

export const heroFigure: FigureAsset = {
  src: realAppScreens.workoutHome.src,
  alt: realAppScreens.workoutHome.alt,
  label: "",
  caption: "Active workout logging — Incline Dumbbell Press, set 2 of 4.",
  frame: "bare",
  tilt: "right",
};

export const planFigure: FigureAsset = {
  src: realAppScreens.discoverPlan.src,
  alt: realAppScreens.discoverPlan.alt,
  label: "",
  caption: "Workout discovery tailored to today's plan.",
  frame: "bare",
  tilt: "left",
};

export const transcriptFigure: FigureAsset = {
  src: realAppScreens.cypherBrief.src,
  alt: realAppScreens.cypherBrief.alt,
  label: "",
  caption: "Cypher responding to a tired-morning training question.",
  frame: "bare",
  tilt: "flat",
};

export const nutritionFigure: FigureAsset = {
  src: realAppScreens.nutritionTracking.src,
  alt: realAppScreens.nutritionTracking.alt,
  label: "",
  caption: "Nutrition that stays close to the training block. Ring on the left, macros on the right, meals below.",
  frame: "phone",
  tilt: "right",
};

export const progressFigureAsset: FigureAsset = {
  src: appScreens.journey.device.src,
  alt: appScreens.journey.device.alt,
  label: "",
  caption: "47 sessions strong — Alex Chen's training journey.",
  frame: "bare",
  tilt: "flat",
  objectPosition: "50% 42%",
  treatment: appScreens.journey.device.treatment,
};

export const dailyLoopFigures = [
  {
    time: "06:40",
    title: "The morning match",
    description:
      "The first thing FoFit does is line up the day's plan against today's energy, equipment, and calendar. One clear next move before the coffee's cold.",
    asset: planFigure,
  },
  {
    time: "17:15",
    title: "The session",
    description:
      "The workout stays coachable while you are in it. Loads, swaps, and constraints can change without breaking the whole block.",
    asset: heroFigure,
  },
  {
    time: "22:00",
    title: "The close",
    description:
      "Food, recovery, and tomorrow's load stay attached to the same system, so the recap actually changes the next call.",
    asset: nutritionFigure,
  },
] as const;

export const cypherTranscript: TranscriptTurn[] = [
  {
    speaker: "user",
    text: "I'm wrecked. Cut today?",
  },
  {
    speaker: "cypher",
    text:
      "Given how you're feeling, let's pull intensity but keep the session. New plan: back squat top set at 205, drop back-offs from 4x8 to 3x6. No accessory supersets. 40 minutes instead of 65.",
  },
  {
    speaker: "user",
    text: "Fine. Knee's been barky too.",
  },
  {
    speaker: "cypher",
    text:
      "Switching Bulgarian split squats to split-stance goblets at bodyweight. Logged. If the knee complains during warm-up, reply and I'll pull them entirely.",
  },
  {
    speaker: "user",
    text: "Go.",
  },
];

export const personalizationFacts: DossierFact[] = [
  { label: "Training age", value: "3.2 years" },
  { label: "Deadlift hold", value: "2.25x bodyweight" },
  { label: "Left knee", value: "2023 meniscus, no deep flexion under load" },
  { label: "Travel", value: "~6 nights per month, bodyweight swaps ready" },
  { label: "Sleep floor", value: "Load drops below 6 hours" },
  { label: "Preference", value: "Barbell first, machines second" },
  { label: "Recent signal", value: "Velocity-loss trend staying below threshold" },
];

export const progressMetrics: ProgressMetric[] = [
  {
    label: "SQUAT 1RM",
    value: "+22.5 lb",
    note: "From 295 to 317.5 over 12 weeks, then repeated for confidence.",
  },
  {
    label: "VOLUME LOAD",
    value: "+18%",
    note: "More work completed while average effort stayed inside the plan.",
  },
  {
    label: "SLEEP",
    value: "+34 min",
    note: "Nightly average moved up as training stress got easier to manage.",
  },
  {
    label: "PACE HR",
    value: "-4%",
    note: "Zone-two heart rate dropped at the same pace after nine weeks.",
  },
];
