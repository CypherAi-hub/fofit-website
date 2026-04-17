import { useState } from "react";
import { NavLink } from "react-router-dom";
import { primaryNav } from "../../data/nav";
import { Button } from "../ui/Button";
import { EarlyAccessButton } from "../marketing/EarlyAccessButton";
import { MobileNav, MOBILE_NAV_ID } from "./MobileNav";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="container site-header__inner">
          <NavLink aria-label="FoFit home" className="brand" to="/">
            <span className="brand-mark">FoFit</span>
          </NavLink>
          <nav aria-label="Main" className="site-nav">
            {primaryNav.map((link) => (
              <NavLink
                className={({ isActive }) =>
                  `site-nav__link ${isActive ? "is-active" : ""}`
                }
                key={link.to}
                to={link.to}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="site-header__actions">
            <Button to="/pricing" variant="ghost">
              Pricing
            </Button>
            <EarlyAccessButton>
              Join the waitlist
            </EarlyAccessButton>
            <button
              aria-label="Open menu"
              aria-controls={MOBILE_NAV_ID}
              aria-expanded={mobileOpen}
              className="nav-toggle"
              onClick={() => setMobileOpen(true)}
              type="button"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <MobileNav onClose={() => setMobileOpen(false)} open={mobileOpen} />
    </>
  );
}
