<script setup lang="ts">
import { useActionOnUrlChange } from "~/core/composables/useActionOnUrlChange";
import { useUserDataStore } from "~/core/stores/userDataStore";

const userDataStore = useUserDataStore();
const menuOpened = ref(false);
useActionOnUrlChange(() => (menuOpened.value = false));
</script>

<template>
  <UPopover v-model:open="menuOpened">
    <PageTopBarAccountMenuActivator
      :disabled="['loading', 'idle'].includes(userDataStore.userState)"
    />
    <template #panel>
      <PageTopBarAccountMenuContentView
        v-if="userDataStore.userState == 'authenticated'"
      />
      <PageTopBarAccountMenuLoginView
        v-if="userDataStore.userState == 'unauthenticated'"
      />
    </template>
  </UPopover>
</template>
