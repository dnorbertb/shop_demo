import type { CheckDiscountCodeResponse } from "~/core/api/discountCodes";

type RequiredData = {
  cartWorth: number;
  shippingCost: number;
  discountCodeData: CheckDiscountCodeResponse | null;
  userDiscountRate: number;
};

const calculateDiscountCodeDiscount = (
  data: CheckDiscountCodeResponse,
  cartWorth: number
) => {
  const { discountType, discountAmount, discountAmountLeft } = data;
  if (discountType == "amount") {
    return discountAmountLeft;
  }
  return (cartWorth * discountAmount) / 100;
};

export const calculatePricing = (data: RequiredData) => {
  const { cartWorth, shippingCost, discountCodeData, userDiscountRate } = data;

  const discountCodeDiscount = discountCodeData
    ? calculateDiscountCodeDiscount(discountCodeData, cartWorth)
    : 0;
  const userDiscount = (cartWorth * userDiscountRate) / 100;
  const totalDiscount = discountCodeDiscount + userDiscount;
  const calculatedPrice = cartWorth + shippingCost - totalDiscount;

  return {
    discountCodeDiscount,
    userDiscount,
    totalDiscount,
    calculatedPrice,
  };
};
