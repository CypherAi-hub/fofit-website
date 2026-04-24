import { useState, type FormEvent } from "react";
import { useAuth } from "../../lib/auth-context";

type Mode = "signup" | "login";

type AuthFormProps = {
  mode: Mode;
  redirectTo?: string;
  initialEmail?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthForm({ mode, redirectTo, initialEmail = "" }: AuthFormProps) {
  const { signInWithGoogle, signInWithMagicLink } = useAuth();
  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);
  const [googleBusy, setGoogleBusy] = useState(false);

  const copy =
    mode === "signup"
      ? {
          googleCta: "Continue with Google",
          magicCta: "Send magic link",
        }
      : {
          googleCta: "Sign in with Google",
          magicCta: "Email me a sign-in link",
        };

  async function onGoogle() {
    setError(null);
    setGoogleBusy(true);
    const { error: oauthError } = await signInWithGoogle(redirectTo);
    if (oauthError) {
      setError(oauthError);
      setGoogleBusy(false);
    }
  }

  async function onMagic(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email to receive the link.");
      return;
    }
    setError(null);
    setStatus("sending");
    const { error: otpError } = await signInWithMagicLink(email.trim(), redirectTo);
    if (otpError) {
      setError(otpError);
      setStatus("error");
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="auth-form auth-form--sent reveal">
        <span className="eyebrow">Check your email</span>
        <h3>Link sent to {email}.</h3>
        <p>
          Tap the button in that email to finish {mode === "signup" ? "signing up" : "signing in"}. The link expires in about an hour.
        </p>
        <button
          className="auth-form__resend"
          onClick={() => {
            setStatus("idle");
          }}
          type="button"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div className="auth-form reveal">
      <button
        className="auth-form__google"
        disabled={googleBusy}
        onClick={onGoogle}
        type="button"
      >
        <span className="auth-form__google-glyph" aria-hidden="true">G</span>
        {googleBusy ? "Opening Google…" : copy.googleCta}
      </button>

      <div className="auth-form__divider">
        <span />
        <em>or</em>
        <span />
      </div>

      <form className="auth-form__email" onSubmit={onMagic}>
        <label>
          <span>Email</span>
          <input
            autoComplete="email"
            inputMode="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@school.edu"
            required
            type="email"
            value={email}
          />
        </label>
        <button
          className="auth-form__magic"
          disabled={status === "sending"}
          type="submit"
        >
          {status === "sending" ? "Sending…" : copy.magicCta}
        </button>
      </form>

      {error ? (
        <div className="auth-form__error" role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}
