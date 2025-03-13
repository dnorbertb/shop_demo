import type { ShippingDataProvidersKeys } from "./types";
import type { Component } from "vue";
import InPostGeoWidget from "./providers/InPostGeoWidget/Presenter.vue";

export const presentersMap: Record<ShippingDataProvidersKeys, Component> = {
  InPostGeoWidget,
};
