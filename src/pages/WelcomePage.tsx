import { Link } from "react-router-dom";
import { PageMeta } from "../components/layout/PageMeta";
import {
  RouteCardGrid,
  RoutePhoneCluster,
} from "../components/marketing/RouteProofSections";
import { Button } from "../components/ui/Button";
import { futureAssets } from "../data/future-homepage";
import { useAuth } from "../lib/auth-context";
import { useWaitlistClaim } from "../lib/waitlist-claim";

const FOUNDER_LINKEDIN_URL = "https://www.linkedin.com/in/kenan-larry-993350332";

const welcomeCards = [
  {
    label: "Train",
    title: "Start with the day you actually have.",
    detail:
      "FoFit keeps training recommendations tied to recovery, equipment, and the real week around you.",
    image: futureAssets.app.simTrain,
  },
  {
    label: "Nutrition",
    title: "Fuel stays attached to the plan.",
    detail:
      "Photo meals, recipe context, targets, and Cypher guidance all point back to the work you are doing.",
    image: futureAssets.app.simNutrition,
  },
  {
    label: "Community",
    title: "Find people and coaches without leaving the system.",
    detail:
      "The product includes discovery, groups, feed, replies, and verified coach paths as the community opens up.",
    image: futureAssets.app.simDiscoverCommunity,
  },
] as const;

export function WelcomePage() {
  const { user } = useAuth();
  useWaitlistClaim();
  const name =
    (user?.user_metadata?.full_name as string | undefined) ||
    (user?.user_metadata?.name as string | undefined) ||
    user?.email?.split("@")[0] ||
    "athlete";
  const firstName = name.split(" ")[0] ?? name;

  return (
    <>
      <PageMeta
        description="You're in. Your FoFit account is ready."
        title="Welcome to FoFit"
      />
      <section className="auth-page auth-page--centered">
        <div className="container auth-welcome">
          <span className="eyebrow">You&apos;re in</span>
          <h1 className="auth-welcome__title">Welcome to FoFit, {firstName}.</h1>
          <p className="auth-welcome__description">
            Your account is ready. We&apos;ll email you the moment the app is live on TestFlight.
          </p>
          <RoutePhoneCluster
            images={[
              {
                image: futureAssets.app.simTrain,
                label: "Train",
                treatment: "phone",
              },
              {
                image: futureAssets.app.simCypher,
                label: "Cypher",
                treatment: "phone",
              },
              {
                image: futureAssets.app.simNutrition,
                label: "Fuel",
                treatment: "phone",
              },
            ]}
            label="FoFit welcome product preview"
          />
          <div className="button-row auth-welcome__actions">
            <Button to="/" size="lg">
              Back to FoFit
            </Button>
            <Button
              href={FOUNDER_LINKEDIN_URL}
              size="lg"
              variant="secondary"
            >
              Follow the founder on LinkedIn
            </Button>
          </div>
          <p className="auth-welcome__meta">
            Signed in as <strong>{user?.email ?? "your account"}</strong>. You can
            manage your session from <Link to="/dashboard">your dashboard</Link>.
          </p>
          <RouteCardGrid cards={welcomeCards} />
        </div>
      </section>
    </>
  );
}
