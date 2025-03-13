<script setup lang="ts">
defineProps<{
  dateString: string;
}>();
</script>

<template>
  <div
    class="flex gap-3 items-center justify-center text-sm txt-quaternary font-bold"
  >
    <span>
      {{
        new Date(dateString).toLocaleString(undefined, {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        })
      }}
    </span>
    <div class="h-1 w-1 rounded-full bg-gray-400" />
    <span>
      {{
        new Date(dateString).toLocaleString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        })
      }}
    </span>
  </div>
</template>
