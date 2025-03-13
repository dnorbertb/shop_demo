import type { RichTextData, Entity, RichTextPayload } from "../shared";

export type DynamicPagePayload = Entity<{
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  content: RichTextPayload;
}>;

export type DynamicPageData = {
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  content: RichTextData;
  createdAt: string;
  updatedAt: string;
};
