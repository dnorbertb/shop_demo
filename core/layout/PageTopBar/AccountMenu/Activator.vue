<script setup lang="ts">
defineProps<{ disabled?: boolean }>();
</script>
<template>
  <button
    class="flex flex-col text-sm items-center txt-primary"
    :disabled="disabled"
  >
    <UIcon class="size-7" name="i-solar-user-circle-outline" />
    <span class="text-xs sm:text-base">Konto</span>
  </button>
</template>
