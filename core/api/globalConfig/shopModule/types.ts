export type BrowserPayload = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  description: string;
};

export type CartPayload = {
  metaTitle: string;
};

export type BrowserData = BrowserPayload;

export type ShopModuleConfigPayload = {
  cart: CartPayload;
  browser: BrowserPayload;
};

export type ShopModuleConfigData = ShopModuleConfigPayload;
