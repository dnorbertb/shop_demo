<script setup lang="ts">
import { UserDashboardModuleRouteMap } from "~/core/features/user-dashboard";
</script>

<template>
  <div
    class="grid h-full px-4 py-8 md:py-16 lg:py-28 w-full place-content-center"
  >
    <UiCard class="p-8 shadow-lg max-w-md text-center">
      <UIcon
        name="line-md-emoji-frown-open"
        class="w-16 h-16 text-amber-500 mx-auto"
      />
      <h1 class="text-2xl font-bold text-amber-500 mt-4">
        Coś poszło nie tak podczas przetwarzania płatności.
      </h1>
      <p class="text-lg font-semibold txt-tertiary mt-3">Ale bez nerwów!</p>
      <p class="txt-tertiary mt-1 mb-8">
        Jeżeli coś się nie udało podczas płatności, możesz ją ponowić w panelu
        klienta w sekcji zamówienia. Jeżeli wszystko poszło dobrze a mimo
        wszystko widzisz ten komunikat, zignoruj go. Status Twojego zamówienia
        zaktualizuje się wkrtóce samoistnie. Stan możesz sprawdzić w panelu
        klienta.
      </p>
      <UButton
        color="gray"
        :to="{ name: UserDashboardModuleRouteMap.children.orders }"
      >
        Przejdź do panelu zamówień
      </UButton>
    </UiCard>
  </div>
</template>
