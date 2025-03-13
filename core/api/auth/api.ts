import { convertUserPayload } from "./converter";

import type {
  LogInArgs,
  LogInResponseObject,
  SignUpArgs,
  SignUpResponse,
  UserData,
} from "./types";

export const useAuthApi = () => {
  const API_URL = useRuntimeConfig().public.API_URL;
  if (!API_URL) throw new Error("NO API_URL SET");

  const signUpUser = async (userData: SignUpArgs) => {
    const response = await $fetch<SignUpResponse>(API_URL + "/api/customers", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return response;
  };

  const logInUser = async (
    credentials: LogInArgs
  ): Promise<UserData | null> => {
    const response = await $fetch<LogInResponseObject>(
      API_URL + "/api/customers/login",
      {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    return response.user ? convertUserPayload(response.user) : null;
  };

  const logOut = async () => {
    await $fetch(API_URL + "/api/customers/logout", {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { success: true };
  };

  const fetchCurrentUserData = async (): Promise<UserData | null> => {
    const response = await $fetch<LogInResponseObject>(
      API_URL + "/api/customers/me",
      {
        method: "get",
        credentials: "include",
      }
    );

    return response.user ? convertUserPayload(response.user) : null;
  };

  return {
    signUpUser,
    logInUser,
    logOut,
    fetchCurrentUserData,
  };
};
