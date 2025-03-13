<script setup lang="ts">
import QueryString from "qs";
import { object, string } from "yup";
import { ShopModuleRouteMap } from "~/core/features/shop";
import { noCategoryOption } from "~/core/features/shop/browser/config/noCategoryOption";

const error = ref("");
const state = reactive({
  search: "",
});

watch(
  () => state.search,
  () => {
    error.value = "";
  }
);

const schema = object({
  search: string().required("Pole wyszukiwania nie może być puste"),
});

const handleSearch = () => {
  navigateTo({
    name: ShopModuleRouteMap.shopBrowser,
    params: {
      category: noCategoryOption.slug,
    },
    query: {
      external: QueryString.stringify(state),
    },
  });
};
</script>
<!--  -->
<template>
  <UForm
    class="relative"
    :state="state"
    :schema="schema"
    @submit="handleSearch"
    @error="(e) => (error = e.errors[0].message)"
  >
    <UInput
      size="lg"
      placeholder="Szukaj..."
      v-model="state.search"
      :ui="{ icon: { trailing: { pointer: '' } } }"
      trailing
    >
      <template #trailing>
        <UButton
          color="gray"
          variant="ghost"
          icon="i-solar-minimalistic-magnifer-line-duotone"
          :padded="false"
          type="submit"
        />
      </template>
    </UInput>
    <div v-if="error" class="absolute w-full -bottom-5">
      <p class="text-red-500 dark:text-red-400 text-xs text-center">
        {{ error }}
      </p>
    </div>
  </UForm>
</template>
