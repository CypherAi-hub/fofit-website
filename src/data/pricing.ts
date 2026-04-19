export type PricingPlan = {
  name: string;
  tagline: string;
  monthly: string;
  annual: string;
  annualNote: string;
  featured?: boolean;
  cta: string;
  description: string;
  features: string[];
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    tagline: "Train with structure",
    monthly: "$0",
    annual: "$0",
    annualNote: "Always free",
    cta: "Start Free",
    description:
      "For people who want a cleaner way to log workouts, stay consistent, and get into a repeatable rhythm.",
    features: [
      "Workout logging and session history",
      "Structured starter plans",
      "Basic progress trends",
      "Exercise library access",
      "Limited insight content",
    ],
  },
  {
    name: "Premium",
    tagline: "The full FoFit system",
    monthly: "$14",
    annual: "$120",
    annualNote: "$10/mo billed annually",
    featured: true,
    cta: "Join the waitlist",
    description:
      "For athletes and committed lifters who want adaptive planning, deeper feedback, and a more connected training system.",
    features: [
      "Adaptive AI guidance from Cypher",
      "Personalized program generation",
      "Advanced progress analytics",
      "Training-linked nutrition direction",
      "Recovery and readiness concepts",
      "Priority access to future coaching layers",
    ],
  },
];

export const pricingComparison = [
  {
    feature: "Workout logging",
    starter: "Included",
    premium: "Included",
  },
  {
    feature: "Personalized plan generation",
    starter: "Limited templates",
    premium: "Adaptive plans",
  },
  {
    feature: "AI coaching",
    starter: "Not included",
    premium: "Unlimited",
  },
  {
    feature: "Progress analytics",
    starter: "Core trends",
    premium: "Advanced insights",
  },
  {
    feature: "Nutrition guidance",
    starter: "Not included",
    premium: "Training-aware support",
  },
  {
    feature: "Community features",
    starter: "Read-only",
    premium: "Challenges and group tools",
  },
];

export const pricingAssurances = [
  "Cancel anytime with no lock-in contract.",
  "One platform for planning, execution, analytics, and future coaching.",
  "Premium members get first access to new ecosystem modules as they launch.",
];
