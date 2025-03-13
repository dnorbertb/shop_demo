<script setup lang="ts">
import { useGlobalConfigStore } from "~/core/stores/globalConfigStore";
import FiltersBar from "./components/FiltersBar/Main.vue";
import FiltersBarMobile from "./components/FiltersBarMobile.vue";
import SearchSettingsBar from "./components/SearchSettingsBar.vue";
import ProductGrid from "./components/ProductGrid.vue";
import BottomBar from "./components/BottomBar.vue";
import ShopBreadcrumbs from "./components/ShopBreadcrumbs.vue";
import { noCategoryOption } from "./config/noCategoryOption";
import { useProductApi } from "~/core/api/products";
import qs from "qs";
import type { FiltersData } from "./types/FiltersData";
import type { GetProductsArgs } from "~/core/api/products/types";

// Main
const route = useRoute();
const productApi = useProductApi();
const configStore = useGlobalConfigStore();
const { data: globalData } = useAsyncData(configStore.getData);

definePageMeta({
  key(route) {
    return route.name as string;
  },
});

useSeoMeta({
  titleTemplate() {
    return globalData.value?.shopModule.browser.metaTitle ?? "";
  },
});

// Local Data
const reloadDebounceId = ref<NodeJS.Timeout | undefined>(undefined);
const changesPending = ref(false);
const currentPage = ref(1);
const sortOption = ref("default");
const searchQueryData = ref<FiltersData>({});
const categoriesData = computed(() => configStore.data?.categoriesData);
const currentCategorySlug = ref("");
const currentCategoryData = computed(() =>
  categoriesData.value?.find(
    (category) => category.slug == currentCategorySlug.value
  )
);

// Helpers methods
const getCategoryDataBySlug = (slug: string) => {
  return categoriesData.value?.find((category) => category.slug == slug);
};

// Main request
const {
  data: productsResponseData,
  status,
  error,
  refresh: reloadProducts,
} = useAsyncData(
  () =>
    productApi.getProducts({
      page: currentPage.value,
      sortBy: sortOption.value,
      category: currentCategoryData.value?.id,
      filters: searchQueryData.value as GetProductsArgs["filters"],
    }),
  { immediate: false }
);

// Error checking
watchEffect(() => {
  if (error.value) {
    showError({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

// Internal Methods
const reloadProductsDebounced = () => {
  if (reloadDebounceId.value) {
    clearTimeout(reloadDebounceId.value);
  }
  reloadDebounceId.value = setTimeout(() => {
    reloadProducts();
    reloadDebounceId.value = undefined;
    changesPending.value = false;
  }, 1000);
};

// Handlers
const handleCategoryChange = (category: string) => {
  currentCategorySlug.value = category;
  navigateTo({
    params: { category },
  });
  currentPage.value = 1;
  searchQueryData.value = {};
  reloadProducts();
};

const handleFiltersChange = (data: FiltersData) => {
  changesPending.value = true;
  currentPage.value = 1;
  const searchQueryDataCopy = { ...searchQueryData.value };
  Object.entries(data).forEach((keyValuePair) => {
    const [key, data] = keyValuePair;
    searchQueryDataCopy[key] = data;
  });
  searchQueryData.value = searchQueryDataCopy;
  navigateTo({
    query: {
      ...route.query,
      filters: qs.stringify(searchQueryDataCopy, { encode: false }),
    },
  });
  reloadProductsDebounced();
};

const handleSortOptionChange = (data: string) => {
  sortOption.value = data;
  currentPage.value = 1;
  reloadProducts();
};

const handlePageChange = (data: number) => {
  currentPage.value = data;
  reloadProducts();
};

// External query data watching
watch(
  () => route.fullPath,
  () => {
    if (!route.query.external) return;
    const data = qs.parse(route.query.external as string) as FiltersData;
    delete route.query.external;
    handleFiltersChange(data);
  }
);

// Initial functions
const initCategoryFromRoute = () => {
  const routeCategory = route.params.category as string | undefined;
  if (routeCategory == noCategoryOption.slug) return;

  if (!routeCategory) {
    currentCategorySlug.value = noCategoryOption.slug;
    navigateTo({
      params: { category: noCategoryOption.slug },
      query: route.query,
    });
    return;
  }

  if (routeCategory) {
    currentCategorySlug.value = routeCategory;
    const categoryData = getCategoryDataBySlug(routeCategory);
    if (!categoryData) {
      showError({
        statusCode: 404,
        message: "Not Found",
      });
    }
    return;
  }
};

const initFiltersFromRoute = () => {
  const filtersQuery = route.query.filters as string;
  const externalQuery = route.query.external as string;
  if (!filtersQuery && !externalQuery) return;
  const filtersParsed = qs.parse(filtersQuery) as FiltersData;
  const externalParsed = qs.parse(externalQuery) as FiltersData;
  searchQueryData.value = { ...filtersParsed, ...externalParsed };
};

// View init
onMounted(() => {
  initCategoryFromRoute();
  initFiltersFromRoute();
  reloadProducts();
});
</script>
<template>
  <main class="container mx-auto px-3 py-4">
    <ShopBreadcrumbs
      class="mt-6 mb-6"
      :category="currentCategoryData"
      @update-category="handleCategoryChange"
    />
    <h1 class="text-4xl txt-primary mb-2">
      {{ globalData?.shopModule.browser.title }}
    </h1>
    <p class="text-sm txt-secondary max-w-xl mb-12">
      {{ globalData?.shopModule.browser.description }}
    </p>
    <div class="flex gap-8">
      <FiltersBar
        class="hidden lg:flex lg:w-80"
        :categories="categoriesData!"
        :current-category="currentCategoryData"
        @update:query-data="(e)=>handleFiltersChange(e as FiltersData)"
        :queryData="searchQueryData"
        @update:category="(e)=>handleCategoryChange(e!)"
        :category="currentCategoryData?.slug ?? noCategoryOption.slug"
      />
      <FiltersBarMobile
        :categories="categoriesData!"
        :current-category="currentCategoryData"
        @update:query-data="(e)=>handleFiltersChange(e as FiltersData)"
        :queryData="searchQueryData"
        @update:category="(e)=>handleCategoryChange(e!)"
        :category="currentCategoryData?.slug ?? noCategoryOption.slug"
      />
      <div class="flex-1 flex flex-col">
        <SearchSettingsBar
          class="mb-4"
          :per-page-count="productsResponseData?.limit ?? 12"
          :total-docs="productsResponseData?.totalDocs ?? 0"
          @update:page="handlePageChange"
          :page="currentPage"
          @update:sort-settings="handleSortOptionChange"
          :sort-settings="sortOption"
        />
        <ProductGrid
          class="mb-6 md:mb-10"
          :changes-pending="changesPending"
          :loading-state="status"
          :products="productsResponseData?.docs ?? []"
        />
        <BottomBar
          class="mt-auto mb-6 md:mb-10"
          @update:model-value="handlePageChange"
          :model-value="currentPage"
          :per-page-count="productsResponseData?.limit ?? 12"
          :total-docs="productsResponseData?.totalDocs ?? 0"
        />
      </div>
    </div>
  </main>
</template>
