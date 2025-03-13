<script setup lang="ts">
import { ShopModuleRouteMap } from "~/core/features/shop";
import { useGlobalConfigStore } from "~/core/stores/globalConfigStore";
import { ArticlesModuleRouteMap } from "../..";

const globalConfigStore = useGlobalConfigStore();
const { data, status } = useAsyncData(() => globalConfigStore.getData());
</script>

<template>
  <div
    v-if="status == 'success'"
    class="bg-primary-50 dark:bg-primary-950 p-10 rounded-2xl text-center flex flex-col items-center"
  >
    <ResponsiveImage
      class="h-auto w-52 sm:w-64 lg:w-80 dark:hidden"
      v-bind="data!.globalData.logoDark!"
      max-size="mobile"
      priority
    />
    <ResponsiveImage
      class="h-auto w-52 sm:w-64 lg:w-80 hidden dark:block"
      v-bind="data!.globalData.logoLight!"
      max-size="mobile"
      priority
    />
    <p
      class="text-lg font-semibold text-primary-900 dark:text-primary-200 mb-6 mt-3"
    >
      Interesujące? Odkryj więcej inspirujących treści!
    </p>
    <div class="flex flex-col md:flex-row gap-4">
      <UButton
        class="justify-center"
        :to="{ name: ArticlesModuleRouteMap.browser }"
        size="lg"
        variant="outline"
      >
        Sprawdź inne artykuły
      </UButton>
      <UButton
        class="justify-center"
        :to="{ name: ShopModuleRouteMap.shopBrowser }"
        size="lg"
      >
        Przejdź do sklepu
      </UButton>
    </div>
  </div>
</template>
