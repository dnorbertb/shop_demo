import type { PaginatedResponse } from "../shared";
import { convertDynamicPagePayload } from "./converter";
import type { DynamicPagePayload, DynamicPageData } from "./types";

export const useDynamicPagesApi = () => {
  const API_URL = useRuntimeConfig().public.API_URL;
  if (!API_URL) throw new Error("NO API_URL SET");

  const getPageByUrl = async (url: string): Promise<DynamicPageData> => {
    const req = await $fetch<PaginatedResponse<DynamicPagePayload>>(
      `${API_URL}/api/dynamicPages?where[url][equals]=${url}&depth=3`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = req.docs[0];
    if (!data) throw new Error("Dynamic page not found");
    return convertDynamicPagePayload(data);
  };

  return {
    getPageByUrl,
  };
};
