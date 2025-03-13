import { convertShippingOptionPayload } from "./converter";
import type { ShippingOptionData, ShippingOptionPayload } from "./types";

import type { PaginatedResponse } from "~/core/api/shared";

export const useShippingOptionsApi = () => {
  const API_URL = useRuntimeConfig().public.API_URL;
  if (!API_URL) throw new Error("NO API_URL SET");

  const getShippingOptions = async (): Promise<Array<ShippingOptionData>> => {
    const payload = await $fetch<PaginatedResponse<ShippingOptionPayload>>(
      `${API_URL}/api/shippingOptions`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return payload.docs.map((data) => convertShippingOptionPayload(data));
  };

  return {
    getShippingOptions,
  };
};
