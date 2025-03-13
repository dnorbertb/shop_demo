<script setup lang="ts">
// Loading view
const app = useNuxtApp();
const showFullPageLoader = ref(false);
app.hook("page:start", () => {
  showFullPageLoader.value = true;
});
app.hook("page:finish", () => {
  showFullPageLoader.value = false;
});
</script>
<template>
  <!-- Component type providers -->
  <CustomNotifications />
  <InPostWidgetCore />

  <!-- Loaders  -->
  <NuxtLoadingIndicator :height="5" color="red" />
  <UiLoader
    class="fixed top-0 left-0 z-50 bg-gray-100 dark:bg-gray-800 bg-opacity-75"
    v-if="showFullPageLoader"
  />

  <!-- Content  -->
  <PageTopBar />
  <PageLinksBar />
  <div
    class="flex-1 bg-gradient-to-b from-primary-50 via-30% via-white to-white dark:from-primary-950 dark:via-gray-900 dark:to-gray-900"
  >
    <NuxtPage />
  </div>
  <PageFooter />
</template>
