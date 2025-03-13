<script setup lang="ts">
defineProps<{
  label: string;
  content: string;
}>();
</script>

<template>
  <div class="flex justify-between font-medium">
    <span class="txt-secondary">{{ label }}</span>
    <span class="txt-tertiary"> {{ content }}</span>
  </div>
</template>
