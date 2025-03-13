import type { CategoryData, CategoryPayload } from "../globalConfig/category";
import type { ManufacturerData, ManufacturerPayload } from "../manufacturer";

import type { ImageData, ImagePayload } from "../media";
import type { Entity } from "../shared";

export type ProductPayload = Entity<{
  productUrl: string;
  miniature: ImagePayload;
  manufacturer: ManufacturerPayload;
  category: CategoryPayload;
  name: string;
  parameters: Array<{
    id: string;
    label: string;
    code: string;
    valueLabel: string;
    value: string;
    isIdentifier: boolean;
  }>;
  otherParameters: Array<{
    id: string;
    type: string;
    value: string;
  }>;
  manufacturerId: string;
  ean: string;
  sku: string;
  otherCodes: Array<{
    id: string;
    type: string;
    value: string;
  }>;
  pricing: {
    netto: number;
    vatRate: string;
    vat: number;
    brutto: number;
  };
  stock: {
    availability: number;
  };
}>;

export type ProductData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  productUrl: string;
  miniature: ImageData;
  manufacturer: ManufacturerData;
  category: CategoryData;
  name: string;
  parameters: Array<{
    id: string;
    label: string;
    code: string;
    valueLabel: string;
    value: string;
    isIdentifier: boolean;
  }>;
  otherParameters: Array<{
    id: string;
    type: string;
    value: string;
  }>;
  manufacturerId: string;
  ean: string;
  sku: string;
  otherCodes: Array<{
    id: string;
    type: string;
    value: string;
  }>;
  pricing: {
    netto: number;
    vatRate: string;
    vat: number;
    brutto: number;
  };
  stock: {
    availability: number;
  };
};

export type GetProductsArgs = {
  page?: number;
  limit?: number;
  category?: string;
  sortBy?: "default" | string;
  filters?: {
    price?: {
      less_than: number;
      greater_than: number;
    };
    search?: string;
  } & Record<string, Array<string>>;
};
