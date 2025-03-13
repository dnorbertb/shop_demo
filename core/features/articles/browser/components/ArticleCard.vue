<script setup lang="ts">
import type { ArticleData } from "~/core/api/articles";
import { ArticlesModuleRouteMap } from "../..";

const props = defineProps<{
  article: ArticleData;
}>();

const articleRoute = {
  name: ArticlesModuleRouteMap.article,
  params: { slug: props.article?.meta.url },
};
</script>

<template>
  <UiCard class="flex flex-col gap-4">
    <ResponsiveImage
      v-if="article?.image"
      class="w-full h-48 rounded-lg overflow-hidden object-cover"
      v-bind="article.image"
    />
    <div class="flex flex-1 flex-col py-2">
      <span class="flex gap-2 items-center text-xs txt-tertiary mb-4">
        <ResponsiveImage
          class="h-6 w-6 rounded-full overflow-hidden object-center"
          v-if="article.meta.author.photo"
          v-bind="article.meta.author.photo"
        />
        {{ article.meta.author.name }}
        <div class="h-1 w-1 rounded-full bg-gray-600" />
        {{ new Date(article.createdAt ?? 0).toLocaleString() }}
      </span>
      <NuxtLink :to="articleRoute">
        <h3 class="text-2xl mb-3 line-clamp-2">{{ article.title }}</h3>
        <p class="txt-tertiary text-sm line-clamp-3 mb-3">
          {{ article.intro }}
        </p>
      </NuxtLink>
      <div class="flex items-center gap-2 mb-4 mt-auto">
        <UBadge size="xs" variant="subtle" v-for="tag in article.meta.tags">
          {{ tag }}
        </UBadge>
        <span class="ml-1 text-xs txt-tertiary">
          {{ article.meta.readingTime }} minut czytania
        </span>
      </div>
      <div class="flex justify-end">
        <UButton :to="articleRoute" variant="link" :padded="false">
          Czytaj więcej &raquo;
        </UButton>
      </div>
    </div>
  </UiCard>
</template>
