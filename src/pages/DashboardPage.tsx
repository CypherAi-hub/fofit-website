import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageMeta } from "../components/layout/PageMeta";
import { Button } from "../components/ui/Button";
import { useAuth } from "../lib/auth-context";
import { useWaitlistClaim } from "../lib/waitlist-claim";

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
          <p className="auth-welcome__description">Loading…</p>
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
          <h1 className="auth-welcome__title">
            You&apos;re <em>in</em>.
          </h1>
          <p className="auth-welcome__description">
            TestFlight invite coming soon. We&apos;ll email you the moment a seat opens up.
          </p>
          <div className="auth-welcome__account">
            <span>Signed in as</span>
            <strong>{user?.email}</strong>
          </div>
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
