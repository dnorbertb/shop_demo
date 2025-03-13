import type { CheckDiscountCodeResponse } from "./types";

export const useDiscountCodesApi = () => {
  const API_URL = useRuntimeConfig().public.API_URL;
  if (!API_URL) throw new Error("NO API_URL SET");

  const checkDiscountCode = async (
    code: string
  ): Promise<CheckDiscountCodeResponse> => {
    const req = await $fetch<CheckDiscountCodeResponse>(
      `${API_URL}/api/discountCodes/check/${code}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return req;
  };

  return {
    checkDiscountCode,
  };
};
