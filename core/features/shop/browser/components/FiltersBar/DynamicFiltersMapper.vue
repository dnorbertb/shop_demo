<script setup lang="ts">
import type { Component } from "vue";
import type { CategoryData } from "~/core/api/globalConfig/category";
import ManyOptionsFilterBlock from "./blocks/ManyOptionsFilterBlock.vue";
import SingleOptionFilterBlock from "./blocks/SingleOptionFilterBlock.vue";

const filterBlocksMap: Record<string, Component> = {
  manyOptions: ManyOptionsFilterBlock,
  singleOption: SingleOptionFilterBlock,
};

defineProps<{
  filters: CategoryData["filters"];
}>();
const model = defineModel<Record<string, unknown>>({ required: true });
</script>
<template>
  <component
    v-for="filter in filters"
    :is="filterBlocksMap[filter.type]"
    v-bind="filter"
    :model-value="model[filter.code]"
    @update:model-value="(e: unknown) => $emit('update:modelValue', {[filter.code]:e})"
  />
</template>
