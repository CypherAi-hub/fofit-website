import { Link } from "react-router-dom";
import { footerColumns } from "../../data/nav";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand-mark">FoFit</div>
          <p>
            FoFit combines AI coaching, personalized training, nutrition, and
            community in one fitness app.
          </p>
        </div>
        {footerColumns.map((column) => (
          <div className="footer-column" key={column.title}>
            <h3>{column.title}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <a href={link.href}>{link.label}</a>
                  ) : (
                    <Link
                      data-cta={
                        link.to === "/beta" ? "join-ios-beta" : undefined
                      }
                      to={link.to ?? "/"}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container footer-bottom">
        <span>© 2026 FoFit. Built for the Future of Fitness.</span>
        <span>St. Louis roots. Community ambitions.</span>
      </div>
    </footer>
  );
}
