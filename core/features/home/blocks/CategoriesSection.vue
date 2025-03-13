<script setup lang="ts">
import { useGlobalConfigStore } from "~/core/stores/globalConfigStore";

const globalConfigStore = useGlobalConfigStore();

const { data } = await useAsyncData(async () => {
  const globalData = await globalConfigStore.getData();
  return globalData.categoriesData;
});

defineProps<{
  title: string;
}>();
</script>
<template>
  <section class="pt-20 pb-28 border-t dark:border-gray-700">
    <div class="container mx-auto px-3">
      <h2 class="text-3xl font-bold text-center txt-secondary mb-8 lg:mb-12">
        {{ title }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <NuxtLink
          v-for="category in data"
          :to="{ name: 'shop-browser', params: { category: category.slug } }"
          :key="category.id"
          class="text-center bg-white dark:bg-gray-900 dark:ring-gray-600 p-6 rounded-lg shadow ring-2 ring-gray-200 hover:ring-primary-500 hover:ring-4 duration-200 transition-all"
        >
          <ResponsiveImage
            v-bind="category.logo"
            class="size-28 rounded-lg mx-auto mb-4"
          />
          <h3 class="text-xl font-semibold txt-secondary">
            {{ category.name }}
          </h3>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
