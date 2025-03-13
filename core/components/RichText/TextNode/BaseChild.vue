<script setup lang="ts">
export type BaseTextChildProps = {
  type?: "";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
};
const props = defineProps<BaseTextChildProps>();
const content = ref(props.text);
const hasSettings =
  props.bold || props.italic || props.strikethrough || props.underline;
if (props.bold) content.value = `<b>${content.value}</b>`;
if (props.italic) content.value = `<i>${content.value}</i>`;
if (props.underline) content.value = `<u>${content.value}</u>`;
if (props.strikethrough) content.value = `<s>${content.value}</s>`;
</script>
<template>
  <span v-if="hasSettings" v-html="content" />
  <template v-else>{{ props.text }}</template>
</template>
