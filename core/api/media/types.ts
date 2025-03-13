import type { Entity } from "../shared";

type SizePayload = {
  url: string;
  width: number;
  height: number;
  mimeType: string;
  filesize: number;
  filename: string;
};

export type ImagePayload = Entity<{
  alt: string;
  loader: string;
  url: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
  sizes: Record<number, SizePayload>;
}>;

export type ImageData = {
  id: string;
  alt: string;
  loader: string;
  width: number;
  height: number;
  mimeType: string;
  srcSet: {
    360: string;
    700: string;
    1280: string;
    1920: string;
  };
};
