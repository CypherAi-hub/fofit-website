import type { ReactNode } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { WaitlistModal } from "../marketing/WaitlistModal";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function SiteShell({ children }: { children: ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="site-frame">
      <div className="ambient ambient--one" />
      <div className="ambient ambient--two" />
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
      <WaitlistModal />
    </div>
  );
}
