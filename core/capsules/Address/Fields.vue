<script setup lang="ts">
export type AddressFieldsModel = {
  type: "personal" | "company";
  nip: string;
  phone: string;
  fullName: string;
  street: string;
  postcode: string;
  city: string;
};

defineProps<{
  disabled?: boolean;
}>();

const addressType = defineModel<"personal" | "company">("addressType", {
  default: "personal",
  required: true,
});
const nip = defineModel<string>("nip", { required: true });
const phone = defineModel<string>("phone", { required: true });
const fullName = defineModel<string>("fullName", { required: true });
const street = defineModel<string>("street", { required: true });
const postcode = defineModel<string>("postcode", { required: true });
const city = defineModel<string>("city", { required: true });

const addressTypeOptions = [
  { label: "Osoba fizyczna", value: "personal" },
  { label: "Firma", value: "company" },
];
</script>
<template>
  <UFormGroup
    class="block mb-1 text-primary-600 font-semibold"
    label="Typ"
    name="addressType"
  >
    <USelect
      :disabled="disabled"
      option-attribute="label"
      :options="addressTypeOptions"
      v-model="addressType"
      size="xl"
    />
  </UFormGroup>

  <UFormGroup label="Imię i nazwisko/Nazwa firmy" name="fullName">
    <UInput
      :disabled="disabled"
      v-model="fullName"
      size="xl"
      placeholder="Jan Kowalski"
      type="text"
      autocomplete="name"
    />
  </UFormGroup>

  <UFormGroup v-if="addressType == 'company'" name="nip">
    <template #label>
      <span class="block mb-1"> NIP ({{ (nip ?? "").length }} /12)</span>
    </template>
    <UInput
      :disabled="disabled"
      v-model="nip"
      size="xl"
      placeholder="Jan Kowalski"
      type="text"
    />
  </UFormGroup>

  <UFormGroup label="Numer telefonu" name="phone">
    <UInput
      :disabled="disabled"
      v-model="phone"
      size="xl"
      placeholder="555 666 777"
      type="text"
      inputmode="tel"
      autocomplete="tel"
    />
  </UFormGroup>

  <UFormGroup label="Ulica" name="street">
    <UInput
      :disabled="disabled"
      v-model="street"
      size="xl"
      placeholder="Przykładowa 4a"
      type="text"
      autocomplete="street-address"
    />
  </UFormGroup>

  <UFormGroup label="Kod pocztowy" name="postcode">
    <UInput
      :disabled="disabled"
      v-model="postcode"
      size="xl"
      placeholder="01-001"
      type="text"
      autocomplete="postal-code"
    />
  </UFormGroup>

  <UFormGroup label="Miasto" name="city">
    <UInput
      :disabled="disabled"
      v-model="city"
      size="xl"
      placeholder="Warszawa"
      type="text"
      autocomplete="locality"
    />
  </UFormGroup>
</template>
