import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthForm } from "../components/auth/AuthForm";
import { PageMeta } from "../components/layout/PageMeta";
import { useAuth } from "../lib/auth-context";

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
            <h1 className="auth-page__title">
              Sign <em>in</em>.
            </h1>
            <p className="auth-page__description">
              Pick up where you left off. Your web session and your mobile session share the same account.
            </p>
            <p className="auth-page__switch">
              Don&apos;t have an account yet? <Link to="/signup">Create one →</Link>
            </p>
          </div>
          <div className="auth-page__panel">
            <AuthForm mode="login" redirectTo="/dashboard" />
          </div>
        </div>
      </section>
    </>
  );
}
