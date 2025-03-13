export type FooterConfigPayload = {
  description: string;
  caption: string;
  socialMedia: Array<{
    icon: "instagram" | "facebook" | "tiktok";
    href: string;
    id: string;
  }>;
  linkColumns: Array<{
    title: string;
    links: Array<{ label: string; href: string; id: string }>;
    id: string;
  }>;
};

export type FooterConfigData = {
  description: string;
  caption: string;
  socialMedia: Array<{
    icon: "instagram" | "facebook" | "tiktok";
    href: string;
    id: string;
  }>;
  linkColumns: Array<{
    title: string;
    links: Array<{ label: string; href: string; id: string }>;
    id: string;
  }>;
};
