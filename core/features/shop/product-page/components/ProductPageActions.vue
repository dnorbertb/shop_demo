<script setup lang="ts">
defineProps<{
  availability?: number;
  piecesInCart?: number;
}>();

const emit = defineEmits<{
  (e: "addToCart"): void;
  (e: "addToWishList"): void;
}>();
</script>
<template>
  <div>
    <ProductActions
      class="mb-1 mt-4"
      :availability="availability"
      :piecesInCart="piecesInCart"
      @addToCart="emit('addToCart')"
      @addToWishList="emit('addToWishList')"
    />
    <span
      v-if="!((availability ?? 0) > (piecesInCart ?? 0))"
      class="text-xs text-red-600 whitespace-break-spaces"
    >
      W Twoim koszyku znajduje się wszystko co mamy w magazynie
    </span>
  </div>
</template>
