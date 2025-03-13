<script setup lang="ts">
import { useArticlesApi, type ArticleData } from "~/core/api/articles";
import type { PaginatedResponse } from "~/core/api/shared";
import MainArticleCard from "./components/MainArticleCard.vue";
import ArticleCard from "./components/ArticleCard.vue";
import BrowserHeader from "./components/BrowserHeader.vue";

const page = ref(1);
const articlesApi = useArticlesApi();

const {
  data: latestArticle,
  error: latestArticleError,
  status: latestArticleStatus,
} = useAsyncData("latestArticle", async () => {
  return (await articlesApi.getArticles({ limit: 1 })).docs[0];
});

const {
  data,
  error,
  refresh: refreshBrowser,
  status: browserLoadingStatus,
} = useAsyncData("articlesData", async () =>
  articlesApi.getArticles({ page: page.value, limit: page.value == 1 ? 7 : 6 })
);

const articles = computed(() => {
  return {
    ...data.value,
    docs: data.value?.docs.slice(page.value == 1 ? 1 : 0),
  } as PaginatedResponse<ArticleData>;
});

watch(page, () => {
  refreshBrowser();
});

watch([error, latestArticleError], () => {
  if (error.value || latestArticleError.value) {
    showError({ message: "Something went wrong", statusCode: 500 });
  }
});

useSeoMeta({
  title: ":: Made4Ride :: Sprawdź artykuły z motocyklowego świata", // TODO: Move this to global data
});
</script>
<template>
  <div class="container xl:max-w-screen-xl mx-auto px-3 pt-10 pb-16 lg:pb-20">
    <BrowserHeader class="mb-14" />
    <div class="mb-20 pb-12 xl:pb-16 border-b dark:border-gray-700">
      <h2 class="txt-secondary text-2xl xl:text-3xl font-bold mb-6">
        Najnowszy artykuł:
      </h2>
      <MainArticleCard
        v-if="latestArticleStatus == 'success' && latestArticle != null"
        :article="latestArticle"
      />
    </div>
    <div class="flex justify-between items-start">
      <h2 class="txt-secondary text-xl xl:text-2xl font-bold mb-5">
        Wszyskie artykuły:
      </h2>
      <UPagination
        class="[&_*]:!text-white"
        v-model="page"
        :total="articles.totalDocs"
        :page-count="9"
      />
    </div>
    <div
      class="relative grid md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12 min-h-80 mb-12"
    >
      <UiLoader
        v-if="browserLoadingStatus == 'pending'"
        class="absolute top-0 left-0 h-full"
      />
      <p
        v-else-if="browserLoadingStatus === 'success' && !articles.docs.length"
        class="txt-tertiary"
      >
        Nic tu nie ma...
      </p>
      <ArticleCard
        v-else-if="browserLoadingStatus == 'success'"
        v-for="article in articles.docs"
        v-bind:article="article"
      />
    </div>
    <div class="flex justify-between items-start">
      <UButton
        v-if="articles.totalPages > 1 && articles.hasNextPage"
        @click="page = page + 1"
        variant="link"
        color="gray"
        size="xl"
        :padded="false"
      >
        Mało? Zajrzyj na następną stronę &raquo;
      </UButton>
      <UPagination
        class="ml-auto [&_*]:!text-white"
        v-model="page"
        :total="articles.totalDocs"
        :page-count="9"
      />
    </div>
  </div>
</template>
