import path from "node:path";
import { appRoutes } from "./core";
import type { FeatureRoute } from "./core/types/FeatureRoute";
import type { NuxtPage } from "nuxt/schema";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxt/fonts",
    "nuxt-schema-org",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/sitemap",
  ],
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      MEDIA_STORAGE_URL: process.env.MEDIA_STORAGE_URL,
      GEO_WIDGET_TOKEN: process.env.GEO_WIDGET_TOKEN,
    },
  },
  tailwindcss: {
    config: {
      content: {
        files: ["./core/**/*.vue"],
      },
      theme: {
        extend: {
          screens: {
            xs: "420px",
          },
        },
      },
    },
  },
  hooks: {
    "pages:extend"(pages: Array<NuxtPage>) {
      const isDevEnv = process.env.ENV == "dev";

      // Resolve file paths
      const rootPath = path.resolve().replaceAll("\\", "/");
      const flattenedRoutes = appRoutes.flat();
      const routesJson = JSON.stringify(flattenedRoutes);
      const updatedRoutesJson = routesJson.replaceAll("~", rootPath + "/core");
      const parsedRoutes: Array<FeatureRoute> = JSON.parse(updatedRoutesJson);

      // Removing development env routes
      const filteredRoutes = parsedRoutes.filter((page) => {
        return isDevEnv || !page?.meta?.availableInDevEnvOnly;
      });

      Object.assign(pages, filteredRoutes);
    },
  },
  dir: {
    middleware: "core/middleware",
  },
  plugins: [
    "~/core/plugins/initializeUserContext",
    "~/core/plugins/initializeGlobalData",
  ],
  components: [
    "~/core/layout",
    "~/core/components",
    "~/core/providers",
    "~/core/capsules",
    {
      path: "~/core/features/home/blocks",
      pathPrefix: false,
      global: true,
    },
  ],
  app: {
    head: {
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/favicon/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },
  // sitemap: {
  // excludeAppSources: true, <- uncomment but check first
  // },
  // prerender: {
  //   routes: [],
  // },
  schemaOrg: {
    defaults: false,
    // meta: {
    //   host: "https://made4ride.pl",
    // },
    identity: {
      "@type": "Organization",
      name: "made4ride.pl",
      logo: "/meta-logo.webp",
      url: "https://made4ride.pl",
      sameAs: [
        // Facebook
        // TikTok
        // Instagram
        // YouTube
      ],
    },
  },
});
