import { useState } from "react";
import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";
import { Button } from "../components/ui/Button";
import { Revealer } from "../components/motion/Revealer";
import { BetaAccessForm } from "../components/marketing/BetaAccessForm";
import { BETA_MODE, TESTFLIGHT_URL, deviceCanUseTestFlight } from "../data/beta";
import type { BetaPayload } from "../lib/beta";

/**
 * /beta — the iOS beta funnel.
 *
 * Renders on the lp-* design system (lp-pagehero / lp-section / lp-card) so it
 * matches the homepage. The page owns the success state because what success
 * looks like depends on the device + BETA_MODE:
 *  - iOS-capable device + mode allows it  → show the TestFlight link
 *  - Android-only device                 → waitlist confirmation, no link
 *  - request_only mode                    → "invite by email", no link
 */

type Expectation = { title: string; body: string };

// The four things every prospective tester should understand before signing up
// (spec: limited spots / feedback expected / Android→waitlist / rough edges).
const EXPECTATIONS: Expectation[] = [
  {
    title: "Spots are limited",
    body: "Each beta cohort is kept small so we can act on what testers tell us. Requesting access reserves your place in line.",
  },
  {
    title: "Feedback is the point",
    body: "You'll train with the app and tell us what works and what doesn't. Honest, specific feedback shapes the first public release.",
  },
  {
    title: "iPhone now, Android next",
    body: "TestFlight is Apple's iOS beta tool. Android testers join the launch waitlist and hear from us the moment that build is ready.",
  },
  {
    title: "Expect rough edges",
    body: "This is pre-release software. It will change often and the occasional thing will break — that is normal for a beta.",
  },
];

/** External TestFlight link. Raw <a> so target/rel/data-cta are guaranteed. */
function TestFlightButton() {
  return (
    <a
      className="button button--primary button--lg"
      data-cta="open-testflight"
      href={TESTFLIGHT_URL}
      rel="noopener noreferrer"
      target="_blank"
    >
      Open TestFlight
    </a>
  );
}

/** Post-submit content. Branches on whether the tester can use TestFlight. */
function SuccessPanel({ payload }: { payload: BetaPayload }) {
  const firstName = payload.name.split(" ")[0] || "You";
  // request_only mode collects details but never reveals the link.
  const showTestFlight =
    deviceCanUseTestFlight(payload.device) && BETA_MODE !== "request_only";

  if (showTestFlight) {
    return (
      <>
        <span className="beta-success__badge">You&apos;re in</span>
        <h2>{firstName}, your iOS beta access is ready.</h2>
        <p>
          Install TestFlight, then add FoFit from there. Beta builds update
          often — keep TestFlight on your phone and new versions arrive on
          their own.
        </p>
        <div className="beta-success__actions">
          <TestFlightButton />
          <Button to="/" variant="secondary">
            Back to home
          </Button>
        </div>
        <p className="beta-success__note">
          TestFlight is Apple&apos;s free beta app — you install it first, then
          FoFit. Confirmation tied to {payload.email}.
        </p>
      </>
    );
  }

  const androidOnly = !deviceCanUseTestFlight(payload.device);
  return (
    <>
      <span className="beta-success__badge">You&apos;re on the list</span>
      <h2>{firstName}, you&apos;re on the FoFit beta list.</h2>
      <p>
        {androidOnly
          ? "TestFlight runs on iOS only, so we've added you to the launch waitlist. We'll email you the moment the Android build is ready to test."
          : "Thanks for requesting access — your spot is noted. We'll email your TestFlight invite when the next cohort opens."}
      </p>
      <div className="beta-success__actions">
        <Button to="/">Back to home</Button>
        <Button to="/product" variant="secondary">
          Explore the product
        </Button>
      </div>
      <p className="beta-success__note">
        Confirmation tied to {payload.email}.
      </p>
    </>
  );
}

export function BetaPage() {
  const [submitted, setSubmitted] = useState<BetaPayload | null>(null);

  return (
    <>
      <PageMeta
        description="Test FoFit on iOS through Apple TestFlight before launch. Beta spots are limited — train with Cypher and help shape the first release."
        title="Join the FoFit iOS Beta | TestFlight Early Access"
      />
      <PageHero
        compact
        description="Get FoFit on your iPhone before launch, train with Cypher, and tell us what to fix. Beta spots are limited and every piece of feedback gets read."
        eyebrow="iOS Beta"
        title={
          <>
            Test FoFit
            <br />
            before launch.
          </>
        }
      />

      <section className="lp-section">
        <div className="container">
          {submitted ? (
            <Revealer className="lp-card beta-success">
              <SuccessPanel payload={submitted} />
            </Revealer>
          ) : (
            <div className="beta-layout">
              <Revealer className="beta-aside">
                <span className="lp-kicker">What to expect</span>
                <h2>A small, honest beta.</h2>
                <div className="beta-points">
                  {EXPECTATIONS.map((item) => (
                    <div
                      className="waitlist-benefit beta-point"
                      key={item.title}
                    >
                      <strong>{item.title}</strong>
                      <span>{item.body}</span>
                    </div>
                  ))}
                </div>
                <p className="waitlist-inline-note beta-disclaimer">
                  FoFit is not yet on the App Store. Beta builds are distributed
                  only through Apple TestFlight and remain in active
                  development.
                </p>
              </Revealer>

              <Revealer className="lp-card beta-form-card" delay="1">
                {BETA_MODE === "direct" ? (
                  <div className="beta-form">
                    <h2>The iOS beta is open.</h2>
                    <p className="beta-form-card__lede">
                      Open TestFlight to install the latest FoFit beta build.
                      New builds arrive automatically once you&apos;re in.
                    </p>
                    <div className="beta-actions">
                      <TestFlightButton />
                    </div>
                  </div>
                ) : (
                  <>
                    <h2>Request your beta spot</h2>
                    <p className="beta-form-card__lede">
                      A few details so we can set up your access and reach you
                      with build updates.
                    </p>
                    <BetaAccessForm onSuccess={setSubmitted} />
                  </>
                )}
              </Revealer>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
