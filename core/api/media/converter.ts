import type { ImageData, ImagePayload } from "./types";

export const convertImagePayload = (payload: ImagePayload): ImageData => {
  const { id, alt, height, width, loader, mimeType, url, sizes } = payload;
  const sizesArray = Object.entries(sizes).map(([key, value]) => [
    key,
    value.url,
  ]);
  const sizesObject = Object.fromEntries(sizesArray);

  return {
    id,
    alt,
    width,
    height,
    loader,
    mimeType,
    srcSet: {
      ...sizesObject,
      [width]: url,
    },
  };
};
