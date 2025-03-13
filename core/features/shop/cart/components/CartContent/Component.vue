<script setup lang="ts">
import type { ProductData } from "~/core/api/products";
import Item from "./Item.vue";

type Content = Array<{
  quantity: number;
  priceWhenAdded: number;
  withdrawn?: boolean;
  product: ProductData;
}>;

defineProps<{
  content: Content;
}>();

const emit = defineEmits<{
  (e: "decreaseItemQuantity", id: string): void;
  (e: "increaseItemQuantity", id: string): void;
  (e: "removeItemFromCart", id: string): void;
}>();
</script>

<template>
  <div>
    <p v-if="content.length < 1" class="txt-quaternary">Nic tu nie ma...</p>
    <div v-else class="flex flex-col gap-3">
      <Item
        v-for="item in content"
        v-bind="item"
        @increase-item-quantity="(id) => emit('increaseItemQuantity', id)"
        @decrease-item-quantity="(id) => emit('decreaseItemQuantity', id)"
        @remove-item-from-cart="(id) => emit('removeItemFromCart', id)"
      />
    </div>
  </div>
</template>
