import type { PaginatedResponse } from "../../shared";
import { convertCategoryPayload } from "./converter";
import type { CategoryPayload, CategoryData } from "./types";

export const useCategoriesApi = () => {
  const API_URL = useRuntimeConfig().public.API_URL;
  if (!API_URL) throw new Error("NO API_URL SET");

  const getCategoriesData = async (): Promise<Array<CategoryData>> => {
    const payload = await $fetch<PaginatedResponse<CategoryPayload>>(
      `${API_URL}/api/categories?depth=5`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return payload.docs.map((payload) => convertCategoryPayload(payload));
  };

  return {
    getCategoriesData,
  };
};
