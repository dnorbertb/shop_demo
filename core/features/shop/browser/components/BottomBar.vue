<script setup lang="ts">
defineProps<{
  totalDocs: number;
  perPageCount: number;
}>();
const page = defineModel<number>({ required: true });
</script>

<template>
  <div class="flex justify-end items-center">
    <UFormGroup label="Strona">
      <UPagination
        class="[&_*]:!text-white"
        v-model="page"
        :total="totalDocs"
        :page-count="perPageCount"
        :max="8"
      />
    </UFormGroup>
  </div>
</template>
