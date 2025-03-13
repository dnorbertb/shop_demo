<script setup lang="ts">
import type { RouteLocationAsRelative } from "vue-router";
import type { CategoryData } from "~/core/api/globalConfig/category";
import { noCategoryOption } from "../config/noCategoryOption";

type Breadcrumbs = Array<{
  label: string;
  icon?: string;
  slug?: string;
  to?: RouteLocationAsRelative;
}>;

const props = defineProps<{
  category?: CategoryData | null;
}>();
const emit = defineEmits<{
  (e: "updateCategory", category: string): void;
}>();

const breadcrumbs = computed<Breadcrumbs>(() => {
  const base: Breadcrumbs = [
    { label: "", icon: "i-heroicons-home", to: { name: "home" } },
    {
      label: "Sklep",
      slug: noCategoryOption.slug,
    },
  ];
  if (props.category) {
    const { name, slug } = props.category;
    base.push({
      label: name,
      slug: slug,
    });
  }
  return base;
});
</script>
<template>
  <UBreadcrumb divider=">" :links="breadcrumbs">
    <template #default="{ link, isActive }">
      <div v-if="link.label">
        <UButton
          variant="link"
          :color="isActive ? 'primary' : 'gray'"
          :padded="false"
          type="button"
          @click="() => emit('updateCategory', link.slug)"
        >
          {{ link.label }}
        </UButton>
      </div>
    </template>
  </UBreadcrumb>
</template>
