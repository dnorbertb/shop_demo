<script setup lang="ts">
defineProps<{
  isCartEmpty: boolean;
}>();
</script>

<template>
  <UTooltip
    class="w-full"
    :text="isCartEmpty ? 'Dodaj coś do koszyka aby dokończyć zamówienie' : ''"
  >
    <UButton size="xl" class="py-4" type="submit" :disabled="isCartEmpty" block>
      Złóż zamówienie
    </UButton>
  </UTooltip>
</template>
