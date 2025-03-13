<script setup lang="ts">
import type { RouteLocation } from "vue-router";
import { useRedirectBackHelper } from "~/core/composables/useRedirectBackHelper";
import { AuthModuleRouteMap } from "../features/auth";
const redirectHelper = useRedirectBackHelper();

defineProps<{
  redirectPath: RouteLocation["fullPath"];
}>();
</script>
<template>
  <UNotification
    class="shadow"
    id="nonLoggedInNotification"
    :timeout="0"
    :close-button="{ disabled: true, icon: '' }"
  >
    <template #title>
      <span class="block text-base text-red-500 mb-2">
        Uwaga, nie jesteś zalogowany!
      </span>
    </template>
    <template #description>
      <p class="mb-3">
        Masz już konto?
        <NuxtLink
          class="underline underline-offset-4 text-primary-500"
          :to="
            redirectHelper.createRouteObjectWithRedirect({
              name: AuthModuleRouteMap.login,
            })
          "
        >
          Zaloguj się tutaj.
        </NuxtLink>
      </p>
      <p class="mb-1">
        Nie masz jeszcze konta?
        <NuxtLink
          class="underline underline-offset-4 text-primary-500"
          :to="
            redirectHelper.createRouteObjectWithRedirect({
              name: AuthModuleRouteMap.signUp,
            })
          "
        >
          Zarejestruj się!
        </NuxtLink>
      </p>
      <p class="mb-3">Rabat już od pierwszego zamówienia!</p>
      <p>Lub kontynuuj bez logowania...</p>
    </template>
  </UNotification>
</template>
