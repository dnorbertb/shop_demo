<script setup lang="ts">
import { ShopModuleRouteMap } from "~/core/features/shop";

defineProps<{
  totalPrice: number;
  checkoutDisabled?: boolean;
}>();
</script>

<template>
  <div class="p-3 px-5 border-t border-t-gray-100 dark:border-gray-700">
    <div class="flex justify-between items-center mb-3">
      <span class="font-semibold txt-tertiary">WARTOŚĆ KOSZYKA:</span>
      <span class="text-xl font-semibold txt-secondary">
        {{ totalPrice.toFixed(2) }} zł
      </span>
    </div>
    <UButton
      :to="{ name: ShopModuleRouteMap.cartView }"
      :disabled="checkoutDisabled"
      class="!text-white"
      size="xl"
      block
    >
      <span class="font-semibold"> DO KASY </span>
    </UButton>
    <span class="block text-xs txt-quaternary mt-2 text-center">
      Rabat oraz kupony zniżkowe zostaną naliczone podczas finalizacji
      zamówienia.
    </span>
  </div>
</template>
