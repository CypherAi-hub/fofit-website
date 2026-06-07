export type NavLinkItem = {
  label: string;
  to: string;
};

export type FooterLinkItem = {
  label: string;
  to?: string;
  href?: string;
};

export const primaryNav: NavLinkItem[] = [
  { label: "Product", to: "/product" },
  { label: "Pricing", to: "/pricing" },
  { label: "Insights", to: "/insights" },
  { label: "About", to: "/about" },
];

export const ecosystemLinks: NavLinkItem[] = [
  { label: "Updates", to: "/updates" },
  { label: "Coaches", to: "/coaches" },
  { label: "Store", to: "/store" },
  { label: "Teams", to: "/teams" },
];

export const footerColumns: Array<{ title: string; links: FooterLinkItem[] }> = [
  {
    title: "Product",
    links: [
      { label: "Product", to: "/product" },
      { label: "Pricing", to: "/pricing" },
      { label: "Insights", to: "/insights" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Field Notes", to: "/insights" },
      { label: "Updates", to: "/updates" },
      { label: "Contact", href: "mailto:hello@fofit.app?subject=FoFit%20contact" },
    ],
  },
  {
    title: "For Teams",
    links: [
      { label: "Coming Spring 2026", to: "/teams" },
      { label: "Request team access", href: "mailto:teams@fofit.app?subject=FoFit%20Teams%20access" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy questions", href: "mailto:hello@fofit.app?subject=FoFit%20privacy" },
      { label: "Terms questions", href: "mailto:hello@fofit.app?subject=FoFit%20terms" },
    ],
  },
];
