import type { FeatureRoute } from "~/core/types/FeatureRoute";

const DynamicPagesFeatureRoutes: Array<FeatureRoute> = [
  {
    path: "/i/:slug(.*)*",
    name: "dynamic-pages",
    file: "~/features/dynamic-pages/View.vue",
  },
];

export default DynamicPagesFeatureRoutes;
