import type { ImageData, ImagePayload } from "~/core/api/media";
import type { RichTextData, RichTextPayload } from "~/core/api/shared";

export type HomeHeroV1Payload = {
  id: string;
  blockType: "HomeHeroV1";
  title: string;
  description: RichTextPayload;
  button: {
    label: string;
    href: string;
  };
  image: ImagePayload;
};

export type HomeHeroV1Data = {
  id: string;
  blockType: "HomeHeroV1";
  title: string;
  description: RichTextData;
  button: {
    label: string;
    href: string;
  };
  image: ImageData;
};
