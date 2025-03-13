import { convertShopModulePayload } from "./converter";
import type { ShopModuleConfigData, ShopModuleConfigPayload } from "./types";

export const useShopModuleApi = () => {
  const API_URL = useRuntimeConfig().public.API_URL;
  if (!API_URL) throw new Error("NO API_URL SET");

  const getShopModuleConfig = async (): Promise<ShopModuleConfigData> => {
    const payload = await $fetch<ShopModuleConfigPayload>(
      `${API_URL}/api/globals/shopModuleConfig`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return convertShopModulePayload(payload);
  };

  return {
    getShopModuleConfig,
  };
};
