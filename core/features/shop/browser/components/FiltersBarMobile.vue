<script setup lang="ts">
import type { CategoryData } from "~/core/api/globalConfig/category";
import FiltersBar from "./FiltersBar/Main.vue";

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
const drawerOpen = ref(false);
</script>
<template>
  <Teleport to="body">
    <div class="lg:hidden fixed bottom-10 right-10 z-50">
      <UTooltip text="Filtry" :popper="{ placement: 'top' }">
        <UButton
          class="p-5 rounded-full shadow-lg bg-white"
          icon="i-solar-tuning-2-linear"
          variant="outline"
          color="primary"
          size="xl"
          @click="drawerOpen = true"
        />
      </UTooltip>
    </div>
  </Teleport>
  <USlideover v-model="drawerOpen">
    <div class="h-svh flex flex-col py-6">
      <div class="flex items-center gap-4 mb-6 px-4">
        <UButton
          @click="drawerOpen = false"
          icon="i-solar-double-alt-arrow-right-outline"
          variant="soft"
          size="xl"
        />
        <ULabel class="!text-2xl !mb-0" for="keywordSearchInput">
          Filtry
        </ULabel>
      </div>
      <FiltersBar
        class="flex-1 pb-10 px-4 overflow-auto"
        :current-category="currentCategory"
        :categories="categories"
        v-model:category="categoryModel"
        v-model:query-data="queryModel"
      />
    </div>
  </USlideover>
</template>
