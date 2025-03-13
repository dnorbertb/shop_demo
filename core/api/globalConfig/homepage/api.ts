import { convertHomepagePayload } from "./converter";
import type { HomepageConfigData, HomepageConfigPayload } from "./types";

export const useHomepageApi = () => {
  const API_URL = useRuntimeConfig().public.API_URL;
  if (!API_URL) throw new Error("NO API_URL SET");

  const getHomepageConfig = async (): Promise<HomepageConfigData> => {
    const payload = await $fetch<HomepageConfigPayload>(
      `${API_URL}/api/globals/homepageConfig`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return convertHomepagePayload(payload);
  };

  return {
    getHomepageConfig,
  };
};
