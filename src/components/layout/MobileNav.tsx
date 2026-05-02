import { NavLink, useNavigate } from "react-router-dom";
import { primaryNav } from "../../data/nav";
import { EarlyAccessButton } from "../marketing/EarlyAccessButton";
import { useAuth } from "../../lib/auth-context";

export const MOBILE_NAV_ID = "mobile-navigation";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ open, onClose }: MobileNavProps) {
  const { session, loading, signOut } = useAuth();
  const signedIn = !loading && !!session;
  const navigate = useNavigate();

  async function onSignOut() {
    onClose();
    await signOut();
    navigate("/", { replace: true });
  }

  return (
    <div
      className={`mobile-nav ${open ? "mobile-nav--open" : ""}`}
      hidden={!open}
      id={MOBILE_NAV_ID}
    >
      <aside aria-label="Mobile menu" className="mobile-nav__panel">
        <div className="mobile-nav__header">
          <div className="brand-mark">FoFit</div>
          <button
            aria-label="Close menu"
            className="nav-toggle"
            onClick={onClose}
            type="button"
          >
            <span />
            <span />
          </button>
        </div>
        <nav aria-label="Mobile" className="mobile-nav__links">
          {primaryNav.map((link) => (
            <NavLink
              className={({ isActive }) =>
                `mobile-nav__link ${isActive ? "is-active" : ""}`
              }
              key={link.to}
              onClick={onClose}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
          {signedIn ? (
            <>
              <NavLink className="mobile-nav__link" onClick={onClose} to="/dashboard">
                Dashboard
              </NavLink>
              <button
                className="button button--ghost button--lg mobile-nav__cta"
                onClick={onSignOut}
                type="button"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <NavLink className="mobile-nav__link" onClick={onClose} to="/login">
                Sign in
              </NavLink>
              <EarlyAccessButton className="mobile-nav__cta" onClick={onClose} size="lg">
                Join founding 250
              </EarlyAccessButton>
            </>
          )}
        </nav>
        <p className="mobile-nav__footnote">
          A training platform for lifters, athletes, and teams built around
          planning, guidance, and progress.
        </p>
      </aside>
    </div>
  );
}
