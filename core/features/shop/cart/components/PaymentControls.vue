<script setup lang="ts">
const model = defineModel<"online" | "cod">({ required: true });

const paymentOptions = [
  {
    label: "Zapłać teraz",
    value: "online",
    icon: "solar-card-transfer-line-duotone",
  },
  {
    label: "Przy obiorze",
    value: "cod",
    icon: "solar-hand-money-line-duotone",
  },
];

defineProps<{ error?: string }>();
</script>

<template>
  <UFormGroup
    id="paymentType"
    name="paymentType"
    label="Płatność:"
    :error="error"
    required
  >
    <div class="flex gap-2 flex-col sm:flex-row">
      <CustomRadio
        class="flex-1"
        name="paymentType"
        v-for="option in paymentOptions"
        v-bind="option"
        v-model="model as string"
      />
    </div>
    <template #help>
      Operatorem płatności online jest
      <a
        class="underline underline-offset-4 text-primary-500"
        href="https://hotpay.pl/"
        target="_blank"
        rel="noopener noreferrer"
      >
        HotPay.
      </a>
      Obsługiwane formy płatności to Apple Pay, Google Pay, Blik, karty
      kredytowe oraz szybkie przelewy.
    </template>
  </UFormGroup>
</template>
