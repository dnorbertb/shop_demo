import type { FooterConfigPayload, FooterConfigData } from "./types";
import { convertFooterConfigPayload } from "./converter";

export const useFooterApi = () => {
  const API_URL = useRuntimeConfig().public.API_URL;
  if (!API_URL) throw new Error("NO API_URL SET");

  const getFooterConfig = async (): Promise<FooterConfigPayload> => {
    const payload = await $fetch<FooterConfigData>(
      `${API_URL}/api/globals/footerConfig`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return convertFooterConfigPayload(payload);
  };

  return {
    getFooterConfig,
  };
};
