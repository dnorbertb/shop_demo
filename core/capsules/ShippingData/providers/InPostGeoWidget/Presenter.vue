<script setup lang="ts">
import type { PickUpPointData } from "./types";

const props = defineProps<{
  data: string; // json
}>();

const pointData: PickUpPointData = JSON.parse(props.data);
</script>
<template>
  <p>Do punktu odbioru {{ pointData.name }},</p>
  <p>Adres: {{ pointData.address.line1 }}, {{ pointData.address.line2 }}</p>
</template>
