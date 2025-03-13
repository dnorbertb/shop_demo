<script setup lang="ts">
import type { BaseTextChildProps } from "../TextNode/BaseChild.vue";
import type { LinkChildProps } from "../TextNode/LinkChild.vue";

export type HeadingNodeProps = {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: Array<BaseTextChildProps | LinkChildProps>;
};

defineProps<HeadingNodeProps>();
</script>
<template>
  <component :is="type">
    <template v-for="child in children">
      <RichTextTextNodeBaseChild v-if="!child?.type" v-bind="child" />
      <RichTextTextNodeLinkChild v-else v-bind="child" />
    </template>
  </component>
</template>
