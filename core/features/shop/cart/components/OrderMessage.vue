<script setup lang="ts">
const model = defineModel<string>({ required: true });
</script>
<template>
  <div>
    <UFormGroup label="Wiadomość do zamówienia">
      <UTextarea
        placeholder="Dodatkowe informacje / Wiadomość dla kuriera"
        v-model="model"
      />
    </UFormGroup>
  </div>
</template>
