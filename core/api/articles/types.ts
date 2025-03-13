import type { ImageData, ImagePayload } from "../media";
import type { Entity, RichTextData, RichTextPayload } from "../shared";

export type ArticlePayload = Entity<{
  meta: {
    title: string;
    description: string;
    url: string;
    author: {
      photo: ImagePayload;
      title: string;
      name: string;
      bio: string;
    };
    tags: string[];
    readingTime: number;
  };
  title: string;
  image: ImagePayload;
  imageCaption: string;
  intro: string;
  content: RichTextPayload;
}>;

export type ArticleData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  meta: {
    title: string;
    description: string;
    url: string;
    author: {
      photo: ImageData;
      title: string;
      name: string;
      bio: string;
    };
    tags: string[];
    readingTime: number;
  };
  title: string;
  image: ImageData;
  imageCaption: string;
  intro: string;
  content: RichTextData;
};

export type GetArticlesArgs = {
  url?: string;
  tag?: string;
  page?: number;
  limit?: number;
};
