<script setup lang="ts">
export type ArticleCardProps = {
  title: string;
  intro: string;
  href: string;
};

defineProps<ArticleCardProps>();
</script>
<template>
  <div
    class="border border-primary-100 dark:border-primary-800 rounded-lg p-6 shadow-sm bg-white dark:bg-primary-800"
  >
    <h3 class="text-xl font-bold text-primary-800 dark:text-primary-50 mb-4">
      {{ title }}
    </h3>
    <p class="text-primary-700 dark:text-primary-300 mb-4">
      {{ intro }}
    </p>
    <UButton :to="href">Czytaj więcej</UButton>
  </div>
</template>
