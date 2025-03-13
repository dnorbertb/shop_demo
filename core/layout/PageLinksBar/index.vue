<script setup lang="ts">
import type {
  RouteLocationAsRelativeGeneric,
  RouteRecordNameGeneric,
} from "vue-router";

const route = useRoute();

const items: Array<{ label: string; to: RouteLocationAsRelativeGeneric }> = [
  { label: "Sklep", to: { name: "shop-browser" } },
  { label: "Artykuły", to: { name: "articles-browser" } },
];

const isLinkActive = (routeName?: RouteRecordNameGeneric) =>
  route.matched.some((route) => route.name == routeName);
</script>
<template>
  <nav class="bg-primary-500 shadow-lg relative z-10">
    <ul
      class="container mx-auto px-3 flex text-white gap-5 overflow-x-auto overflow-y-hidden"
    >
      <li v-for="item in items">
        <NuxtLink
          :class="[
            'block px-4 py-3 hover:bg-primary-600',
            isLinkActive(item.to.name) ? 'underline cursor-pointer' : '',
          ]"
          :to="!isLinkActive(item.to.name) ? item.to : undefined"
        >
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
