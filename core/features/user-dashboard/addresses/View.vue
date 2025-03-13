<script setup lang="ts">
import type { AddressData } from "~/core/api/addresses";
import { useAddressesStore } from "~/core/stores/addressStore";
import AddressCard from "./components/AddressCard.vue";
const saveAddressModal = ref();
const removeAddressModal = ref();
const addressesStore = useAddressesStore();

// Helpers

// Handlers
const deleteHandler = (addressData: AddressData) => {
  removeAddressModal.value?.deleteAddress(addressData);
};

const editHandler = async (addressData: AddressData) => {
  saveAddressModal.value?.open(addressData);
};

const addHandler = async () => {
  saveAddressModal.value?.open();
};
</script>
<template>
  <div class="py-2">
    <div class="flex mb-5">
      <h1 class="text-xl">Zapisane adresy:</h1>
    </div>
    <div class="flex flex-col max-w-lg gap-4">
      <p v-if="!addressesStore.userAddresses.length" class="txt-quaternary">
        Póki co nic tu nie ma... Dodaj adres przyciskiem poniżej:
      </p>
      <AddressCard
        v-for="address in addressesStore.userAddresses"
        :key="address.id"
        :address="address"
        :editHandler="editHandler"
        :deleteHandler="deleteHandler"
      />
      <UButton
        :disabled="!addressesStore.moreAddressesAllowed"
        @click="addHandler"
        size="lg"
        block
      >
        Dodaj nowy
      </UButton>
    </div>
    <AddressRemoveModal ref="removeAddressModal" />
    <AddressSavingModal ref="saveAddressModal" />
  </div>
</template>
