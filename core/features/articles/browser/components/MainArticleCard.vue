<script setup lang="ts">
import type { ArticleData } from "~/core/api/articles";
import { ArticlesModuleRouteMap } from "../..";

const props = defineProps<{
  article: ArticleData;
}>();

const articleRoute = {
  name: ArticlesModuleRouteMap.article,
  params: { slug: props.article.meta.url },
};
</script>

<template>
  <div class="flex flex-col md:grid md:grid-cols-2 gap-5 md:gap-8 xl:gap-12">
    <NuxtLink :to="articleRoute">
      <ResponsiveImage
        class="rounded-lg overflow-hidden"
        v-bind="article.image"
      />
    </NuxtLink>
    <div class="flex flex-col py-2">
      <span
        class="flex gap-2 items-center text-xs xl:text-sm txt-tertiary mb-4 xl:mb-6"
      >
        <ResponsiveImage
          class="size-6 xl:size-8 rounded-full overflow-hidden object-center object-cover shrink-0"
          v-if="article.meta.author.photo"
          v-bind="article.meta.author.photo"
        />
        {{ article.meta.author.name }}
        <div class="h-1 w-1 rounded-full bg-gray-600" />
        {{ new Date(article.createdAt ?? 0).toLocaleString() }}
      </span>
      <NuxtLink :to="articleRoute">
        <h3 class="txt-primary text-3xl xl:text-4xl mb-3 xl:mb-7">
          {{ article.title }}
        </h3>
        <p class="txt-secondary text-sm xl:text-base line-clamp-4 mb-3 xl:mb-7">
          {{ article.intro }}
        </p>
      </NuxtLink>
      <div class="flex items-center gap-2 mb-1">
        <UBadge size="xs" variant="subtle" v-for="tag in article.meta.tags">
          {{ tag }}
        </UBadge>
        <span class="ml-1 text-xs txt-tertiary">
          {{ article.meta.readingTime }} minut czytania
        </span>
      </div>
      <div class="mt-auto flex justify-end">
        <UButton :to="articleRoute" variant="link" :padded="false">
          Czytaj więcej &raquo;
        </UButton>
      </div>
    </div>
  </div>
</template>
