<script setup lang="ts">
import RegisterForm from "./components/RegisterForm.vue";
import RegisterInfo from "./components/RegisterInfo.vue";
</script>

<template>
  <div class="container mx-auto px-3">
    <div
      class="flex-1 p-5 grid grid-flow-row my-5 max-w-5xl mx-auto md:grid-flow-col md:grid-cols-5 md:my-32"
    >
      <RegisterInfo
        class="bg-primary-500 rounded-t-lg md:rounded-l-lg md:rounded-r-none md:col-span-2 shadow-md"
      />
      <RegisterForm
        class="rounded-b-lg md:rounded-r-lg md:rounded-b-none md:col-span-3 border dark:border-gray-700 shadow-md"
      />
    </div>
  </div>
</template>
