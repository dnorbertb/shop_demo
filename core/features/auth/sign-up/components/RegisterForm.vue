<script setup lang="ts">
import { object, string } from "yup";
import { useAuthApi } from "~/core/api/auth";
import { AuthModuleRouteMap } from "../..";
import { useRedirectBackHelper } from "~/core/composables/useRedirectBackHelper";

const redirectHelper = useRedirectBackHelper();
const toast = useToast();
const userApi = useAuthApi();
const formState = ref<"idle" | "loading">("idle");
const formData = reactive({
  email: "",
  password: "",
  marketingConsent: true,
});

const schema = object({
  email: string()
    .email("To pole musi zawierać prawidłowy adres email")
    .required("Adres email jest wymagany"),
  password: string()
    .min(8, "Hasło musi posiadać conajmniej 8 znaków")
    .max(48, "Hasło nie może mieć więcej niż 48 znaków")
    .required("Hasło jest wymagane"),
});

const { execute, error, data } = useAsyncData(
  async () => await userApi.signUpUser(formData),
  { immediate: false }
);

watch(
  () => error.value,
  (error) => {
    const isConflictError = error?.statusCode == 400;
    toast.add({
      title: "Coś poszło nie tak",
      description: isConflictError
        ? "Być może masz już konto. Spróbuj się zalogować klikając na to powiadomienie."
        : "To nasza wina! Spróbuj ponownie później! Jeżeli problem będzie się potwarzał, skontaktuj się z nami.",
      color: "red",
      icon: "i-solar-shield-warning-outline",
      timeout: 3000,
      click: isConflictError
        ? () => {
            redirectHelper.preserveRedirectAndNavigateTo({
              name: AuthModuleRouteMap.login,
            });
          }
        : undefined,
      callback: () => {
        formState.value = "idle";
        formData.email = "";
        formData.password = "";
      },
    });
  }
);

watch(
  () => data.value,
  (data) => {
    if (!data?.doc.id) return;
    toast.add({
      title: "Dziękujemy za rejestrację! Możesz się zalogować.",
      icon: "i-solar-check-circle-outline",
      color: "green",
      timeout: 3000,
    });
    redirectHelper.preserveRedirectAndNavigateTo({
      name: AuthModuleRouteMap.login,
    });
  }
);
</script>
<template>
  <UForm
    class="p-5 lg:p-8 flex flex-col gap-4 lg:gap-6"
    :state="formData"
    :schema="schema"
    @submit="execute"
  >
    <UFormGroup
      class="block mb-1 text-primary-600 font-semibold"
      label="Adres e-mail"
      name="email"
    >
      <UInput
        :disabled="formState == 'loading'"
        v-model="formData.email"
        size="xl"
        placeholder="email@wp.pl"
        type="email"
      />
    </UFormGroup>

    <UFormGroup label="Hasło" name="password">
      <PasswordInput
        :disabled="formState == 'loading'"
        v-model="formData.password"
        size="xl"
        placeholder="Twoje hasło"
      />
    </UFormGroup>

    <UCheckbox
      :disabled="formState == 'loading'"
      input-class="mt-1 h-5 w-5 cursor-pointer"
      v-model="formData.marketingConsent"
      name="notifications"
      class="select-none"
    >
      <template #label>
        <span class="text-base cursor-pointer">
          Zgoda na treści marketingowe
        </span>
      </template>
      <template #help>
        Nie wysyłamy spamu, tylko przydatne
        <NuxtLink class="underline" href="/o/marketing"> informacje. </NuxtLink>
      </template>
    </UCheckbox>

    <UFormGroup>
      <UButton
        :disabled="formState == 'loading'"
        :loading="formState == 'loading'"
        size="xl"
        class="w-full justify-center !text-white"
        type="submit"
      >
        Załóż konto
      </UButton>
      <template #help>
        Rejestrując się wyrażasz akceptujesz postanowienia
        <NuxtLink class="underline" href="/o/regulamin"> regulaminu. </NuxtLink>
      </template>
    </UFormGroup>
  </UForm>
</template>
