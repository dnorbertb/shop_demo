<script setup lang="ts">
import type { ImageData } from "~/core/api/media";

defineProps<{
  title: string;
  logos: Array<{
    href: string;
    image: ImageData;
  }>;
}>();
</script>
<template>
  <section class="py-16 border-t border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-3">
      <h2
        class="text-3xl font-bold text-center text-primary-900 dark:text-primary-50 mb-8"
      >
        {{ title }}
      </h2>
      <div class="flex overflow-hidden items-center space-x-8 animate-scroll">
        <NuxtLink v-for="(logo, index) in logos" :key="index" :to="logo.href">
          <ResponsiveImage v-bind="logo.image" class="h-16 w-auto" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
<style>
.animate-scroll {
  display: flex;
  animation: scroll 10s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
