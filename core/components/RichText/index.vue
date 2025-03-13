<script setup lang="ts">
import type { BaseTextChildProps } from "./TextNode/BaseChild.vue";
import type { HeadingNodeProps } from "./HeadingNode/index.vue";
import type { LinkChildProps } from "./TextNode/LinkChild.vue";
import type { ListNodeProps } from "./ListNode/index.vue";
import type { ImageData } from "~/core/api/media";

type PNode = {
  type?: undefined;
  children: Array<BaseTextChildProps | LinkChildProps>;
};

type ImageNode = {
  type: "upload";
  value: ImageData;
};

export type UiRichTextProps = Array<
  PNode | ImageNode | HeadingNodeProps | ListNodeProps
>;

defineProps<{ content: UiRichTextProps }>();
</script>
<template>
  <template v-for="node in content">
    <RichTextTextNode v-if="!node.type" :children="node.children" />
    <ResponsiveImage v-if="node.type == 'upload'" v-bind="node.value" />
    <RichTextHeadingNode
      v-if="['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.type ?? '')"
      v-bind="node as HeadingNodeProps"
    />
    <RichTextListNode
      v-if="['ol', 'ul'].includes(node.type ?? '')"
      v-bind="node as ListNodeProps"
    />
  </template>
</template>
