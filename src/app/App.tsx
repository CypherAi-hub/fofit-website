import { AppRoutes } from "./routes";
import { SiteShell } from "../components/layout/SiteShell";

export default function App() {
  return (
    <SiteShell>
      <AppRoutes />
    </SiteShell>
  );
}
