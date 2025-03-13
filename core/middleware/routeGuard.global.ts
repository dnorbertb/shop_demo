import { AuthModuleRouteMap } from "../features/auth";
import { UserDashboardModuleRouteMap } from "../features/user-dashboard";
import { useUserDataStore } from "../stores/userDataStore";
import type { FeatureRoute } from "../types/FeatureRoute";

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return;

  const pageData = to as FeatureRoute;
  const userDataStore = useUserDataStore();

  const checkIfAuthorized = (resolve: (arg: boolean) => void) => {
    const loginState = userDataStore.userState;

    if (loginState != "authenticated" && loginState != "unauthenticated") {
      setTimeout(() => checkIfAuthorized(resolve), 500);
      return;
    }

    resolve(loginState == "authenticated");
  };

  const isAuthorized = await new Promise((resolve) =>
    checkIfAuthorized(resolve)
  );

  switch (pageData.meta?.restricted) {
    case "authorizedOnly":
      if (!isAuthorized) {
        return navigateTo({ name: AuthModuleRouteMap.login });
      }
      break;
    case "unauthorizedOnly":
      if (isAuthorized) {
        return navigateTo({ name: UserDashboardModuleRouteMap.dashboard });
      }
      break;
    default:
      return;
  }
});
