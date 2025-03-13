<script setup lang="ts">
import { useGlobalConfigStore } from "~/core/stores/globalConfigStore";
const configStore = useGlobalConfigStore();
const { data: configData } = await useAsyncData(
  "config",
  async () => await configStore.getData()
);
</script>
<template>
  <div class="z-50 dark:bg-gray-900">
    <div
      class="container mx-auto w-full px-3 py-6 gap-3 grid grid-cols-2 lg:grid-cols-3 items-center"
    >
      <div class="sm:flex gap-4 items-center">
        <NuxtLink :to="{ name: 'home' }">
          <ResponsiveImage
            class="h-auto w-52 sm:w-64 dark:hidden"
            v-bind="configData?.globalData.logoDark!"
            max-size="mobile"
            priority
          />
          <ResponsiveImage
            class="h-auto w-52 sm:w-64 hidden dark:block"
            v-bind="configData?.globalData.logoLight!"
            max-size="mobile"
            priority
          />
        </NuxtLink>
      </div>
      <ClientOnly>
        <PageTopBarSearchInput
          class="w-full row-start-2 col-span-2 lg:row-start-1 lg:col-start-2 lg:col-span-1"
        />
        <template #fallback>
          <USkeleton
            class="h-10 w-full row-start-2 col-span-2 lg:row-start-1 lg:col-start-2 lg:col-span-1"
          />
        </template>
      </ClientOnly>
      <div class="flex gap-2 md:gap-4 justify-self-end">
        <ClientOnly>
          <!-- <PageTopBarWishList /> -->
          <PageTopBarCartMenu />
          <PageTopBarAccountMenu />
          <template #fallback>
            <USkeleton class="h-12 w-20 sm:w-28" />
          </template>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
