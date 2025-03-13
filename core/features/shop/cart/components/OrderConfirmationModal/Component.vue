<script setup lang="ts">
import type { SummaryData } from "./types";

const summaryData = ref<SummaryData | null>();
const confirmationModal = ref();
const open = (data: SummaryData) => {
  summaryData.value = data;
  return confirmationModal.value.open();
};
defineExpose({ open });
</script>
<template>
  <ConfirmationModal ref="confirmationModal">
    <div class="text-sm txt-tertiary font-medium">
      <p class="text-xl text-center txt-secondary mb-2">
        Potwierdź zamówienie:
      </p>

      <p class="text-base txt-secondary">Skład zamówienia:</p>
      <div class="flex flex-col">
        <p v-for="item in summaryData!.cartContent">
          {{ item.quantity }}x {{ item.product.name }}
        </p>
      </div>

      <p class="text-base txt-secondary mt-2">Dane do zamówienia:</p>
      <p>
        {{ summaryData!.addressData.type == "company" ? "Firma," : "" }}
        {{ summaryData!.addressData.fullName }},
      </p>
      <p>
        {{ summaryData!.addressData.street }},
        {{ summaryData!.addressData.postcode }},
        {{ summaryData!.addressData.city }},
      </p>
      <p>tel: {{ summaryData!.addressData.phone }}</p>

      <p class="text-base txt-secondary mt-2">Dostawa:</p>
      <ShippingDataPresenter
        v-if="summaryData!.shippingData.shippingType == 'pickupPoint'"
        :data="summaryData!.shippingData.additionalShippingData"
        :provider="summaryData!.shippingData.provider"
      />
      <p v-else>Kurier na wskazany adres</p>

      <p v-if="summaryData!.orderMessage" class="text-base txt-secondary mt-2">
        Wiadomość:
      </p>
      <p>{{ summaryData!.orderMessage }}</p>

      <p class="text-base txt-secondary mt-2">Koszty i rabaty:</p>
      <p v-if="summaryData!.discountCode">
        Wykorzystany kod rabatowy: {{ summaryData!.discountCode }}
      </p>
      <p>Suma rabatów: {{ summaryData!.totalDiscount.toFixed(2) }} zł</p>
      <p>Dostawa: {{ summaryData!.shippingCost.toFixed(2) }} zł</p>

      <p class="txt-secondary text-base mt-2">
        Całkowity koszt: {{ summaryData!.calculatedPrice.toFixed(2) }} zł
      </p>
      <p>W tym podatek VAT: {{ summaryData!.vatIncluded.toFixed(2) }} zł</p>
    </div>
  </ConfirmationModal>
</template>
