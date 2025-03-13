<script setup lang="ts">
const props = defineProps<{
  cartWorth: number;
  shippingCost: number;
  discountCodeDiscount: number;
  userDiscount: number;
  totalDiscount: number;
  calculatedPrice: number;
  vatIncluded: number;
}>();

const infoRows = computed(() => {
  return [
    {
      label: "Wartość koszyka",
      content: props.cartWorth.toFixed(2) + " zł",
      condition: true,
    },
    {
      label: "Koszty dostawy",
      content: props.shippingCost.toFixed(2) + " zł",
      condition: true,
    },
    {
      label: "Kod rabatowy",
      content: "-" + props.discountCodeDiscount.toFixed(2) + " zł",
      condition: props.discountCodeDiscount > 0,
    },
    {
      label: "Rabat użytkownika",
      content: "-" + props.userDiscount.toFixed(2) + " zł",
      condition: props.userDiscount > 0,
    },
    {
      label: "Rabat w sumie",
      content: "-" + props.totalDiscount.toFixed(2) + " zł",
      condition: props.totalDiscount > 0,
    },
  ].filter((row) => row.condition);
});
</script>

<template>
  <div>
    <!-- INFO ROWS -->
    <InfoRow class="text-sm" v-for="rowData in infoRows" v-bind="rowData" />

    <!-- PRICE ROW -->
    <InfoRow
      class="text-lg mt-1"
      label="Suma:"
      :content="`${calculatedPrice.toFixed(2)} zł`"
      :sub-content="`W tym ${vatIncluded} zł VAT`"
    />
  </div>
</template>
