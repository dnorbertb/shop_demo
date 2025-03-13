<script setup lang="ts">
type SingleOptionFilter = {
  label: string;
  options: Array<{
    label: string;
    code: string;
  }>;
  defaultValue?: string;
};

const props = defineProps<SingleOptionFilter>();
const model = defineModel<Array<string> | undefined>({ required: true });

const handleClick = (value: string) => {
  model.value = [value];
};
const handleClean = () => {
  model.value = props.defaultValue ? [props.defaultValue] : [];
};
</script>
<template>
  <UiCard>
    <div class="flex justify-between items-center">
      <ULabel>{{ label }}</ULabel>
      <UButton @click="handleClean" class="mb-1" variant="link" :padded="false">
        Wyczyść
      </UButton>
    </div>
    <ul class="flex flex-col gap-0.5">
      <li v-for="option in options">
        <UButton
          @click="() => handleClick(option.code)"
          variant="link"
          color="white"
          :disabled="option.code == model?.[0]"
          :padded="false"
          :class="[
            'text-base',
            {
              underline: option.code == model?.[0],
              'text-primary-500 dark:text-primary-400':
                option.code == model?.[0],
            },
          ]"
        >
          {{ option.label }}
        </UButton>
      </li>
    </ul>
  </UiCard>
</template>
