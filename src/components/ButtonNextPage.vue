<template>
  <button @click="nextPage">{{ name }}</button>
</template>

<script>
export default {
  name: "ButtonNextPage",
  props: ["name", "nextPage"],
};
</script>

<style></style>
