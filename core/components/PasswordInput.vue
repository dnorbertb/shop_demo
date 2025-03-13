<script setup lang="ts">
const visible = ref(false);
</script>
<template>
  <UInput
    :type="visible ? 'text' : 'password'"
    :ui="{ icon: { trailing: { pointer: '' } } }"
  >
    <template #trailing>
      <UIcon
        name="solar-eye-linear"
        class="cursor-pointer"
        @mousedown="visible = true"
        @mouseup="visible = false"
        @mouseleave="visible = false"
      />
    </template>
  </UInput>
</template>
