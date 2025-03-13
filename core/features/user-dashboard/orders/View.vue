<script setup lang="ts">
import { useOrdersApi, type OrderData } from "~/core/api/order";
import { useUserDataStore } from "~/core/stores/userDataStore";
import OrderCard from "./components/OrderCard.vue";
const ordersApi = useOrdersApi();
const userDataStore = useUserDataStore();
const orders = ref<Array<OrderData>>();

// TODO: Pagination
// Loading / error states
// Details modal
// Payment handling
// Badges tooltip with more information

onMounted(async () => {
  try {
    const response = await ordersApi.getUserOrders(userDataStore.userData.id);
    orders.value = response;
  } catch (error) {
    console.log(error);
  }
});
</script>
<template>
  <div class="py-2">
    <div class="flex mb-5">
      <h1 class="text-xl">Zamówienia:</h1>
    </div>
    <div class="flex flex-col gap-3 max-w-lg">
      <p v-if="!(orders ?? []).length" class="txt-quaternary">
        Póki co nic tu nie ma...
      </p>
      <OrderCard v-for="order in orders" :order="order" />
    </div>
  </div>
</template>
