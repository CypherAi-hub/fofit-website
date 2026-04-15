import { useState } from "react";
import { NavLink } from "react-router-dom";
import { primaryNav } from "../../data/nav";
import { Button } from "../ui/Button";
import { EarlyAccessButton } from "../marketing/EarlyAccessButton";
import { MobileNav } from "./MobileNav";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="container site-header__inner">
          <NavLink className="brand" to="/">
            <span className="brand-mark">FoFit</span>
            <span className="brand-tag">Personalized fitness platform</span>
          </NavLink>
          <nav className="site-nav">
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
              Get Early Access
            </EarlyAccessButton>
            <button
              aria-label="Open menu"
              className="nav-toggle"
              onClick={() => setMobileOpen(true)}
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
