import type { NuxtPage } from "@nuxt/schema";

export type FeatureRoute = NuxtPage & {
  meta?: {
    restricted?: "unauthorizedOnly" | "authorizedOnly";
    availableInDevEnvOnly?: boolean;
  };
};
