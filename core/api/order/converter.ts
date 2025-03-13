import { convertDiscountCodePayload } from "../discountCodes";
import { convertProductPayload } from "../products";
import { convertShippingOptionPayload } from "../shippingOptions";
import type { OrderData, OrderPayload } from "./types";

export const convertOrderPayload = (payload: OrderPayload): OrderData => {
  const { order, shippingOption, discountCode, ...rest } = payload;
  return {
    ...rest,
    order: order.map(({ product, ...rest }) => ({
      ...rest,
      product: convertProductPayload(product),
    })),
    shippingOption: convertShippingOptionPayload(shippingOption),
    discountCode: discountCode
      ? convertDiscountCodePayload(discountCode)
      : undefined,
  };
};
