import type { FeatureRoute } from "~/core/types/FeatureRoute";

const HomeFeatureRoutes: Array<FeatureRoute> = [
  {
    path: "/",
    name: "home",
    file: "~/features/home/View.vue",
  },
];

export default HomeFeatureRoutes;
