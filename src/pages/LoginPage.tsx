import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components/auth/AuthForm";
import { PageMeta } from "../components/layout/PageMeta";
import { EarlyAccessButton } from "../components/marketing/EarlyAccessButton";
import {
  RouteFeatureLedger,
  RoutePhoneCluster,
} from "../components/marketing/RouteProofSections";
import { futureAssets } from "../data/future-homepage";
import { useAuth } from "../lib/auth-context";

const loginProofRows = [
  {
    label: "One account",
    title: "Training, nutrition, Cypher, and community stay connected.",
    detail:
      "The website sign-in uses the same identity layer as the mobile product, so early access and future web surfaces can share one account.",
  },
  {
    label: "Founding access",
    title: "Your web session keeps the launch path close.",
    detail:
      "Sign in to manage your account, keep your waitlist claim attached, and be ready when TestFlight seats open.",
  },
  {
    label: "Product proof",
    title: "The app screens are the point.",
    detail:
      "FoFit is showing the actual training, Cypher, nutrition, and community surfaces instead of hiding behind a generic waitlist.",
  },
] as const;

export function LoginPage() {
  const navigate = useNavigate();
  const { session, loading } = useAuth();

  useEffect(() => {
    if (!loading && session) {
      navigate("/dashboard", { replace: true });
    }
  }, [loading, session, navigate]);

  return (
    <>
      <PageMeta
        description="Sign in to FoFit — same account across mobile and web."
        title="Sign in to FoFit"
      />
      <section className="auth-page">
        <div className="container auth-page__inner">
          <div className="auth-page__intro">
            <span className="eyebrow">Welcome back</span>
            <h1 className="auth-page__title">Sign into your FoFit OS.</h1>
            <p className="auth-page__description">
              Pick up where you left off. Your web session and your mobile session share the same account.
            </p>
            <p className="auth-page__switch">
              Don&apos;t have an account yet? <EarlyAccessButton variant="ghost">Join founding 250 →</EarlyAccessButton>
            </p>
            <RouteFeatureLedger rows={loginProofRows} />
          </div>
          <div className="auth-page__stack">
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
                  label: "Nutrition",
                  treatment: "phone",
                },
              ]}
              label="FoFit account surfaces"
            />
            <div className="auth-page__panel">
              <AuthForm mode="login" redirectTo="/dashboard" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
