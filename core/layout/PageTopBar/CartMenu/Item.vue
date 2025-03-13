<script setup lang="ts">
import type { ProductData } from "~/core/api/products";
import { productUrlToRouteLocation } from "~/core/helpers/productUrlToRouteLocation";

const props = defineProps<{
  quantity: number;
  product: ProductData;
}>();

const emit = defineEmits<{
  (e: "increaseItemQuantity", id: string): void;
  (e: "decreaseItemQuantity", id: string): void;
  (e: "deleteItem", id: string): void;
}>();

const allAvailabilityUsed = computed(
  () => !(props.product.stock.availability > props.quantity)
);
const productLinkData = productUrlToRouteLocation(props.product.productUrl);
</script>
<template>
  <div
    class="relative flex py-2 items-center border-b border-gray-300 dark:border-gray-700"
  >
    <div
      v-if="product.stock.availability < 1"
      class="absolute h-full w-full grid place-items-center z-30 bg-white bg-opacity-80 uppercase font-semibold text-sm txt-secondary"
    >
      Ten produkt nie jest aktualnie dostępny
    </div>
    <ResponsiveImage class="h-20 w-20 rounded-lg" v-bind="product.miniature" />
    <div class="flex-1 flex flex-col justify-between pl-3">
      <div class="flex justify-between items-start gap-10 mb-2">
        <div>
          <span class="block text-sm txt-secondary font-semibold">
            {{ product.manufacturer.name }}
          </span>
          <NuxtLink
            :to="{
              name: 'product-view',
              ...productLinkData,
            }"
            class="block txt-secondary hover:text-primary-500 font-semibold underline underline-offset-2"
          >
            {{ product.name }}
          </NuxtLink>
          <span class="block text-sm txt-secondary tracking-wider">
            {{
              product.parameters
                .filter((p) => p.isIdentifier)
                .map((p) => p.valueLabel)
                .join(" ")
            }}
          </span>
        </div>
        <UButton
          size="md"
          variant="ghost"
          icon="i-solar-trash-bin-trash-outline"
          @click="() => emit('deleteItem', product.id)"
        />
      </div>
      <div class="flex justify-between items-center">
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
            {{ quantity }}
          </span>
          <UButton
            class="p-0.5"
            size="md"
            variant="ghost"
            icon="i-solar-add-circle-outline"
            :disabled="allAvailabilityUsed"
            @click="() => emit('increaseItemQuantity', product.id)"
          />
        </div>
        <span class="text-sm txt-secondary font-semibold">
          {{ (quantity * product.pricing.brutto).toFixed(2) }} zł
        </span>
      </div>
      <span class="text-[10px] text-red-400" v-if="allAvailabilityUsed">
        Dodano maksymalną ilość dostępną w magazynie
      </span>
    </div>
  </div>
</template>
