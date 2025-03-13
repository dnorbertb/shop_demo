<script setup lang="ts">
import type { BaseTextChildProps } from "./BaseChild.vue";

export type LinkChildProps = {
  type: "link";
  url: string;
  children: Array<BaseTextChildProps>;
};

defineProps<LinkChildProps>();
</script>
<template>
  <NuxtLink
    class="hover:underline hover:decoration-primary-600"
    :href="url"
    :external="url.startsWith('http')"
  >
    <RichTextTextNodeBaseChild v-for="child in children" v-bind="child" />
  </NuxtLink>
</template>
