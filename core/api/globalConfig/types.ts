import type { CategoryData } from "./category";
import type { FooterConfigData } from "./footer";
import type { GlobalData } from "./global";
import type { HomepageConfigData } from "./homepage";
import type { ShippingOptionData } from "../shippingOptions";
import type { ShopModuleConfigData } from "./shopModule";

export type GlobalConfigData = {
  shippingOptions: Array<ShippingOptionData>;
  categoriesData: Array<CategoryData>;
  globalData: GlobalData;
  footer: FooterConfigData;
  home: HomepageConfigData;
  shopModule: ShopModuleConfigData;
};
