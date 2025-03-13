<script setup lang="ts">
import { object, string } from "yup";

const modalOpen = ref(false);

const state = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const schema = computed(() => {
  return object({
    oldPassword: string().required("Aktualne hasło jest wymagane"),
    newPassword: string()
      .required("Nowe hasło jest wymagane")
      .notOneOf(
        [state.oldPassword],
        "Hasło nie może być takie samo jak aktualne"
      ),
    confirmPassword: string()
      .required("Potwierdzenie hasła jest wymagane")
      .oneOf([state.newPassword], "Hasła nie są takie same"),
  });
});

const submitHandler = () => {
  alert("Not implemented yet");
};

const open = () => {
  modalOpen.value = true;
};
defineExpose({
  open,
});
</script>
<template>
  <UModal v-model="modalOpen" prevent-close>
    <div class="flex flex-col p-5">
      <h2 class="text-lg mb-3">Zmiana hasła:</h2>
      <UForm
        class="flex flex-col gap-4"
        :state="state"
        :schema="schema"
        @submit="submitHandler"
      >
        <UFormGroup name="oldPassword" label="Aktualne hasło">
          <PasswordInput v-model="state.oldPassword" />
        </UFormGroup>
        <UFormGroup name="newPassword" label="Nowe hasło">
          <PasswordInput v-model="state.newPassword" />
        </UFormGroup>
        <UFormGroup name="confirmPassword" label="Powtórz nowe hasło">
          <PasswordInput v-model="state.confirmPassword" />
        </UFormGroup>
        <div class="flex gap-2">
          <UButton class="ml-auto" type="submit">Zapisz</UButton>
          <UButton color="gray" type="button" @click="modalOpen = false">
            Anuluj
          </UButton>
        </div>
      </UForm>
    </div>
  </UModal>
</template>
