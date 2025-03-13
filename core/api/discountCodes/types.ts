import type { Entity } from "../shared";

export type CheckDiscountCodeResponse = {
  id: string;
  isAvailable: boolean;
  code: string;
  discountType: "percentage" | "amount";
  discountAmount: number;
  discountAmountLeft: number;
};

type AmountCodeData = {
  discountType: "amount";
  amount: number;
};

type PercentageCodeData = {
  discountType: "percentage";
  percentage: number;
  limitedQuantity: boolean;
  usageLimit: number;
};

export type DiscountCodePayload = Entity<
  {
    isActive: boolean;
    text: string;
    code: string;
  } & (AmountCodeData | PercentageCodeData)
>;

export type DiscountCodeData = DiscountCodePayload;
