<script setup lang="ts">
import type { ImageData } from "~/core/api/media";

defineProps<{
  logo: ImageData;
  title: string;
  description?: string;
  button: {
    label: string;
    href: string;
  };
}>();
</script>
<template>
  <section class="py-16 border-t border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-3 flex flex-col items-center text-center">
      <ResponsiveImage v-bind="logo" class="h-24 mb-6" />
      <h2 class="text-3xl font-bold text-primary-900 dark:text-primary-50 mb-4">
        {{ title }}
      </h2>
      <p v-if="description" class="text-primary-700 dark:text-primary-300 mb-6">
        {{ description }}
      </p>
      <UButton :to="button.href">{{ button.label }}</UButton>
    </div>
  </section>
</template>
