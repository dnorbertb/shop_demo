<script setup lang="ts">
import type { AddressData } from "~/core/api/addresses";

const iconsMap = {
  company: "solar-buildings-line-duotone",
  personal: "solar-home-line-duotone",
};

defineProps<{
  address: AddressData;
  editHandler: (arg: AddressData) => void;
  deleteHandler: (arg: AddressData) => void;
}>();
</script>

<template>
  <UiCard class="text-sm">
    <div class="flex gap-2 mb-1">
      <UIcon class="h-6 w-6" :name="iconsMap[address.type]" />
      <p class="mt-0.5 font-semibold">{{ address.fullName }}</p>
    </div>
    <p v-if="address.type == 'company' && address.nip">
      NIP: {{ address.nip }}
    </p>
    <p>{{ address.street }}</p>
    <p>{{ address.postcode }} {{ address.city }}</p>
    <p>tel: {{ address.phone }}</p>
    <div class="mt-2 flex gap-2">
      <UButton
        variant="soft"
        size="sm"
        icon="solar-pen-new-square-line-duotone"
        @click="() => editHandler(address)"
      >
        Edytuj
      </UButton>
      <UButton
        variant="soft"
        size="sm"
        icon="solar-trash-bin-minimalistic-linear"
        @click="() => deleteHandler(address)"
      >
        Usuń
      </UButton>
    </div>
  </UiCard>
</template>
