<script setup lang="ts">
import { object, string } from "yup";
import { useRedirectBackHelper } from "~/core/composables/useRedirectBackHelper";
import { useUserDataStore } from "~/core/stores/userDataStore";
import { UserDashboardModuleRouteMap } from "../../user-dashboard";

const redirectBackHelper = useRedirectBackHelper();
const userDataStore = useUserDataStore();
const toast = useToast();
const formState = ref<"idle" | "loading">("idle");
const formData = reactive({
  email: "",
  password: "",
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

const onSubmit = async () => {
  formState.value = "loading";
  const { success } = await userDataStore.logIn(formData);
  if (!success) {
    toast.add({
      title: "Błąd logowania",
      description: "Nieprawidłowy login lub hasło!",
      color: "red",
    });
    formState.value = "idle";
    return;
  }

  toast.add({
    title: "Pomyślnie zalogowano!",
    icon: "i-solar-check-circle-outline",
    color: "green",
    timeout: 1000,
  });

  redirectBackHelper.catchRedirectAndNavigate({
    name: UserDashboardModuleRouteMap.children.orders,
  });

  formState.value = "idle";
};

useHead({
  title: ":: Made4Ride.pl :: Logowanie",
});
</script>

<template>
  <div
    class="container mx-auto px-3 relative w-full h-full flex justify-center"
  >
    <div class="max-w-96 w-full p-5 lg:p-8 md:my-32">
      <h1 class="text-2xl mb-6 text-center">Zaloguj się</h1>
      <UForm
        class="flex flex-col gap-4 lg:gap-6"
        :state="formData"
        :schema="schema"
        @submit="onSubmit"
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
        <UFormGroup>
          <UButton
            :disabled="formState == 'loading'"
            :loading="formState == 'loading'"
            size="xl"
            class="w-full justify-center !text-white"
            type="submit"
          >
            Zaloguj się
          </UButton>
        </UFormGroup>
      </UForm>
      <NuxtLink
        class="block text-center mt-2 text-sm txt-quaternary hover:underline"
        :to="{ name: 'forgot-password' }"
      >
        Zapomniałeś hasła? Kliknij tutaj.
      </NuxtLink>
    </div>
  </div>
</template>
