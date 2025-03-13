<script setup lang="ts">
import type { BaseTextChildProps } from "../TextNode/BaseChild.vue";
import type { LinkChildProps } from "../TextNode/LinkChild.vue";

export type ListNodeProps = {
  type: "ul" | "ol";
  children: Array<{
    type: "li";
    children: Array<BaseTextChildProps | LinkChildProps>;
  }>;
};

defineProps<ListNodeProps>();
</script>
<template>
  <component :is="type">
    <li v-for="child in children">
      <template v-for="nestedChild in child.children">
        <RichTextTextNodeBaseChild
          v-if="!nestedChild?.type"
          v-bind="nestedChild"
        />
        <RichTextTextNodeLinkChild v-else v-bind="nestedChild" />
      </template>
    </li>
  </component>
</template>
