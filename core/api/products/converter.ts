import { convertCategoryPayload } from "../globalConfig/category";
import { convertManufacturerPayload } from "../manufacturer";
import { convertImagePayload } from "../media";
import type { ProductData, ProductPayload } from "./types";

export const convertProductPayload = (payload: ProductPayload): ProductData => {
  const { miniature, manufacturer, category, ...rest } = payload;

  return {
    ...rest,
    category: convertCategoryPayload(category),
    miniature: convertImagePayload(miniature),
    manufacturer: convertManufacturerPayload(manufacturer),
  };
};
