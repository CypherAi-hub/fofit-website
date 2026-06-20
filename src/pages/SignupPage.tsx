import { useEffect, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthForm } from "../components/auth/AuthForm";
import { PageMeta } from "../components/layout/PageMeta";
import {
  RouteFeatureLedger,
  RoutePhoneCluster,
} from "../components/marketing/RouteProofSections";
import { futureAssets } from "../data/future-homepage";
import { useAuth } from "../lib/auth-context";

const signupProofRows = [
  {
    label: "Early account",
    title: "Claim the same identity you will use in the app.",
    detail:
      "Your FoFit web account is the bridge from founding access into TestFlight, mobile onboarding, and future account settings.",
  },
  {
    label: "Real surfaces",
    title: "Training, food, and community are already part of the story.",
    detail:
      "Signup is tied to the actual product system: workout context, nutrition tracking, Cypher guidance, and community discovery.",
  },
  {
    label: "No reset",
    title: "The launch path should not make you start over.",
    detail:
      "FoFit keeps early access, waitlist claims, and account history together so the next invite wave has context.",
  },
] as const;

export function SignupPage() {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const [params] = useSearchParams();
  const claimEmail = useMemo(() => params.get("claim") ?? "", [params]);

  useEffect(() => {
    if (!loading && session) {
      navigate("/welcome", { replace: true });
    }
  }, [loading, session, navigate]);

  return (
    <>
      <PageMeta
        description="Create your FoFit account — one identity across the mobile app and the web."
        title="Create your FoFit account"
      />
      <section className="auth-page">
        <div className="container auth-page__inner">
          <div className="auth-page__intro">
            <span className="eyebrow">Join FoFit</span>
            <h1 className="auth-page__title">Create your FoFit account.</h1>
            <p className="auth-page__description">
              One identity across the mobile app and the web. Your account unlocks TestFlight invites the moment the next wave opens.
            </p>
            <p className="auth-page__switch">
              Already have an account? <Link to="/login">Sign in →</Link>
            </p>
            <RouteFeatureLedger rows={signupProofRows} />
          </div>
          <div className="auth-page__stack">
            <RoutePhoneCluster
              images={[
                {
                  image: futureAssets.app.simDiscoverCommunity,
                  label: "Discover",
                  treatment: "phone",
                },
                {
                  image: futureAssets.app.simNutrition,
                  label: "Fuel",
                  treatment: "phone",
                },
                {
                  image: futureAssets.app.simCommunity,
                  label: "Community",
                  treatment: "phone",
                },
              ]}
              label="FoFit signup surfaces"
            />
            <div className="auth-page__panel">
              <AuthForm mode="signup" initialEmail={claimEmail} redirectTo="/welcome" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
