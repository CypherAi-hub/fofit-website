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
    value: "lifter",
    label: "Lifter",
    forText: "For people building strength, muscle, and consistency without guessing every week.",
    outcomes: ["Clear starter structure", "Progression that adapts", "Cypher checks the next move"],
    cta: "Join as a lifter",
    confirmation: "We will send you the FoFit path for cleaner structure, repeatable training, and steady progress.",
  },
  {
    value: "athlete",
    label: "Athlete",
    forText: "For athletes training around practice, class, travel, and a real calendar.",
    outcomes: ["Plan around the week", "Protect readiness", "Keep performance context"],
    cta: "Join as an athlete",
    confirmation: "We will send you the FoFit path built around the real week, training context, and Cypher guidance.",
  },
  {
    value: "coach",
    label: "Coach",
    forText: "For coaches, team leads, and ADs who need visibility without another spreadsheet.",
    outcomes: ["Roster-level training context", "Completion and readiness signals", "FoFit Teams access path"],
    cta: "Join as a coach",
    confirmation: "We will send you the FoFit Teams path for shared structure, roster context, and coach-ready visibility.",
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
  "Coach or team lead",
];

export const waitlistBenefits = [
  "Priority access to the first premium release",
  "Founding-member pricing before broader rollout",
  "First look at future coaching and community layers",
];

export const waitlistSuccessPoints = [
  "You will hear when FoFit opens the next access window.",
  "Your info is saved for product updates and early member invites.",
  "Your referral code is ready — share it to move up.",
];
