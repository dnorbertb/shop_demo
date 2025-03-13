<script setup lang="ts">
import type { AsyncDataRequestStatus } from "#app";
import type { ProductData } from "~/core/api/products";

const props = defineProps<{
  changesPending?: boolean;
  loadingState: AsyncDataRequestStatus;
  products: Array<ProductData>;
}>();

const productsAvailable = computed(() => props.products.length > 0);
</script>
<template>
  <div
    v-if="!changesPending && loadingState == 'success' && productsAvailable"
    class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
  >
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :data="product"
    />
  </div>
  <div
    v-else-if="
      !changesPending && loadingState != 'pending' && !productsAvailable
    "
    class="flex-1 grid place-content-center h-full w-full"
  >
    <p class="text-lg txt-tertiary text-center">
      Nie znaleźliśmy żadnych produktów które spełniałyby wymagane kryteria
      wyszukiwania.
    </p>
  </div>
  <UiLoader v-else-if="loadingState == 'pending' || changesPending" />
</template>
