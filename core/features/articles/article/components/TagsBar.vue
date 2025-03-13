<script setup lang="ts">
defineProps<{
  tags: Array<string>;
}>();
</script>

<template>
  <div class="flex gap-2 justify-center items-center">
    <UBadge size="sm" variant="subtle" v-for="tag in tags">
      {{ tag }}
    </UBadge>
  </div>
</template>
