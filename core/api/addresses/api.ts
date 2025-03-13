import type { PaginatedResponse } from "../shared";
import { convertAddressPayload } from "./converter";
import type { AddressBody, AddressData, AddressPayload } from "./types";

export const useAddressesApi = () => {
  const API_URL = useRuntimeConfig().public.API_URL;
  if (!API_URL) throw new Error("NO API_URL SET");

  const getAddressesByUserId = async (
    userId: string
  ): Promise<Array<AddressData>> => {
    const response = await $fetch<PaginatedResponse<AddressPayload>>(
      `${API_URL}/api/addresses?where[owner][equals]=${userId}&depth=999`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.docs.map((addressData) =>
      convertAddressPayload(addressData)
    );
  };

  const saveNewAddress = async (
    userId: string,
    addressData: AddressBody
  ): Promise<AddressData> => {
    const response = await $fetch<{ doc: AddressPayload }>(
      `${API_URL}/api/addresses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner: userId,
          ...addressData,
        }),
      }
    );

    return response.doc;
  };

  const updateAddress = async (
    addressData: AddressData
  ): Promise<AddressData> => {
    const response = await $fetch<{ doc: AddressPayload }>(
      `${API_URL}/api/addresses/${addressData.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      }
    );

    return response.doc;
  };

  const deleteAddressById = async (id: string) => {
    const response = await $fetch<{ doc: AddressPayload }>(
      `${API_URL}/api/addresses/${id}`,
      {
        method: "DELETE",
      }
    );

    return response.doc;
  };

  return {
    saveNewAddress,
    updateAddress,
    deleteAddressById,
    getAddressesByUserId,
  };
};
