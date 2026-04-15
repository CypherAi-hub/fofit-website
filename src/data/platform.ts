import type { FeatureItem } from "../components/marketing/FeatureGrid";
import type { Pillar } from "../components/marketing/SystemPillars";

export const platformStats = [
  { value: "1", label: "Connected system" },
  { value: "5", label: "Core product layers" },
  { value: "24/7", label: "Guidance availability" },
  { value: "∞", label: "Room to evolve" },
];

export const systemPillars: Pillar[] = [
  {
    title: "Personalized workout planning",
    description:
      "Every program is shaped around schedule, equipment, experience, and actual training goals instead of generic templates.",
  },
  {
    title: "Adaptive AI guidance",
    description:
      "Cypher adds context before, during, and after training so decisions feel supported instead of improvised.",
  },
  {
    title: "Progress you can see",
    description:
      "Volume, strength trends, muscle balance, and long-term consistency become visible enough to act on.",
  },
];

export const coreFeatures: FeatureItem[] = [
  {
    kicker: "Planning",
    title: "Personalized workout planning",
    description:
      "Programs adapt to equipment, availability, goals, and training history so structure actually fits the person using it.",
  },
  {
    kicker: "Guidance",
    title: "Adaptive AI coaching",
    description:
      "Cypher helps shape progression, handles simple decisions quickly, and keeps support close to the training moment.",
  },
  {
    kicker: "Tracking",
    title: "Progress intelligence",
    description:
      "Session data compounds into usable feedback around workload, PRs, consistency, and where the program needs to tighten up.",
  },
  {
    kicker: "Execution",
    title: "Exercise guidance",
    description:
      "Exercise context, swaps, and form-focused prompts help the system stay practical when real sessions do not go perfectly.",
  },
  {
    kicker: "Recovery",
    title: "Readiness and recovery concepts",
    description:
      "Training stress makes more sense when volume, soreness, and recovery quality are considered together.",
  },
  {
    kicker: "Nutrition",
    title: "Future nutrition support",
    description:
      "Nutrition direction is positioned as part of the same platform, not a disconnected add-on app living somewhere else.",
  },
];

export const workflowSteps = [
  {
    title: "Set your training context",
    description:
      "Goals, schedule, equipment, and current level establish the boundaries of the system.",
  },
  {
    title: "Get a plan built around reality",
    description:
      "FoFit turns context into a repeatable structure instead of handing everyone the same program shell.",
  },
  {
    title: "Train with guidance in the moment",
    description:
      "The platform stays useful during the session, not only before it starts or after it ends.",
  },
  {
    title: "Compound progress over time",
    description:
      "Each session feeds the next one so planning, execution, and analytics improve together.",
  },
];
