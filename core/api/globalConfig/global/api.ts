import type { GlobalDataPayload, GlobalData } from "./types";
import { convertGlobalDataPayload } from "./converter";

export const useGlobalDataApi = () => {
  const API_URL = useRuntimeConfig().public.API_URL;
  if (!API_URL) throw new Error("NO API_URL SET");

  const getGlobalData = async (): Promise<GlobalData> => {
    const payload = await $fetch<GlobalDataPayload>(
      `${API_URL}/api/globals/globalConfig`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return convertGlobalDataPayload(payload);
  };

  return {
    getGlobalData,
  };
};
