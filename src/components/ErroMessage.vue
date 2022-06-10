<template>
  <span class="error">{{ message ? message : "" }}</span>
</template>

<script>
export default {
  name: "ErroMessage",
  props: ["message"],
};
</script>

<style scoped>
.error {
  font-family: "Open Sans", sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  color: #dc3545;
}
</style>
