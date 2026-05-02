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
          "Starter is always free — workout logging, structured starter plans, basic progress trends, and 5 Cypher sessions per month. Premium is $12.99/month ($99/yr, effective $8.25/mo), and founding members lock that rate for life.",
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
          "FoFit is a personalized fitness platform that brings training structure, adaptive guidance, progress tracking, and nutrition direction into one connected system.",
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
          "Yes. Starter gives athletes a clean entry point for logging, structure, basic progress, and 5 Cypher sessions per month. Premium adds adaptive guidance, deeper analytics, and future ecosystem layers.",
      },
      {
        question: "Is there a discount for students or military?",
        answer:
          "Yes. Premium · Student is $7.99/mo for verified .edu email holders. Premium · Hero is $9.99/mo for military, first responders, medical workers, and teachers, verified through SheerID. Both rates hold as long as eligibility is current.",
      },
      {
        question: "What are Cypher Tokens?",
        answer:
          "Tokens are pay-as-you-go for athletes who want to use Cypher without a subscription. One token = one Cypher session. Free Starter members get 5 sessions per month included. After that, top up with a token pack — they never expire and stack with any plan.",
      },
      {
        question: "Do I get a free trial?",
        answer:
          "Yes. Premium annual includes a 7-day free trial — full access to Cypher, adaptive plans, nutrition direction, and analytics. Cancel before day 7 and you're not charged.",
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
