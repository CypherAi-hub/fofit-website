import { PageHero } from "../components/layout/PageHero";
import { PageMeta } from "../components/layout/PageMeta";

/**
 * 404 — page not found.
 *
 * Replaces the * route's silent fallback to HomePage; uses the
 * redesigned lp-pagehero chrome so the page reads as part of the
 * site, not a broken state.
 */
export function NotFoundPage() {
  return (
    <>
      <PageMeta
        description="The page you are looking for could not be found."
        title="Not found | FoFit"
      />
      <PageHero
        actions={[
          { label: "Back to home", to: "/", variant: "secondary" },
          { label: "Explore product", to: "/product" },
        ]}
        compact
        description="The link or address you followed does not point at a page on FoFit. Try the homepage or jump into the product overview."
        eyebrow="404"
        title={<>This page does not exist.</>}
      />
    </>
  );
}
