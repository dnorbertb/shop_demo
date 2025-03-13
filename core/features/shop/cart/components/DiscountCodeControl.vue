<script setup lang="ts">
import {
  useDiscountCodesApi,
  type CheckDiscountCodeResponse,
} from "~/core/api/discountCodes";

const discountCodeApi = useDiscountCodesApi();
const inputValue = ref("");
const codeData = ref<CheckDiscountCodeResponse | null>();
const codeState = ref<"idle" | "loading" | "applied" | "not-found" | "expired">(
  "idle"
);

const emit = defineEmits<{
  (e: "updateCode", data: CheckDiscountCodeResponse | null): void;
}>();

// Handlers
const checkCodeHandler = async () => {
  codeState.value = "loading";

  try {
    const data = await discountCodeApi.checkDiscountCode(inputValue.value);

    if (!data.isAvailable) {
      codeState.value = "expired";
      return;
    }

    codeData.value = data;
    emit("updateCode", codeData.value);
    codeState.value = "applied";
  } catch (error) {
    codeState.value = "not-found";
    return;
  }
};

const removeCodeHandler = () => {
  codeData.value = null;
  emit("updateCode", null);
};

// Remove error when typing after error
watch(inputValue, () => {
  codeState.value = "idle";
});

const isCodeApplied = computed(() => {
  return !!codeData.value;
});

// Code info message
const codeInfoMessage = computed(() => {
  if (!codeData.value) return "";
  if (codeData.value.discountType === "percentage") {
    return `Zastosowano ${codeData.value.discountAmount}% zniżki`;
  }
  if (codeData.value.discountType == "amount") {
    return `Kod uprawniający do ${codeData.value.discountAmount} zł zniżki.\nPozostało ${codeData.value.discountAmountLeft} zł do wykorzystania.`;
  }
});

// Code error messages
const codeErrorMessages = computed(() => {
  switch (codeState.value) {
    case "not-found":
      return "Podany kod nie został odnaleziony";
    case "expired":
      return "Podany kod został już wykorzystany";
    default:
      return "";
  }
});
</script>
<template>
  <form class="flex flex-col gap-3" @submit.prevent="checkCodeHandler">
    <UTooltip
      :text="
        isCodeApplied
          ? 'Usuń poprzedni kod aby aktywować nowy'
          : 'Wprowadź kod kuponu'
      "
      class="flex-1 flex items-end gap-3"
    >
      <UFormGroup
        label="Kod rabatowy"
        :error="codeErrorMessages"
        class="flex-1"
      >
        <UInput
          placeholder="Wpisz kod tutaj..."
          icon="solar-tag-price-outline"
          size="xl"
          v-model="inputValue"
          :loading="codeState == 'loading'"
          :disabled="isCodeApplied"
        />
      </UFormGroup>
      <UButton
        size="xl"
        variant="solid"
        type="submit"
        :disabled="
          !inputValue.length || codeState == 'loading' || isCodeApplied
        "
      >
        Zastosuj
      </UButton>
    </UTooltip>
    <UNotification
      v-if="isCodeApplied"
      id="codeData"
      class="shadow-none"
      color="green"
      icon="solar-check-circle-line-duotone"
      :close-button="{
        label: 'Usuń kod',
        icon: 'solar-trash-bin-2-line-duotone',
        color: 'red',
        variant: 'link',
      }"
      @close="removeCodeHandler"
      :title="`Wykorzystany kod: ${inputValue}`"
      :description="codeInfoMessage"
      :timeout="0"
    >
      <template #description="{ description }">
        <span class="whitespace-pre-line">
          {{ description }}
        </span>
      </template>
    </UNotification>
  </form>
</template>
