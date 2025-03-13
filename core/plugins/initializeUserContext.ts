import { useAddressesStore } from "../stores/addressStore";
import { useCartStore } from "../stores/cartStore";
import { useUserDataStore } from "../stores/userDataStore";

export default defineNuxtPlugin(async () => {
  const cartStore = useCartStore();
  const userDataStore = useUserDataStore();
  const addressStore = useAddressesStore();

  // Address Store Handlers
  userDataStore.subscribeLogIn((userData) =>
    addressStore.initStore(userData?.id)
  );
  userDataStore.subscribeLogOut(addressStore.resetStore);

  // Cart Store Handlers
  userDataStore.subscribeLogIn(cartStore.initStore);
  userDataStore.subscribeLogOut(cartStore.resetStore);

  // Init user
  await userDataStore.initStore();
});
