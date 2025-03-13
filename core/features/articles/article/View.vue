<script setup lang="ts">
import { useArticlesApi } from "~/core/api/articles";
import PublicationDateInfo from "./components/PublicationDateInfo.vue";
import TagsBar from "./components/TagsBar.vue";
import AuthorInfo from "./components/AuthorInfo.vue";
import ArticleCTA from "./components/ArticleCTA.vue";

const route = useRoute();
const articlesApi = useArticlesApi();
const pageSlug = Array.isArray(route.params.slug)
  ? (route.params.slug[0] as string)
  : route.params.slug;

const { data, error, status } = useAsyncData(
  async () => await articlesApi.getOneByUrl({ url: pageSlug })
);

watch(error, () => {
  if (!error.value) return;
  showError({ statusCode: 404, message: "Not found" });
});

useSeoMeta({
  title() {
    return data.value?.meta.title ?? "";
  },
});
</script>
<template>
  <div
    v-if="status == 'success'"
    class="container lg:max-w-6xl mx-auto px-3 pt-16"
  >
    <PublicationDateInfo :date-string="data!.createdAt" />

    <h1
      class="text-center text-4xl md:text-5xl lg:text-7xl max-w-4xl mx-auto txt-primary mt-3 mb-8"
    >
      {{ data?.title }}
    </h1>

    <TagsBar class="mb-12" :tags="data!.meta.tags" />

    <ResponsiveImage
      class="rounded-2xl overflow-hidden object-cover mb-4 max-h-[600px]"
      v-bind="data!.image"
    />
    <span v-if="data?.imageCaption" class="block mb-4 txt-tertiary">
      &#9432; {{ data!.imageCaption }}
    </span>

    <UDivider class="mb-10" />

    <!-- CONTENT -->
    <p class="font-bold text-lg mb-10 max-w-4xl mx-auto">{{ data?.intro }}</p>
    <div class="prose dark:prose-invert prose-lg max-w-4xl mx-auto mb-16">
      <RichText :content="data!.content" />
    </div>

    <ArticleCTA class="mb-16" />

    <AuthorInfo class="mb-16" v-bind="data!.meta.author" />
  </div>
</template>
