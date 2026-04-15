export type InsightArticle = {
  slug: string;
  title: string;
  category: "Training" | "Nutrition" | "Recovery" | "Performance" | "Mindset";
  excerpt: string;
  readTime: string;
  featured?: boolean;
};

export const insightCategories = [
  "Training",
  "Nutrition",
  "Recovery",
  "Performance",
  "Mindset",
] as const;

export const insightArticles: InsightArticle[] = [
  {
    slug: "progressive-overload",
    title: "Progressive Overload Is a System, Not Just More Weight",
    category: "Training",
    excerpt:
      "A better way to think about load, volume, frequency, and execution when the goal is consistent strength and muscle gain.",
    readTime: "5 min read",
    featured: true,
  },
  {
    slug: "protein-needs",
    title: "How Much Protein Is Actually Useful for Building Muscle",
    category: "Nutrition",
    excerpt:
      "What matters most in daily intake, meal distribution, and keeping nutrition realistic enough to sustain.",
    readTime: "4 min read",
  },
  {
    slug: "rest-days",
    title: "Rest Days Are Part of the Program, Not a Break From It",
    category: "Recovery",
    excerpt:
      "The difference between training hard and adapting well usually shows up in how recovery is handled between sessions.",
    readTime: "6 min read",
  },
  {
    slug: "session-readiness",
    title: "How to Adjust a Session When Readiness Is Lower Than Expected",
    category: "Performance",
    excerpt:
      "Practical ways to scale intensity, preserve quality, and keep momentum without wasting the day.",
    readTime: "5 min read",
  },
  {
    slug: "consistency-loop",
    title: "The Psychology of Training Consistency When Motivation Drops",
    category: "Mindset",
    excerpt:
      "Why consistency is usually an environment and systems problem, not a discipline problem.",
    readTime: "3 min read",
  },
  {
    slug: "volume-balance",
    title: "Balancing Weekly Volume Across Muscle Groups Without Overcomplicating It",
    category: "Training",
    excerpt:
      "A practical framework for distributing volume in a way that matches recovery, priorities, and schedule constraints.",
    readTime: "7 min read",
  },
];
