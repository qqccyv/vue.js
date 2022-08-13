<script setup lang="ts">
import { usePoint, IPoint } from "./hooks/usePoint.ts";
const point: IPoint = usePoint();
</script>

<template>
  <h2>{{point.x}}<br />{{point.y}}</h2>
</template>

<style scoped>
</style>
