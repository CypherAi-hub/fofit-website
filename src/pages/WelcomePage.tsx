import { Link } from "react-router-dom";
import { PageMeta } from "../components/layout/PageMeta";
import { Button } from "../components/ui/Button";
import { useAuth } from "../lib/auth-context";

const FOUNDER_LINKEDIN_URL = "https://www.linkedin.com/in/kenan-larry-993350332";

export function WelcomePage() {
  const { user } = useAuth();
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
          <h1 className="auth-welcome__title">
            Welcome to FoFit, <em>{firstName}</em>.
          </h1>
          <p className="auth-welcome__description">
            Your account is ready. We&apos;ll email you the moment the app is live on TestFlight.
          </p>
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
        </div>
      </section>
    </>
  );
}
