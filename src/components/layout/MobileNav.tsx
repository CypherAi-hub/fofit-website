import { NavLink } from "react-router-dom";
import { primaryNav, ecosystemLinks } from "../../data/nav";
import { EarlyAccessButton } from "../marketing/EarlyAccessButton";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <div className={`mobile-nav ${open ? "mobile-nav--open" : ""}`}>
      <div className="mobile-nav__panel">
        <div className="mobile-nav__header">
          <div className="brand-mark">FoFit</div>
          <button aria-label="Close menu" className="nav-toggle" onClick={onClose}>
            <span />
            <span />
          </button>
        </div>
        <nav className="mobile-nav__links">
          {[...primaryNav, ...ecosystemLinks].map((link) => (
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
          <EarlyAccessButton className="mobile-nav__cta" size="lg">
            Get Early Access
          </EarlyAccessButton>
        </nav>
        <p className="mobile-nav__footnote">
          A premium training platform built around planning, guidance, progress,
          and future coaching layers.
        </p>
      </div>
    </div>
  );
}
