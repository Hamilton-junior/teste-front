<template>
  <h1 class="mb-5">{{ title }}</h1>
</template>

<script>
export default {
  name: "TitlePages",
  props: ["title"],
};
</script>

<style scoped>
h1 {
  font-size: 2.6rem;
  color: #483698;
  font-family: "Comfortaa", cursive;
  font-weight: bold;
}
@media screen and (max-width: 500px) {
  h1 {
    font-size: 1.6rem;
    margin-bottom: 20px;
  }
}
</style>
