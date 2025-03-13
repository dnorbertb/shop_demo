import type { PaginatedResponse } from "../shared";
import type { OrderBody, OrderData } from "./types";

export const useOrdersApi = () => {
  const API_URL = useRuntimeConfig().public.API_URL;
  if (!API_URL) throw new Error("NO API_URL SET");

  const saveNewOrder = async (orderData: OrderBody): Promise<string> => {
    const response = await $fetch<{ doc: any }>(`${API_URL}/api/orders`, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    return response.doc.id;
  };

  const getPaymentUrl = async (orderId: string): Promise<string> => {
    const response = await $fetch<{ paymentId: string; paymentUrl: string }>(
      `${API_URL}/api/orders/${orderId}/getPayment`
    );

    return response.paymentUrl;
  };

  const getUserOrders = async (userId: string) => {
    const response = await $fetch<PaginatedResponse<OrderData>>(
      `${API_URL}/api/orders?where[customer][equals]=${userId}&depth=5`
    );

    return response.docs;
  };

  return {
    saveNewOrder,
    getPaymentUrl,
    getUserOrders,
  };
};
