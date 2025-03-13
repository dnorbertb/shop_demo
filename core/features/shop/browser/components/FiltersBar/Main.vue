<script setup lang="ts">
import type { CategoryData } from "~/core/api/globalConfig/category";
import KeywordSearch from "./KeywordSearch.vue";
import CategoryChanger from "./CategoryChanger.vue";
import DynamicFiltersMapper from "./DynamicFiltersMapper.vue";
import NumberRangeFilterBlock from "./blocks/NumberRangeFilterBlock.vue";

defineProps<{
  currentCategory?: CategoryData | null;
  categories: Array<CategoryData>;
}>();

const categoryModel = defineModel<string | undefined>("category", {
  required: true,
});
const queryModel = defineModel<Record<string, unknown>>("queryData", {
  required: true,
});
</script>
<template>
  <div class="flex flex-col gap-4 txt-secondary">
    <KeywordSearch
      :model-value="queryModel.search as string"
      @update:model-value="
        (value) => $emit('update:queryData', { search: value })
      "
    />
    <!--  Price -->
    <NumberRangeFilterBlock
      label="Cena"
      :model-value="queryData.price as Record<string, string>"
      @update:model-value="
        (value) => $emit('update:queryData', { price: value })
      "
    />
    <CategoryChanger
      :current-category="currentCategory"
      :categories="categories"
      :model-value="categoryModel"
      @update:model-value="(value) => $emit('update:category', value)"
    />
    <!-- Category filters dynamically mapped -->
    <DynamicFiltersMapper
      :filters="currentCategory?.filters ?? []"
      :model-value="queryData"
      @update:model-value="(value) => $emit('update:queryData', value)"
    />
  </div>
</template>
