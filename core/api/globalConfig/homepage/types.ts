import type { HomepageBlocksData, HomepageBlocksPayload } from "./blocks";

export type HomepageConfigPayload = {
  metaTitle: string;
  metaDescription: string;
  blocks: Array<HomepageBlocksPayload>;
};

export type HomepageConfigData = {
  metaTitle: string;
  metaDescription: string;
  blocks: Array<HomepageBlocksData>;
};
