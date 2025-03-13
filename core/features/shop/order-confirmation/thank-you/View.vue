<script setup lang="ts">
import { UserDashboardModuleRouteMap } from "~/core/features/user-dashboard";

useSeoMeta({
  title: ":: Made4Ride.pl :: Dziękujemy za zamówienie",
});
</script>
<template>
  <div
    class="grid h-full px-4 py-20 md:py-28 lg:py-40 w-full place-content-center"
  >
    <UiCard class="p-8 shadow-lg max-w-md text-center">
      <UIcon
        name="line-md-confirm-circle"
        class="w-16 h-16 mx-auto text-green-400"
      />
      <h1 class="text-2xl font-bold text-green-500 mt-4">
        Dziękujemy za zamówienie!
      </h1>
      <p class="txt-tertiary mt-3 mb-6">
        Twoje zamówienie zostało pomyślnie złożone i&nbsp;przekazane do
        realizacji.
      </p>
      <UButton
        color="gray"
        :to="{ name: UserDashboardModuleRouteMap.children.orders }"
      >
        Sprawdź swoje zamówienia
      </UButton>
    </UiCard>
  </div>
</template>
