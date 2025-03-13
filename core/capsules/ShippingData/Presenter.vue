<script setup lang="ts">
import { presentersMap } from "./presentersMap";
import type { ShippingDataProvidersKeys } from "./types";

defineProps<{
  provider: ShippingDataProvidersKeys;
  data: string;
}>();
</script>

<template>
  <div>
    <component :is="presentersMap[provider]" :data="data" />
  </div>
</template>
