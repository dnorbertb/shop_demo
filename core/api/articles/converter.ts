import { convertImagePayload } from "../media";
import { convertRichTextPayload } from "../shared";
import type { ArticleData, ArticlePayload } from "./types";

export const convertArticlePayload = (payload: ArticlePayload): ArticleData => {
  const { meta, content, image, ...rest } = payload;
  return {
    ...rest,
    meta: {
      ...meta,
      author: {
        ...meta.author,
        photo: convertImagePayload(meta.author.photo),
      },
    },
    content: convertRichTextPayload(content),
    image: convertImagePayload(image),
  };
};
