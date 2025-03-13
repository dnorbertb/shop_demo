import type { FeatureRoute } from "~/core/types/FeatureRoute";

export const AuthModuleRouteMap = {
  login: "login",
  signUp: "sign-up",
  forgotPassword: "forgot-password",
};

const AuthFeatureRoutes: Array<FeatureRoute> = [
  {
    path: "/logowanie",
    name: AuthModuleRouteMap.login,
    mode: "client",
    meta: {
      restricted: "unauthorizedOnly",
    },
    file: "~/features/auth/login/View.vue",
  },
  {
    path: "/rejestracja",
    name: AuthModuleRouteMap.signUp,
    mode: "client",
    meta: {
      restricted: "unauthorizedOnly",
    },
    file: "~/features/auth/sign-up/View.vue",
  },
  {
    path: "/przypomnij-haslo",
    name: AuthModuleRouteMap.forgotPassword,
    mode: "client",
    meta: {
      restricted: "unauthorizedOnly",
    },
    file: "~/features/auth/forgot-password/View.vue",
  },
];

export default AuthFeatureRoutes;
