<script setup lang="ts">
import type { ImageData } from "~/core/api/media";

defineProps<{
  photo: ImageData;
  name: string;
  title: string;
  bio: string;
}>();
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <UDivider class="mb-10" />
    <div class="flex items-center gap-5 mb-5">
      <ResponsiveImage
        class="size-16 rounded-full overflow-hidden object-cover object-center"
        v-bind="photo"
      />
      <div class="flex flex-col">
        <span class="text-2xl">
          {{ name }}
        </span>
        <span class="txt-tertiary">
          {{ title }}
        </span>
      </div>
    </div>
    <p class="txt-secondary text-lg">
      {{ bio }}
    </p>
  </div>
</template>
