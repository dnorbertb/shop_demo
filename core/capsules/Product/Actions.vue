<script setup lang="ts">
const emit = defineEmits<{
  (e: "addToCart"): void;
  (e: "addToWishList"): void;
}>();
const props = defineProps<{
  availability?: number;
  piecesInCart?: number;
  showCartDisabledTooltip?: boolean;
  reversedLayout?: boolean;
}>();

const isOutOfStock = computed(() => {
  if (typeof props.availability != "number") return false;
  return !props.availability;
});

const isStockFullyUsed = computed(() => {
  if (!props.piecesInCart || !props.availability) return false;
  return !(props.piecesInCart < props.availability);
});

const addToCartButtonTooltipText = computed(() => {
  if (!props.showCartDisabledTooltip) return "";
  if (isOutOfStock.value) {
    return "Ten produkt jest aktualnie niedostępny";
  }
  if (isStockFullyUsed.value) {
    return "Dodałeś do koszyka wszystko co mamy";
  }
  return "";
});

const addToCartButtonDisabled = computed(() => {
  return isStockFullyUsed.value || isOutOfStock.value;
});
</script>
<template>
  <div :class="['flex gap-2', { 'flex-row-reverse': reversedLayout }]">
    <!-- <UTooltip text="Dodaj do listy życzeń">
      <UButton
        variant="soft"
        size="xl"
        icon="i-solar-heart-outline"
        @click="() => emit('addToWishList')"
      />
    </UTooltip> -->

    <UTooltip
      class="w-full flex-1"
      :text="addToCartButtonTooltipText"
      :popper="{ placement: 'bottom' }"
      :open-delay="250"
    >
      <UButton
        class="w-full !text-white"
        icon="i-solar-cart-plus-outline"
        size="xl"
        block
        trailing
        @click="() => emit('addToCart')"
        :disabled="addToCartButtonDisabled"
      >
        Dodaj do koszyka
      </UButton>
    </UTooltip>
  </div>
</template>
