import type { ImageData, ImagePayload } from "~/core/api/media";

export type CTASectionV1Payload = {
  id: string;
  blockType: "CTASectionV1";
  logoDark: ImagePayload;
  logoLight: ImagePayload;
  title: string;
  description?: string;
  button: {
    label: string;
    href: string;
  };
};

export type CTASectionV1Data = {
  id: string;
  blockType: "CTASectionV1";
  logoDark: ImageData;
  logoLight: ImageData;
  title: string;
  description?: string;
  button: {
    label: string;
    href: string;
  };
};
