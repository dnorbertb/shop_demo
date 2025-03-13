<script setup lang="ts">
import { object, string } from "yup";
import type { AddressData } from "~/core/api/addresses";
import { useAddressesStore } from "~/core/stores/addressStore";
import type { AddressFieldsModel } from "./Fields.vue";

/**
 * If there is id in initial data, form will update the address
 * Otherwise it will save new address
 */
const props = defineProps<{
  initialData?: Partial<AddressData>;
}>();
const emit = defineEmits<{
  (e: "addressSaved", id: string): void;
}>();

// Store
const addressStore = useAddressesStore();

// STATE
const componentState = ref<"init" | "ready" | "loading" | "error">("init");
const formDisabled = computed(() =>
  ["init", "loading"].includes(componentState.value)
);

// Form related
const formData = reactive<AddressFieldsModel & { id?: string }>({
  id: "",
  type: "personal",
  nip: "",
  fullName: "",
  street: "",
  postcode: "",
  city: "",
  phone: "",
});

const schema = object({
  type: string().required("Wybierz typ adresu"),
  nip: string().when("type", {
    is: "company",
    then: (schema) =>
      schema
        .min(10, "Numer NIP musi mieć conajmniej 10 znaków")
        .max(12, "Numer NIP może mieć maksymalnie 12 znaków"),
  }),
  phone: string().required("Numer telefonu jest wymagany"),
  fullName: string().required("Nazwa jest wymagana"),
  street: string().required("Ulica jest wymagana"),
  postcode: string().required("Kod pocztowy jest wymagany"),
  city: string().required("Miasto jest wymagane"),
});

// Saving handling
const handleAddressSave = async () => {
  componentState.value = "loading";
  const action = formData.id
    ? addressStore.updateAddress
    : addressStore.saveAddress;

  const result = await action(formData as AddressData);

  if (result.error) {
    componentState.value = "error";
    return;
  }

  emit("addressSaved", result.data);
};

// Initialization
onMounted(() => {
  const { initialData } = props;
  const dataToLoad = initialData as Record<string, unknown> | undefined;
  const dataReceiver = formData as Record<string, unknown>;

  if (dataToLoad) {
    Object.keys(dataReceiver).forEach((key) => {
      const newValue = dataToLoad[key];
      if (newValue) {
        dataReceiver[key] = newValue;
      }
    });
  }
  componentState.value = "ready";
});
</script>
<template>
  <UForm
    class="flex flex-col gap-2 lg:gap-4"
    :state="formData"
    :schema="schema"
    @submit.prevent="handleAddressSave"
  >
    <AddressFields
      :disabled="formDisabled"
      v-model:addressType="formData.type"
      v-model:nip="formData.nip"
      v-model:phone="formData.phone"
      v-model:fullName="formData.fullName"
      v-model:street="formData.street"
      v-model:postcode="formData.postcode"
      v-model:city="formData.city"
    />
    <UButton
      :loading="componentState == 'loading'"
      :disabled="formDisabled"
      size="xl"
      type="submit"
      block
    >
      Zapisz
    </UButton>
    <p
      v-if="componentState == 'error'"
      class="text-center font-semibold text-sm text-red-500"
    >
      Wystąpił błąd podczas zapisywania Twojego adresu. Spróbuj ponownie! Jeżeli
      problem będzie się powtarzał, poinformuj nas o tym.
    </p>
  </UForm>
</template>
