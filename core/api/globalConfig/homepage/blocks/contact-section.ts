export type ContactSectionPayload = {
  id: string;
  blockType: "ContactSection";
  title: string;
  lines: Array<{
    id: string;
    label: string;
    href?: string;
  }>;
};

export type ContactSectionData = ContactSectionPayload;
