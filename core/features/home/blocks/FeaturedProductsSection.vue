<script setup lang="ts">
import type { ProductData } from "~/core/api/products";

defineProps<{
  title: string;
  products: Array<ProductData>;
}>();
</script>
<template>
  <section class="py-16 border-t border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-3">
      <h2
        class="text-3xl font-bold text-center text-primary-900 dark:text-primary-50 mb-8"
      >
        {{ title }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <ProductCard
          v-for="(product, index) in products"
          :key="index"
          :data="product"
        />
      </div>
    </div>
  </section>
</template>
