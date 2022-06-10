<template>
  <button @click="backPage">{{ simbol }}</button>
</template>

<script>
export default {
  name: "ButtonBackPage",
  data() {
    return {
      simbol: "<",
    };
  },
  methods: {
    backPage() {
      window.history.back();
    },
  },
};
</script>

<style scoped>
button {
  border: none;
  background: transparent;
  font-size: 1rem;
  font-family: "Open Sans", sans-serif;
  color: #483698;
  font-weight: 700;
  margin: 30px 0;
}
@media screen and (max-width: 768px) {
  button {
    margin-left: 10px;
  }
}
</style>
