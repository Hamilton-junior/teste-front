<template>
  <button
    class="btn"
    @click="nextPage"
    :style="{ background: backgroundColor, color: colorText }"
  >
    {{ name }}
  </button>
</template>

<script>
export default {
  name: "ButtonNextPage",
  props: ["name", "nextPage", "backgroundColor", "colorText"],
};
</script>

<style scoped>
.btn {
  width: 100%;
  border-radius: 8px;
  text-transform: uppercase;
  padding: 5px;
  font-size: 1rem;
  font-family: "Comfortaa", cursive;
  font-weight: 400;
  border: none;
}
</style>
