<template>
  <div>
    <ButtonBackPage />
    <section>
      <TitlePages title="Revisão do cadastro" />
      <div class="d-flex align-items-center gap-3">
        <div>
          <ul>
            <li>
              <span>Nome completo</span>
              <p>{{ user.name }}</p>
            </li>
            <li>
              <span>CPF</span>
              <p>{{ user.cpf }}</p>
            </li>
            <li>
              <span>Número de celular ou telefone</span>
              <p>{{ user.tel }}</p>
            </li>
            <li>
              <span>Estado/Cidade</span>
              <p>{{ user.state }} - {{ user.city }}</p>
            </li>
            <li>
              <span>Especialidade principal</span>
              <p>{{ user.specialty }}</p>
            </li>
            <li>
              <span>Preço da consulta</span>
              <p>{{ user.valueQuery }}</p>
            </li>
            <li>
              <span>Formas de pagamento da consulta</span>
              <p>{{ user.paymentMethods }}</p>
            </li>
          </ul>
          <ButtonNextPage
            name="CADASTRAR PROFISSIONAL"
            :nextPage="goNextPage"
            backgroundColor="#FBDE40"
            colorText="#483698"
          />
          <button class="btn" @click="goHome">Editar cadastro</button>
        </div>
        <div>
          <img class="img-fluid" src="../assets/desktop-pagina-3.png" alt="" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PageRevision",
  computed: mapState(["user"]),
  methods: {
    goNextPage() {
      this.$router.push({ name: "thank" });
    },
    goHome() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin-top: 20px;
  font-family: "Open Sans", sans-serif;
  padding-left: 0;
}
span,
p {
  font-size: 1rem;
  color: #282828;
}
span {
  font-weight: 600;
}
p {
  margin-top: 5px;
}
.btn {
  width: 100%;
  border-radius: 8px;
  margin-top: 20px;
  padding: 5px;
  font-size: 1rem;
  font-family: "Comfortaa", cursive;
  font-weight: 400;
  border: none;
  color: #483698;
}
</style>
