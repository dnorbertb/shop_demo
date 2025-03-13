import {
  useAddressesApi,
  type AddressBody,
  type AddressData,
} from "~/core/api/addresses";

type Result = { error: true } | { error?: undefined; data: string };

export const useAddressesStore = defineStore("addressesDataStore", () => {
  const addressesApi = useAddressesApi();
  const userAddresses = ref<Array<AddressData>>([]);
  const isLoggedIn = ref(false);
  const currentUserId = ref("");
  const moreAddressesAllowed = computed(() => userAddresses.value.length < 3);

  // Remote actions
  const reloadRemoteAddresses = async () => {
    if (!currentUserId.value) return;

    try {
      const data = await addressesApi.getAddressesByUserId(currentUserId.value);
      userAddresses.value = data;
    } catch (error) {
      console.log(error);
    }
  };

  const addRemoteAddress = async (
    addressBody: AddressBody
  ): Promise<Result> => {
    try {
      const response = await addressesApi.saveNewAddress(
        currentUserId.value,
        addressBody
      );

      await reloadRemoteAddresses();
      return { data: response.id };
    } catch (error) {
      console.log(error);
      return { error: true };
    }
  };

  const updateRemoteAddress = async (
    addressData: AddressData
  ): Promise<Result> => {
    try {
      console.log(addressData);
      const response = await addressesApi.updateAddress(addressData);
      await reloadRemoteAddresses();
      return { data: response.id };
    } catch (error) {
      console.log(error);
      return { error: true };
    }
  };

  const deleteRemoteAddress = async (id: string) => {
    try {
      const response = await addressesApi.deleteAddressById(id);
      await reloadRemoteAddresses();

      return {
        success: !!response.id,
      };
    } catch (error) {
      console.log(error);
      return { error: true };
    }
  };

  // Local Actions
  const addLocalAddress: typeof addRemoteAddress = async (
    addressBody: AddressBody
  ) => {
    const newLocalId = `local-${new Date().getTime()}`;

    userAddresses.value.push({
      ...addressBody,
      id: newLocalId,
    });

    return { data: newLocalId };
  };

  const updateLocalAddress: typeof updateRemoteAddress = async (
    addressData: AddressData
  ) => {
    const addressIndex = userAddresses.value.findIndex(
      (address) => addressData.id === address.id
    );
    if (addressIndex === -1) {
      // Shouldn't happen in production
      // All edits in app should be triggered based on data from store
      throw new Error("Address not found");
    }
    userAddresses.value[addressIndex] = addressData;
    return { data: addressData.id };
  };

  const deleteLocalAddress: typeof deleteRemoteAddress = async (id: string) => {
    userAddresses.value = userAddresses.value.filter(
      (address) => address.id !== id
    );
    return { success: true };
  };

  // Data getter
  const getAddressDataById = (id: string) => {
    const addressData = userAddresses.value.find((address) => address.id == id);
    // Add some not found handling here
    return addressData! as AddressData;
  };

  // Init
  const saveAddress = computed(() =>
    isLoggedIn.value ? addRemoteAddress : addLocalAddress
  );
  const updateAddress = computed(() =>
    isLoggedIn.value ? updateRemoteAddress : updateLocalAddress
  );
  const deleteAddress = computed(() =>
    isLoggedIn.value ? deleteRemoteAddress : deleteLocalAddress
  );

  const initStore = async (userId?: string) => {
    const data = userId ? await addressesApi.getAddressesByUserId(userId) : [];

    isLoggedIn.value = !!userId;
    currentUserId.value = userId ?? "";
    userAddresses.value = data as Array<AddressData>;
  };

  const resetStore = () => {
    userAddresses.value = [];
    isLoggedIn.value = false;
    currentUserId.value = "";
  };

  return {
    isLoggedIn,
    userAddresses,
    moreAddressesAllowed,
    saveAddress,
    updateAddress,
    deleteAddress,
    getAddressDataById,
    //reset
    initStore,
    resetStore,
  };
});
