<script setup lang="ts">
import { collectorsMap } from "./collectorsMap";
import type { ShippingDataProvidersKeys } from "./types";

defineProps<{
  provider: ShippingDataProvidersKeys;
  error?: string;
}>();

const emit = defineEmits<{
  (e: "updatePoint", data: string | null): void;
}>();
</script>

<template>
  <UFormGroup :error="error" id="additionalShippingData">
    <component
      :is="collectorsMap[provider]"
      @update-point="(data) => emit('updatePoint', data)"
    />
  </UFormGroup>
</template>
