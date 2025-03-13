<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number;
    message: string;
  };
}>();

useSeoMeta({
  title: ":: Made4Ride.pl :: Coś się popsuło...",
});

const errorMessagesMap: Record<number, string> = {
  404: "Ta strona nie istnieje...",
};

const errorMessage = computed(() => errorMessagesMap[props.error.statusCode]);

const handleError = () => {
  console.log(props.error);
  clearError({ redirect: "/" });
};
</script>
<template>
  <div
    class="w-svw h-svh flex flex-col items-center justify-center bg-white dark:bg-gradient-to-b from-gray-900 to-gray-800"
  >
    <h1 class="mb-2 txt-primary text-9xl">{{ error.statusCode }}</h1>
    <p class="mb-12 txt-secondary text-lg">
      {{
        errorMessage
          ? errorMessage
          : "Wystąpił nieoczekiwany błąd, spróbuj ponownie później..."
      }}
    </p>
    <UButton variant="outline" @click="handleError">
      Wróć do strony głównej
    </UButton>
  </div>
</template>
