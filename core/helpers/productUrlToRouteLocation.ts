import qs from "qs";
import type { LocationQueryRaw } from "vue-router";
import type { ProductData } from "~/core/api/products";

export const productUrlToRouteLocation = (url: ProductData["productUrl"]) => {
  const urlData = url.split("?");
  const slug = urlData[0];
  const query = qs.parse(urlData[1]) as LocationQueryRaw;
  return { params: { slug: slug }, query };
};
