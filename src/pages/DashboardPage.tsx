import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageMeta } from "../components/layout/PageMeta";
import {
  RouteFeatureLedger,
  RoutePhoneCluster,
} from "../components/marketing/RouteProofSections";
import { Button } from "../components/ui/Button";
import { futureAssets } from "../data/future-homepage";
import { useAuth } from "../lib/auth-context";
import { useWaitlistClaim } from "../lib/waitlist-claim";

const dashboardRows = [
  {
    label: "Access",
    title: "Your account is attached to the founding rollout.",
    detail:
      "FoFit can keep TestFlight access, waitlist claims, and future web account controls connected to this session.",
  },
  {
    label: "Product",
    title: "The mobile app remains the source of truth.",
    detail:
      "Training, Cypher, nutrition, and community are the surfaces this account is preparing you to use.",
  },
  {
    label: "Next",
    title: "Invite waves move through email first.",
    detail:
      "When another seat opens, the account email below is the one FoFit will use for the launch path.",
  },
] as const;

export function DashboardPage() {
  const navigate = useNavigate();
  const { session, user, loading, signOut } = useAuth();
  useWaitlistClaim();

  useEffect(() => {
    if (!loading && !session) {
      navigate("/login", { replace: true });
    }
  }, [loading, session, navigate]);

  if (loading || !session) {
    return (
      <section className="auth-page auth-page--centered">
        <div className="container auth-welcome">
          <span className="eyebrow">Dashboard</span>
          <p className="auth-welcome__description">Loading your FoFit account...</p>
        </div>
      </section>
    );
  }

  async function onSignOut() {
    await signOut();
    navigate("/", { replace: true });
  }

  return (
    <>
      <PageMeta
        description="Your FoFit account dashboard."
        title="Dashboard | FoFit"
      />
      <section className="auth-page auth-page--centered">
        <div className="container auth-welcome">
          <span className="eyebrow">Dashboard</span>
          <h1 className="auth-welcome__title">You&apos;re in.</h1>
          <p className="auth-welcome__description">
            TestFlight invite coming soon. We&apos;ll email you the moment a seat opens up.
          </p>
          <RoutePhoneCluster
            images={[
              {
                image: futureAssets.app.simCypher,
                label: "Cypher",
                treatment: "phone",
              },
              {
                image: futureAssets.app.simTrain,
                label: "Train",
                treatment: "phone",
              },
              {
                image: futureAssets.app.simCommunity,
                label: "Community",
                treatment: "phone",
              },
            ]}
            label="FoFit dashboard product preview"
          />
          <div className="auth-welcome__account">
            <span>Signed in as</span>
            <strong>{user?.email}</strong>
          </div>
          <RouteFeatureLedger rows={dashboardRows} />
          <div className="button-row auth-welcome__actions">
            <Button to="/" size="lg" variant="secondary">
              Back to FoFit
            </Button>
            <button className="button button--ghost button--lg" onClick={onSignOut} type="button">
              Sign out
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
