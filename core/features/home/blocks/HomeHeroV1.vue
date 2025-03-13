<script setup lang="ts">
import type { ImageData } from "~/core/api/media";
import type { RichTextData } from "~/core/api/shared";

defineProps<{
  title: string;
  description: RichTextData;
  button: {
    label: string;
    href: string;
  };
  image: ImageData;
}>();
</script>

<template>
  <section class="text-primary-900 dark:text-primary-100 py-16 mb-12">
    <div class="container mx-auto px-3 md:grid grid-cols-2 gap-10 items-center">
      <div class="col-span-1 text-center md:text-left">
        <h1
          class="text-3xl sm:text-4xl xl:text-5xl font-bold mb-4 whitespace-break-spaces !leading-snug"
        >
          {{ title }}
        </h1>
        <div class="text-lg mb-10">
          <RichText :content="description" />
        </div>
        <UButton color="white" variant="outline" size="lg" :to="button.href">
          {{ button.label }} &raquo;
        </UButton>
      </div>
      <div
        class="col-span-1 max-w-lg md:max-w-none mt-8 md:mt-0 mx-auto rounded-xl shadow-xl overflow-hidden"
      >
        <ResponsiveImage v-bind="image" />
      </div>
    </div>
  </section>
</template>
