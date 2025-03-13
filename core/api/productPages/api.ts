import type { PaginatedResponse } from "../shared";
import { convertProductPagePayload } from "./converter";
import type { ProductPagePayload, ProductPageData } from "./types";

export const useProductPageApi = () => {
  const API_URL = useRuntimeConfig().public.API_URL;
  if (!API_URL) throw new Error("NO API_URL SET");

  const getProductPageByUrl = async (url: string): Promise<ProductPageData> => {
    const req = await $fetch<PaginatedResponse<ProductPagePayload>>(
      `${API_URL}/api/productPages?where[slug][equals]=${url}&depth=3`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = req.docs[0];
    if (!data) throw new Error("Product page not found");
    return convertProductPagePayload(data);
  };

  return {
    getProductPageByUrl,
  };
};
