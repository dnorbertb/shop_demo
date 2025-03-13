<script setup lang="ts">
import type { ProductData } from "~/core/api/products";

defineProps<{
  productData?: ProductData;
}>();
</script>
<template>
  <h1 id="title" class="text-3xl font-bold txt-secondary tracking-wide">
    {{ productData?.name }}
  </h1>
  <!-- <div v-if="rating" class="mt-3 gap-2 flex items-center">
    <RatingStars :rating="rating" />
    <NuxtLink class="text-xs txt-tertiary mt-px" to="#reviews">
      Zobacz recenzje >
    </NuxtLink>
  </div> -->
  <ShortDivider class="mb-4 mt-8" />
  <div class="prose mb-4 txt-tertiary">
    <slot name="summary" />
  </div>
  <ShortDivider class="mb-8" />
  <span class="block text-2xl txt-tertiary font-semibold">
    {{ productData?.pricing.brutto }} zł
  </span>
  <span class="block text-[10px] txt-quaternary">
    W tym {{ productData?.pricing.vat }} zł VAT
  </span>
  <span class="block text-[10px] txt-quaternary mb-4">
    Najniższa cena z ostatnich 30 dni: {{ 0 }} zł
  </span>
</template>
