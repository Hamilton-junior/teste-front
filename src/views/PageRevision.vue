<template>
  <div>
    <TitlePages title="Revisão do cadastro" />
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
    <ButtonNextPage name="CADASTRAR PROFISSIONAL" :nextPage="goNextPage" />
    <button>
      <router-link :to="{ name: 'home' }">Editar cadastro</router-link>
    </button>
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
  },
};
</script>

<style></style>
