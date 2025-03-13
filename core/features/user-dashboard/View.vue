<script setup lang="ts">
import { UserDashboardModuleRouteMap } from ".";

useSeoMeta({
  title: ":: Made4Ride.pl :: Panel użytkownika",
  robots: {
    noindex: true,
  },
});

const menuEntries = [
  {
    icon: "i-solar-cart-large-2-outline",
    label: "Moje zamówienia",
    to: { name: UserDashboardModuleRouteMap.children.orders },
  },
  {
    icon: "i-solar-map-point-outline",
    label: "Moje adresy",
    to: { name: UserDashboardModuleRouteMap.children.addresses },
  },
  // {
  //   icon: "i-solar-heart-outline",
  //   label: "Listy życzeń",
  //   to: "/panel/listy-zyczen",
  // },
  {
    icon: "i-solar-settings-outline",
    label: "Ustawienia konta",
    to: { name: UserDashboardModuleRouteMap.children.settings },
  },
];
</script>
<template>
  <div
    class="container mx-auto px-3 py-6 h-full flex flex-col md:flex-row gap-y-5 gap-x-10"
  >
    <UVerticalNavigation :links="menuEntries" />
    <div class="w-full">
      <NuxtPage />
    </div>
  </div>
</template>
