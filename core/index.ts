import ArticlesFeatureRoutes from "./features/articles";
import AuthFeatureRoutes from "./features/auth";
import DevModuleRoutes from "./features/dev";
import DynamicPagesFeatureRoutes from "./features/dynamic-pages";
import HomeFeatureRoutes from "./features/home";
import ShopFeatureRoutes from "./features/shop";
import UserDashboardRoutes from "./features/user-dashboard";
import type { FeatureRoute } from "./types/FeatureRoute";

export const appRoutes: Array<Array<FeatureRoute>> = [
  HomeFeatureRoutes,
  ShopFeatureRoutes,
  AuthFeatureRoutes,
  UserDashboardRoutes,
  ArticlesFeatureRoutes,
  DynamicPagesFeatureRoutes,
  DevModuleRoutes,
];
