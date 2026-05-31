export type FAQGroup = {
  title: string;
  items: {
    question: string;
    answer: string;
  }[];
};

export const faqGroups: FAQGroup[] = [
  {
    title: "Launch",
    items: [
      {
        question: "Is FoFit live yet?",
        answer:
          "The mobile app is in closed beta. The waitlist is open today, and founding members get access first as TestFlight invites go out.",
      },
      {
        question: "When does it launch?",
        answer:
          "Public launch is targeted for summer 2026. Waitlist signups are notified the moment a TestFlight seat opens, well before the wider release.",
      },
      {
        question: "Is it free?",
        answer:
          "Starter is always free for basic logging, starter plans, and limited Cypher. Student is $9.99/month and Standard is $14.99/month for the full FoFit system.",
      },
      {
        question: "Who is it for?",
        answer:
          "FoFit has three paths: Lifter, Athlete, and Coach. Beginners can start with structure, athletes can train around a real week, and coaches can follow the FoFit Teams path.",
      },
    ],
  },
  {
    title: "Product",
    items: [
      {
        question: "What is FoFit, exactly?",
        answer:
          "FoFit combines AI coaching, personalized training, nutrition, and community in one connected fitness app.",
      },
      {
        question: "Is FoFit only for advanced lifters?",
        answer:
          "No. The platform is built for beginners, intermediate lifters, and athletes who want more structure than a generic workout app can offer.",
      },
      {
        question: "Is FoFit only for student athletes?",
        answer:
          "No. Student athletes shaped the product and remain the proof, but FoFit is not limited to them. Athlete is aspirational here.",
      },
      {
        question: "Can I change my path later?",
        answer:
          "Yes. The role picker helps FoFit understand your starting context. It does not lock your account forever.",
      },
    ],
  },
  {
    title: "Pricing",
    items: [
      {
        question: "Is there a free plan?",
        answer:
          "Yes. Starter gives people a clean entry point for logging, structure, and limited Cypher. Student and Standard add the full AI coaching, nutrition, and community system.",
      },
      {
        question: "Is there a discount for students or military?",
        answer:
          "Yes. Student is $9.99/mo for verified students. Additional verified pricing can be evaluated as the platform opens more broadly.",
      },
      {
        question: "What are Cypher Tokens?",
        answer:
          "Tokens are pay-as-you-go for athletes who want to use Cypher without a subscription. One token = one Cypher session. Free Starter members get 5 sessions per month included. After that, top up with a token pack — they never expire and stack with any plan.",
      },
      {
        question: "Do I get a free trial?",
        answer:
          "Trial details will be finalized before public launch. Join the beta list to get early access and pricing updates first.",
      },
      {
        question: "Will there be team or school pricing?",
        answer:
          "Yes. FoFit is designed to expand into schools, clubs, and performance groups with shared structures and broader account management.",
      },
      {
        question: "What is FoFit Teams?",
        answer:
          "FoFit Teams is the B2B path for coaches, schools, clubs, and training groups that need shared structure and visibility.",
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
