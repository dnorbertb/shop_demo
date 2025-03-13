<script setup lang="ts">
import { useGlobalConfigStore } from "~/core/stores/globalConfigStore";

const configStore = useGlobalConfigStore();
const { data: configData } = await useAsyncData(
  "config",
  async () => await configStore.getData()
);
const iconMap = {
  instagram: "line-md-instagram",
  facebook: "line-md-facebook",
  tiktok: "line-md-tiktok",
};
</script>
<template>
  <footer class="bg-white dark:bg-gray-900 border-t dark:border-gray-700">
    <div class="container px-3 mx-auto py-12 md:py-16">
      <div class="flex items-center justify-between mb-2">
        <NuxtLink :to="{ name: 'home' }">
          <!-- IN LIGHT MODE LOGO BELOW -->
          <ResponsiveImage
            class="h-auto w-52 sm:w-64 dark:hidden"
            v-bind="configData?.globalData.logoDark!"
            max-size="mobile"
            priority
          />
          <!-- IN DARK MODE LOGO BELOW -->
          <ResponsiveImage
            class="h-auto w-52 sm:w-64 hidden dark:block"
            v-bind="configData?.globalData.logoLight!"
            max-size="mobile"
            priority
          />
        </NuxtLink>
        <ul class="flex gap-3 md:gap-6">
          <li v-for="mediaLink in configData?.footer.socialMedia">
            <a
              :href="mediaLink.href"
              rel="noreferrer"
              target="_blank"
              class="block txt-secondary hover:text-primary-500 dark:hover:text-primary-400 transition"
            >
              <UIcon class="block size-7" :name="iconMap[mediaLink.icon]" />
            </a>
          </li>
        </ul>
      </div>
      <div
        v-if="configData?.footer.description"
        class="txt-quaternary text-sm sm:text-base max-w-lg"
      >
        {{ configData?.footer.description }}
      </div>
      <div
        class="grid gap-8 justify-between grid-cols-1 xs:grid-cols-2 sm:grid-cols-none sm:grid-flow-col sm:auto-cols-max border-t border-gray-100 dark:border-gray-800 pt-8 lg:pt-12 mt-8 lg:mt-12"
      >
        <div class="mb-2" v-for="column in configData?.footer.linkColumns">
          <p class="mb-5 font-medium txt-primary dark:txt-primary">
            {{ column.title }}
          </p>
          <ul class="flex flex-col gap-3 text-sm">
            <li v-for="link in column.links">
              <NuxtLink
                :to="link.href"
                :external="link.href.startsWith('http')"
                class="txt-secondary transition hover:opacity-75"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <p class="text-xs txt-tertiary mt-16">
        {{ configData?.footer.caption }}
      </p>
    </div>
  </footer>
</template>
