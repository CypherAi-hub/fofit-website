import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useEarlyAccess } from "../../app/waitlist-context";
import {
  waitlistBenefits,
  waitlistGoals,
  waitlistProfiles,
  waitlistSuccessPoints,
} from "../../data/waitlist";
import { Button } from "../ui/Button";
import { joinWaitlist } from "../../lib/waitlist";

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
const VALIDATION_ERROR = "Enter a valid first name and email to continue.";
const WAITLIST_TITLE_IDS = [
  "waitlist-title-step-0",
  "waitlist-title-step-1",
  "waitlist-title-step-2",
] as const;
const WAITLIST_DESCRIPTION_IDS = [
  "waitlist-description-step-0",
  "waitlist-description-step-1",
  "waitlist-description-step-2",
] as const;
const WAITLIST_ERROR_ID = "waitlist-form-error";
const FIRST_NAME_INPUT_ID = "waitlist-first-name";
const EMAIL_INPUT_ID = "waitlist-email";

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
  const [realReferralCode, setRealReferralCode] = useState<string | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const modalShellRef = useRef<HTMLDivElement | null>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (document.activeElement instanceof HTMLElement) {
      lastActiveElementRef.current = document.activeElement;
    }

    scrollYRef.current = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.width = "100%";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = modalShellRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements) {
        return;
      }

      const focusable = Array.from(focusableElements).filter(
        (element) => !element.hasAttribute("hidden") && element.getClientRects().length > 0,
      );

      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const firstFocusable = focusable[0];
      const lastFocusable = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

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

    requestAnimationFrame(() => {
      firstInputRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.removeEventListener("keydown", onKeyDown);
      window.scrollTo({ top: scrollYRef.current, behavior: "auto" });
      lastActiveElementRef.current?.focus();
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
      setRealReferralCode(null);
    }
  }, [isOpen]);

  const referralCode = useMemo(
    () => buildReferralCode(form.firstName, form.email),
    [form.email, form.firstName],
  );

  if (!isOpen) {
    return null;
  }

  const firstNameValid = form.firstName.trim().length >= 2;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const formValid = firstNameValid && emailValid;
  const hasValidationError = error === VALIDATION_ERROR;
  const activeTitleId = WAITLIST_TITLE_IDS[Math.min(step, WAITLIST_TITLE_IDS.length - 1)];
  const activeDescriptionId =
    WAITLIST_DESCRIPTION_IDS[Math.min(step, WAITLIST_DESCRIPTION_IDS.length - 1)];

  async function handleSubmit() {
    if (!formValid) {
      setError(VALIDATION_ERROR);
      return;
    }

    setStatus("submitting");
    setError(null);

    const result = await joinWaitlist(form.firstName.trim(), form.email.trim());

    if (result.kind === "success" || result.kind === "already_joined") {
      setRealReferralCode(result.referralCode);
      setSavedMode("remote");
      setJoinedEmail(form.email.trim());
      setStatus("success");
      setStep(2);
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      setStatus("error");
      setError(result.message);
    }
  }

  return createPortal(
    <div
      aria-describedby={activeDescriptionId}
      aria-labelledby={activeTitleId}
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
      <div className="waitlist-modal__shell" ref={modalShellRef}>
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
            Claim a founding spot, keep the early Premium rate, and help shape
            the first student-athlete release before the wider launch.
          </p>
          <div className="waitlist-aside__card">
            <span>Platform focus</span>
            <strong>Structured training · Adaptive guidance · Premium membership</strong>
          </div>
        </div>
        {step === 0 ? (
          <div className="waitlist-modal__panel">
            <div className="waitlist-progress">
              <span className="is-active" />
              <span />
              <span />
            </div>
            <span className="eyebrow">Founding member access</span>
            <h2 id={WAITLIST_TITLE_IDS[0]}>Step into FoFit before the wider launch.</h2>
            <p id={WAITLIST_DESCRIPTION_IDS[0]}>
              Claim early access to the premium release, founding-member pricing,
              and the first wave of deeper platform features.
            </p>
            <div className="waitlist-fields">
              <label>
                <span>First name</span>
                <input
                  aria-describedby={
                    hasValidationError && !firstNameValid ? WAITLIST_ERROR_ID : undefined
                  }
                  aria-invalid={hasValidationError && !firstNameValid}
                  id={FIRST_NAME_INPUT_ID}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, firstName: event.target.value }))
                  }
                  placeholder="Kenan"
                  ref={firstInputRef}
                  value={form.firstName}
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  aria-describedby={hasValidationError && !emailValid ? WAITLIST_ERROR_ID : undefined}
                  aria-invalid={hasValidationError && !emailValid}
                  id={EMAIL_INPUT_ID}
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
            {error ? <div className="waitlist-error" id={WAITLIST_ERROR_ID}>{error}</div> : null}
            <div className="waitlist-actions">
              <Button onClick={close} variant="ghost">
                Maybe later
              </Button>
              <Button
                onClick={() => {
                  if (!formValid) {
                    setError(VALIDATION_ERROR);
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
        ) : step === 1 ? (
          <div className="waitlist-modal__panel">
            <div className="waitlist-progress">
              <span className="is-complete" />
              <span className="is-active" />
              <span />
            </div>
            <span className="eyebrow">Training profile</span>
            <h2 id={WAITLIST_TITLE_IDS[1]}>Tell us how you want FoFit to meet you.</h2>
            <p id={WAITLIST_DESCRIPTION_IDS[1]}>
              A quick detail so we can set up your early access.
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
              <Button disabled={status === "submitting"} onClick={handleSubmit} size="lg">
                {status === "submitting" ? "Saving..." : "Join waitlist"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="waitlist-modal__panel waitlist-modal__panel--success">
            <div className="waitlist-progress">
              <span className="is-complete" />
              <span className="is-complete" />
              <span className="is-active" />
            </div>
            <div className="waitlist-success__badge">You’re in</div>
            <h2 id={WAITLIST_TITLE_IDS[2]}>
              {form.firstName || "You"}, you now have a spot in FoFit early access.
            </h2>
            <p id={WAITLIST_DESCRIPTION_IDS[2]}>
              Your request was sent successfully and you’ll be included in the next early-access wave.
            </p>
            <div className="waitlist-success__meta">
              <div>
                <span>Email</span>
                <strong>{form.email}</strong>
              </div>
              <div>
                <span>Referral code</span>
                <strong>{realReferralCode ?? referralCode}</strong>
              </div>
            </div>
            <div className="waitlist-success__list">
              {waitlistSuccessPoints.map((point) => (
                <div key={point}>{point}</div>
              ))}
            </div>
            <div className="waitlist-actions">
              <Button onClick={close} size="lg">
                Return to site
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
