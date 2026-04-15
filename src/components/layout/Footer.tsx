import { Link } from "react-router-dom";
import { ecosystemLinks, footerColumns } from "../../data/nav";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand-mark">FoFit</div>
          <p>
            FoFit is building a more connected fitness platform around structure,
            adaptive guidance, progress intelligence, and long-term ecosystem
            depth.
          </p>
          <div className="footer-pills">
            {ecosystemLinks.map((link) => (
              <Link className="footer-pill" key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        {footerColumns.map((column) => (
          <div className="footer-column" key={column.title}>
            <h3>{column.title}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container footer-bottom">
        <span>© 2026 FoFit. Built for long-term training consistency.</span>
        <span>St. Louis roots. Platform ambitions.</span>
      </div>
    </footer>
  );
}
