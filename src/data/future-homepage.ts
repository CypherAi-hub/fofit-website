import type { WaitlistRole } from "../app/waitlist-context";

export type MarketingImage = {
  alt: string;
  src: string;
};

export const futureAssets = {
  mark: {
    alt: "FoFit mark in a blue and green gradient.",
    src: "/images/marketing/fofit-mark.webp",
  },
  app: {
    trainHome: {
      alt: "FoFit Train home showing today's plan and recovery context.",
      src: "/images/app/train-home.webp",
    },
    discoverHome: {
      alt: "FoFit Discover screen with workouts, meals, gyms, and recovery modules.",
      src: "/images/app/discover-home.webp",
    },
    cypherProposal: {
      alt: "FoFit Cypher proposal screen adapting a basketball guard plan.",
      src: "/images/app/cypher-proposal.webp",
    },
    nutritionDashboard: {
      alt: "FoFit nutrition dashboard with photo meal estimate and macro targets.",
      src: "/images/app/nutrition-dashboard.webp",
    },
    fuelPlan: {
      alt: "FoFit fuel plan with calories, protein, meals, and Cypher action.",
      src: "/images/app/fuel-plan.webp",
    },
    profile: {
      alt: "FoFit profile screen with training highlights and performance stats.",
      src: "/images/app/profile.webp",
    },
    cypherChat: {
      alt: "FoFit Cypher chat screen with training context and plan suggestions.",
      src: "/images/app/cypher-chat.webp",
    },
    activeWorkout: {
      alt: "FoFit active workout screen with set logging and coaching cues.",
      src: "/images/app/active-workout.webp",
    },
    workoutDetail: {
      alt: "FoFit basketball guard workout detail screen.",
      src: "/images/app/workout-detail.webp",
    },
  },
  community: {
    overview: {
      alt: "FoFit community mockup showing community home, feed, reels, and profile screens.",
      src: "/images/community/community-overview.webp",
    },
    discoverPeople: {
      alt: "FoFit community mockup showing discover people, groups, challenges, and events.",
      src: "/images/community/discover-people.webp",
    },
    feedReels: {
      alt: "FoFit feed and reels mockup showing coach content, saved workouts, and post creation.",
      src: "/images/community/feed-reels.webp",
    },
    profileConnection: {
      alt: "FoFit profile connection mockup showing coach profiles, messages, and groups.",
      src: "/images/community/profile-connection.webp",
    },
    support: {
      groupCircuit: {
        alt: "FoFit athletes training together in a circuit session.",
        src: "/images/community/support/group-circuit.png",
      },
      verifiedCoach: {
        alt: "FoFit coach guiding an athlete with a tablet during a gym session.",
        src: "/images/community/support/verified-coach.jpg",
      },
      reelsMotion: {
        alt: "FoFit sprint training photography used as motion content support.",
        src: "/images/community/support/reels-motion.png",
      },
    },
  },
  lifestyle: {
    deadlift: {
      alt: "FoFit athlete preparing a deadlift in a dark training environment.",
      src: "/images/lifestyle/deadlift.png",
    },
    nutrition: {
      alt: "FoFit nutrition plate with salmon, sweet potatoes, and vegetables.",
      src: "/images/lifestyle/nutrition.png",
    },
    cypherOrb: {
      alt: "FoFit Cypher energy orb used as an AI coaching support visual.",
      src: "/images/lifestyle/cypher-orb.png",
    },
    groupCircuit: {
      alt: "FoFit athletes training together in a circuit session.",
      src: "/images/lifestyle/group-circuit.png",
    },
    measurement: {
      alt: "FoFit athlete measuring progress in a dark gym.",
      src: "/images/lifestyle/measurement.png",
    },
    recoveryLunge: {
      alt: "FoFit athlete stretching during a recovery session.",
      src: "/images/lifestyle/recovery-lunge.png",
    },
    athlete: {
      alt: "FoFit athlete training in a cinematic dark gym.",
      src: "/images/lifestyle/athlete.jpg",
    },
    lifter: {
      alt: "FoFit lifter training in a cinematic dark gym.",
      src: "/images/lifestyle/lifter.jpg",
    },
    trainer: {
      alt: "FoFit coach guiding an athlete during a training session.",
      src: "/images/lifestyle/trainer.jpg",
    },
    restBench: {
      alt: "FoFit athlete resting after a training session.",
      src: "/images/lifestyle/rest-bench.png",
    },
  },
} as const;

export const communityPreviewCards: Array<{
  label: string;
  title: string;
  image: MarketingImage;
  tone: "phone" | "scene";
}> = [
  {
    label: "Feed",
    title: "Progress, replies, and daily momentum.",
    image: futureAssets.app.trainHome,
    tone: "phone",
  },
  {
    label: "Reels",
    title: "Short-form movement that still feels premium.",
    image: futureAssets.community.support.reelsMotion,
    tone: "scene",
  },
  {
    label: "Profile",
    title: "Identity, streaks, and visible progress.",
    image: futureAssets.app.profile,
    tone: "phone",
  },
  {
    label: "Groups",
    title: "Local energy and shared training context.",
    image: futureAssets.community.support.groupCircuit,
    tone: "scene",
  },
  {
    label: "Verified Coach",
    title: "Real guidance with a human face behind it.",
    image: futureAssets.community.support.verifiedCoach,
    tone: "scene",
  },
] as const;

export const futureHeroTrust = [
  "Founding 250",
  "AI coach",
  "Training + nutrition",
  "Community beta",
] as const;

export const productPillars = [
  {
    label: "Train",
    title: "Personalized plans and workout logging.",
    detail: "Plan the session, adjust the work, and keep progress attached to the real week.",
    image: futureAssets.lifestyle.deadlift,
  },
  {
    label: "Nutrition",
    title: "Food logging, targets, and body metrics.",
    detail: "Track meals, calories, protein, and recovery fuel without separating food from training.",
    image: futureAssets.lifestyle.nutrition,
  },
  {
    label: "Cypher",
    title: "An AI coach that remembers your context.",
    detail: "Soreness, class, travel, practice, missed days, and goals stay part of the next decision.",
    image: futureAssets.lifestyle.cypherOrb,
  },
  {
    label: "Community",
    title: "Feed, reels, groups, and verified coaches.",
    detail: "Find your people, follow trusted voices, join groups, and share progress without shame loops.",
    image: futureAssets.lifestyle.groupCircuit,
  },
] as const;

export const systemTabs = [
  {
    label: "Train",
    title: "The plan starts with the day you actually have.",
    detail: "Workout detail, session flow, and set logging stay close enough to act on.",
    image: futureAssets.app.workoutDetail,
    treatment: "phone",
  },
  {
    label: "Nutrition",
    title: "Fuel is connected to the work.",
    detail: "Photo meals, targets, and meal plans give Cypher better context for recovery.",
    image: futureAssets.app.nutritionDashboard,
    treatment: "phone",
  },
  {
    label: "Cypher",
    title: "Cypher adapts without erasing the goal.",
    detail: "When the week changes, Cypher explains the adjustment before the plan moves.",
    image: futureAssets.app.cypherProposal,
    treatment: "phone",
  },
  {
    label: "Community",
    title: "People and groups live beside the plan.",
    detail: "Discover coaches, groups, challenges, events, and people training for the same thing.",
    image: futureAssets.app.discoverHome,
    treatment: "phone",
  },
  {
    label: "Reels",
    title: "Short-form content can become action.",
    detail: "Coach tips, saves, and try-workout moments turn inspiration into useful next steps.",
    image: futureAssets.lifestyle.groupCircuit,
    treatment: "scene",
  },
  {
    label: "Coach",
    title: "Verified coaches become trusted nodes.",
    detail: "Profiles, groups, Q&A, and programs give the community a real training backbone.",
    image: futureAssets.lifestyle.trainer,
    treatment: "scene",
  },
] as const;

export const cypherMemorySignals = [
  "Soreness from last week",
  "Class, work, and travel windows",
  "Practice and conditioning load",
  "Missed meals and recovery gaps",
  "Consistency without shame streaks",
] as const;

export const nutritionSignals = [
  "Calories and protein in view",
  "Meal logging without losing context",
  "Targets that can adjust around training",
  "Cypher insight when fuel is behind",
] as const;

export const futurePathCards: Array<{
  role: WaitlistRole;
  label: string;
  title: string;
  description: string;
  bullets: string[];
  cta: string;
  image: MarketingImage;
}> = [
  {
    role: "lifter",
    label: "Members",
    title: "Train, eat, track, and find your people.",
    description:
      "A home base for people who want structure, progress, nutrition, and a community that keeps training moving.",
    bullets: ["Personal plan", "Food and body context", "Groups and feed"],
    cta: "Join as a member",
    image: futureAssets.lifestyle.lifter,
  },
  {
    role: "athlete",
    label: "Athletes",
    title: "Practice-aware plans with performance context.",
    description:
      "FoFit keeps practice, soreness, class, and travel attached to the next training decision.",
    bullets: ["Sport context", "Readiness-aware sessions", "Performance profile"],
    cta: "Join as an athlete",
    image: futureAssets.lifestyle.athlete,
  },
  {
    role: "coach",
    label: "Coaches",
    title: "Verified profiles, groups, programs, and team visibility.",
    description:
      "A path for coaches to build trust, support communities, and deliver training without another spreadsheet.",
    bullets: ["Verified presence", "Programs and groups", "Coach/team path"],
    cta: "Join as a coach",
    image: futureAssets.lifestyle.trainer,
  },
];

export const futurePricingPlans = [
  {
    name: "Starter",
    price: "Free",
    audience: "Basic logging, starter plans, and limited Cypher.",
    features: ["Workout logging", "Starter plans", "Limited Cypher"],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Student",
    price: "$9.99/mo",
    audience: "Verified students building consistency around a real schedule.",
    features: ["Full FoFit system", "Student pricing", "Community access"],
    cta: "Join as a student",
    featured: false,
  },
  {
    name: "Standard",
    price: "$14.99/mo",
    audience: "The full FoFit system for training, nutrition, Cypher, and community.",
    features: ["AI coaching", "Training + nutrition", "Feed, reels, and groups"],
    cta: "Join founding 250",
    featured: true,
  },
  {
    name: "Coach / Teams",
    price: "Talk to us",
    audience: "Coaches, schools, clubs, and teams that need visibility and structure.",
    features: ["Verified coach path", "Groups and programs", "Team visibility"],
    cta: "Request access",
    featured: false,
  },
] as const;
