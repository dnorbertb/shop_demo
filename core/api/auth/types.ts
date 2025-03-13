import type { ProductPayload, ProductData } from "../products";

export type SignUpArgs = {
  email: string;
  password: string;
  marketingConsent: boolean;
};

export type LogInArgs = {
  email: string;
  password: string;
};

export type UserPayload = {
  id: string;
  email: string;
  discount: number;
  moneySpent: number;
  cart: Array<{
    quantity: number;
    href: string;
    priceWhenAdded: number;
    withdrawn?: boolean;
    product: ProductPayload["id"];
  }>;
  marketingConsent: boolean;
};

export type SignUpResponse = {
  message: string;
  doc: UserPayload;
};

export type LogInResponseObject =
  | {
      exp: number;
      token: string;
      user: UserPayload;
    }
  | { user: null };

export type UserData = {
  id: string;
  email: string;
  discount: number;
  moneySpent: number;
  cart: Array<{
    quantity: number;
    priceWhenAdded: number;
    withdrawn?: boolean;
    product: ProductData["id"];
  }>;
  marketingConsent: boolean;
};
