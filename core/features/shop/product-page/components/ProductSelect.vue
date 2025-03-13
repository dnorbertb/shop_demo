<script setup lang="ts">
import type { ProductPageData } from "~/core/api/productPages";

export type ProductSelectProps = {
  productMap: ProductPageData["productMap"];
};

defineProps<ProductSelectProps>();
const model = defineModel<string>({ required: true });
</script>

<template>
  <fieldset class="[&_*]:select-none">
    <legend class="mb-2 text-sm font-medium txt-tertiary">Wybierz typ:</legend>
    <div class="flex flex-wrap justify-start gap-2 overflow-hidden">
      <label
        v-for="entry in productMap"
        :class="[
          'flex items-center gap-1 cursor-pointer border-2 transition-colors p-1',
          model == entry.variantId ? 'border-primary-500' : 'border-gray-100',
          !entry.product.stock.availability ? 'opacity-30' : '',
        ]"
      >
        <input
          class="hidden"
          type="radio"
          name="type"
          :value="entry.variantId"
          v-model="model"
        />
        <ResponsiveImage
          class="size-10"
          v-bind="entry.product.miniature"
          max-size="mobile"
          draggable="false"
        />
        <span class="text-xs">{{ entry.label }}</span>
      </label>
    </div>
  </fieldset>
</template>
