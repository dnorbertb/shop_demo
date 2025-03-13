<script setup lang="ts">
import type { OrderData } from "~/core/api/order";
import type { UiColors } from "~/core/types/UiColors";

defineProps<{
  order: OrderData;
}>();

const badgesMap: Record<string, { label: string; color: UiColors }> = {
  new: { label: "Nowe", color: "primary" },
  // ...others
};
</script>

<template>
  <UiCard>
    <div class="flex justify-between items-center border-b pb-1">
      <p class="text-sm">Zamówienie #{{ order.no }}</p>
      <UBadge v-bind="badgesMap[order.state ?? 'new']" />
    </div>
    <div class="py-2 text-sm">
      <p class="mb-1">Ilość produktów: {{ order.order.length }}</p>
      <p class="mt-1">Wartość zamówienia: {{ order.finalPrice }} zł</p>
      <UButton class="mt-2" variant="link" :padded="false">
        Zobacz szczegóły &raquo;
      </UButton>
    </div>
  </UiCard>
</template>
