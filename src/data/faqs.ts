export type FAQGroup = {
  title: string;
  items: {
    question: string;
    answer: string;
  }[];
};

export const faqGroups: FAQGroup[] = [
  {
    title: "Product",
    items: [
      {
        question: "What is FoFit, exactly?",
        answer:
          "FoFit is a personalized fitness platform that brings training structure, adaptive guidance, progress tracking, and nutrition direction into one connected system.",
      },
      {
        question: "Is FoFit only for advanced lifters?",
        answer:
          "No. The platform is built for beginners, intermediate lifters, and athletes who want more structure than a generic workout app can offer.",
      },
    ],
  },
  {
    title: "Pricing",
    items: [
      {
        question: "Is there a free plan?",
        answer:
          "Yes. Starter gives users a clean entry point for logging, structure, and basic progress. Premium unlocks adaptive guidance, deeper analytics, and future ecosystem layers.",
      },
      {
        question: "Will there be team or school pricing?",
        answer:
          "Yes. FoFit is designed to expand into schools, clubs, and performance groups with shared structures and broader account management.",
      },
    ],
  },
  {
    title: "Access",
    items: [
      {
        question: "Can I join before every feature is live?",
        answer:
          "Yes. FoFit is being built as an evolving platform, and early members will get access to the core system first, followed by new modules as the ecosystem expands.",
      },
      {
        question: "Is FoFit mobile-first?",
        answer:
          "Yes. The product is designed around real training use, but the broader company site is built to communicate the depth of the full platform.",
      },
    ],
  },
  {
    title: "AI Coaching",
    items: [
      {
        question: "What does Cypher actually do?",
        answer:
          "Cypher is FoFit's adaptive guidance layer. It helps shape planning, interprets training context, and supports decisions around session quality, progression, and recovery.",
      },
      {
        question: "Is AI replacing coaching?",
        answer:
          "No. FoFit is building AI as a scalable guidance layer, with future room for human coaches, reviews, and accountability on top of the core system.",
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        question: "Where can I get help?",
        answer:
          "The FAQ and Insights hub are the first layer. Over time, support will expand into deeper onboarding, community help, and expert coaching pathways.",
      },
      {
        question: "How often will the platform evolve?",
        answer:
          "FoFit is positioned as a living platform. Updates, ecosystem layers, and operational improvements are part of the long-term product direction.",
      },
    ],
  },
];
