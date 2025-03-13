<script setup lang="ts">
import type { ArticleCardProps } from "~/core/components/ArticleCard.vue";

defineProps<{
  title: string;
  articles: Array<ArticleCardProps>;
}>();
</script>
<template>
  <section class="py-16 border-t border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-3">
      <h2
        class="text-3xl font-bold text-center text-primary-900 dark:text-primary-50 mb-8"
      >
        Najnowsze artykuły
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6"></div>
    </div>
  </section>
</template>
