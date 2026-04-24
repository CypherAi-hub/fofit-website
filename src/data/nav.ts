export type NavLinkItem = {
  label: string;
  to: string;
};

export const primaryNav: NavLinkItem[] = [
  { label: "Product", to: "/product" },
  { label: "Features", to: "/features" },
  { label: "Insights", to: "/insights" },
  { label: "About", to: "/about" },
  { label: "Community", to: "/community" },
  { label: "FAQ", to: "/faq" },
];

export const ecosystemLinks: NavLinkItem[] = [
  { label: "Updates", to: "/updates" },
  { label: "Coaches", to: "/coaches" },
  { label: "Store", to: "/store" },
  { label: "Teams", to: "/teams" },
];

export const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Overview", to: "/product" },
      { label: "Features", to: "/features" },
      { label: "Pricing", to: "/pricing" },
      { label: "Community", to: "/community" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Updates", to: "/updates" },
      { label: "Coaches", to: "/coaches" },
      { label: "Teams", to: "/teams" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Insights", to: "/insights" },
      { label: "FAQ", to: "/faq" },
      { label: "Shop", to: "/shop" },
      { label: "Nutrition", to: "/nutrition" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/faq" },
      { label: "Terms", to: "/faq" },
      { label: "Support", to: "/faq" },
      { label: "Security", to: "/faq" },
    ],
  },
];
