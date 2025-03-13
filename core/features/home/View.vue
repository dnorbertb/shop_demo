<script setup lang="ts">
import { useGlobalConfigStore } from "~/core/stores/globalConfigStore";

const configStore = useGlobalConfigStore();
const { data: configData } = await useAsyncData(configStore.getData);
useSeoMeta({
  title: configData.value?.home.metaTitle,
  description: configData.value?.home.metaDescription,
});
</script>

<template>
  <main>
    <component
      v-for="component in configData?.home.blocks"
      :key="component.id"
      v-bind="component"
      :is="component.blockType"
    />
  </main>
</template>
