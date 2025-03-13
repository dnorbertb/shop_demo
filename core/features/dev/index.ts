import type { FeatureRoute } from "~/core/types/FeatureRoute";

export const DevModuleRouteMap = {
  fakePayment: "fake-payment-page",
};

const DevModuleRoutes: Array<FeatureRoute> = [
  {
    path: "/dev/fake-payment-page",
    name: DevModuleRouteMap.fakePayment,
    file: "~/features/dev/fake-payment/View.vue",
    meta: {
      availableInDevEnvOnly: true,
    },
  },
];

export default DevModuleRoutes;
