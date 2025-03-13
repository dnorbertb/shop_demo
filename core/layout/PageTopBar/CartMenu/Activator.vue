<script setup lang="ts">
const model = defineModel<boolean>({
  required: true,
});

defineProps<{
  itemsCount: number;
}>();
</script>

<template>
  <button
    class="flex flex-col text-sm txt-primary items-center"
    @click="model = true"
  >
    <UChip
      position="top-right"
      class="[&_span.absolute]:!text-white"
      size="2xl"
      :text="itemsCount"
      :show="itemsCount > 0"
    >
      <UIcon class="size-7" name="i-solar-cart-large-2-outline" />
    </UChip>
    <span class="text-xs sm:text-base">Koszyk</span>
  </button>
</template>
