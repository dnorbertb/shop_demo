<script setup lang="ts">
type ModalStates = "submittingOrder" | "creatingPayment" | "error";

const currentState = ref<ModalStates>("submittingOrder");

const updateState = (state: ModalStates) => {
  currentState.value = state;
};

const modalOpen = ref(false);
const open = () => {
  modalOpen.value = true;
  return updateState;
};
const close = () => {
  modalOpen.value = false;
};

defineExpose({ open, close });
</script>
<template>
  <UModal v-model="modalOpen" prevent-close>
    <div class="px-10 pt-16 pb-14 text-center">
      <div v-if="currentState == 'submittingOrder'" class="">
        <UIcon
          name="line-md-uploading-loop"
          class="size-20 mb-4 text-primary-400 dark:text-primary-300"
        />
        <p class="text-xl font-semibold">Zapisujemy Twoje zamówienie...</p>
      </div>

      <div
        v-if="currentState == 'creatingPayment'"
        class="flex flex-col items-center"
      >
        <UIcon
          name="solar-dollar-minimalistic-broken"
          class="size-20 text-primary-400 dark:text-primary-300"
        />
        <UIcon
          name="svg-spinners-3-dots-bounce"
          class="size-12 -ml-0.5 mb-1 text-primary-400 dark:text-primary-300"
        />
        <p class="text-2xl font-medium mb-2">Tworzymy płatność</p>
        <p class="max-w-72">
          Przekierowanie do dostawcy płatności nastąpi za około 3 sekund...
        </p>
      </div>

      <div v-if="currentState == 'error'">
        <UIcon
          name="solar-sad-circle-broken"
          class="size-20 text-red-500 dark:text-red-400"
        />
        <div class="mt-2 mb-6">
          <p class="text-2xl font-medium mb-1">Coś poszło nie tak.</p>
          <p class="text-sm">To najprawdopodobniej nasza wina.</p>
          <p class="text-sm">
            Sprawdź swoje zamówienie i spróbuj ponownie za chwilę.
          </p>
        </div>
        <UButton @click="() => (modalOpen = false)" variant="soft" size="md">
          Wróć do zamówienia
        </UButton>
      </div>
    </div>
  </UModal>
</template>
