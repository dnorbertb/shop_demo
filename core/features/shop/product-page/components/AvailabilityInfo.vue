<script setup lang="ts">
const props = defineProps<{
  availability?: number;
}>();

const availabilityNumber = computed(() => {
  return props.availability ? props.availability : 0;
});
</script>
<template>
  <div>
    <UAlert
      v-if="availabilityNumber > 4"
      icon="i-solar-cart-check-outline"
      variant="subtle"
      title="Produkt dostępny"
      :description="`Pozostało ${availabilityNumber} sztuk w magazynie`"
      color="green"
      class="ring-green-500 bg-green-50 dark:bg-green-400"
    />
    <UAlert
      v-if="availabilityNumber < 5 && availabilityNumber > 0"
      icon="i-solar-cart-plus-outline"
      variant="subtle"
      title="Ograniczona ilość"
      :description="
        availabilityNumber == 1
          ? 'Pozostała jedna sztuka w magazynie'
          : `Pozostało ${availabilityNumber} sztuki w magazynie`
      "
      color="amber"
      class="ring-amber-500 bg-amber-50 dark:bg-amber-400"
    />
    <UAlert
      v-if="availabilityNumber < 1"
      icon="i-solar-cart-cross-outline"
      variant="subtle"
      title="Brak tego wariantu w magazynie."
      description="Dodaj go do listy życzeń a poinforumujemy Cię kiedy się pojawi."
      color="red"
    />
  </div>
</template>
