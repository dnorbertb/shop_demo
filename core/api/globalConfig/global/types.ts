import type { ImageData, ImagePayload } from "~/core/api/media";

export type GlobalDataPayload = {
  logoLight: ImagePayload;
  logoDark: ImagePayload;
};

export type GlobalData = {
  logoLight: ImageData;
  logoDark: ImageData;
};
