export type InsightArticle = {
  slug: string;
  title: string;
  category: "Training" | "Nutrition" | "Recovery" | "Performance" | "Mindset";
  excerpt: string;
  readTime: string;
  featured?: boolean;
  /**
   * Long-form body as an array of paragraphs — each entry renders as
   * its own <p> on the article detail page (/insights/:slug). Plain
   * prose, no markdown; keep it readable.
   */
  body: string[];
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
    body: [
      'The phrase "progressive overload" usually triggers the wrong instinct — add weight to the bar every week, push to failure, watch the numbers go up. That works for a beginner. After the first six months it stops working and starts breaking people. Overload is real, but it is a system, not a single lever.',
      "Three honest levers move strength and muscle over time: load (how heavy), volume (how many quality sets), and execution (the actual quality of every rep). Most lifters hammer load and ignore the other two. The result is the same weight on the bar with declining bar speed, sloppier positions, and no real adaptation.",
      "A useful pattern is to rotate which lever moves each block. One block adds a small load increment with the same volume and a stricter rep tempo. The next block holds load and adds a working set per session. The next block holds both and tightens execution — quieter setups, fuller range, controlled descents.",
      'If a block ends with the same execution standards, more total quality work, and a clean increase somewhere, that is progressive overload. The single biggest mistake is to confuse "more weight" with "more progress." They are not the same number.',
    ],
  },
  {
    slug: "protein-needs",
    title: "How Much Protein Is Actually Useful for Building Muscle",
    category: "Nutrition",
    excerpt:
      "What matters most in daily intake, meal distribution, and keeping nutrition realistic enough to sustain.",
    readTime: "4 min read",
    body: [
      "Protein recommendations have been a moving target for decades, swinging between extreme totals and minimalist counts. The honest answer for a healthy adult who lifts is closer to the middle than either edge — roughly 1.6 to 2.2 grams per kilogram of body weight per day, give or take a margin. Below that, muscle gain measurably slows. Above it, returns are too small to matter.",
      "Distribution helps more than people give it credit for. Spreading protein across three or four meals lands roughly 30–40 grams per meal for most people, which keeps muscle protein synthesis stimulated through the day instead of front-loaded at dinner. Sources do not have to be exotic — chicken, fish, eggs, dairy, beans, and a basic whey or plant blend cover most of the work.",
      "What ruins protein totals is realism. A target of 200 grams of protein per day fails immediately if it requires four perfect meal-prepped chicken breasts. A target of 140 grams works for a year if it is built around foods someone will actually buy. Lower the bar to the level that survives a normal week and the math wins.",
    ],
  },
  {
    slug: "rest-days",
    title: "Rest Days Are Part of the Program, Not a Break From It",
    category: "Recovery",
    excerpt:
      "The difference between training hard and adapting well usually shows up in how recovery is handled between sessions.",
    readTime: "6 min read",
    body: [
      "Most well-built training programs include rest days for a reason: adaptation happens between sessions, not during them. A workout creates the signal; sleep, food, and time finish the work. Treating rest as a break from training is the same as quitting the program halfway through every cycle.",
      "Active recovery beats total stillness for most people. A walk, a stretch session, an easy bike ride, a swim — anything that moves blood through tired tissue without adding training stress. Heart rate stays low, posture improves, and the next session arrives with less stiffness and clearer head space.",
      "The other rest-day failure is overloading them with errands and stress that cost more than a training session would. Recovery means the nervous system gets a chance to settle. A day spent in traffic, on calls, and at appointments without food or sleep is a hard day, not a rest day. Plan the rest with the same care that goes into the training.",
    ],
  },
  {
    slug: "session-readiness",
    title: "How to Adjust a Session When Readiness Is Lower Than Expected",
    category: "Performance",
    excerpt:
      "Practical ways to scale intensity, preserve quality, and keep momentum without wasting the day.",
    readTime: "5 min read",
    body: [
      'A planned session does not always meet a ready body. Sleep was short, stress was high, the warm-up feels off — these are not excuses to skip, but they are signals that the day\'s plan needs an honest adjustment. The choice is rarely "train hard or quit." It is usually "train smart with what is available."',
      "The simplest adjustment is intensity-down, volume-similar. Drop top-set weights by 10–20% and keep the planned work. The pattern still trains, the volume still counts, and the standards for execution stay intact. The next session is more useful than a session pushed past quality.",
      "If energy is genuinely low — sick, badly under-slept, post-travel — pull volume too. Two clean working sets at a moderate weight beat five sets of bar speed dropping into form breakdown. The program is built on quality reps, not on showing up at all costs. Showing up at half-quality erodes the standard the program depends on.",
      "Track these decisions. Over a few months, the pattern of when readiness dropped, what was adjusted, and how the next session went will tell more about training than any one-rep max.",
    ],
  },
  {
    slug: "consistency-loop",
    title: "The Psychology of Training Consistency When Motivation Drops",
    category: "Mindset",
    excerpt:
      "Why consistency is usually an environment and systems problem, not a discipline problem.",
    readTime: "3 min read",
    body: [
      "Motivation is the worst predictor of training consistency anyone keeps using. It is real, it is felt, and it never lasts the way someone needs it to. The lifters who train for a decade do not have unusual willpower — they have unusual environments and routines that make showing up the easiest move available.",
      "An environment built for training has the bag packed the night before, the route to the gym short, the program written down, and the time on the calendar non-negotiable. None of those choices is heroic. Each one removes one friction point from the chain between intent and action.",
      "Identity does most of the rest. Someone who trains four times a week for five years stops asking whether they feel like training today. The decision was made when the identity was claimed. Missed sessions become reschedules, not abandonment.",
      "When motivation drops — and it will — the rule that survives is small. Show up. Do less than planned. Leave on a high note. Three weeks of small sessions beats one week of perfect ones and three weeks of nothing.",
    ],
  },
  {
    slug: "volume-balance",
    title: "Balancing Weekly Volume Across Muscle Groups Without Overcomplicating It",
    category: "Training",
    excerpt:
      "A practical framework for distributing volume in a way that matches recovery, priorities, and schedule constraints.",
    readTime: "7 min read",
    body: [
      "Weekly volume is one of the most over-engineered topics in training. The honest version is short: most muscle groups respond to 10–20 working sets per week, distributed across two or three sessions. Below 10, growth slows for trained lifters. Above 20, recovery starts to lose more than the extra volume gives.",
      "Priority muscles can sit on the higher end of that range; supporting groups settle lower. A lifter chasing arm development might run 16 sets of biceps and triceps each week alongside 10 sets of chest and back work. Same total weekly volume, different distribution that matches the goal.",
      "Schedule decides what is actually possible. Four sessions per week allows a reasonable upper/lower split with 12–16 sets per major muscle group. Three sessions tightens it — full-body work with eight or nine sets per muscle group spread across the week. Two sessions is enough for maintenance and small gains; not enough for serious pursuit of new size.",
      "The volume mistake almost everyone makes is doing too much of the favourite work and too little of the hard, less-shiny work. Posterior chain, calves, rear delts, neutral-grip pulling — the sets that quietly carry long-term durability. Audit the week. If the boring volume is missing, that is where the next block's adjustments go.",
    ],
  },
];
