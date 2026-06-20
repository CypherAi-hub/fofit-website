import { CTASection } from "../components/marketing/CTASection";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import {
  RouteCardGrid,
  RouteFeatureLedger,
  RoutePhoneCluster,
  RouteSection,
  RouteSplitProof,
  RouteStatGrid,
} from "../components/marketing/RouteProofSections";
import { futureAssets, cypherMemorySignals } from "../data/future-homepage";

const trainingStats = [
  {
    value: "Plan",
    label: "Today's work",
    detail: "The Train surface starts with the day, readiness, and next session context.",
  },
  {
    value: "Log",
    label: "Session flow",
    detail: "Workout detail and set logging stay close enough to act on during training.",
  },
  {
    value: "Adapt",
    label: "Cypher adjustments",
    detail: "The coach can explain changes around soreness, missed days, or sport load.",
  },
  {
    value: "Review",
    label: "Progress context",
    detail: "Volume, streaks, performance, and notes become inputs for the next plan.",
  },
] as const;

const trainingRows = [
  {
    label: "Workout detail",
    title: "The session is concrete before it starts.",
    detail: "Exercise order, block intent, time demand, and workout context are visible before the first set.",
  },
  {
    label: "Active logging",
    title: "Set work stays inside the flow.",
    detail: "Active workout screens keep logging, rest, substitutions, and notes in the same training moment.",
  },
  {
    label: "Recovery-aware",
    title: "The next lift respects the last one.",
    detail: "Soreness and recovery context are treated as planning inputs, not post-workout trivia.",
  },
  {
    label: "Athlete context",
    title: "Practice and conditioning matter.",
    detail: "Sport, class, travel, and conditioning load can change what makes sense today.",
  },
] as const;

const trainingCards = [
  {
    label: "Train Home",
    title: "Today starts with the actual plan.",
    detail: "The top-level training surface shows the session, readiness, and next action.",
    image: futureAssets.app.simTrain,
  },
  {
    label: "Cypher Context",
    title: "The coach sees why the day changed.",
    detail: "Real Cypher screens show the plan context and the reasoning before the adjustment.",
    image: futureAssets.app.simCypher,
  },
  {
    label: "Coach Check-in",
    title: "Training should have a human feel.",
    detail: "Support media gives the training page energy without pretending to be app UI.",
    image: futureAssets.generated.coachAthleteCheckin,
  },
] as const;

export function FeaturesPage() {
  return (
    <>
      <PageMeta
        description="FoFit Training connects plans, workout logging, recovery-aware progression, and Cypher coaching around the real training week."
        title="FoFit Training | Personalized Plans, Logging, and Recovery"
      />
      <PageHero
        actions={[
          { label: "Join founding 250", intent: "waitlist" },
          { label: "See Cypher", to: "/product", variant: "secondary" },
        ]}
        description="Training should start from the day you actually have: the session, the soreness, the schedule, the equipment, and the goal."
        eyebrow="Training"
        media={
          <RoutePhoneCluster
            images={[
              { image: futureAssets.app.simTrain, label: "Today" },
              { image: futureAssets.app.simCypher, label: "Cypher" },
              { image: futureAssets.generated.coachAthleteCheckin, label: "Coach", treatment: "scene" },
            ]}
            label="FoFit training screens"
          />
        }
        title={
          <>
            The plan starts with the day you actually have.
          </>
        }
      />

      <RouteSection
        description="This route now shows the real training surface instead of generic feature promises."
        kicker="Training System"
        title="Plan, log, adapt, and review."
      >
        <RouteStatGrid stats={[...trainingStats]} />
      </RouteSection>

      <RouteSection
        className="route-section--soft"
        description="A training page needs product proof: the home plan, workout detail, and active logging surfaces."
        kicker="Real UI"
        title="What the training loop looks like."
      >
        <RouteCardGrid cards={[...trainingCards]} />
      </RouteSection>

      <RouteSplitProof
        description="Cypher is strongest when it remembers the parts of the week that usually disappear from a workout tracker."
        kicker="Cypher Context"
        media={
          <RoutePhoneCluster
            images={[
              { image: futureAssets.app.simCypher, label: "Cypher" },
              { image: futureAssets.generated.communityCircuitLive, label: "Athlete load", treatment: "scene" },
            ]}
            label="Cypher training context"
          />
        }
        rows={cypherMemorySignals.map((signal) => ({
          label: "Signal",
          title: signal,
          detail: "This stays attached to the next training decision instead of becoming a forgotten note.",
        }))}
        title="Training context should survive the week."
      />

      <RouteSection
        description="These are the jobs the Training surface needs to do every day for the product to feel useful."
        kicker="Feature Depth"
        title="Real features, not feature labels."
      >
        <RouteFeatureLedger rows={[...trainingRows]} />
      </RouteSection>

      <CTASection
        description="Join founding 250 and help tune FoFit around real training weeks."
        pills={["Plan", "Log", "Adapt", "Review"]}
        title={
          <>
            Train the day.
            <br />
            Keep the week connected.
          </>
        }
      />
    </>
  );
}
