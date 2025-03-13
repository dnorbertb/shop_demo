<script setup lang="ts">
import type { ProductPageData } from "~/core/api/productPages";

type Props = {
  galleryData: ProductPageData["gallery"];
  currentSection?: number;
};

const props = defineProps<Props>();

const createImageId = (sectionId: string, imageIndex: number) =>
  `${sectionId}-${imageIndex}`;

const chosenElementIndex = ref(0);

const selectedSection = computed(() => {
  const validIndex =
    props.currentSection && props.currentSection <= props.galleryData.length
      ? props.currentSection - 1
      : 0;

  return props.galleryData[validIndex];
});
const currentImageData = computed(() => {
  return selectedSection.value.images[chosenElementIndex.value];
});

watch(
  () => props.currentSection,
  () => {
    chosenElementIndex.value = 0;
  }
);
</script>
<template>
  <div :key="selectedSection.id" class="flex flex-col">
    <ResponsiveImage
      :key="createImageId(selectedSection.id, chosenElementIndex)"
      v-bind="currentImageData"
      max-size="standard"
      class="w-full h-auto aspect-1 rounded-md object-cover overflow-hidden"
    />
    <span class="text-xs mb-3 txt-tertiary">{{ selectedSection.label }}</span>
    <div class="flex flex-wrap gap-2 overflow-hidden">
      <button
        v-for="(imageData, index) in selectedSection.images"
        @click="chosenElementIndex = index"
        :class="[
          'block cursor-pointer border-2 rounded transition-colors',
          chosenElementIndex == index
            ? 'border-primary-400'
            : 'border-gray-100',
        ]"
      >
        <ResponsiveImage
          class="size-24 aspect-1 object-cover block [&>img]:rounded-md"
          v-bind="imageData"
          max-size="mobile"
        />
      </button>
    </div>
  </div>
</template>
