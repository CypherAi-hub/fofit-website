import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useEarlyAccess } from "../../app/waitlist-context";
import {
  waitlistBenefits,
  waitlistGoals,
  waitlistProfiles,
  waitlistSuccessPoints,
} from "../../data/waitlist";
import { Button } from "../ui/Button";

type WaitlistStatus = "idle" | "submitting" | "success" | "error";

type WaitlistForm = {
  firstName: string;
  email: string;
  goal: string;
  profile: string;
};

const INITIAL_FORM: WaitlistForm = {
  firstName: "",
  email: "",
  goal: waitlistGoals[0],
  profile: waitlistProfiles[0],
};

const STORAGE_KEY = "fofit-waitlist-draft";

function buildReferralCode(firstName: string, email: string) {
  const seed = `${firstName}${email}`.replace(/[^a-z0-9]/gi, "").toLowerCase();
  return `ff-${seed.slice(0, 8) || "member"}`;
}

export function WaitlistModal() {
  const { close, isOpen, joinedEmail, setJoinedEmail } = useEarlyAccess();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<WaitlistForm>(INITIAL_FORM);
  const [status, setStatus] = useState<WaitlistStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [savedMode, setSavedMode] = useState<"remote" | "local" | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<WaitlistForm>;
        setForm((current) => ({ ...current, ...parsed }));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [close, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      setStatus("idle");
      setError(null);
    }
  }, [isOpen]);

  const referralCode = useMemo(
    () => buildReferralCode(form.firstName, form.email),
    [form.email, form.firstName],
  );

  if (!isOpen) {
    return null;
  }

  const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT;
  const formValid =
    form.firstName.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

  async function handleSubmit() {
    if (!formValid) {
      setError("Enter a valid first name and email to continue.");
      return;
    }

    setStatus("submitting");
    setError(null);

    const payload = {
      ...form,
      source: "website",
      referralCode,
      submittedAt: new Date().toISOString(),
    };

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Remote waitlist request failed");
        }

        setSavedMode("remote");
      } else {
        const existing = window.localStorage.getItem("fofit-waitlist-submissions");
        const submissions = existing ? (JSON.parse(existing) as typeof payload[]) : [];
        submissions.push(payload);
        window.localStorage.setItem(
          "fofit-waitlist-submissions",
          JSON.stringify(submissions),
        );
        setSavedMode("local");
      }

      setJoinedEmail(form.email.trim());
      setStatus("success");
      setStep(2);
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      setStatus("error");
      setError(
        "We hit a snag saving your request. You can still continue and we will keep your draft locally in this browser.",
      );
      const existing = window.localStorage.getItem("fofit-waitlist-submissions");
      const submissions = existing ? (JSON.parse(existing) as typeof payload[]) : [];
      submissions.push(payload);
      window.localStorage.setItem(
        "fofit-waitlist-submissions",
        JSON.stringify(submissions),
      );
      setSavedMode("local");
      setJoinedEmail(form.email.trim());
      setStep(2);
    }
  }

  function renderStep() {
    if (step === 0) {
      return (
        <div className="waitlist-modal__panel">
          <div className="waitlist-progress">
            <span className="is-active" />
            <span />
            <span />
          </div>
          <span className="eyebrow">Founding member access</span>
          <h2>Step into FoFit before the wider launch.</h2>
          <p>
            Claim early access to the premium release, founding-member pricing,
            and the first wave of deeper platform features.
          </p>
          <div className="waitlist-fields">
            <label>
              <span>First name</span>
              <input
                onChange={(event) =>
                  setForm((current) => ({ ...current, firstName: event.target.value }))
                }
                placeholder="Kenan"
                value={form.firstName}
              />
            </label>
            <label>
              <span>Email</span>
              <input
                onChange={(event) =>
                  setForm((current) => ({ ...current, email: event.target.value }))
                }
                placeholder="you@domain.com"
                type="email"
                value={form.email}
              />
            </label>
          </div>
          <div className="waitlist-modal__benefits">
            {waitlistBenefits.map((benefit) => (
              <div className="waitlist-benefit" key={benefit}>
                {benefit}
              </div>
            ))}
          </div>
          {joinedEmail ? (
            <div className="waitlist-inline-note">
              Already joined as <strong>{joinedEmail}</strong>. You can still update
              your details here.
            </div>
          ) : null}
          {error ? <div className="waitlist-error">{error}</div> : null}
          <div className="waitlist-actions">
            <Button onClick={close} variant="ghost">
              Maybe later
            </Button>
            <Button
              onClick={() => {
                if (!formValid) {
                  setError("Enter a valid first name and email to continue.");
                  return;
                }
                setError(null);
                setStep(1);
              }}
              size="lg"
            >
              Continue
            </Button>
          </div>
        </div>
      );
    }

    if (step === 1) {
      return (
        <div className="waitlist-modal__panel">
          <div className="waitlist-progress">
            <span className="is-complete" />
            <span className="is-active" />
            <span />
          </div>
          <span className="eyebrow">Training profile</span>
          <h2>Tell us how you want FoFit to meet you.</h2>
          <p>
            This keeps the flow feeling premium now and gives the backend room
            for better segmentation later.
          </p>
          <div className="waitlist-choice-grid">
            {waitlistGoals.map((goal) => (
              <button
                className={`waitlist-choice ${
                  form.goal === goal ? "is-selected" : ""
                }`}
                key={goal}
                onClick={() => setForm((current) => ({ ...current, goal }))}
                type="button"
              >
                {goal}
              </button>
            ))}
          </div>
          <div className="waitlist-choice-grid waitlist-choice-grid--secondary">
            {waitlistProfiles.map((profile) => (
              <button
                className={`waitlist-choice ${
                  form.profile === profile ? "is-selected" : ""
                }`}
                key={profile}
                onClick={() => setForm((current) => ({ ...current, profile }))}
                type="button"
              >
                {profile}
              </button>
            ))}
          </div>
          {error ? <div className="waitlist-error">{error}</div> : null}
          <div className="waitlist-actions">
            <Button onClick={() => setStep(0)} variant="ghost">
              Back
            </Button>
            <Button onClick={handleSubmit} size="lg">
              {status === "submitting" ? "Saving..." : "Join waitlist"}
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="waitlist-modal__panel waitlist-modal__panel--success">
        <div className="waitlist-progress">
          <span className="is-complete" />
          <span className="is-complete" />
          <span className="is-active" />
        </div>
        <div className="waitlist-success__badge">You’re in</div>
        <h2>{form.firstName || "You"} now have a spot in FoFit early access.</h2>
        <p>
          {savedMode === "remote"
            ? "Your request was sent successfully and you’ll be included in the next early-access wave."
            : "Your request has been saved in local fallback mode for now. Add a live backend endpoint when you’re ready and this flow can submit remotely without redesign."}
        </p>
        <div className="waitlist-success__meta">
          <div>
            <span>Email</span>
            <strong>{form.email}</strong>
          </div>
          <div>
            <span>Referral code</span>
            <strong>{referralCode}</strong>
          </div>
        </div>
        <div className="waitlist-success__list">
          {waitlistSuccessPoints.map((point) => (
            <div key={point}>{point}</div>
          ))}
        </div>
        <div className="waitlist-inline-note">
          Live endpoint support: set <code>VITE_WAITLIST_ENDPOINT</code> to wire
          this flow into your backend.
        </div>
        <div className="waitlist-actions">
          <Button onClick={close} size="lg">
            Return to site
          </Button>
        </div>
      </div>
    );
  }

  return createPortal(
    <div
      aria-modal="true"
      className="waitlist-modal"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          close();
        }
      }}
      role="dialog"
    >
      <div className="waitlist-modal__backdrop" />
      <div className="waitlist-modal__shell">
        <button
          aria-label="Close waitlist"
          className="waitlist-modal__close"
          onClick={close}
          type="button"
        >
          ×
        </button>
        <div className="waitlist-modal__aside">
          <span className="eyebrow">FoFit early access</span>
          <h3>A premium path into the platform.</h3>
          <p>
            This conversion layer now lives globally across the site, so every
            major CTA opens the same polished early-access flow instead of
            scattering users into different outcomes.
          </p>
          <div className="waitlist-aside__card">
            <span>Platform focus</span>
            <strong>Structured training · Adaptive guidance · Premium membership</strong>
          </div>
        </div>
        {renderStep()}
      </div>
    </div>,
    document.body,
  );
}
