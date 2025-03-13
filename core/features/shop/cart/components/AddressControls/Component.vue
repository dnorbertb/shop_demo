<script setup lang="ts">
import type { AddressData } from "~/core/api/addresses";
import { useAddressesStore } from "~/core/stores/addressStore";
import { createAddressOption } from "./helpers/create-address-option";

defineProps<{
  error?: string;
}>();

const emit = defineEmits<{
  (e: "updateAddress", v: AddressData | null): void;
}>();

// Stores
const addressesStore = useAddressesStore();

// Data
const saveAddressModal = ref();
const removeAddressModal = ref();
const localModel = ref("");

// Computed options
const options = computed(() => {
  const calculatedOptions = addressesStore.userAddresses.map((addressData) =>
    createAddressOption(addressData, editHandler, deleteHandler)
  );

  if (addressesStore.moreAddressesAllowed) {
    calculatedOptions.push({
      icon: "solar-point-on-map-line-duotone",
      label: "Nowy",
      value: "new",
      help: "Dodaj nowy adres którego nie ma na liście",
      actions: [],
    });
  }

  return calculatedOptions;
});

// Handlers
const deleteHandler = (addressData: AddressData) => {
  removeAddressModal.value?.deleteAddress(addressData);
};

const editHandler = async (addressData: AddressData) => {
  saveAddressModal.value?.open(addressData);
};

const handleAddressUpdate = (id: string) => {
  localModel.value = id;
  const addressData = addressesStore.getAddressDataById(id);
  emit("updateAddress", addressData ?? null);
};

// Methods
const assignFirstAddressOrNew = () => {
  const firstElementId = options.value[0]?.value;
  localModel.value = firstElementId ?? "new";
  emit(
    "updateAddress",
    firstElementId ? addressesStore.getAddressDataById(firstElementId) : null
  );
};

// On init or options change
watch(() => options.value.length, assignFirstAddressOrNew);
onMounted(assignFirstAddressOrNew);
</script>

<template>
  <div class="flex flex-col">
    <UFormGroup
      class="mb-2"
      :error="error"
      label="Adres:"
      id="addressData"
      name="addressData"
      required
    >
      <div class="flex gap-2 flex-col">
        <CustomRadio
          class="flex-1"
          name="addressData"
          v-for="option in options"
          v-bind="option"
          :model-value="localModel"
          @update:model-value="handleAddressUpdate"
          actionsPosition="top"
          :actions="option.actions"
        />
      </div>
      <template v-if="!addressesStore.moreAddressesAllowed" #help>
        Możesz dodać maksymalnie 3 adresy. Usuń jeden z adresów aby dodać
        kolejny.
      </template>
    </UFormGroup>
    <AddressForm
      @address-saved="handleAddressUpdate"
      v-if="localModel == 'new'"
    />
    <AddressRemoveModal ref="removeAddressModal" />
    <AddressSavingModal ref="saveAddressModal" />
  </div>
</template>
