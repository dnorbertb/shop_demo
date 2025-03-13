<script setup lang="ts">
import { useDynamicPagesApi } from "~/core/api/dynamicPages";

const dynamicPagesApi = useDynamicPagesApi();
const route = useRoute();

const pageSlug = Array.isArray(route.params.slug)
  ? (route.params.slug[0] as string)
  : route.params.slug;

const { data, error } = await useAsyncData("dynamicPage", async () => {
  const response = await dynamicPagesApi.getPageByUrl(pageSlug);
  return response;
});

useSeoMeta({
  title: () => data.value?.meta.title ?? "",
  description: data.value?.meta.description,
  ogTitle: data.value?.meta.title,
  ogDescription: data.value?.meta.description,
  twitterTitle: data.value?.meta.title,
  twitterDescription: data.value?.meta.description,
});

watchEffect(() => {
  if (error.value) {
    showError({
      statusCode: 404,
      message: "Nie znaleziono strony",
    });
  }
});
</script>
<template>
  <main class="container mx-auto px-3 py-10">
    <div class="prose prose-p:my-3 leading-6 max-w-full mx-auto">
      <RichText :content="data?.content ?? []" />
    </div>
  </main>
</template>
