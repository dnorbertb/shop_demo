<script setup lang="ts">
import type { CategoryData } from "~/core/api/globalConfig/category";
import { noCategoryOption } from "../../config/noCategoryOption";
import SingleOptionFilterBlock from "./blocks/SingleOptionFilterBlock.vue";

const props = defineProps<{
  currentCategory?: CategoryData | null;
  categories: Array<CategoryData>;
}>();

const categoriesOptions = computed(() => [
  {
    label: noCategoryOption.label,
    code: noCategoryOption.slug,
  },
  ...props.categories.map((category) => ({
    label: category.name,
    code: category.slug,
  })),
]);

const model = defineModel<string | undefined>({ required: true });
</script>

<template>
  <SingleOptionFilterBlock
    label="Kategorie"
    code-name="category"
    :options="categoriesOptions"
    :default-value="noCategoryOption.slug"
    :model-value="model ? [model] : undefined"
    @update:model-value="(e) => (model = e?.[0])"
  />
</template>
