import { useAuthApi, type UserData } from "~/core/api/auth";
import type { LogInArgs } from "~/core/api/auth/types";

const defaultUserData = {
  id: "",
  email: "",
  marketingConsent: false,
  cart: [],
  discount: 0,
  moneySpent: 0,
};

export const useUserDataStore = defineStore("userDataStore", () => {
  const authApi = useAuthApi();
  const userState = ref<
    "unauthenticated" | "authenticated" | "loading" | "idle"
  >("idle");
  const userData = reactive<UserData>({ ...defaultUserData });
  const onLoginSubscribers = ref<Array<(userData?: UserData) => void>>([]);
  const onLogoutSubscribers = ref<Array<Function>>([]);

  const setUserLoggedIn = (data: UserData) => {
    Object.assign(userData, data);
    userState.value = "authenticated";
    onLoginSubscribers.value.forEach((fn) => fn(data));
  };

  const logIn = async (args: LogInArgs) => {
    userState.value = "loading";
    try {
      const data = await authApi.logInUser(args);
      if (data) {
        setUserLoggedIn(data);
        return { success: true };
      }
    } catch (error) {
      console.log(error);
    }
    userState.value = "unauthenticated";
    return { success: false };
  };

  const logOut = async () => {
    try {
      userState.value = "loading";
      const { success } = await authApi.logOut();
      if (success) resetStore();
      return { success };
    } catch (error) {
      console.log(error);
    }
    return { success: false };
  };

  const subscribeLogIn = (fn: (userData?: UserData) => void) => {
    onLoginSubscribers.value.push(fn);
  };

  const subscribeLogOut = (fn: Function) => {
    onLogoutSubscribers.value.push(fn);
  };

  const checkIfUserLoggedIn = async () => {
    userState.value = "loading";
    try {
      const data = await authApi.fetchCurrentUserData();
      if (data) {
        setUserLoggedIn(data);
        return;
      }
    } catch (error) {
      console.log(error);
    }
    userState.value = "unauthenticated";
  };

  const initStore = async () => {
    await checkIfUserLoggedIn();
  };

  const resetStore = async () => {
    userState.value = "unauthenticated";
    Object.assign(userData, { id: "", email: "" });
    onLogoutSubscribers.value.forEach((fn) => fn());
  };

  return {
    userState,
    userData,
    logIn,
    logOut,
    subscribeLogIn,
    subscribeLogOut,
    initStore,
    resetStore,
  };
});
