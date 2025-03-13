export type FeaturedProductsSectionPayload = {
  id: string;
  blockType: "FeaturedProductsSection";
  title: string;
  type: "recentlyAdded" | "bestSelling";
};

export type FeaturedProductsSectionData = FeaturedProductsSectionPayload;
