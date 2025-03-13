<script setup lang="ts">
import { useUserDataStore } from "~/core/stores/userDataStore";

const userDataStore = useUserDataStore();
const toast = useToast();
const items = [
  { text: "Zamówienia", to: { name: "customer-orders" } },
  // { text: "Listy życzeń", to: {name: "customer"} },
  { text: "Moje adresy", to: { name: "customer-addresses" } },
  { text: "Ustawienia konta", to: { name: "customer-settings" } },
];

const handleLogout = async () => {
  const { success } = await userDataStore.logOut();
  if (success) {
    toast.add({
      title: "Zostałeś wylogowany!",
      icon: "i-solar-check-circle-outline",
      color: "green",
      timeout: 1500,
    });
    navigateTo("/");
  } else {
    toast.add({
      title: "Coś poszło nie tak!",
      description: "To wina serwera. Spróbuj ponownie!",
      icon: "i-solar-check-circle-outline",
      color: "red",
      timeout: 1500,
    });
  }
};
</script>
<template>
  <nav>
    <ul>
      <li class="border-b" v-for="item in items">
        <NuxtLink
          class="py-2 px-4 block hover:underline decoration-primary-500 transition-all"
          :to="item.to"
        >
          {{ item.text }}
        </NuxtLink>
      </li>
      <li>
        <UButton
          class="py-2 px-4"
          color="red"
          variant="link"
          @click="handleLogout"
        >
          Wyloguj się
        </UButton>
      </li>
    </ul>
  </nav>
</template>
