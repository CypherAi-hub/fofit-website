import { Link } from "react-router-dom";
import { footerColumns } from "../../data/nav";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand-mark">FoFit</div>
          <p>
            FoFit is the training platform for student athletes whose weeks do
            not fit a clean spreadsheet.
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
                    <Link to={link.to ?? "/"}>{link.label}</Link>
                  )}
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
