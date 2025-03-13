<script setup lang="ts">
import { useActionOnUrlChange } from "~/core/composables/useActionOnUrlChange";
import { useCartStore } from "~/core/stores/cartStore";

const cartStore = useCartStore();
const cartOpen = ref<boolean>(false);
useActionOnUrlChange(() => (cartOpen.value = false));
</script>

<template>
  <PageTopBarCartMenuActivator
    v-model="cartOpen"
    :itemsCount="cartStore.itemsCount"
  />
  <USlideover v-model="cartOpen">
    <div class="relative flex flex-col flex-1 pt-8 overflow-hidden">
      <UButton
        class="absolute left-4 top-6 sm:hidden"
        @click="cartOpen = false"
        icon="i-solar-double-alt-arrow-right-outline"
        variant="soft"
        size="xl"
      />

      <span class="mb-8 text-lg text-center font-semibold txt-primary">
        Koszyk:
      </span>
      <div
        class="flex-1 flex flex-col overflow-hidden border-t border-gray-100 dark:border-gray-700"
      >
        <div class="relative flex-1 overflow-x-hidden overflow-y-auto px-5">
          <PageTopBarCartMenuItem
            v-for="item in cartStore.cartDataWithProductsData"
            v-bind="item"
            :key="item.product.id"
            @decrease-item-quantity="cartStore.decreaseItemQuantity"
            @increase-item-quantity="cartStore.increaseItemQuantity"
            @delete-item="cartStore.removeItemFromCart"
          />
          <div
            class="h-20 sticky bottom-0 left-0 w-full bg-gradient-to-t from-white dark:from-gray-900 to-transparent"
          />
        </div>
        <PageTopBarCartMenuFooter
          class="mt-auto"
          :totalPrice="cartStore.totalPrice"
          :checkout-disabled="cartStore.itemsCount < 1"
        />
      </div>
    </div>
  </USlideover>
</template>
