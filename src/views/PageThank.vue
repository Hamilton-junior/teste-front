<template>
  <div class="d-flex flex-column">
    <h1>Obrigado por fazer cadastro na nossa plataforma!</h1>
    <p>Clique no botão abaixo para saber mais sobre nosso trabalho.</p>
    <a class="align-self-center" href="https://facilconsulta.com.br/"
      >Acessar site</a
    >
  </div>
</template>

<script>
export default {
  name: "PageThank",
};
</script>

<style scoped>
div {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}
h1 {
  color: #483698;
  font-size: 2rem;
  font-weight: 700;
  font-family: "Comfortaa", cursive;
}
p {
  color: #282828;
  font-size: 1rem;
  font-family: "Open Sans", sans-serif;
}
a {
  width: 50%;
  border-radius: 8px;
  margin-top: 20px;
  padding: 5px;
  font-size: 1rem;
  font-family: "Comfortaa", cursive;
  font-weight: 400;
  border: none;
  color: #fff;
  background: #483698;
  text-decoration: none;
  text-align: center;
  transition: 0.3s all;
}
a:hover {
  color: #483698;
  background: #ffe766;
}
</style>
