<script setup lang="ts">
import type { ProductData } from "~/core/api/products";
import { useCartStore } from "~/core/stores/cartStore";
import { productUrlToRouteLocation } from "~/core/helpers/productUrlToRouteLocation";

// Component data
const toast = useToast();
const cartStore = useCartStore();
const props = defineProps<{
  data: ProductData;
}>();

const linkData = productUrlToRouteLocation(props.data.productUrl);

const availabilityMessages: Array<{
  color: "green" | "yellow" | "red";
  message: string;
}> = [
  {
    color: "red",
    message: "Chwilowo niedostępny",
  },
  {
    color: "yellow",
    message: "Dostępna ograniczona ilość",
  },
  {
    color: "green",
    message: "W magazynie",
  },
];

const availability = computed(() => {
  const availability = props.data.stock.availability;
  if (!availability) return availabilityMessages[0];
  if (availability < 5) return availabilityMessages[1];
  return availabilityMessages[2];
});

const modelIdentifier = computed(() => {
  return props.data.parameters
    .filter((param) => param.isIdentifier)
    .map((p) => p.valueLabel)
    .join(" ");
});

// Handlers
const handleAddToCart = () => {
  cartStore.addItemToCart(props.data);
  toast.add({
    title: "Produkt został dodany do koszyka",
    icon: "i-solar-check-circle-outline",
    color: "green",
    timeout: 1500,
  });
};

const handleAddToWishList = () => {
  // Add to wish list store
  toast.add({
    title: "Produkt został dodany do listy życzeń",
    icon: "i-solar-check-circle-outline",
    color: "green",
    timeout: 1500,
  });
};
</script>
<template>
  <UiCard class="relative flex flex-col bg-white shadow-xs cursor-pointer">
    <NuxtLink class="group" :to="{ name: 'product-view', ...linkData }">
      <UTooltip
        :text="availability.message"
        class="absolute top-5 right-5 z-10"
      >
        <UChip size="xl" class="shadow-xl" :color="availability.color" />
      </UTooltip>

      <ResponsiveImage
        v-bind="data.miniature"
        class="w-full object-contain aspect-square rounded overflow-hidden mb-1"
      />

      <div class="flex items-center justify-between gap-2 mb-1">
        <span class="text-sm txt-tertiary font-bold">
          {{ data.manufacturer.name }}
        </span>

        <ResponsiveImage
          v-bind="data.manufacturer.logo"
          class="h-6 w-auto max-w-20 object-contain rounded"
        />
      </div>

      <h3
        class="text-xl font-semibold txt-primary mb-0.5 group-hover:underline"
      >
        {{ data.name }}
      </h3>

      <p class="flex gap-1 mb-1 text-sm txt-tertiary">
        {{ modelIdentifier }}
      </p>

      <p class="text-lg txt-secondary font-semibold mb-5">
        {{ data.pricing.brutto }} zł
      </p>
    </NuxtLink>
    <ProductActions
      @addToCart="handleAddToCart"
      @addToWishList="handleAddToWishList"
      class="mt-auto"
      :availability="data.stock.availability"
      :piecesInCart="cartStore.getCartItemQuantity(data.id)"
      showCartDisabledTooltip
    />
  </UiCard>
</template>
