<script setup lang="ts">
import type { ShippingOptionData } from "~/core/api/shippingOptions";

const props = defineProps<{
  error?: string;
  shippingOptions?: Array<ShippingOptionData>;
}>();

const model = defineModel<string>({ required: true });

const iconMap = {
  directShipping: "solar-delivery-line-duotone",
  pickupPoint: "solar-box-minimalistic-line-duotone",
};

const normalizationMap = {
  directShipping: "Dostawa pod wskazany adres",
  pickupPoint: "Dostawa do punktu odbioru",
};

const options = computed(() => {
  return (props.shippingOptions ?? [])
    .sort((a, b) => a.pricing.brutto - b.pricing.brutto)
    .map(({ id, label, type, pricing }) => ({
      value: id,
      label,
      icon: iconMap[type],
      help: [normalizationMap[type], pricing.brutto + " zł"].join("\n"),
    }))
    .filter((option) => (model.value ? option.value == model.value : true));
});
</script>

<template>
  <UFormGroup
    id="shippingOption"
    name="shippingOption"
    label="Dostawa i płatność:"
    :error="error"
    required
  >
    <template #hint>
      <UButton
        v-if="model && shippingOptions && shippingOptions.length > 1"
        variant="link"
        size="lg"
        class="py-1"
        :padded="false"
        @click="() => (model = '')"
      >
        Zmień
      </UButton>
    </template>
    <div class="flex gap-2 flex-col mb-1">
      <CustomRadio
        class="flex-1"
        name="shippingOption"
        v-model="model"
        v-for="option in options"
        v-bind="option"
        :key="option.value"
      />
    </div>
  </UFormGroup>
</template>
