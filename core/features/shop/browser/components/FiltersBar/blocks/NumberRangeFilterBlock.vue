<script setup lang="ts">
defineProps<{
  label: string;
}>();

const model = defineModel<Record<string, string | undefined> | undefined>({
  required: true,
});
const fieldError = ref("");
const handleChange = async (
  type: "greater_than" | "less_than",
  value: string
) => {
  const greater_than = Number(model?.value?.greater_than);
  const less_than = Number(model?.value?.less_than);
  const currentValue = Number(value ?? 0);

  if (isNaN(currentValue)) {
    fieldError.value = "Wartość musi być liczbą całkowitą dodatnią.";
    return;
  }

  if (!currentValue) {
    model.value = {
      ...model.value,
      [type]: undefined,
    };
    fieldError.value = "";
    return;
  }

  if (type == "less_than" && currentValue < greater_than) {
    fieldError.value =
      "Wartość maksymalna nie może być niższa niż wartość minimalna";
    return;
  }

  if (type == "greater_than" && currentValue > less_than) {
    fieldError.value =
      "Wartość minimalna nie może być wyższa niż wartość minimalna";
    return;
  }

  fieldError.value = "";
  model.value = {
    ...model.value,
    [type]: value.toString(),
  };
};

const handleClean = () => {
  model.value = {
    greater_than: undefined,
    less_than: undefined,
  };
};
</script>
<template>
  <UiCard class="flex flex-col">
    <div class="flex justify-between items-baseline">
      <ULabel :for="`${label}Od`">{{ label }}</ULabel>
      <UButton @click="handleClean" class="mb-1" variant="link" :padded="false">
        Wyczyść
      </UButton>
    </div>
    <div class="flex gap-2">
      <div>
        <label :for="`${label}Od`" class="cursor-pointer txt-tertiary">
          Od:
        </label>
        <UInput
          :id="`${label}Od`"
          @update:model-value="(e) => handleChange('greater_than', e)"
          :model-value="model?.greater_than"
        />
      </div>
      <div>
        <label :for="`${label}Do`" class="cursor-pointer txt-tertiary">
          Do:
        </label>
        <UInput
          :id="`${label}Do`"
          @update:model-value="(e) => handleChange('less_than', e)"
          :model-value="model?.less_than"
        />
      </div>
    </div>
    <UError v-if="fieldError">
      {{ fieldError }}
    </UError>
  </UiCard>
</template>
