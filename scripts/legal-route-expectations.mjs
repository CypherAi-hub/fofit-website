export const legalRoutes = [
  {
    label: "privacy",
    path: "/privacy",
    title: "Privacy Policy",
    expectations: [
      "Privacy Policy",
      /HealthKit|Apple Health/,
      /camera|photo/i,
      /microphone|Whisper/i,
      /notifications/i,
      /Cypher|AI/i,
      /nutrition/i,
      /workout/i,
      /community/i,
      /account deletion|Delete account/i,
      /Supabase|OpenAI|Anthropic|Google|Sentry|PostHog/,
    ],
  },
  {
    label: "terms",
    path: "/terms",
    title: "Terms of Service",
    expectations: [
      "Terms of Service",
      /fitness and nutrition safety/i,
      /Cypher AI/i,
      /Community, reels, and user content/i,
      /account/i,
    ],
  },
  {
    label: "support",
    path: "/support",
    title: "Support",
    expectations: [
      "Support",
      /support@fofit\.app/,
      /bug reports|privacy requests|reviewer support/i,
    ],
  },
  {
    label: "delete-account",
    path: "/delete-account",
    title: "Delete Account",
    expectations: [
      "Delete Account",
      /delete/i,
      /deletion/i,
      /account/i,
      /Settings (?:>|&gt;) Profile (?:&|&amp;) Account (?:>|&gt;) Delete account/,
    ],
  },
];

export const placeholderPatterns = [
  /fill in before publishing/i,
  /\[Mailing address/i,
  /delete before publish/i,
  /\bTODO\b/i,
  /\bTBD\b/i,
];

export const shellPatterns = [
  /<div id="root"><\/div>/i,
  /Personalized Fitness Intelligence/i,
  /\/assets\/index-[^"]+\.js/i,
];
