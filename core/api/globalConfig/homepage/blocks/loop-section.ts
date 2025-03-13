import type { ImageData, ImagePayload } from "~/core/api/media";

export type LoopSectionPayload = {
  id: string;
  blockType: "LoopSection";
  title: string;
  logos: Array<{
    id: string;
    href: string;
    image: ImagePayload;
  }>;
};

export type LoopSectionData = {
  id: string;
  blockType: "LoopSection";
  title: string;
  logos: Array<{
    id: string;
    href: string;
    image: ImageData;
  }>;
};
