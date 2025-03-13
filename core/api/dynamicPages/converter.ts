import { convertRichTextPayload } from "../shared";
import type { DynamicPagePayload, DynamicPageData } from "./types";

export const convertDynamicPagePayload = (
  payload: DynamicPagePayload
): DynamicPageData => {
  const { content, ...rest } = payload;

  return {
    ...rest,
    content: convertRichTextPayload(content),
  };
};
