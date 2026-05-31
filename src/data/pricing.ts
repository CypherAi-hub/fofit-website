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
    tagline: "Basic logging and starter structure",
    monthly: "$0",
    annual: "$0",
    annualNote: "Always free",
    cta: "Start free",
    description:
      "For people who want clean logging, starter plans, and a first taste of Cypher without pressure.",
    features: [
      "Workout logging and session history",
      "Structured starter plans",
      "Basic progress trends",
      "Limited Cypher access",
    ],
  },
  {
    name: "Student",
    tagline: "Verified student access",
    monthly: "$9.99",
    annual: "$99",
    annualNote: "Student annual option planned",
    cta: "Join as a student",
    description:
      "For students who want training, nutrition, Cypher, and community built around a real school schedule.",
    features: [
      "Full FoFit system",
      "Student pricing path",
      "Campus community access",
      "Founding 250 updates",
    ],
  },
  {
    name: "Standard",
    tagline: "The full FoFit system",
    monthly: "$14.99",
    annual: "$149",
    annualNote: "Annual pricing planned",
    featured: true,
    cta: "Join founding 250",
    description:
      "For members who want AI coaching, personalized training, nutrition, community, reels, groups, and verified coach access.",
    features: [
      "Adaptive AI guidance from Cypher",
      "Personalized program generation",
      "Training-linked nutrition",
      "Feed, reels, groups, and verified coaches",
    ],
  },
  {
    name: "Coach / Teams",
    tagline: "Verified coach and team path",
    monthly: "Talk to us",
    annual: "Talk to us",
    annualNote: "Pilot pricing by group",
    cta: "Request access",
    description:
      "For coaches, schools, clubs, and teams that need verified profiles, groups, programs, and visibility.",
    features: [
      "Verified coach path",
      "Groups and programs",
      "Team visibility",
      "Pilot rollout support",
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
    starter: "Limited",
    premium: "Included",
  },
  {
    feature: "Progress analytics",
    starter: "Core trends",
    premium: "Advanced insights",
  },
  {
    feature: "Nutrition guidance",
    starter: "Limited",
    premium: "Training-aware support",
  },
  {
    feature: "Community features",
    starter: "Preview",
    premium: "Feed, reels, groups, and coaches",
  },
];

export const pricingAssurances = [
  "Cancel anytime with no lock-in contract.",
  "One app for AI coaching, training, nutrition, and community.",
  "Founding rates are locked while your subscription stays active.",
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
    name: "Standard · Student",
    price: "$9.99/mo",
    annual: "$99/yr planned",
    eligibility: "Verified .edu email or SheerID",
    description: "For verified students.",
    discountPct: 33,
  },
  {
    name: "Standard · Hero",
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
