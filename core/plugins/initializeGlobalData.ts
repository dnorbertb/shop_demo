import { useGlobalConfigStore } from "~/core/stores/globalConfigStore";

export default defineNuxtPlugin(async () => {
  const configStore = useGlobalConfigStore();
  const { error } = useAsyncData("globalData", configStore.initStore);

  watchEffect(() => {
    if (error.value) {
      showError({
        statusCode: 500,
        message: "Error fetching page config",
      });
    }
  });
});
