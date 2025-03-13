<script setup lang="ts">
import { useCartStore } from "~/core/stores/cartStore";
import { useUserDataStore } from "~/core/stores/userDataStore";
import { useGlobalConfigStore } from "~/core/stores/globalConfigStore";
import AddressControls from "./components/AddressControls";
import PaymentControls from "./components/PaymentControls.vue";
import ShippingControls from "./components/ShippingControls.vue";
import PaymentRedirectInfo from "./components/PaymentRedirectInfo.vue";
import CartContent from "./components/CartContent";
import DiscountCodeControl from "./components/DiscountCodeControl.vue";
import PriceInfo from "./components/PriceInfo.vue";
import SubmitStateModal from "./components/SubmitStateModal.vue";
import OrderConfirmationModal from "./components/OrderConfirmationModal";
import type { CheckDiscountCodeResponse } from "~/core/api/discountCodes";
import OrderMessage from "./components/OrderMessage.vue";
import type { AddressData } from "~/core/api/addresses";
import PlaceOrderButton from "./components/PlaceOrderButton.vue";
import { calculatePricing } from "./helpers/calculatePricing";
import { orderValidationSchema } from "./validations/orderDataValidationSchema";
import { useFormErrorsHandling } from "./composables/useFormErrorsHandling";
import { useOrdersApi } from "~/core/api/order";
import { ShopModuleRouteMap } from "..";

const ordersApi = useOrdersApi();
const route = useRoute();
const cartStore = useCartStore();
const userDataStore = useUserDataStore();
const globalConfigStore = useGlobalConfigStore();

const { data: globalConfig } = await useAsyncData(globalConfigStore.getData);

useHead({
  titleTemplate() {
    return globalConfig.value?.shopModule.cart.metaTitle as string;
  },
});

// Modals
const submitStateModal = ref<InstanceType<typeof SubmitStateModal>>();
const orderConfirmationModal = ref();

// Data
const discountCodeData = ref<CheckDiscountCodeResponse | null>(null);
const viewData = reactive<{
  addressData: AddressData | null;
  paymentType: "online" | "cod";
  shippingOption: string;
  additionalShippingData: string;
  discountCode: string;
  orderMessage: string;
}>({
  addressData: null,
  paymentType: "online",
  shippingOption: "",
  additionalShippingData: "",
  discountCode: "",
  orderMessage: "",
});

// Removing shipping option on payment type
watch(
  () => viewData.paymentType,
  () => {
    viewData.shippingOption = "";
  }
);

// Removing additional shipping data when shipping option changed
watch(
  () => viewData.shippingOption,
  () => (viewData.additionalShippingData = "")
);

// Computed
const shippingOptionsForSelectedPaymentType = computed(() => {
  return globalConfig.value?.shippingOptions.filter(
    (option) => option.paymentType == viewData.paymentType
  );
});

const selectedShippingOption = computed(() => {
  return globalConfig.value?.shippingOptions.find(
    (option) => option.id == viewData.shippingOption
  );
});

const orderData = computed(() => {
  return {
    ...viewData,
    shippingType: selectedShippingOption.value?.type ?? "directShipping",
    order: cartStore.cartData.map(({ quantity, product }) => ({
      product,
      quantity,
    })),
  };
});

const pricingData = computed(() => {
  return calculatePricing({
    cartWorth: cartStore.totalPrice,
    discountCodeData: discountCodeData.value,
    shippingCost: selectedShippingOption.value?.pricing.brutto ?? 0,
    userDiscountRate: userDataStore.userData.discount,
  });
});

// Handlers
const handleDiscountCodeDataUpdate = (
  data: CheckDiscountCodeResponse | null
) => {
  discountCodeData.value = data;
  viewData.discountCode = data ? data.id : "";
};

// Form error handling
const errorHandling = useFormErrorsHandling(orderData);

// Methods
const triggerConfirmation = () => {
  return orderConfirmationModal.value?.open({
    ...orderData.value,
    ...pricingData.value,
    discountCode: discountCodeData.value?.code,
    vatIncluded:
      cartStore.vatIncluded + (selectedShippingOption.value?.pricing.vat ?? 0),
    shippingCost: selectedShippingOption.value?.pricing.brutto,
    shippingData: {
      provider: selectedShippingOption?.value?.shippingDataProvider,
      shippingType: selectedShippingOption.value?.type,
      additionalShippingData: viewData.additionalShippingData,
    },
  });
};

// Order submit
const handleConfirmationAndSubmitOrder = async () => {
  const confirmed = await triggerConfirmation();
  if (!confirmed) return;

  const updateModalState = submitStateModal.value?.open();
  if (!updateModalState) return; // Should not happen in prod

  try {
    updateModalState("submittingOrder");
    const orderId = await ordersApi.saveNewOrder(orderData.value);
    if (!orderId) throw new Error("Something went wrong when placing order");

    if (orderData.value.paymentType == "cod") {
      navigateTo({ name: ShopModuleRouteMap.thankYou });
      cartStore.clearCart();
      return;
    }

    updateModalState("creatingPayment");
    const paymentUrl = await ordersApi.getPaymentUrl(orderId);
    if (!paymentUrl)
      throw new Error("Something went wrong when creating payment");

    cartStore.clearCart();
    navigateTo(paymentUrl, { external: paymentUrl.startsWith("http") });
    return;
  } catch (error) {
    console.log(error);
    updateModalState("error");
  }
};
</script>
<template>
  <ClientOnly>
    <div class="h-full flex-1">
      <div class="h-full lg:container mx-auto md:px-0 lg:flex">
        <div
          class="flex-1 max-lg:container max-lg:mx-auto px-4 py-8 lg:p-12 lg:pl-0"
        >
          <h1 class="font-semibold text-3xl mb-6 txt-primary">
            Dokończ zamówienie:
          </h1>

          <NonLoggedInNotification
            :redirect-path="route?.fullPath ?? ''"
            v-if="userDataStore.userState !== 'authenticated'"
            class="mb-8"
          />

          <h2 class="font-medium text-xl mb-3 txt-primary">
            Dane do faktury i adres:
          </h2>

          <AddressControls
            class="mb-6"
            @update-address="(data) => (viewData.addressData = data)"
            :error="errorHandling.errorsData.addressData"
          />

          <PaymentControls class="mb-7" v-model="viewData.paymentType!" />

          <ShippingControls
            class="mb-5"
            :error="errorHandling.errorsData.shippingOption"
            v-model="viewData.shippingOption!"
            :shipping-options="shippingOptionsForSelectedPaymentType"
          />

          <ShippingDataCollector
            v-if="selectedShippingOption?.type == 'pickupPoint'"
            :error="errorHandling.errorsData.additionalShippingData"
            :provider="selectedShippingOption.shippingDataProvider"
            @update-point="
              (data) => (viewData.additionalShippingData = data ?? '')
            "
          />
        </div>

        <div class="flex-1 lg:pt-10 bg-gray-50 dark:bg-gray-800 shadow">
          <div
            class="sticky max-lg:container max-lg:mx-auto top-0 px-4 py-8 lg:p-12 pb-10 lg:pt-8"
          >
            <h2 class="font-semibold text-2xl mb-6 txt-secondary">
              Twój koszyk:
            </h2>

            <CartContent
              class="mb-8"
              :content="cartStore.cartDataWithProductsData"
              @increase-item-quantity="cartStore.increaseItemQuantity"
              @decrease-item-quantity="cartStore.decreaseItemQuantity"
              @remove-item-from-cart="cartStore.removeItemFromCart"
            />

            <DiscountCodeControl
              class="mb-5"
              @update-code="handleDiscountCodeDataUpdate"
            />

            <OrderMessage class="mb-8" v-model="viewData.orderMessage!" />

            <PriceInfo
              class="mb-3"
              :cartWorth="cartStore.totalPrice"
              :shippingCost="selectedShippingOption?.pricing.brutto ?? 0"
              :vat-included="cartStore.vatIncluded"
              v-bind="pricingData"
            />

            <UForm
              class="h-full"
              :state="orderData"
              :schema="orderValidationSchema"
              @error="errorHandling.onErrorHandler"
              @submit="handleConfirmationAndSubmitOrder"
            >
              <PlaceOrderButton :is-cart-empty="cartStore.isCartEmpty" />
            </UForm>

            <PaymentRedirectInfo
              class="mt-3"
              v-if="viewData.paymentType == 'online'"
            />
          </div>
        </div>
      </div>
    </div>

    <OrderConfirmationModal ref="orderConfirmationModal" />
    <SubmitStateModal ref="submitStateModal" />
  </ClientOnly>
</template>
