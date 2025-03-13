import { useCategoriesApi } from "./category";
import { useFooterApi } from "./footer";
import { useGlobalDataApi } from "./global";
import { useHomepageApi } from "./homepage";
import { useShippingOptionsApi } from "../shippingOptions";
import { useShopModuleApi } from "./shopModule";
import type { GlobalConfigData } from "./types";

export const useGlobalConfigDataApi = () => {
  const footerApi = useFooterApi();
  const globalConfigApi = useGlobalDataApi();
  const homepageApi = useHomepageApi();
  const shopModuleApi = useShopModuleApi();
  const categoriesApi = useCategoriesApi();
  const shippingOptionsApi = useShippingOptionsApi();

  const getGlobalConfig = async (): Promise<GlobalConfigData> => {
    const [
      footer,
      globalData,
      home,
      shopModule,
      categoriesData,
      shippingOptions,
    ] = await Promise.all([
      await footerApi.getFooterConfig(),
      await globalConfigApi.getGlobalData(),
      await homepageApi.getHomepageConfig(),
      await shopModuleApi.getShopModuleConfig(),
      await categoriesApi.getCategoriesData(),
      await shippingOptionsApi.getShippingOptions(),
    ]);

    return {
      footer,
      globalData,
      home,
      shopModule,
      categoriesData,
      shippingOptions,
    };
  };

  return {
    getGlobalConfig,
  };
};
