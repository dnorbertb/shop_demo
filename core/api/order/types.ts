import type { AddressBody, AddressData, AddressPayload } from "../addresses";
import type { DiscountCodeData, DiscountCodePayload } from "../discountCodes";
import type {
  ShippingOptionData,
  ShippingOptionPayload,
} from "../shippingOptions/types";
import type { ProductData, ProductPayload } from "../products";

type DirectShippingData = { shippingType: "directShipping" };
type PickupPointShippingData = {
  shippingType: "pickupPoint";
  additionalShippingData: string;
};

type ShippingData = DirectShippingData | PickupPointShippingData;

export type OrderBody = {
  customer?: string;
  discountCode?: string; // id
  orderMessage?: string;
  addressData: AddressBody | null;
  order: Array<{
    product: string;
    quantity: number;
  }>;
  shippingOption: string; // id
  paymentType: "online" | "cod";
} & ShippingData;

export type OrderPayload = {
  no: number;
  customer?: string;
  discountCode?: DiscountCodePayload;
  orderMessage?: string;
  state: "new";
  addressData: AddressPayload;
  order: Array<{
    product: ProductPayload;
    quantity: number;
  }>;
  shippingOption: ShippingOptionPayload;
  paymentType: "online" | "cod";
  shippingPrice: number;
  calculatedDiscounts: Array<{
    id: string;
    type: string;
    value: number;
    additionalInfo: string;
  }>;
  totalProductsPrice: number;
  finalPrice: number;
} & ShippingData;

export type OrderData = {
  no: number;
  customer?: string;
  discountCode?: DiscountCodeData;
  orderMessage?: string;
  state: "new";
  addressData: AddressData;
  order: Array<{
    product: ProductData;
    quantity: number;
  }>;
  shippingOption: ShippingOptionData;
  paymentType: "online" | "cod";
  shippingPrice: number;
  calculatedDiscounts: Array<{
    id: string;
    type: string;
    value: number;
    additionalInfo: string;
  }>;
  totalProductsPrice: number;
  finalPrice: number;
} & ShippingData;
