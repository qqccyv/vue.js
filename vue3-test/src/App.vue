<script setup lang="ts">
import { onMounted } from "vue";
import { usePoint, IPoint } from "./hooks/usePoint";
const point: IPoint = usePoint();
onMounted(() => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  const obj = {
    count: 1,
  } as const; // 将类型固定后属性值才能被用于文字类型的变量，因为obj.count 可以是任何值
  function test(params: 1) {
    console.log(params);
  }
  test(obj.count);
});
</script>

<template>
  <h2>{{ point.x }}<br />{{ point.y }}</h2>
  <canvas id="canvas"></canvas>
</template>

<style scoped></style>
