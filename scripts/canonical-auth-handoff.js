// Mirrors the hosting redirects for local preview and static-only hosts.
// Marketing does not own signup or onboarding. Do not forward auth material.
window.fofitCanonicalAccountHandoff = () => {
  const path = window.location.pathname.replace(/\/$/, "");
  if (!["/login", "/signup", "/onboarding"].includes(path)) return;
  const target = new URL(path, "https://app.fofit.app");
  const incoming = new URLSearchParams(window.location.search);
  for (const key of ["claim", "ref", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
    if (incoming.has(key)) target.searchParams.set(key, incoming.get(key));
  }
  const next = incoming.get("next");
  if (next?.startsWith("/") && !next.startsWith("//")) target.searchParams.set("next", next);
  window.location.replace(target.toString());
};
window.fofitCanonicalAccountHandoff();
