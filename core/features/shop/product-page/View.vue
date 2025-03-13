<script setup lang="ts">
import { useProductPageApi } from "~/core/api/productPages";
import { useCartStore } from "~/core/stores/cartStore";
import { createProductPageSeo } from "./composables/create-page-seo";
import PageGallery from "./components/PageGallery.vue";
import ShortSummary from "./components/ShortSummary.vue";
import ProductSelect from "./components/ProductSelect.vue";
import AvailabilityInfo from "./components/AvailabilityInfo.vue";
import ProductPageActions from "./components/ProductPageActions.vue";
import ParametersTable from "./components/ParametersTable.vue";
import DescriptionSection from "./components/DescriptionSection.vue";
import CtaButton from "./components/CtaButton.vue";

// Stores
const cartStore = useCartStore();

// Utils
const toast = useToast();

// Gathering data
const productPageApi = useProductPageApi();
const route = useRoute();

const pageSlug = Array.isArray(route.params.slug)
  ? (route.params.slug[0] as string)
  : route.params.slug;
const { variant: queryVariant } = route.query;

const { data, error } = await useAsyncData("productPage", async () => {
  const response = await productPageApi.getProductPageByUrl(pageSlug);
  return response;
});

watchEffect(() => {
  if (error.value) {
    showError({
      statusCode: 404,
      message: "Nie znaleziono strony",
    });
  }
});

const {
  name,
  slug,
  meta: { title: metaTitle, description: metaDescription },
  category,
  gallery,
  shortDescription,
  description,
  productMap,
} = data.value!;

createProductPageSeo({
  productName: name,
  metaTitle,
  metaDescription,
  pageUrl: slug,
  productMap: productMap,
});

const breadcrumbs = [
  { label: "", icon: "i-heroicons-home", to: { name: "home" } },
  {
    label: category.name,
    to: { name: "shop-browser", params: { category: category.slug } },
  },
  { label: name },
];

// Page state
const wishListModal = ref();
const selectedVariantId = ref("");

onMounted(() => {
  const newVariant = queryVariant
    ? (queryVariant as string)
    : productMap[0].variantId;
  selectedVariantId.value = newVariant;
  if (newVariant == queryVariant) return;
  navigateTo({
    query: { variant: newVariant },
  });
});

// Computed data
const selectedVariantData = computed(() =>
  productMap.find((variant) => {
    return variant.variantId == selectedVariantId.value;
  })
);

const selectedProductData = computed(() => {
  return selectedVariantData.value?.product;
});

const selectedProductQuantityInCart = computed(() => {
  return cartStore.getCartItemQuantity(selectedProductData.value?.id);
});

// Action handlers
const handleModelSelect = (variantId: string) => {
  selectedVariantId.value = variantId;
  navigateTo({
    query: { variant: variantId },
  });
};

const handleAddToCartAction = () => {
  if (!selectedProductData.value) return;
  cartStore.addItemToCart(selectedProductData.value);
  toast.add({
    title: "Produkt został dodany do koszyka",
    icon: "i-solar-check-circle-outline",
    color: "green",
    timeout: 1500,
  });
};

const handleAddToWishListAction = async () => {
  const value = await wishListModal.value.open();
  console.log("Added to list: " + value);
  toast.add({
    title: "Produkt został zapisany na liście życzeń",
    icon: "i-solar-check-circle-outline",
    color: "green",
    timeout: 1500,
  });
};
</script>
<template>
  <div v-if="data" class="container mx-auto px-3 md:px-0 py-6 pt-10">
    <UBreadcrumb class="mb-8" divider=">" :links="breadcrumbs" />
    <div class="md:grid grid-cols-2 gap-x-12 mb-8">
      <PageGallery
        class="mb-8"
        :gallery-data="gallery"
        :current-section="selectedVariantData?.galleryIdentifier"
      />
      <div class="relative row-span-2">
        <div
          class="md:sticky md:top-5 mt-6 md:mt-0 md:pt-6 md:pb-8 md:pl-6 md:border-l border-l-gray-200"
        >
          <ShortSummary :product-data="selectedVariantData?.product">
            <template #summary>
              <RichText :content="shortDescription" />
            </template>
          </ShortSummary>
          <ProductSelect
            :productMap="productMap"
            :model-value="selectedVariantId"
            @update:model-value="handleModelSelect"
            class="mb-4"
          />
          <AvailabilityInfo
            class="md:max-w-sm"
            :availability="selectedVariantData?.product.stock.availability"
          />
          <ClientOnly>
            <ProductPageActions
              class="md:max-w-sm"
              :availability="selectedProductData?.stock.availability"
              :pieces-in-cart="selectedProductQuantityInCart"
              @add-to-cart="handleAddToCartAction"
              @add-to-wish-list="handleAddToWishListAction"
            />
          </ClientOnly>
        </div>
      </div>
      <section class="mt-10 md:mt-0 pt-8 border-t border-gray-100">
        <ParametersTable :product-data="selectedProductData" />
        <DescriptionSection class="mt-6">
          <template #content>
            <RichText :content="description" />
          </template>
        </DescriptionSection>
        <!-- <ProductReviewsSection class="mt-10" :reviews="reviews" /> -->
        <CtaButton class="mt-16 md:hidden" />
      </section>
    </div>
  </div>
  <WishListModal ref="wishListModal" />
</template>
