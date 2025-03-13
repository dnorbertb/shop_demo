<script setup lang="ts">
defineProps<{
  label: string;
  id?: string;
}>();

const model = defineModel<boolean>();
</script>
<template>
  <label
    class="flex gap-2 select-none text-sm font-medium txt-secondary cursor-pointer"
    :for="id"
  >
    <input
      class="cursor-pointer accent-primary-400"
      :id="id"
      type="checkbox"
      :checked="model"
      @click="() => (model = !model)"
    />
    {{ label }}
  </label>
</template>
