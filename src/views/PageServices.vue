<template>
  <div>
    <ButtonBackPage />
    <section class="d-flex flex-column justify-content-center">
      <TitlePages title="Sobre o atendimento" />
      <div class="d-flex align-items-center gap-3">
        <div class="form-container">
          <h2 class="mb-4">Detalhes do atendimento</h2>
          <form class="d-flex flex-column">
            <label for="specialties">Especialidade principal*</label>
            <select
              type="select"
              name="specialties"
              id="specialties"
              v-model="specialty"
              :class="{ error: errorMessageEspecialty }"
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
            <ErroMessage
              v-if="errorMessageEspecialty"
              :message="errorMessageEspecialty"
            />
            <label for="valueQuery" class="mt-4"
              >Informe o preço da consulta*</label
            >
            <div class="input-group">
              <span class="input-group-text">R$</span>
              <input
                type="text"
                min="30"
                max="350"
                id="valueQuery"
                name="valueQuery"
                placeholder="valor"
                v-model="valueQuery"
                @keypress="checkChar"
                class="small form-control"
                :class="{ error: errorMessagevalueQuery }"
              />
            </div>
            <ErroMessage
              v-if="errorMessagevalueQuery"
              :message="errorMessagevalueQuery"
            />

            <label class="mt-4">Formas de pagamento da consulta*</label>
            <fieldset class="d-flex align-items-center fieldset">
              <input
                type="checkbox"
                name="pix"
                id="pix"
                value="pix"
                v-model="paymentMethods.pix"
                class="widthAuto"
              />
              <label for="pix">Pix</label>
            </fieldset>
            <fieldset class="d-flex align-items-center fieldset">
              <input
                type="checkbox"
                name="money"
                id="money"
                value="money"
                v-model="paymentMethods.money"
                class="widthAuto"
              />
              <label for="money">Em dinheiro</label>
            </fieldset>
            <fieldset
              class="d-flex justify-content-center fieldset flex-column"
            >
              <div class="d-flex align-items-center gap-30">
                <input
                  type="checkbox"
                  name="card"
                  id="card"
                  value="card"
                  v-model="paymentMethods.card.selected"
                  class="widthAuto"
                />
                <label for="card">Cartão de crédito</label>
              </div>

              <div
                v-if="paymentMethods.card.selected"
                class="d-flex flex-column justify-content-center options"
              >
                <label class="mb-2">Parcelamento em</label>
                <fieldset class="d-flex align-items-center">
                  <input
                    type="radio"
                    name="portion"
                    value="1"
                    id="portionOne"
                    v-model="paymentMethods.card.installments"
                    class="widthAuto"
                  />
                  <label for="portionOne">1x, sem juros</label>
                </fieldset>

                <fieldset class="d-flex align-items-center">
                  <input
                    type="radio"
                    name="portion"
                    value="2"
                    id="portionTwo"
                    v-model="paymentMethods.card.installments"
                    class="widthAuto"
                  />
                  <label for="portionTwo">2x, sem juros</label>
                </fieldset>
                <fieldset class="d-flex align-items-center">
                  <input
                    type="radio"
                    name="portion"
                    value="3"
                    id="portionThree"
                    v-model="paymentMethods.card.installments"
                    class="widthAuto"
                  />
                  <label for="portionThree">3x, sem juros</label>
                </fieldset>
              </div>
            </fieldset>
            <ErroMessage
              v-if="errorMessagePaymentMethods"
              :message="errorMessagePaymentMethods"
            />
          </form>
          <div
            class="d-flex align-items-center justify-content-between mb-4 mt-4"
          >
            <div class="d-flex detail">
              <div class="detail blue"></div>
              <div class="detail blue"></div>
            </div>
            <div>
              <p class="detailText">2 de 2</p>
            </div>
          </div>
          <ButtonNextPage
            name="Próximo"
            backgroundColor="#483698"
            colorText="#fff"
            :nextPage="goNextPage"
          />
        </div>
        <div>
          <img class="img-fluid" src="../assets/desktop-pagina-2.png" alt="" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ButtonNextPage from "@/components/ButtonNextPage.vue";
import { mapFields } from "@/helpers.js";
import ErroMessage from "@/components/ErroMessage.vue";
import ButtonBackPage from "@/components/ButtonBackPage.vue";
export default {
  name: "PageServices",
  components: { ButtonNextPage, ErroMessage, ButtonBackPage },
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
      errorMessagevalueQuery: "",
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
      if (!this.valueQuery) {
        this.error = true;
        this.errorMessagevalueQuery = "Campo valor não pode ser vazio!";
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

<style scoped>
h2 {
  font-family: "Comfortaa", cursive;
  font-weight: 700;
  font-size: 1.25rem;
  color: #282828;
  margin-bottom: 20px;
}
.input-group-text {
  background: #483698;
  color: #fff;
}
.widthAuto {
  width: auto;
}
.fieldset {
  background: #b9b9b9;
  margin-bottom: 10px;
  padding: 7px 7px 7px 25px;
  border-radius: 8px;
  gap: 30px;
}
.label {
  font-weight: 600;
}
.gap-30 {
  gap: 30px;
}
.options {
  margin-left: 40px;
}
@media screen and (max-width: 768px) {
  select {
    width: 100%;
  }
  section {
    margin-top: 0;
  }
}
</style>
