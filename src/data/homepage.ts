import type { WaitlistRole } from "../app/waitlist-context";

export const heroTrustItems = [
  "Founding 250",
  "$14.99/mo Standard",
  "iOS + Android",
  "Lifter / Athlete / Coach",
] as const;

export const proofTickerItems = [
  "Training memory",
  "Schedule-aware sessions",
  "Soreness context",
  "Equipment-aware swaps",
  "Fuel follows training",
  "Coach/team path",
] as const;

export const contextSignals = [
  {
    label: "Training memory",
    title: "Every set has context.",
    description:
      "Cypher keeps history attached to the next decision instead of treating every workout like a blank prompt.",
  },
  {
    label: "Real week",
    title: "Schedule changes the plan.",
    description:
      "Short lift window, class, work, travel, or practice load changes what should happen today.",
  },
  {
    label: "Body feedback",
    title: "Soreness is not ignored.",
    description:
      "Knee pain, fatigue, and missed sleep can adjust volume without destroying the training block.",
  },
  {
    label: "Fuel",
    title: "Nutrition follows training.",
    description:
      "Macro targets and meal ideas connect back to the work you are actually doing.",
  },
] as const;

export const pathCards: Array<{
  role: WaitlistRole;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  cta: string;
}> = [
  {
    role: "lifter",
    eyebrow: "Lifter",
    title: "Progression without chaos.",
    description:
      "Build strength with a plan that remembers your lifts, preferences, equipment, and missed days.",
    bullets: ["Adaptive workout flow", "Progress history", "Cypher memory"],
    cta: "Join as a lifter",
  },
  {
    role: "athlete",
    eyebrow: "Athlete",
    title: "Train around the season.",
    description:
      "Practice, soreness, class, and travel become part of the plan instead of excuses outside it.",
    bullets: ["Readiness-aware sessions", "Sport context", "Recovery signals"],
    cta: "Join as an athlete",
  },
  {
    role: "coach",
    eyebrow: "Coach",
    title: "See the team behind the numbers.",
    description:
      "FoFit Teams is the path toward athlete visibility, program delivery, and readiness context.",
    bullets: ["Roster visibility", "Athlete notes", "Program distribution"],
    cta: "Join as a coach",
  },
];

export const cypherTranscriptTurns = [
  {
    speaker: "user",
    label: "Athlete",
    text: "My knee felt weird on squats last week and I only have 40 minutes today.",
  },
  {
    speaker: "cypher",
    label: "Cypher",
    text: "I remember the knee note from last Tuesday. I am keeping the lower-body intent, but shifting the main pattern away from deep knee flexion.",
  },
  {
    speaker: "system",
    label: "Plan change",
    text: "Back squat -> trap bar deadlift. Split squat volume reduced. Posterior chain finisher added.",
  },
  {
    speaker: "cypher",
    label: "Approval",
    text: "Approve this adjustment before I update today's workout?",
  },
] as const;

export const cypherMemoryChecks = [
  "Last Tuesday knee note",
  "40-minute session window",
  "Lower-body intent preserved",
  "Block standards intact",
] as const;

export const dailyLoopSteps = [
  {
    index: "01",
    moment: "Morning",
    title: "The day starts with context.",
    description:
      "FoFit checks readiness, schedule pressure, training target, and what changed since the last session.",
  },
  {
    index: "02",
    moment: "Pre-lift",
    title: "The plan is prepared, not guessed.",
    description: "Cypher explains the why behind the session before the first set.",
  },
  {
    index: "03",
    moment: "During",
    title: "Adjustments happen without losing the block.",
    description:
      "Miss a rep target or lose time. FoFit adapts the set, not the identity of the program.",
  },
  {
    index: "04",
    moment: "After",
    title: "Progress becomes memory.",
    description: "The recap becomes context for the next call instead of another forgotten log.",
  },
] as const;

export const productSurfaces = [
  {
    label: "Workout",
    title: "Lower Strength",
    detail: "Trap bar main lift, adjusted volume, posterior chain finish.",
  },
  {
    label: "Fuel",
    title: "Protein behind target",
    detail: "Meal idea shifts after today's lower-body workload.",
  },
  {
    label: "Progress",
    title: "Consistency score rising",
    detail: "Completion and honest notes move the identity forward.",
  },
  {
    label: "Teams",
    title: "Coach context",
    detail: "Readiness, notes, and completion visible before the next session.",
  },
] as const;

export const fuelCards = [
  {
    label: "Food photo scan",
    title: "Capture the meal in the moment.",
    description: "Photo logging turns everyday meals into useful training context.",
  },
  {
    label: "Macro targets",
    title: "Targets move with the work.",
    description: "Protein, carbs, and calories stay connected to the session you actually did.",
  },
  {
    label: "Fuel Library",
    title: "Athlete-friendly meals.",
    description: "Meal ideas are built for repeatable eating, not one perfect recipe.",
  },
  {
    label: "Post-workout",
    title: "Recovery has a next step.",
    description: "Cypher can move fuel recommendations after heavy days, missed meals, or travel.",
  },
] as const;

export const scoreSignals = [
  ["Consistency", "86", "Sessions completed across the real week"],
  ["Training", "74", "Volume moved without breaking the block"],
  ["Activity", "91", "Daily movement supporting recovery"],
] as const;

export const teamsSignals = [
  "Roster readiness before the lift",
  "Athlete notes that survive the week",
  "Completion context beyond a checked box",
  "Program delivery without another spreadsheet",
] as const;

export const foundingBenefits = [
  "Founding rates locked while your subscription stays active",
  "FoFit grows as Cypher, Fuel, Teams, and community systems deepen",
  "Built for lifters, athletes, and coaches from day one",
] as const;
