import { convertImagePayload } from "../../media";
import type { CategoryData, CategoryPayload } from "./types";

export const convertCategoryPayload = (
  payload: CategoryPayload
): CategoryData => {
  const { logo, ...rest } = payload;
  return {
    ...rest,
    logo: convertImagePayload(logo),
  };
};
