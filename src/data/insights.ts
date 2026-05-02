export type InsightCategory = "TRAINING" | "NUTRITION" | "RECOVERY" | "PERFORMANCE" | "MINDSET";

export type InsightArticle = {
  slug: string;
  title: string;
  category: InsightCategory;
  excerpt: string;
  readTime: string;
  byline: string;
  body: string;
  sourcesReviewed?: number;
  tierBreakdown?: string;
  featured?: boolean;
};

export const insightCategories = [
  "TRAINING",
  "NUTRITION",
  "RECOVERY",
  "PERFORMANCE",
  "MINDSET",
] as const;

const progressiveOverloadBody = `
The lifter who reads form articles at 11 PM has heard it a thousand times: progressive overload. Add weight every week. Track the bar. Beat last session.

That advice is half a truth dressed up as the whole one. Progressive overload isn't a number on a barbell — it's a system with at least four levers, and load is only one of them. Treating it as "add 5 pounds" works for the first six months and then quietly stops working, while you keep grinding and start getting hurt.

This article is about the other three levers, when each one earns its turn, and why "just add more weight" eventually breaks the people who follow it religiously.

## What the body actually adapts to

Muscle doesn't grow because the bar got heavier. It grows because something disrupted homeostasis hard enough that the body decided it needed to change to handle it next time. Mechanical tension is the primary signal — physical force on the muscle fibers, sustained long enough that the cellular machinery responsible for protein synthesis turns on.

Load creates tension. So does volume. So does the way you actually move through the rep. The body doesn't know what number is on the bar; it knows what stress it's processing. That distinction is the whole article.

The 2026 American College of Sports Medicine Position Stand on resistance training — the first major update in seventeen years, synthesizing 137 systematic reviews and over 30,000 participants — landed on a conclusion that contradicts a lot of bro-science orthodoxy: most training variables matter less than the decision to train consistently and with effort. As lead corresponding author Stuart Phillips put it bluntly, "the best resistance training program is the one you'll actually stick with."[1]

That doesn't mean the variables don't matter. It means the obsession with one variable — load — is misplaced.

## Lever 1: Load

Load is intensity, expressed as a percentage of your one-rep max. It's the variable most lifters track because it's the one written on the bar.

Here's where the research lands: load matters a lot for maximum strength and matters less for muscle growth, as long as you're training close to failure.

A 2017 meta-analysis by Schoenfeld, Grgic, Ogborn, and Krieger pooled 21 studies comparing low-load (≤60% 1RM) versus high-load (>60% 1RM) training, with all sets taken to muscular failure. Strength gains favored the heavy group significantly. Hypertrophy gains were similar between groups.[2] The 2026 ACSM review reached the same conclusion at scale: voluntary strength is best built with heavier loads (≥80% 1RM), but muscle size can be built across a wide spectrum of loads (30% to 80%+) when effort is sufficient.[1]

The takeaway isn't "load doesn't matter." It's that load is specifically a tool for training maximum force production. If your goal is a bigger bench number, heavy loads are the priority. If your goal is bigger pecs, you have more flexibility — and that flexibility becomes important the day your shoulders stop tolerating the heavy stuff.

When you can't add weight without form breaking down, that's not progressive overload anymore. It's compensation. The next lever is waiting.

## Lever 2: Volume

If load is the strength lever, volume is the size lever.

Volume is usually counted as hard sets per muscle group per week — sets taken to within a few reps of failure. Schoenfeld and colleagues' dose-response meta-analysis showed a clear relationship: more sets, more growth, with each additional weekly set associated with measurable gains in muscle size.[3] More volume drives more growth, up to a point.

Same incline dumbbell press, same 100 pounds, same 8 reps. Last week you did 3 sets. This week you do 4. You added a set. The total mechanical work went up. That's progressive overload, and the bar didn't get heavier.

This is the lever that quietly carries most intermediate lifters' progress. When linear load progression stalls — and it will — adding a set, then another, is how you keep growing without forcing a number that your joints have stopped voting for.

There are limits. Volume that exceeds your recovery capacity isn't volume anymore — it's accumulated fatigue that suppresses the next session. The 2026 ACSM guidance points to roughly 10 or more hard sets per muscle per week as a working range for trained lifters seeking hypertrophy, though individual responses vary considerably.[1]

## Lever 3: Frequency

Frequency is how those sets get distributed across the week. Same weekly volume, different splits.

When training volume is held equal, hitting each muscle group at least twice a week tends to produce better hypertrophy than hitting it once. Schoenfeld and colleagues' frequency meta-analysis in Sports Medicine found this advantage at the twice-weekly mark.[4] Beyond two days, when volume is genuinely matched, the differences shrink.

The cellular reason is straightforward enough: muscle protein synthesis stays elevated for roughly a day or two after a sufficient training stimulus, then returns to baseline. Two stimuli per week creates two protein synthesis windows. One stimulus creates one. Over a year, that adds up.

The practical reason is more interesting. Cramming 15 sets of back work into one session means the last 5 sets happen with a depleted nervous system, fatigued grip, and degraded form. The reps technically count. They don't actually do much. Splitting those 15 sets across three sessions of 5 lets every set happen at higher quality. The total volume is the same on paper. The stimulus is better.

Frequency isn't really a third independent lever. It's a way of making volume actually count.

## Lever 4: Execution

The lever almost nobody tracks is the one most likely to be lying to you.

Your nervous system is outcome-oriented. If the goal is to move 145 pounds from chest to lockout, the nervous system will recruit whatever muscles get that done — including the lower back, the hips, the legs, the momentum of a bouncing bar. The CNS doesn't care if your anterior delts did the work. It cares if the rep finished.

This is the difference between muscular failure (the target muscle is done) and technical failure (the form broke first, and the rep finished by recruiting other muscles). When a lifter says they progressed from 135 for 10 strict overhead presses to 145 for 10 cheating presses, they think they progressed. The bar number went up. The mechanical tension on the actual deltoids may have gone down, because the load got redistributed across the body.

Honest execution means the eccentric is controlled, the range of motion is full, and the form is the same in week 12 as it was in week 1. If those things drift to keep the load progression alive, the load progression is fake.

Worth noting: the research on training-to-failure specifically is more nuanced than fitness culture admits. A 2022 Sports Medicine meta-analysis by Refalo and colleagues found no clear evidence that training to momentary muscular failure produces more hypertrophy than stopping shy of it.[5] Hard effort matters. Going to absolute failure on every set may not. The quality of the reps you did is doing more work than the finality of the last one.

## How this changes as you grow

A new lifter can add weight to the bar most sessions. The body is rapidly improving its ability to recruit motor units, coordinate stabilizers, and execute the movement pattern. Most of the early gains are neurological, not structural. Linear load progression works because the body has so much room to improve that almost any disciplined stimulus produces adaptation.

Somewhere between six months and two years of consistent training, that runway runs out. Adding 5 pounds every Monday stops working. The intermediate lifter has to start manipulating other variables — adding sets, controlling tempo, distributing volume across more sessions — because the body's adaptation rate has slowed and pure load-chasing produces diminishing returns alongside accumulating wear.

Notably, the 2026 ACSM Position Stand stepped away from the rigid novice/intermediate/advanced stratification that older guidelines used.[1] The reasoning: the variables that matter most — consistency, training each muscle group at least twice a week, sufficient volume, controlled effort — apply across training ages. The advanced lifter needs more careful programming, but it's a continuum, not a hard category change.

For the seasoned lifter near their genetic ceiling, progress comes from intelligent fluctuation. Periodization. Auto-regulating intensity based on day-to-day readiness. Planned deloads. Wave-loading volume across blocks. The instrument gets more precise because the gains get smaller and harder.

## Why "just add weight" eventually breaks

Connective tissue doesn't adapt as fast as muscle does. Tendons and ligaments are poorly vascularized — they get less blood flow, repair more slowly, and remodel on a longer timeline than the muscle bellies attached to them.

A lifter who pushes load aggressively for years can outrun their connective tissue. The muscle is strong enough to move the weight. The tendon hasn't caught up. That's where tendinopathies live — the chronic elbow pain, the cranky shoulder, the patellar tendon that's been "tweaky for a few months." Sometimes that's where ruptures live too.

Volume and frequency manipulation, with controlled load, lets you keep training hard without forcing the connective tissue to keep up with the muscle every single week. That's not playing it safe. That's playing the long game.

The other failure mode is neurological. Maximum-effort lifting is expensive for the central nervous system. Sustained high-percentage work, week after week, without periodized recovery, eventually drops your output. Sleep gets worse. Resting heart rate climbs. The bar feels heavier than it should. This is non-functional overreaching, and the cure isn't more grit — it's a lower-load week or two that lets the system recover and re-express the fitness underneath.

## What this means for your training

Progressive overload is real. The principle that the body adapts to stress, and you have to keep introducing new stress to keep adapting, is foundational. The 2026 ACSM review didn't dismantle that — it sharpened it.

What it dismantled was the cartoon version: that progress is a number on a bar that has to go up forever. Real progression looks like adding a set when the load won't move. Like extending the eccentric on every rep when the volume can't go higher. Like adding a second weekly session for a lagging muscle group when frequency is the bottleneck. Like accepting that the body needs a deload week even if you don't feel like you've earned one.

The lifters who get strong over decades — not just over months — are the ones who treat overload as a system to manage, not a single number to chase.

That's the work. Pick the right lever for the moment, pull it, recover, repeat.

## Sources

[1] Currier BS, D'Souza AC, Fiatarone Singh MA, Lowisz CV, Rawson ES, Schoenfeld BJ, Smith-Ryan AE, Steen JP, Thomas GA, Triplett NT, Washington TA, Werner TJ, Phillips SM. American College of Sports Medicine Position Stand: Resistance Training Prescription for Muscle Function, Hypertrophy, and Physical Performance in Healthy Adults: An Overview of Reviews. Med Sci Sports Exerc. 2026 Apr 1;58(4):851-872. doi: 10.1249/MSS.0000000000003897. Tier 1/Tier 4 (umbrella review + institutional position stand)

[2] Schoenfeld BJ, Grgic J, Ogborn D, Krieger JW. Strength and Hypertrophy Adaptations Between Low- vs. High-Load Resistance Training: A Systematic Review and Meta-analysis. J Strength Cond Res. 2017 Dec;31(12):3508-3523. doi: 10.1519/JSC.0000000000002200. Tier 1 (systematic review and meta-analysis)

[3] Schoenfeld BJ, Ogborn D, Krieger JW. Dose-response relationship between weekly resistance training volume and increases in muscle mass: A systematic review and meta-analysis. J Sports Sci. 2017 Jun;35(11):1073-1082. doi: 10.1080/02640414.2016.1210197. Tier 1 (systematic review and meta-analysis)

[4] Schoenfeld BJ, Ogborn D, Krieger JW. Effects of Resistance Training Frequency on Measures of Muscle Hypertrophy: A Systematic Review and Meta-Analysis. Sports Med. 2016 Nov;46(11):1689-1697. doi: 10.1007/s40279-016-0543-8. Tier 1 (systematic review and meta-analysis)

[5] Refalo MC, Helms ER, Trexler ET, Hamilton DL, Fyfe JJ. Influence of Resistance Training Proximity-to-Failure on Skeletal Muscle Hypertrophy: A Systematic Review with Meta-analysis. Sports Med. 2023 Mar;53(3):649-665. doi: 10.1007/s40279-022-01784-y. Tier 1 (systematic review and meta-analysis)
`.trim();

export const insightArticles: InsightArticle[] = [
  {
    slug: "progressive-overload-system",
    title: "Progressive Overload Is a System, Not Just More Weight",
    category: "TRAINING",
    excerpt:
      "A better way to think about load, volume, frequency, and execution when the goal is consistent strength and muscle gain.",
    readTime: "8 min",
    byline: "FoFit Editorial",
    sourcesReviewed: 5,
    tierBreakdown: "4 T1, 1 T4",
    body: progressiveOverloadBody,
    featured: true,
  },
  {
    slug: "protein-for-muscle",
    title: "How Much Protein Is Actually Useful for Building Muscle",
    category: "NUTRITION",
    excerpt:
      "What matters most in daily intake, meal distribution, and keeping nutrition realistic enough to sustain.",
    readTime: "4 min",
    byline: "FoFit Editorial",
    body: "CONTENT_PLACEHOLDER",
  },
  {
    slug: "rest-days-program",
    title: "Rest Days Are Part of the Program, Not a Break From It",
    category: "RECOVERY",
    excerpt:
      "The difference between training hard and adapting well usually shows up in how recovery is handled between sessions.",
    readTime: "6 min",
    byline: "FoFit Editorial",
    body: "CONTENT_PLACEHOLDER",
  },
  {
    slug: "adjust-session-readiness",
    title: "How to Adjust a Session When Readiness Is Lower Than Expected",
    category: "PERFORMANCE",
    excerpt:
      "Practical ways to scale intensity, preserve quality, and keep momentum without wasting the day.",
    readTime: "5 min",
    byline: "FoFit Editorial",
    body: "CONTENT_PLACEHOLDER",
  },
  {
    slug: "training-consistency-motivation",
    title: "The Psychology of Training Consistency When Motivation Drops",
    category: "MINDSET",
    excerpt:
      "Why consistency is usually an environment and systems problem, not a discipline problem.",
    readTime: "3 min",
    byline: "FoFit Editorial",
    body: "CONTENT_PLACEHOLDER",
  },
  {
    slug: "balancing-weekly-volume",
    title: "Balancing Weekly Volume Across Muscle Groups Without Overcomplicating It",
    category: "TRAINING",
    excerpt:
      "A practical framework for distributing volume in a way that matches recovery, priorities, and schedule constraints.",
    readTime: "7 min",
    byline: "FoFit Editorial",
    body: "CONTENT_PLACEHOLDER",
  },
];
