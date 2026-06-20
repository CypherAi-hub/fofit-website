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
    simDiscoverCommunity: {
      alt: "Real FoFit simulator screenshot showing Discover community, training support, coaches, and bottom navigation.",
      src: "/images/app/sim-discover-community.jpg",
    },
    simTrain: {
      alt: "Real FoFit simulator screenshot showing the Train tab with today's training and workout actions.",
      src: "/images/app/sim-train.jpg",
    },
    simCypher: {
      alt: "Real FoFit simulator screenshot showing Cypher with athlete context and plan guidance.",
      src: "/images/app/sim-cypher.jpg",
    },
    simNutrition: {
      alt: "Real FoFit simulator screenshot showing the Nutrition surface with photo fuel and meal tracking.",
      src: "/images/app/sim-nutrition.jpg",
    },
    simCommunity: {
      alt: "Real FoFit simulator screenshot showing the Community surface inside the app.",
      src: "/images/app/sim-community.jpg",
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
  generated: {
    communityCircuitLive: {
      alt: "FoFit athletes training together through a live gym circuit.",
      src: "/images/generated/community-circuit-live.webp",
    },
    fuelPrepGlobal: {
      alt: "FoFit performance meal prep with globally inspired bowls and training fuel.",
      src: "/images/generated/fuel-prep-global.webp",
    },
    coachAthleteCheckin: {
      alt: "FoFit coach and athlete reviewing training context after a workout.",
      src: "/images/generated/coach-athlete-checkin.webp",
    },
    friendlyTrainingCrew: {
      alt: "FoFit members smiling together after a group strength session in a bright training studio.",
      src: "/images/generated/friendly-training-crew.webp",
    },
    groupMealPrep: {
      alt: "FoFit members preparing high-protein meals together in a bright kitchen.",
      src: "/images/generated/group-meal-prep.webp",
    },
    recoveryCommunity: {
      alt: "FoFit members cooling down together in a bright recovery space after training.",
      src: "/images/generated/recovery-community.webp",
    },
    coachTabletReview: {
      alt: "FoFit coach reviewing training progress on a tablet with two members after a workout.",
      src: "/images/generated/coach-tablet-review.webp",
    },
    betaTestersReview: {
      alt: "FoFit beta testers reviewing the app together after a bright strength workout.",
      src: "/images/generated/beta-testers-review.webp",
    },
    globalMealPrepTable: {
      alt: "FoFit members preparing a diverse table of high-protein meals together.",
      src: "/images/generated/global-meal-prep-table.webp",
    },
    founderProductWorkSession: {
      alt: "FoFit product work session with laptop, tablet, notes, and gym equipment, without an identifiable founder portrait.",
      src: "/images/generated/founder-product-work-session.webp",
    },
    communityCheckinCircle: {
      alt: "FoFit members sitting together in a recovery area for a supportive post-workout check-in.",
      src: "/images/generated/community-checkin-circle.webp",
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
  nutrition: {
    tandooriChicken: {
      alt: "FoFit recipe image for Tandoori Chicken Rice Bowl.",
      src: "/images/nutrition/tandoori-chicken-rice-bowl.jpg",
    },
    rajmaRice: {
      alt: "FoFit recipe image for Rajma Rice Protein Bowl.",
      src: "/images/nutrition/rajma-rice-protein-bowl.jpg",
    },
    misoSalmon: {
      alt: "FoFit recipe image for Miso Salmon Rice Plate.",
      src: "/images/nutrition/miso-salmon-rice-plate.jpg",
    },
    koreanBeef: {
      alt: "FoFit recipe image for Korean-inspired beef rice bowl.",
      src: "/images/nutrition/korean-beef-rice-bowl.jpg",
    },
    suyaBeef: {
      alt: "FoFit recipe image for Suya-inspired beef rice bowl.",
      src: "/images/nutrition/suya-beef-rice-bowl.jpg",
    },
    brazilianChicken: {
      alt: "FoFit recipe image for Brazilian black bean chicken bowl.",
      src: "/images/nutrition/brazilian-black-bean-chicken-bowl.jpg",
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
    image: futureAssets.app.simCommunity,
    tone: "phone",
  },
  {
    label: "Reels",
    title: "Short-form movement with real people in it.",
    image: futureAssets.generated.friendlyTrainingCrew,
    tone: "scene",
  },
  {
    label: "Profile",
    title: "Identity, streaks, and visible progress.",
    image: futureAssets.app.simCommunity,
    tone: "phone",
  },
  {
    label: "Groups",
    title: "Discovery, groups, and coach paths.",
    image: futureAssets.app.simDiscoverCommunity,
    tone: "phone",
  },
  {
    label: "Verified Coach",
    title: "Guidance with a human face behind it.",
    image: futureAssets.generated.coachTabletReview,
    tone: "scene",
  },
] as const;

export const futureHeroTrust = [
  "Personalized plans",
  "Nutrition context",
  "Progress memory",
  "Community support",
] as const;

export const productPillars = [
  {
    label: "Train",
    title: "Personalized training without the spreadsheet.",
    detail: "Plan the session, adjust the work, and keep progress attached to the real week.",
    image: futureAssets.app.simTrain,
  },
  {
    label: "Nutrition",
    title: "Nutrition that supports the plan.",
    detail: "Track meals, calories, protein, recipes, and recovery fuel without separating food from training.",
    image: futureAssets.generated.groupMealPrep,
  },
  {
    label: "Cypher",
    title: "Coaching that remembers the context.",
    detail: "Soreness, class, travel, practice, missed days, and goals stay part of the next decision.",
    image: futureAssets.app.simCypher,
  },
  {
    label: "Community",
    title: "Accountability without the shame loop.",
    detail: "Find your people, follow trusted voices, join groups, and share progress without performative pressure.",
    image: futureAssets.generated.recoveryCommunity,
  },
] as const;

export const systemTabs = [
  {
    label: "Train",
    title: "The plan starts with the day you actually have.",
    detail: "Workout detail, session flow, and set logging stay close enough to act on.",
    image: futureAssets.app.simTrain,
    treatment: "phone",
  },
  {
    label: "Nutrition",
    title: "Fuel is connected to the work.",
    detail: "Photo meals, targets, and meal plans give Cypher better context for recovery.",
    image: futureAssets.app.simNutrition,
    treatment: "phone",
  },
  {
    label: "Cypher",
    title: "Cypher adapts without erasing the goal.",
    detail: "When the week changes, Cypher explains the adjustment before the plan moves.",
    image: futureAssets.app.simCypher,
    treatment: "phone",
  },
  {
    label: "Community",
    title: "People and groups live beside the plan.",
    detail: "Discover coaches, groups, challenges, events, and people training for the same thing.",
    image: futureAssets.app.simDiscoverCommunity,
    treatment: "phone",
  },
  {
    label: "Reels",
    title: "Useful content can become action.",
    detail: "Coach tips, saves, and try-workout moments turn inspiration into useful next steps.",
    image: futureAssets.generated.friendlyTrainingCrew,
    treatment: "scene",
  },
  {
    label: "Coach",
    title: "Verified coaches make trust visible.",
    detail: "Profiles, groups, Q&A, and programs give the community a real training backbone.",
    image: futureAssets.generated.coachTabletReview,
    treatment: "scene",
  },
] as const;

export const realWeekSteps = [
  {
    day: "Monday",
    label: "Plan",
    title: "The week starts with a real session.",
    detail: "FoFit opens with today's training, recovery context, and a clear place to start instead of another blank workout builder.",
    image: futureAssets.app.simTrain,
    treatment: "phone",
  },
  {
    day: "Tuesday",
    label: "Soreness",
    title: "Recovery changes the next move.",
    detail: "Soreness and readiness stay attached to the plan so volume and exercise choices can adjust without losing the goal.",
    image: futureAssets.generated.communityCheckinCircle,
    treatment: "scene",
  },
  {
    day: "Wednesday",
    label: "Fuel",
    title: "Food context stops being separate.",
    detail: "Photo Fuel, targets, repeat meals, and the current seed catalog help nutrition support the work instead of living in a different app.",
    image: futureAssets.app.simNutrition,
    treatment: "phone",
  },
  {
    day: "Thursday",
    label: "Cypher",
    title: "Cypher explains the adjustment.",
    detail: "When class, practice, missed meals, or fatigue change the week, Cypher gives the plan a reason instead of a random swap.",
    image: futureAssets.app.simCypher,
    treatment: "phone",
  },
  {
    day: "Friday",
    label: "Check-in",
    title: "Progress has somewhere to land.",
    detail: "Community, groups, and coach discovery give people a place to ask, share, and keep the week moving without toxic pressure.",
    image: futureAssets.app.simDiscoverCommunity,
    treatment: "phone",
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

export const nutritionLibraryStats = [
  {
    value: "36",
    label: "Bundled recipes",
    detail: "The current loggable seed catalog ships locally with athlete-portion macros.",
  },
  {
    value: "11",
    label: "Recipe categories",
    detail: "High-protein, breakfast, meal prep, smoothies, budget meals, athlete fuel, and more.",
  },
  {
    value: "12",
    label: "Country filters",
    detail: "India, USA, Mexico, Japan, Mediterranean, South Korea, Caribbean, West Africa, Middle East, Thailand, Brazil, and Global.",
  },
  {
    value: "45",
    label: "Staple foods",
    detail: "Offline food search covers common proteins, carbs, fruits, vegetables, dairy, and fats.",
  },
] as const;

export const nutritionCountryRows = [
  {
    country: "India",
    title: "Tandoori Chicken Rice Bowl",
    detail: "Basmati rice, yogurt, cucumber tomato salad, cilantro, and 48g protein.",
    image: futureAssets.nutrition.tandooriChicken,
  },
  {
    country: "India",
    title: "Rajma Rice Protein Bowl",
    detail: "A budget-friendly kidney bean and rice plate with raita-style protein support.",
    image: futureAssets.nutrition.rajmaRice,
  },
  {
    country: "Japan",
    title: "Miso Salmon Rice Plate",
    detail: "Salmon, brown rice, broccoli, lemon, and a quick miso glaze.",
    image: futureAssets.nutrition.misoSalmon,
  },
  {
    country: "South Korea",
    title: "Korean-Inspired Beef Rice Bowl",
    detail: "Gochujang-style beef, rice, peppers, avocado, and greens.",
    image: futureAssets.nutrition.koreanBeef,
  },
  {
    country: "West Africa",
    title: "Suya-Inspired Beef Rice Bowl",
    detail: "Spiced beef, rice, beans, tomatoes, greens, and a peanut-lime finish.",
    image: futureAssets.nutrition.suyaBeef,
  },
  {
    country: "Brazil",
    title: "Brazilian Black Bean Chicken Bowl",
    detail: "Chicken, black beans, rice, corn, tomato salsa, greens, and avocado.",
    image: futureAssets.nutrition.brazilianChicken,
  },
] as const;

export const nutritionFilterPreviewRows = [
  {
    label: "All",
    detail: "A library preview across recipes, staples, photo logging, repeat meals, and grocery flow.",
  },
  {
    label: "India",
    detail: "Tandoori chicken, rajma rice, yogurt support, and rice-bowl staples from the current seed catalog.",
  },
  {
    label: "Japan",
    detail: "Miso salmon, rice plates, and practical protein-forward meals that still feel familiar.",
  },
  {
    label: "South Korea",
    detail: "Korean-inspired beef bowls, peppers, rice, greens, and easy macro visibility.",
  },
  {
    label: "West Africa",
    detail: "Suya-inspired bowls, beans, tomatoes, greens, and athlete-friendly portions.",
  },
  {
    label: "Brazil",
    detail: "Black bean chicken bowls and balanced plate ideas from the current library preview.",
  },
  {
    label: "More filters",
    detail: "USA, Mexico, Caribbean, Mediterranean, Middle East, Thailand, and Global are represented in the country-filter model.",
  },
] as const;

export const nutritionWorkflowRows = [
  {
    label: "Photo Fuel",
    detail: "Snap or upload a plate, review the estimate, then log it without rebuilding the meal by hand.",
  },
  {
    label: "Fuel Library",
    detail: "Browse recipes by category, country filter, goal, macros, prep time, ingredients, and instructions.",
  },
  {
    label: "Search + barcode",
    detail: "Use the local staple search or barcode lookup when the food is not a FoFit recipe.",
  },
  {
    label: "Repeat meals",
    detail: "Save meals after logging so tomorrow's tracking is a tap instead of another full entry.",
  },
  {
    label: "Plan + grocery",
    detail: "Meal plans can feed a grocery list, so nutrition becomes a weekly system instead of a daily reset.",
  },
] as const;

export const communitySurfaceRows = [
  {
    label: "Proof Feed",
    detail: "Post progress, questions, strength work, meal prep, and recovery notes from the real Community surface.",
  },
  {
    label: "For You / Following / Spaces",
    detail: "The feed can separate broad discovery from people you follow and group-first community spaces.",
  },
  {
    label: "People + groups",
    detail: "Find regular fitness users, verified coaches, and interest groups like Beginner Strength or Meal Prep Ideas.",
  },
  {
    label: "Replies + reactions",
    detail: "Posts carry comments, reaction counts, and profile context so community feels like a product, not a poster.",
  },
  {
    label: "Real-row standard",
    detail: "Production community code keeps real rows first; demo seed content only fills empty development previews.",
  },
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
    image: futureAssets.generated.friendlyTrainingCrew,
  },
  {
    role: "athlete",
    label: "Athletes",
    title: "Practice-aware plans with performance context.",
    description:
      "FoFit keeps practice, soreness, class, and travel attached to the next training decision.",
    bullets: ["Sport context", "Readiness-aware sessions", "Performance profile"],
    cta: "Join as an athlete",
    image: futureAssets.app.simTrain,
  },
  {
    role: "coach",
    label: "Coaches",
    title: "Verified profiles, groups, programs, and team visibility.",
    description:
      "A path for coaches to build trust, support communities, and deliver training without another spreadsheet.",
    bullets: ["Verified presence", "Programs and groups", "Coach/team path"],
    cta: "Join as a coach",
    image: futureAssets.generated.coachTabletReview,
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
    price: "$7.99/mo",
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

export const founderTrustPoints = [
  {
    label: "Built close",
    title: "The first users are part of the product loop.",
    detail: "FoFit is being shaped with testers, athletes, coaches, and students before the story gets louder.",
  },
  {
    label: "St. Louis roots",
    title: "Local proof before broad claims.",
    detail: "The Maryville and St. Louis rollout keeps feedback close enough to become product decisions.",
  },
  {
    label: "Real screens",
    title: "The app has to earn the brand.",
    detail: "The website keeps showing Train, Nutrition, Cypher, and Community surfaces instead of hiding behind vague AI language.",
  },
  {
    label: "AI as a tool",
    title: "Agents help ship the system, people shape it.",
    detail: "FoFit uses AI in the build process and in the product, but the standard is still real training usefulness.",
  },
] as const;

export const testerPathSteps = [
  {
    label: "01",
    title: "Join founding 250",
    detail: "Choose your path so FoFit can route you as a member, athlete, student, coach, or team contact.",
  },
  {
    label: "02",
    title: "Get routed by device and role",
    detail: "iPhone testers move through TestFlight when seats are open. Android testers stay on the launch waitlist.",
  },
  {
    label: "03",
    title: "Test real workflows",
    detail: "Train, log food, ask Cypher, explore community, and send feedback on what helped or got confusing.",
  },
  {
    label: "04",
    title: "Shape the launch",
    detail: "Specific feedback feeds the roadmap while the loop is still close enough to change quickly.",
  },
] as const;
