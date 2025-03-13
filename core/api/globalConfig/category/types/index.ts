import type { ImageData, ImagePayload } from "~/core/api/media";
import type { ManyOptionsFilter } from "./filters/multi-select-filter";
import type { SingleOptionFilter } from "./filters/single-select-filter";

export type Filters = SingleOptionFilter | ManyOptionsFilter;

export type CategoryPayload = {
  id: string;
  name: string;
  slug: string;
  logo: ImagePayload;
  filters: Array<Filters>;
};

export type CategoryData = {
  id: string;
  name: string;
  slug: string;
  logo: ImageData;
  filters: Array<Filters>;
};
