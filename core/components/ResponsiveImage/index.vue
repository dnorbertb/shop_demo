<script setup lang="ts">
type Breakpoints = 0 | "sm" | "md" | "lg" | "xl" | "2xl";
const props = defineProps<{
  alt: string;
  srcSet: Record<number, string>;
  height: number;
  width: number;
  loader?: string;
  priority?: boolean;
  /**
   * Informs web browser how much space occupies the image at certain breakpoint.
   * Breakpoints: 0 = 0px; sm = 640px; md = 768px; lg = 1024px; xl = 1280px; 2xl = 1536px;
   * For example md:50 informs browser that from 768px viewport the image will occupy 50% of the viewport.
   * Default value is 100vw.
   * Note that this works mobile first.
   * If you set sm: 50, all the breakpoints above will be 50.
   * Check generated sizes property in developer tools.
   */
  sizes?: Partial<Record<Breakpoints, number>>;
}>();

// Sizes
const breakpointsMap: Record<Breakpoints, number> = {
  0: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

const calculatedSizes = computed(() => {
  const sizesPropAsArray = Object.entries(props.sizes ?? {}) as Array<
    [Breakpoints, number]
  >;
  sizesPropAsArray
    .sort((bpA, bpB) => breakpointsMap[bpA[0]] - breakpointsMap[bpB[0]])
    .reverse();

  // Will throw under development only
  const areValuesValid = sizesPropAsArray.length
    ? sizesPropAsArray.some(([_, value]) => !(value < 0 || value > 100))
    : true;
  if (!areValuesValid) {
    throw new Error(
      "ResponsiveImage sizes prop values should be between 0 an 100"
    );
  }

  const generatedValues = sizesPropAsArray
    .map(([key, value]) => `(min-width: ${breakpointsMap[key]}px) ${value}vw`)
    .join(", ");
  return generatedValues + ", 100vw";
});

// srcSet
const srcSetArray = computed(() => Object.entries(props.srcSet));
const calculatedSrcSet = computed(() => {
  return srcSetArray.value.map(([key, value]) => `${value} ${key}w`).join(", ");
});

// Handling loader
const isLoaded = ref(false);
const imageRef = ref<HTMLImageElement>();
onMounted(() => {
  if (imageRef.value?.complete) {
    isLoaded.value = true;
  } else {
    imageRef.value?.addEventListener("load", () => {
      isLoaded.value = true;
    });
  }
});
</script>
<template>
  <img
    ref="imageRef"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="priority ? 'eager' : 'lazy'"
    :fetchPriority="priority ? 'high' : 'low'"
    :srcset="calculatedSrcSet"
    :src="srcSetArray[srcSetArray.length - 1][1]"
    :sizes="calculatedSizes"
    :style="{
      backgroundImage: !isLoaded && !priority ? `url(${loader})` : undefined,
    }"
    :class="{ 'blur bg-cover transition text-[0]': !isLoaded && !priority }"
  />
</template>
