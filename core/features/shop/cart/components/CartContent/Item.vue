<script setup lang="ts">
import type { ProductData } from "~/core/api/products";
import { productUrlToRouteLocation } from "~/core/helpers/productUrlToRouteLocation";

defineProps<{
  quantity: number;
  withdrawn?: boolean; // add support for this bool
  product: ProductData;
}>();

const emit = defineEmits<{
  (e: "decreaseItemQuantity", id: string): void;
  (e: "increaseItemQuantity", id: string): void;
  (e: "removeItemFromCart", id: string): void;
}>();
</script>

<template>
  <UiCard class="flex gap-4 bg-white shadow-sm">
    <ResponsiveImage
      class="h-24 w-24 rounded-lg overflow-hidden border-gray-300 border-2"
      v-bind="product.miniature"
    />
    <div class="flex-1 flex flex-col">
      <div class="flex items-center">
        <UButton
          class="p-0.5"
          size="md"
          variant="ghost"
          icon="i-solar-minus-circle-outline"
          :disabled="quantity < 2"
          @click="() => emit('decreaseItemQuantity', product.id)"
        />
        <span class="text-sm font-semibold txt-secondary w-5 text-center">
          {{ quantity }}x
        </span>
        <UTooltip
          :text="
            !(product.stock.availability > quantity)
              ? 'Brak większej ilości w magazynie'
              : ''
          "
        >
          <UButton
            class="p-0.5"
            size="md"
            variant="ghost"
            icon="i-solar-add-circle-outline"
            :disabled="!(product.stock.availability > quantity)"
            @click="() => emit('increaseItemQuantity', product.id)"
          />
        </UTooltip>
        <UButton
          class="ml-auto p-0.5"
          size="md"
          variant="ghost"
          icon="i-solar-trash-bin-trash-outline"
          @click="() => emit('removeItemFromCart', product.id)"
        />
      </div>
      <NuxtLink
        :to="{
          name: 'product-view',
          ...productUrlToRouteLocation(product.productUrl),
        }"
        class="text-medium text-sm sm:text-lg txt-tertiary underline"
      >
        {{ product.manufacturer.name }} {{ product.name }}
      </NuxtLink>
      <span class="text-medium text-sm txt-tertiary">
        {{
          product.parameters
            .filter((p) => p.isIdentifier)
            .map((p) => p.valueLabel)
            .join(" ")
        }}
      </span>
      <span class="text-medium text-sm txt-tertiary"> </span>
      <span class="mt-auto txt-secondary">
        {{ (quantity * product.pricing.brutto).toFixed(2) }} zł
      </span>
    </div>
  </UiCard>
</template>
