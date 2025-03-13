import {
  useGlobalConfigDataApi,
  type GlobalConfigData,
} from "~/core/api/globalConfig";

export const useGlobalConfigStore = defineStore("globalConfigStore", () => {
  const globalConfigApi = useGlobalConfigDataApi();
  const dataInitialized = ref(false);
  const data = ref<GlobalConfigData>();
  const observers = ref<Array<Function>>([]);

  const initStore = async () => {
    const payload = await globalConfigApi.getGlobalConfig();
    data.value = payload;
    dataInitialized.value = true;
    observers.value.forEach((resolve) => {
      resolve(payload);
    });
    return data;
  };

  const getData = async (): Promise<GlobalConfigData> => {
    return new Promise((resolve) => {
      if (dataInitialized.value) {
        resolve(data.value!);
        return;
      }
      observers.value.push(resolve);
    });
  };

  return {
    data,
    dataInitialized,
    getData,
    initStore,
  };
});
