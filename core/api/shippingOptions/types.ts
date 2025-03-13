type BaseShippingData = {
  id: string;
  label: string;
  paymentType: "online" | "cod";
  pricing: {
    netto: number;
    vatRate: string;
    vat: number;
    brutto: number;
  };
};

type PickupPointShipping = BaseShippingData & {
  type: "pickupPoint";
  shippingDataProvider: "InPostGeoWidget";
};

type DirectShipping = BaseShippingData & {
  type: "directShipping";
  shippingDataProvider: undefined;
};

export type ShippingOptionPayload = PickupPointShipping | DirectShipping;
export type ShippingOptionData = ShippingOptionPayload;
