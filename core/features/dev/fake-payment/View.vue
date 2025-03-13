<script setup lang="ts">
import { ShopModuleRouteMap } from "../../shop";
</script>
<template>
  <div class="grid place-content-center gap-2 h-full w-full p-4">
    <p>This should be payment provider page</p>
    <p>Redirect to:</p>
    <NuxtLink
      class="text-primary underline"
      :to="{ name: ShopModuleRouteMap.thankYou }"
    >
      Payment success page
    </NuxtLink>
    <NuxtLink
      class="text-primary underline"
      :to="{ name: ShopModuleRouteMap.somethingWentWrong }"
    >
      Payment failed page
    </NuxtLink>
  </div>
</template>
