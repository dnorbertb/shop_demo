/**
 * Provides utility functions for handling navigation with redirection.
 * @example
 * // page-one
 * navigateToWithRedirectBack('page-two')
 *
 * // page-two
 * catchRedirectAndNavigate('page-three') // If route change will be triggered by page-one, the hook will redirect to it. In other case redirects to page-three.
 */
export const useRedirectBackHelper = () => {
  const route = useRoute();

  /**
   * Creates a route object that includes params required to redirect back.
   */
  const createRouteObjectWithRedirect = (
    to: Parameters<typeof navigateTo>["0"],
    redirectPath?: string
  ) => {
    if (typeof to == "string") {
      return {
        path: to,
        query: { z: redirectPath ? redirectPath : route.fullPath },
      };
    }

    return {
      ...to,
      query: { ...to?.query, z: redirectPath ? redirectPath : route.fullPath },
    };
  };

  /**
   * Navigates to a given route with params required to redirect back.
   */
  const navigateToWithRedirectBack = (
    ...args: Parameters<typeof navigateTo>
  ) => {
    const [to, options] = args;
    navigateTo(createRouteObjectWithRedirect(to), options);
  };

  /**
   * Navigates to a given route while preserving params required to redirect back.
   */
  const preserveRedirectAndNavigateTo = (
    ...args: Parameters<typeof navigateTo>
  ) => {
    const [to, options] = args;
    const preservedPath = route.query?.z as string | undefined;
    navigateTo(createRouteObjectWithRedirect(to, preservedPath), options);
  };

  /**
   * Caches redirect information and redirects back. Redirects to fallback if no redirect information is found
   */
  const catchRedirectAndNavigate = (
    fallback: Parameters<typeof navigateTo>["0"],
    options?: Parameters<typeof navigateTo>["1"]
  ) => {
    const redirectPath = route?.query?.z as string | undefined;
    if (redirectPath) {
      navigateTo({ path: redirectPath }, options);
    } else {
      navigateTo(fallback, options);
    }
  };

  return {
    createRouteObjectWithRedirect,
    preserveRedirectAndNavigateTo,
    navigateToWithRedirectBack,
    catchRedirectAndNavigate,
  };
};
