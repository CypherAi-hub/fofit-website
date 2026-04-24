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
  trial?: string;
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
      "5 Cypher sessions / month",
      "Top up with token packs anytime",
    ],
  },
  {
    name: "Premium",
    tagline: "The full FoFit system",
    monthly: "$12.99",
    annual: "$99",
    annualNote: "$8.25/mo billed annually · 7-day free trial",
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
    trial: "7-day free trial on annual",
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
    starter: "5 sessions / month",
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

export type VerifiedDiscount = {
  name: string;
  price: string;
  annual: string;
  eligibility: string;
  description: string;
  discountPct: number;
};

export const verifiedDiscounts: VerifiedDiscount[] = [
  {
    name: "Premium · Student",
    price: "$7.99/mo",
    annual: "$69/yr",
    eligibility: "Verified .edu email or SheerID",
    description: "For as long as you're enrolled.",
    discountPct: 38,
  },
  {
    name: "Premium · Hero",
    price: "$9.99/mo",
    annual: "$89/yr",
    eligibility: "Military, first responders, medical workers, teachers (verified through SheerID)",
    description: "For those who serve.",
    discountPct: 23,
  },
];

export type TeamsTier = {
  name: string;
  price: string;
  fit: string;
  description: string;
  featured?: boolean;
};

export const teamsTiers: TeamsTier[] = [
  {
    name: "Team",
    price: "$49/mo",
    fit: "Personal trainers & small studios",
    description: "Up to 10 athletes · 1 coach · basic coach dashboard",
  },
  {
    name: "Pro",
    price: "$99/mo",
    fit: "Gyms, CrossFit boxes & private studios",
    description: "Up to 30 athletes · 3 coach seats · custom branding · analytics",
    featured: true,
  },
  {
    name: "Program",
    price: "From $199/mo",
    fit: "High schools & college athletic departments",
    description: "Unlimited athletes · SSO · priority support · white-label · scales by athlete count and division",
  },
];

export type CypherTokenPack = {
  count: number;
  label: string;
  price: string;
  perSession: string;
  savings: string | null;
  featured: boolean;
};

export const cypherTokenPacks: CypherTokenPack[] = [
  {
    count: 5,
    label: "Try Pack",
    price: "$1.99",
    perSession: "$0.40 / session",
    savings: null,
    featured: false,
  },
  {
    count: 25,
    label: "Most Popular",
    price: "$7.99",
    perSession: "$0.32 / session",
    savings: "save 20%",
    featured: true,
  },
  {
    count: 100,
    label: "Power Pack",
    price: "$24.99",
    perSession: "$0.25 / session",
    savings: "save 38%",
    featured: false,
  },
];
