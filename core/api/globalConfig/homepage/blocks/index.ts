import type {
  ArticlesSectionData,
  ArticlesSectionPayload,
} from "./articles-section";
import type {
  CategoriesSectionData,
  CategoriesSectionPayload,
} from "./categories-section";
import type {
  ContactSectionData,
  ContactSectionPayload,
} from "./contact-section";
import type { CTASectionV1Data, CTASectionV1Payload } from "./cta-section-v1";
import type {
  FeaturedProductsSectionData,
  FeaturedProductsSectionPayload,
} from "./featured-products-section";
import type { HomeHeroV1Data, HomeHeroV1Payload } from "./home-hero-v1";
import type { LoopSectionData, LoopSectionPayload } from "./loop-section";

type HomepageBlocksPayload =
  | ArticlesSectionPayload
  | CategoriesSectionPayload
  | ContactSectionPayload
  | CTASectionV1Payload
  | FeaturedProductsSectionPayload
  | HomeHeroV1Payload
  | LoopSectionPayload;

type HomepageBlocksData =
  | ArticlesSectionData
  | CategoriesSectionData
  | ContactSectionData
  | CTASectionV1Data
  | FeaturedProductsSectionData
  | HomeHeroV1Data
  | LoopSectionData;

export type {
  HomepageBlocksPayload,
  HomepageBlocksData,
  ArticlesSectionPayload,
  CategoriesSectionPayload,
  ContactSectionPayload,
  CTASectionV1Payload,
  FeaturedProductsSectionPayload,
  HomeHeroV1Payload,
  LoopSectionPayload,
  ArticlesSectionData,
  CategoriesSectionData,
  ContactSectionData,
  CTASectionV1Data,
  FeaturedProductsSectionData,
  HomeHeroV1Data,
  LoopSectionData,
};
