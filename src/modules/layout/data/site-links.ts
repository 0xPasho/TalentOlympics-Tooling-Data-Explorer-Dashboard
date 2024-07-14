export interface SiteLinkItem {
  title: string;
  path: string;
  target?: string;
}

export const siteLinks: SiteLinkItem[] = [
  {
    title: "Blocks",
    path: "/blocks",
  },
  {
    title: "Transactions",
    path: "/transactions",
  },
  {
    title: "About",
    path: "https://pasho.io",
    target: "_blank",
  },
];

export const legalLinks: SiteLinkItem[] = [
  {
    title: "Privacy Policy",
    path: "https://olyvia.io/privacy",
    target: "_blank",
  },
  {
    title: "Terms & Conditions",
    path: "https://olyvia.io/terms",
    target: "_blank",
  },
];
