<script setup lang="ts">
const model = defineModel<string>({ required: true });
const handleClean = () => {
  model.value = "";
};
</script>
<template>
  <UiCard>
    <div class="flex justify-between items-center">
      <ULabel class="!text-2xl" for="keywordSearchInput">Czego szukasz?</ULabel>
      <UButton @click="handleClean" class="mb-1" variant="link" :padded="false">
        Wyczyść
      </UButton>
    </div>
    <UInput
      id="keywordSearchInput"
      class="w-full"
      size="lg"
      v-model="model"
      placeholder="Nazwa produktu, kod, słowa kluczowe"
    />
  </UiCard>
</template>
