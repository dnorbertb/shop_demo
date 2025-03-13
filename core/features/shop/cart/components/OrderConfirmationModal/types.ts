import type { ProductData } from "~/core/api/products";

import type { AddressBody } from "~/core/api/addresses";
import type { ShippingDataProvidersKeys } from "~/core/capsules/ShippingData/types";

type CartProps = Array<{
  quantity: number;
  priceWhenAdded: number;
  withdrawn?: boolean;
  product: ProductData;
}>;

type DirectShippingData = { shippingType: "directShipping" };
type PickupPointShippingData = {
  provider: ShippingDataProvidersKeys;
  shippingType: "pickupPoint";
  additionalShippingData: string;
};

type ShippingProps = DirectShippingData | PickupPointShippingData;

export type SummaryData = {
  addressData: AddressBody;
  cartContent: CartProps;
  shippingData: ShippingProps;
  discountCode: string;
  totalDiscount: number;
  calculatedPrice: number;
  vatIncluded: number;
  shippingCost: number;
  orderMessage: string;
};
