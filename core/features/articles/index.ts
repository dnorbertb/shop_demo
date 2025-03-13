import type { FeatureRoute } from "~/core/types/FeatureRoute";

export const ArticlesModuleRouteMap = {
  browser: "articles-browser",
  article: "article",
};

const ArticlesFeatureRoutes: Array<FeatureRoute> = [
  {
    path: "/artykuly",
    name: ArticlesModuleRouteMap.browser,
    file: "~/features/articles/browser/View.vue",
  },
  {
    path: "/artykuly/:slug(.*)*",
    name: ArticlesModuleRouteMap.article,
    file: "~/features/articles/article/View.vue",
  },
];

export default ArticlesFeatureRoutes;
