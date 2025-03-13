<script setup lang="ts">
type ManyOptionsFilter = {
  label: string;
  options: Array<{
    label: string;
    code: string;
  }>;
};

defineProps<ManyOptionsFilter>();
const model = defineModel<Array<string> | undefined>({ required: true });

const computedValues = computed(() => {
  return Object.fromEntries((model.value ?? []).map((key) => [key, true]));
});

const updateModel = (code: string) => {
  if (model.value?.includes(code)) {
    model.value = model.value.filter((existingCode) => existingCode != code);
  } else {
    model.value = model.value ? [...model.value, code] : [code];
  }
};
const handleClean = () => {
  model.value = [];
};
</script>
<template>
  <UiCard>
    <div class="flex justify-between items-baseline">
      <ULabel :for="`${label}Od`">{{ label }}</ULabel>
      <UButton @click="handleClean" class="mb-1" variant="link" :padded="false">
        Wyczyść
      </UButton>
    </div>
    <ul class="flex flex-col gap-0.5">
      <li v-for="option in options" :key="option.code">
        <UiCheckbox
          :id="option.code"
          :label="option.label"
          :model-value="computedValues[option.code]"
          @update:model-value="() => updateModel(option.code)"
        />
      </li>
    </ul>
  </UiCard>
</template>
