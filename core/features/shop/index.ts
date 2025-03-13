import type { FeatureRoute } from "~/core/types/FeatureRoute";

export const ShopModuleRouteMap = {
  shopBrowser: "shop-browser",
  productView: "product-view",
  cartView: "cart-view",
  thankYou: "order-thank-you",
  somethingWentWrong: "order-something-went-wrong",
};

const ShopFeatureRoutes: Array<FeatureRoute> = [
  {
    path: "/sklep/:category([a-zA-Z0-9-_]+)?",
    name: ShopModuleRouteMap.shopBrowser,
    mode: "client",
    file: "~/features/shop/browser/View.vue",
  },
  {
    path: "/sklep/produkt/:slug(.*)*",
    name: ShopModuleRouteMap.productView,
    file: "~/features/shop/product-page/View.vue",
  },
  {
    path: "/zamowienie/koszyk",
    name: ShopModuleRouteMap.cartView,
    file: "~/features/shop/cart/View.vue",
  },
  {
    path: "/zamowienie/dziekujemy",
    name: ShopModuleRouteMap.thankYou,
    file: "~/features/shop/order-confirmation/thank-you/View.vue",
  },
  {
    path: "/zamowienie/cos-nie-tak",
    name: ShopModuleRouteMap.somethingWentWrong,
    file: "~/features/shop/order-confirmation/something-went-wrong/View.vue",
  },
];

export default ShopFeatureRoutes;
