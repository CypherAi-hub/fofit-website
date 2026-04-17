import heroActiveWorkout from "../assets/editorial/hero-active-workout.png";
import dailyPlan from "../assets/editorial/daily-plan.png";
import cypherNutritionThread from "../assets/editorial/cypher-nutrition-thread.png";
import nutritionDashboard from "../assets/editorial/nutrition-dashboard.png";
import progressFigure from "../assets/editorial/progress-figure.png";

export type FigureAsset = {
  alt: string;
  label: string;
  caption: string;
  src?: string;
  frame?: "phone" | "window";
  tilt?: "left" | "right" | "flat";
  objectPosition?: string;
  render?: "readiness";
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
  src: heroActiveWorkout,
  alt: "FoFit active workout screen showing live set tracking inside the product interface.",
  label: "FIG 00.1",
  caption: "Active workout logging, captured from the real product.",
  frame: "window",
  tilt: "right",
  objectPosition: "62% 50%",
};

export const planFigure: FigureAsset = {
  src: dailyPlan,
  alt: "FoFit training plan screen showing a generated weekly plan and exercise blocks.",
  label: "FIG 02.1",
  caption: "The weekly plan, built around time, equipment, and the week ahead.",
  frame: "phone",
  tilt: "left",
};

export const transcriptFigure: FigureAsset = {
  src: cypherNutritionThread,
  alt: "FoFit Cypher chat interface over the nutrition surface inside the app.",
  label: "FIG 03.1",
  caption: "Cypher in context, speaking inside the product instead of outside it.",
  frame: "phone",
  tilt: "flat",
};

export const nutritionFigure: FigureAsset = {
  src: nutritionDashboard,
  alt: "FoFit nutrition dashboard showing calorie and macro tracking tied to the training system.",
  label: "FIG 04.3",
  caption: "Nutrition that stays close to the training block instead of drifting into a separate app.",
  frame: "phone",
  tilt: "right",
};

export const progressFigureAsset: FigureAsset = {
  src: progressFigure,
  alt: "FoFit progress analytics view showing strength changes and training history in the app.",
  label: "FIG 05.1",
  caption: "Progress intelligence at the app level, not just a chart pasted into marketing.",
  frame: "window",
  tilt: "flat",
  objectPosition: "53% 48%",
};

export const readinessFigure: FigureAsset = {
  alt: "FoFit morning readiness view showing a readiness ring, sleep, HRV, planned load, and Cypher's morning nudge.",
  label: "FIG 04.1",
  caption: "The morning readiness read, rendered as a living score and a usable nudge instead of a generic plan card.",
  frame: "phone",
  tilt: "left",
  render: "readiness",
};

export const dailyLoopFigures = [
  {
    time: "06:40",
    title: "The readiness read",
    description:
      "Cypher checks the shape of the day first. Sleep, recovery drift, and session intent get turned into one clear recommendation.",
    asset: readinessFigure,
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
      "You slept 5h47, HRV down 11% off baseline. I'd rather keep the session and pull intensity. New plan: back squat top set at 205, drop back-offs from 4x8 to 3x6. No accessory supersets. 40 minutes instead of 65.",
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
