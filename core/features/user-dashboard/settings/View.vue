<script setup lang="ts">
import ChangePasswordModal from "./components/ChangePasswordModal.vue";
import MarketingConsentSetting from "./components/MarketingConsentSetting.vue";
const changePassModalRef = ref();
</script>
<template>
  <div class="py-2">
    <div class="flex mb-5">
      <h1 class="text-xl">Ustawienia konta:</h1>
    </div>
    <MarketingConsentSetting class="mb-5" />
    <div class="max-w-lg">
      <UButton @click="() => changePassModalRef.open()">Zmień hasło</UButton>
    </div>
    <ChangePasswordModal ref="changePassModalRef" />
  </div>
</template>
