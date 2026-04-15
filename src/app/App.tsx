import { AppRoutes } from "./routes";
import { WaitlistProvider } from "./waitlist-context";
import { SiteShell } from "../components/layout/SiteShell";

export default function App() {
  return (
    <WaitlistProvider>
      <SiteShell>
        <AppRoutes />
      </SiteShell>
    </WaitlistProvider>
  );
}
