import type { FeatureRoute } from "~/core/types/FeatureRoute";

export const UserDashboardModuleRouteMap = {
  dashboard: "customer-dashboard",
  children: {
    orders: "customer-orders",
    addresses: "customer-addresses",
    settings: "customer-settings",
  },
};

const UserDashboardRoutes: Array<FeatureRoute> = [
  {
    path: "/panel",
    name: UserDashboardModuleRouteMap.dashboard,
    file: "~/features/user-dashboard/View.vue",
    meta: {
      restricted: "authorizedOnly",
    },
    children: [
      {
        path: "adresy",
        name: UserDashboardModuleRouteMap.children.addresses,
        file: "~/features/user-dashboard/addresses/View.vue",
      },
      {
        path: "zamowienia",
        name: UserDashboardModuleRouteMap.children.orders,
        file: "~/features/user-dashboard/orders/View.vue",
      },
      {
        path: "ustawienia",
        name: UserDashboardModuleRouteMap.children.settings,
        file: "~/features/user-dashboard/settings/View.vue",
      },
      // {
      //   path: "listy-zyczen",
      //   name: "customer-wish-lists",
      //   file: "~/features/user-dashboard/wish-lists/View.vue",
      // },
    ],
  },
];

export default UserDashboardRoutes;
