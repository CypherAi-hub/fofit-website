import type { WaitlistRole } from "../app/waitlist-context";

export type WaitlistRoleOption = {
  value: WaitlistRole;
  label: string;
  forText: string;
  outcomes: string[];
  cta: string;
  confirmation: string;
};

export const waitlistRoles: WaitlistRoleOption[] = [
  {
    value: "beginner",
    label: "Beginner",
    forText: "For people who want a clear first system for training, food, and consistency.",
    outcomes: ["Starter plan", "Simple next steps", "Support without judgment"],
    cta: "Join as a beginner",
    confirmation: "You're on the FoFit beta list. We'll send early access when your spot opens.",
  },
  {
    value: "lifter",
    label: "Lifter",
    forText: "For people building strength, muscle, and consistency without guessing every week.",
    outcomes: ["Progressive training", "Food context", "Cypher checks the next move"],
    cta: "Join as a lifter",
    confirmation: "You're on the FoFit beta list. We'll send early access when your spot opens.",
  },
  {
    value: "athlete",
    label: "Athlete",
    forText: "For athletes training around practice, class, travel, and a real calendar.",
    outcomes: ["Plan around the week", "Protect readiness", "Keep performance context"],
    cta: "Join as an athlete",
    confirmation: "You're on the FoFit beta list. We'll send early access when your spot opens.",
  },
  {
    value: "coach",
    label: "Coach",
    forText: "For coaches, creators, team leads, and ADs who want a verified path into FoFit.",
    outcomes: ["Verified profile path", "Groups and programs", "FoFit Teams access"],
    cta: "Join as a coach",
    confirmation: "You're on the FoFit beta list. We'll send early access when your spot opens.",
  },
  {
    value: "student",
    label: "Student",
    forText: "For students who want training, food, and community built around campus life.",
    outcomes: ["Student pricing path", "Campus groups", "Schedule-aware guidance"],
    cta: "Join as a student",
    confirmation: "You're on the FoFit beta list. We'll send early access when your spot opens.",
  },
];

export const waitlistGoals = [
  "Build muscle",
  "Lose fat",
  "Increase strength",
  "Improve performance",
];

export const waitlistProfiles = [
  "Beginner getting started",
  "Lifter rebuilding consistency",
  "Athlete training seriously",
  "Student on campus",
  "Coach or team lead",
];

export const waitlistSources = [
  "TikTok",
  "Friend or teammate",
  "Coach",
  "Maryville",
  "Search",
];

export const waitlistBenefits = [
  "Priority access to the FoFit beta",
  "Founding 250 updates before broader rollout",
  "First look at AI coaching, nutrition, and community layers",
];

export const waitlistSuccessPoints = [
  "We'll send early access when your spot opens.",
  "Your info is saved for beta updates and early member invites.",
  "Your referral code is ready if you want to share FoFit.",
];
