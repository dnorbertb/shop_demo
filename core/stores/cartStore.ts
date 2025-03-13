import { useProductApi, type ProductData } from "~/core/api/products";
import type { UserData } from "~/core/api/auth";

export const useCartStore = defineStore(
  "cartStore",
  () => {
    const productApi = useProductApi();

    // Data
    const loadedProducts = ref<Array<ProductData>>([]);
    const storeState = ref<"" | "initialized">("");
    const cartData = ref<UserData["cart"]>([]);
    const currentUserId = ref("");
    const isLoggedIn = ref(false);

    // Getters
    const cartDataWithProductsData = computed(() => {
      return cartData.value
        .map((entry) => ({
          ...entry,
          product: loadedProducts.value.find(
            (product) => product.id == entry.product
          )!,
        }))
        .filter((entry) => !!entry.product);
    });

    const itemsCount = computed(() =>
      cartData.value.reduce((pV, cV) => pV + cV.quantity, 0)
    );

    const isCartEmpty = computed(() => cartData.value.length < 1);

    const totalPrice = computed(() =>
      cartDataWithProductsData.value.reduce((pV, cV) => {
        return pV + cV.quantity * cV.product.pricing.brutto;
      }, 0)
    );

    const vatIncluded = computed(() =>
      cartDataWithProductsData.value.reduce(
        (pV, cV) => pV + cV.quantity * cV.product.pricing.vat,
        0
      )
    );

    // Get methods
    const getCartItemQuantity = (id?: string) => {
      const currentItem = cartData.value.find((item) => item.product == id);
      return currentItem?.quantity ?? 0;
    };

    const isProductLoaded = (id: string) => {
      return loadedProducts.value.some((product) => product.id == id);
    };

    const isProductInCart = (id: string) => {
      return cartData.value.some((entry) => entry.product == id);
    };

    // Cart management methods
    const addItemToCart = (
      product: ProductData,
      quantity: number = 1,
      priceWhenAdded?: number
    ) => {
      if (!isProductLoaded(product.id)) {
        loadedProducts.value.push(product);
      }

      if (isProductInCart(product.id)) {
        increaseItemQuantity(product.id);
        return;
      }

      cartData.value.push({
        quantity,
        priceWhenAdded: priceWhenAdded
          ? priceWhenAdded
          : product.pricing.brutto,
        product: product.id,
      });
    };

    const removeItemFromCart = (id: string) => {
      const filteredItems = cartData.value.filter(
        (item) => item.product !== id
      );
      cartData.value = filteredItems;
    };

    const decreaseItemQuantity = (id: string) => {
      const currentItem = cartData.value.find((item) => item.product == id);
      if (!currentItem) return;
      const newQuantityValue = currentItem.quantity - 1;
      if (newQuantityValue < 1) return;
      currentItem.quantity = newQuantityValue;
    };

    const increaseItemQuantity = (id: string) => {
      const currentItem = cartData.value.find((item) => item.product == id);
      if (!currentItem) return;
      currentItem.quantity += 1;
    };

    const clearCart = () => {
      cartData.value = [];
    };

    // Watch for changes and save data
    watch(
      () => cartData.value,
      () => {
        if (storeState.value == "initialized" && currentUserId.value) {
          saveCartOnServer();
        }
      }
    );

    // Internal Methods
    const saveCartOnServer = async () => {
      console.log("save cart on server");
    };

    const reloadCartProductsData = async () => {
      loadedProducts.value = [];
      cartData.value.forEach(async (item) => {
        try {
          const data = await productApi.getProductById(item.product);
          loadedProducts.value.push(data);
        } catch (error) {
          item.withdrawn = true;
        }
      });
    };

    const mergeLocalAndRemoteCarts = (remoteCartData: UserData["cart"]) => {
      remoteCartData.forEach((remoteCartItem) => {
        const { product, quantity } = remoteCartItem;
        const localCartItemQuantity = getCartItemQuantity(product);
        if (!localCartItemQuantity) {
          cartData.value.push(remoteCartItem);
          return;
        }
        if (localCartItemQuantity >= quantity) return;
        const itemWithQuantityToUpdate = cartData.value.find(
          (entry) => entry.product == product
        );
        itemWithQuantityToUpdate!.quantity = quantity;
      });
    };

    // Init - Reset
    const initStore = async (userData?: UserData) => {
      storeState.value = "";

      if (!userData) {
        storeState.value = "initialized";
        isLoggedIn.value = false;
        currentUserId.value = "";
        return;
      }

      isLoggedIn.value = true;
      currentUserId.value = userData.id;

      if (isCartEmpty.value) {
        cartData.value = userData.cart;
      }

      if (!isCartEmpty.value && userData.cart.length > 0) {
        mergeLocalAndRemoteCarts(userData.cart);
      }

      await reloadCartProductsData();
      if (userData.id) {
        await saveCartOnServer();
      }
      storeState.value = "initialized";
    };

    const resetStore = () => {
      storeState.value = "initialized";
      isLoggedIn.value = false;
      currentUserId.value = "";
    };

    return {
      // Getters
      storeState,
      currentUserId,
      cartData,
      loadedProducts,
      isLoggedIn,
      cartDataWithProductsData,
      itemsCount,
      isCartEmpty,
      totalPrice,
      vatIncluded,
      // Get methods
      getCartItemQuantity,
      isProductLoaded,
      isProductInCart,
      // Cart management methods
      addItemToCart,
      removeItemFromCart,
      decreaseItemQuantity,
      increaseItemQuantity,
      clearCart,
      // Init - Reset
      initStore,
      resetStore,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
  }
);
