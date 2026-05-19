import { type FormEvent, useState } from "react";
import {
  DEVICE_OPTIONS,
  FITNESS_ROLE_OPTIONS,
  GOAL_OPTIONS,
  HEAR_OPTIONS,
} from "../../data/beta";
import { type BetaPayload, joinBeta } from "../../lib/beta";

/**
 * iOS beta access form.
 *
 * Single-page form (unlike the multi-step WaitlistModal) — a dedicated /beta
 * page has the room, and a flat form is fewer states to get wrong. It reuses
 * the modal's form styling (waitlist-fields / waitlist-choice / waitlist-error)
 * so it inherits the existing visual language instead of inventing one.
 *
 * The form's only job is collect + submit. It does NOT own the success state:
 * BetaPage decides what success looks like (TestFlight link vs. waitlist
 * confirmation) because that branch depends on device + BETA_MODE, which are
 * page-level concerns. On success the form hands the payload up via onSuccess.
 */

type BetaFormState = {
  name: string;
  email: string;
  device: string;
  fitnessRole: string;
  mainGoal: string;
  willingToFeedback: boolean;
  howHeard: string;
};

// Same shape the WaitlistModal validates against — keeps email rules consistent.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ERROR_ID = "beta-form-error";

const INITIAL_FORM: BetaFormState = {
  name: "",
  email: "",
  // Device is intentionally unselected: this is an iOS-beta page, but Android
  // users land here too and must be routed to the waitlist — defaulting to
  // "iphone" would silently mislabel them. So device is a required choice.
  device: "",
  fitnessRole: FITNESS_ROLE_OPTIONS[0].value,
  mainGoal: GOAL_OPTIONS[0].value,
  willingToFeedback: false,
  howHeard: "",
};

type Status = "idle" | "submitting" | "error";

type BetaAccessFormProps = {
  onSuccess: (payload: BetaPayload) => void;
};

export function BetaAccessForm({ onSuccess }: BetaAccessFormProps) {
  const [form, setForm] = useState<BetaFormState>(INITIAL_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const nameValid = form.name.trim().length >= 2;
  const emailValid = EMAIL_RE.test(form.email.trim());
  const deviceValid = form.device !== "";
  const showError = status === "error" && error !== null;

  function update<K extends keyof BetaFormState>(
    key: K,
    value: BetaFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") {
      return;
    }

    if (!nameValid || !emailValid) {
      setStatus("error");
      setError("Enter your name and a valid email to continue.");
      return;
    }
    if (!deviceValid) {
      setStatus("error");
      setError("Let us know which device you'll be testing on.");
      return;
    }

    setStatus("submitting");
    setError(null);

    const payload: BetaPayload = {
      name: form.name.trim(),
      email: form.email.trim(),
      device: form.device,
      fitnessRole: form.fitnessRole,
      mainGoal: form.mainGoal,
      willingToFeedback: form.willingToFeedback,
      howHeard: form.howHeard,
    };

    const result = await joinBeta(payload);

    if (result.kind === "success") {
      onSuccess(payload);
      return;
    }

    // Backend errored. Surface the message and keep every field as the tester
    // left it — never clear input or fake a success on a real failure.
    setStatus("error");
    setError(result.message);
  }

  return (
    <form
      className="beta-form"
      data-form="beta-access"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="waitlist-fields">
        <label>
          <span>Name</span>
          <input
            aria-describedby={showError && !nameValid ? ERROR_ID : undefined}
            aria-invalid={showError && !nameValid}
            autoComplete="name"
            name="name"
            onChange={(event) => update("name", event.target.value)}
            placeholder="Your name"
            value={form.name}
          />
        </label>
        <label>
          <span>Email</span>
          <input
            aria-describedby={showError && !emailValid ? ERROR_ID : undefined}
            aria-invalid={showError && !emailValid}
            autoComplete="email"
            name="email"
            onChange={(event) => update("email", event.target.value)}
            placeholder="you@domain.com"
            type="email"
            value={form.email}
          />
        </label>
      </div>

      <fieldset className="beta-fieldset">
        <legend>Which device will you test on?</legend>
        <div className="waitlist-choice-grid">
          {DEVICE_OPTIONS.map((option) => (
            <button
              aria-pressed={form.device === option.value}
              className={`waitlist-choice ${
                form.device === option.value ? "is-selected" : ""
              }`.trim()}
              key={option.value}
              onClick={() => update("device", option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="beta-fieldset__hint">
          TestFlight runs on iOS. Android testers join the launch waitlist
          instead — pick what you actually have.
        </p>
      </fieldset>

      <fieldset className="beta-fieldset">
        <legend>How would you describe yourself?</legend>
        <div className="waitlist-choice-grid">
          {FITNESS_ROLE_OPTIONS.map((option) => (
            <button
              aria-pressed={form.fitnessRole === option.value}
              className={`waitlist-choice ${
                form.fitnessRole === option.value ? "is-selected" : ""
              }`.trim()}
              key={option.value}
              onClick={() => update("fitnessRole", option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="beta-fieldset">
        <legend>What should FoFit help with first?</legend>
        <div className="waitlist-choice-grid">
          {GOAL_OPTIONS.map((option) => (
            <button
              aria-pressed={form.mainGoal === option.value}
              className={`waitlist-choice ${
                form.mainGoal === option.value ? "is-selected" : ""
              }`.trim()}
              key={option.value}
              onClick={() => update("mainGoal", option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="waitlist-fields">
        <label>
          <span>How did you hear about the beta?</span>
          <select
            className="beta-select"
            name="howHeard"
            onChange={(event) => update("howHeard", event.target.value)}
            value={form.howHeard}
          >
            {HEAR_OPTIONS.map((option) => (
              <option key={option.value || "none"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="beta-check">
        <input
          checked={form.willingToFeedback}
          name="willingToFeedback"
          onChange={(event) => update("willingToFeedback", event.target.checked)}
          type="checkbox"
        />
        <span>
          I&apos;m happy to share honest feedback while I test the beta.
        </span>
      </label>

      {showError ? (
        <div className="waitlist-error" id={ERROR_ID} role="alert">
          {error}
        </div>
      ) : null}

      <div className="beta-actions">
        <button
          className="button button--primary button--lg beta-submit"
          disabled={status === "submitting"}
          type="submit"
        >
          {status === "submitting" ? "Sending…" : "Request iOS beta access"}
        </button>
      </div>
    </form>
  );
}
