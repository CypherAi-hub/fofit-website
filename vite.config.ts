import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import hosting from "./vercel.json";

export default defineConfig({
  plugins: [react(), {
    name: "approved-static-preview-routes",
    configurePreviewServer(server) {
      // Preview the same exact static routes as production, before SPA fallback.
      // External account redirects remain owned by the existing handoff script.
      server.middlewares.use((req, res, next) => {
        if (req.method !== "GET" && req.method !== "HEAD") return next();
        const url = new URL(req.url ?? "/", "http://preview.local");
        const redirect = hosting.redirects.find(item => item.source === url.pathname && item.destination.startsWith("/"));
        if (redirect) {
          res.statusCode = redirect.permanent ? 308 : 307;
          res.setHeader("Location", redirect.destination + url.search);
          res.end();
          return;
        }
        const rewrite = hosting.rewrites.find(item => item.source === url.pathname && item.destination.endsWith("/index.html"));
        if (rewrite) req.url = rewrite.destination + url.search;
        next();
      });
    },
  }],
  server: {
    port: 4173,
  },
});
