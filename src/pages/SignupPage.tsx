import { useEffect, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthForm } from "../components/auth/AuthForm";
import { PageMeta } from "../components/layout/PageMeta";
import { useAuth } from "../lib/auth-context";

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
            <h1 className="auth-page__title">
              Create your <em>account</em>.
            </h1>
            <p className="auth-page__description">
              One identity across the mobile app and the web. Your account unlocks TestFlight invites the moment the next wave opens.
            </p>
            <p className="auth-page__switch">
              Already have an account? <Link to="/login">Sign in →</Link>
            </p>
          </div>
          <div className="auth-page__panel">
            <AuthForm mode="signup" initialEmail={claimEmail} redirectTo="/welcome" />
          </div>
        </div>
      </section>
    </>
  );
}
