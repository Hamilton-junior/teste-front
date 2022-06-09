<template>
  <div>
    <TitlePages title="Sobre o atendimento" />
    <label for="">Detalhes do atendimento</label>
    <form>
      <label for="specialties">Especialidade principal*</label>
      <select
        type="select"
        name="specialties"
        id="specialties"
        v-model="specialty"
      >
        <option value="" disabled>Selecione a especialidade</option>
        <option
          v-for="specialty in allSpecialties"
          :value="specialty.nome"
          :key="specialty.id"
        >
          {{ specialty.nome }}
        </option>
      </select>
      <p v-if="errorMessageEspecialty">{{ errorMessageEspecialty }}</p>
      <label for="valorQuery">Informe o preço da consulta*</label>
      <input
        type="text"
        min="30"
        max="350"
        id="valorQuery"
        name="valorQuery"
        placeholder="valor"
        v-model="valorQuery"
        @keypress="checkChar"
      />
      <p v-if="errorMessagevalorQuery">{{ errorMessagevalorQuery }}</p>
      <label for="">Formas de pagamento da consulta*</label>
      <input
        type="checkbox"
        name="pix"
        id="pix"
        value="pix"
        v-model="paymentMethods.pix"
      />
      <label for="pix">Pix</label>
      <input
        type="checkbox"
        name="money"
        id="money"
        value="money"
        v-model="paymentMethods.money"
      />
      <label for="money">Em dinheiro</label>
      <input
        type="checkbox"
        name="card"
        id="card"
        value="card"
        v-model="paymentMethods.card.selected"
      />
      <label for="card">Cartão de crédito</label>

      <div v-if="paymentMethods.card.selected">
        <label for="">Parcelamento em</label>
        <input
          type="radio"
          name="portion"
          value="1"
          id="portionOne"
          v-model="paymentMethods.card.installments"
        />
        <label for="portionOne">1x, sem juros</label>
        <input
          type="radio"
          name="portion"
          value="2"
          id="portionTwo"
          v-model="paymentMethods.card.installments"
        />
        <label for="portionTwo">2x, sem juros</label>
        <input
          type="radio"
          name="portion"
          value="3"
          id="portionThree"
          v-model="paymentMethods.card.installments"
        />
        <label for="portionThree">3x, sem juros</label>
      </div>
      <p v-if="errorMessagePaymentMethods">{{ errorMessagePaymentMethods }}</p>
    </form>
    <ButtonNextPage name="Próximo" :nextPage="goNextPage" />
  </div>
</template>

<script>
import ButtonNextPage from "@/components/ButtonNextPage.vue";
import { mapFields } from "@/helpers.js";
export default {
  name: "PageServices",
  components: { ButtonNextPage },
  data() {
    return {
      allSpecialties: null,

      error: false,

      paymentMethods: {
        pix: false,
        money: false,
        card: {
          selected: false,
          installments: null,
        },
      },
      errorMessageEspecialty: "",
      errorMessagevalorQuery: "",
      errorMessagePaymentMethods: "",
    };
  },
  computed: {
    ...mapFields({
      fields: ["specialty", "valueQuery", "paymentMethods"],
      base: "user",
      mutation: "ADD_DATA_USER",
    }),
  },
  methods: {
    async getAllSpecialties() {
      const response = await fetch(
        "https://api-teste-front-end-fc.herokuapp.com/especialidades"
      );
      const json = await response.json();
      this.allSpecialties = json;
    },
    checkChar(event) {
      const char = event.keyCode;
      const keyCodeValid = [44, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
      if (!keyCodeValid.includes(char)) {
        event.preventDefault();
      }
    },
    checkDataForm() {
      this.error = false;
      this.errorMessageEspecialty = "";
      this.errorMessagevalorQuery = "";
      this.errorMessagePaymentMethods = "";
      if (!this.specialty) {
        this.error = true;
        this.errorMessageEspecialty = "Campo especialidade não pode ser vazio!";
      }
      if (!this.valorQuery) {
        this.error = true;
        this.errorMessagevalorQuery = "Campo valor não pode ser vazio!";
      }
      if (
        !this.paymentMethods.pix &&
        !this.paymentMethods.money &&
        !this.paymentMethods.card.selected
      ) {
        this.error = true;
        this.errorMessagePaymentMethods =
          "Selecione pelo menos um método de pagamento!";
      }
      if (
        this.paymentMethods.card.selected &&
        !this.paymentMethods.card.installments
      ) {
        this.error = true;
        this.errorMessagePaymentMethods =
          "Selecione uma opção de parcelamento!";
      }
    },
    selectedPaymentMethods() {
      let paymentMethods = [];

      if (this.paymentMethods.pix) {
        paymentMethods.push("Pix");
      }
      if (this.paymentMethods.money) {
        paymentMethods.push("À vista");
      }
      if (this.paymentMethods.card.selected) {
        paymentMethods.push(
          `Cartão de crédito - Parcelamento em ${this.paymentMethods.card.installments}x sem juros `
        );
      }
      return paymentMethods.join(" | ");
    },
    goNextPage() {
      this.checkDataForm();
      if (!this.error) {
        this.$store.commit("ADD_DATA_USER", {
          specialty: this.specialty,
          valueQuery: this.valueQuery,
          paymentMethods: this.selectedPaymentMethods(),
        });
        this.$router.push({ name: "revision" });
      }
    },
  },
  created() {
    this.getAllSpecialties();
  },
};
</script>

<style></style>
