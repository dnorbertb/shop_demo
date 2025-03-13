<script setup lang="ts">
import type { ProductData } from "~/core/api/products";

const props = defineProps<{
  productData?: ProductData;
}>();

const parameters = computed(() => {
  const fromMainParams =
    props.productData?.parameters.map((param) => ({
      label: param.label,
      value: param.valueLabel,
    })) ?? [];
  const fromOtherParams =
    props.productData?.otherParameters.map((param) => ({
      label: param.type,
      value: param.value,
    })) ?? [];

  return [...fromMainParams, ...fromOtherParams];
});
</script>
<template>
  <div>
    <UAlert
      class="mb-1"
      color="primary"
      variant="soft"
      title="Sczegółowe parametry produktu"
    />
    <div
      v-if="parameters.length > 0"
      class="flex justify-between px-3 py-3 border-b border-gray-300"
      v-for="param in parameters"
    >
      <span>{{ param.label }}</span>
      <span>{{ param.value }}</span>
    </div>
    <p v-else>Niczego tutaj nie ma</p>
  </div>
</template>
