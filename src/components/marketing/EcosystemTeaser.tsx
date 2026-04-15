import { Link } from "react-router-dom";
import { ecosystemLinks } from "../../data/nav";
import { Card } from "../ui/Card";

const descriptions: Record<string, string> = {
  "/updates": "Product shipping notes, platform thinking, and a visible cadence of progress.",
  "/coaches": "A future expert layer for reviews, guidance, and deeper accountability.",
  "/store": "Programs, tools, gear, and partner experiences around the FoFit ecosystem.",
  "/teams": "A version of FoFit designed for schools, clubs, and high-accountability groups.",
};

export function EcosystemTeaser() {
  return (
    <div className="ecosystem-grid">
      {ecosystemLinks.map((link) => (
        <Card className="ecosystem-card reveal" key={link.to}>
          <h3>{link.label}</h3>
          <p>{descriptions[link.to]}</p>
          <Link to={link.to}>Explore {link.label.toLowerCase()}</Link>
        </Card>
      ))}
    </div>
  );
}
