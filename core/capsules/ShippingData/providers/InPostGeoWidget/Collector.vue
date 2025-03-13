<script setup lang="ts">
import type { PickUpPointData } from "./types";

const selectedPoint = ref<PickUpPointData | null>(null);

const emit = defineEmits<{
  (e: "updatePoint", data: string | null): void;
}>();

const updatePointHandler = (data: PickUpPointData | null) => {
  selectedPoint.value = data;
  emit("updatePoint", data ? JSON.stringify(data) : null);
};
</script>

<template>
  <h3 class="text-xl font-semibold txt-secondary mb-2">
    {{ selectedPoint ? "Wybrany" : "Wybierz" }} punkt odbioru:
  </h3>
  <InPostWidget
    v-if="!selectedPoint"
    @point-selected="(data) => updatePointHandler(data)"
  />
  <div v-else>
    <p class="font-semibold txt-secondary">
      Paczkomat {{ selectedPoint.name }}
    </p>
    <p class="font-light text-sm txt-tertiary">
      {{ selectedPoint.address.line1 }}, {{ selectedPoint.address.line2 }}
    </p>
    <p class="font-light text-sm txt-tertiary">
      Dostępny {{ selectedPoint.openingHours }}
    </p>
    <UButton
      variant="link"
      class="px-0 pt-1"
      size="lg"
      @click="() => updatePointHandler(null)"
    >
      Wybierz inny punkt
    </UButton>
  </div>
</template>
