<script setup lang="ts">
import type { BaseTextChildProps } from "./BaseChild.vue";
import type { LinkChildProps } from "./LinkChild.vue";

defineProps<{ children: Array<BaseTextChildProps | LinkChildProps> }>();
</script>
<template>
  <p class="whitespace-pre-line">
    <template v-for="child in children">
      <RichTextTextNodeBaseChild v-if="!child?.type" v-bind="child" />
      <RichTextTextNodeLinkChild v-else v-bind="child" />
    </template>
  </p>
</template>
