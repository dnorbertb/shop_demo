<template>
  <div class="flex flex-col gap-2 items-center min-w-40 p-5">
    <UButton size="lg" class="w-full !text-white" :to="{ name: 'login' }">
      Logowanie
    </UButton>
    <UButton
      size="lg"
      class="w-full dark:!text-white"
      variant="outline"
      :to="{ name: 'sign-up' }"
    >
      Rejestracja
    </UButton>
  </div>
</template>
