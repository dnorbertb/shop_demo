<script setup lang="ts">
defineProps<{
  totalDocs: number;
  perPageCount: number;
}>();
const pageModel = defineModel<number>("page", { required: true });
const sortModel = defineModel<string>("sortSettings", { required: true });
const searchOptions = [
  { label: "Domyślne", value: "default" },
  { label: "Od najtańszych", value: "pricing.brutto" },
  { label: "Od najdroższych", value: "-pricing.brutto" },
];
</script>

<template>
  <UiCard class="flex justify-between items-center bg-white shadow-xs">
    <UFormGroup label="Sortowanie">
      <USelect :options="searchOptions" v-model="sortModel" />
    </UFormGroup>
    <UFormGroup label="Strona">
      <UPagination
        class="[&_*]:!text-white"
        v-model="pageModel"
        :total="totalDocs"
        :page-count="perPageCount"
        :max="8"
      />
    </UFormGroup>
  </UiCard>
</template>
