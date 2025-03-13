<script setup lang="ts">
defineProps<{
  title: string;
  lines: Array<{
    label: string;
    href?: string;
  }>;
}>();
</script>
<template>
  <section
    class="bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-50 py-16"
  >
    <div class="container mx-auto px-3">
      <h2 class="text-3xl font-bold text-center mb-8">{{ title }}</h2>
      <div class="text-center flex flex-col gap-4 text-lg">
        <template v-for="line in lines">
          <NuxtLink v-if="line.href" :to="line.href">{{ line.label }}</NuxtLink>
          <p v-else>{{ line.label }}</p>
        </template>
      </div>
    </div>
  </section>
</template>
