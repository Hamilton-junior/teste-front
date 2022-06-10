<template>
  <section class="d-flex flex-column justify-content-center">
    <TitlePages title="Sobre o profissional" />
    <div class="d-flex align-items-center gap-3">
      <div class="form-container">
        <h2 class="mb-4">Dados do profissional</h2>
        <form class="d-flex flex-column">
          <label for="name">Nome completo*</label>
          <input
            type="text"
            name="name"
            id="name"
            v-model.lazy.trim="name"
            placeholder="Digite o nome completo"
            :class="{ error: errorNameMessage }"
          />
          <ErroMessage v-if="errorNameMessage" :message="errorNameMessage" />

          <label for="cpf" class="mt-4">CPF*</label>
          <the-mask
            :mask="['###.###.###-##']"
            type="text"
            name="cpf"
            id="cpf"
            placeholder="Digite um CPF"
            v-model.lazy.trim="cpf"
            class="small"
            :class="{ error: errorCpfMessage }"
          >
          </the-mask>
          <ErroMessage v-if="errorCpfMessage" :message="errorCpfMessage" />

          <label for="tel" class="mt-4">Número de celular*</label>
          <the-mask
            type="tel"
            name="tel"
            id="tel"
            placeholder="(00) 0 0000-0000"
            v-model.lazy.trim="numberTel"
            class="small"
            :class="{ error: errorNumberTelMessage }"
            :mask="['(##) ####-####', '(##) #####-####']"
          >
          </the-mask>
          <ErroMessage
            v-if="errorNumberTelMessage"
            :message="errorNumberTelMessage"
          />

          <div class="d-flex mb-4 mt-4 align-items-center gap-1">
            <fieldset class="d-flex flex-column">
              <label for="state">Estado*</label>
              <select
                name="state"
                id="state"
                placeholder="Selecione"
                v-model.lazy.trim="state"
                :class="{ error: errorStateMessage }"
              >
                <option
                  v-for="state in allStates"
                  :value="state"
                  :key="state.id"
                >
                  {{ state.nome }}
                </option>
              </select>
              <ErroMessage
                v-if="errorStateMessage"
                :message="errorStateMessage"
              />
            </fieldset>
            <fieldset class="d-flex flex-column">
              <label for="city">Cidade*</label>
              <select
                name="city"
                id="city"
                v-model.lazy.trim="city"
                :class="{ error: errorCityMessage }"
              >
                <option v-for="city in allCity" :value="city" :key="city.id">
                  {{ city.nome }}
                </option>
              </select>
              <ErroMessage
                v-if="errorCityMessage"
                :message="errorCityMessage"
              />
            </fieldset>
          </div>
        </form>
        <div class="d-flex align-items-center justify-content-between mb-4">
          <div class="d-flex detail">
            <div class="detail blue"></div>
            <div class="detail grey"></div>
          </div>
          <div>
            <p class="detailText">1 de 2</p>
          </div>
        </div>
        <ButtonNextPage
          name="Próximo"
          :nextPage="goNextPage"
          backgroundColor="#483698"
          colorText="#fff"
        />
      </div>
      <div>
        <img class="img-fluid" src="../assets/desktop-pagina-1.png" alt="" />
      </div>
    </div>
  </section>
</template>

<script>
import ButtonNextPage from "@/components/ButtonNextPage.vue";
import { mapFields } from "@/helpers.js";
import ErroMessage from "@/components/ErroMessage.vue";

export default {
  name: "HomePage",
  components: { ButtonNextPage, ErroMessage },
  computed: {
    ...mapFields({
      fields: ["name", "cpf", "numberTel", "state", "city"],
      base: "user",
      mutation: "ADD_DATA_USER",
    }),
  },
  data() {
    return {
      allStates: null,
      allCity: null,
      error: false,
      errorNameMessage: "",
      errorCpfMessage: "",
      errorNumberTelMessage: "",
      errorStateMessage: "",
      errorCityMessage: "",
      checkCpf: [],
    };
  },
  methods: {
    async getAllStates() {
      const response = await fetch(
        "https://api-teste-front-end-fc.herokuapp.com/estados"
      );
      const json = await response.json();
      this.allStates = json;
    },
    async getAllCity(id) {
      const response = await fetch(
        `https://api-teste-front-end-fc.herokuapp.com/cidades?estadoId=${id}`
      );
      const json = await response.json();
      this.allCity = json;
    },
    validateName(name) {
      let error = "";
      if (!name) {
        error = "Campo de nome não pode ser vazio!";
      } else if (name && (name.length < 3 || name.length > 48)) {
        error = "Nome deve conter no mínimo 3 e no máximo 48 caracteres!";
      }

      return error;
    },
    validateCpf(cpf) {
      let error = "";

      if (!cpf) {
        error = "Campo CPF não pode ser vazio!";
        return error;
      }
      const cpfClean = cpf.toString().replace(/\D/g, "");
      if (cpf && cpfClean.length !== 11) {
        error = "CPF inválido!";
        return error;
      }
    },
    validateNumberTel(numberTel) {
      let error = "";
      if (!numberTel) {
        error = "Campo telefone não pode ser vazio!";
        return error;
      }
      const numberTelClean = numberTel.toString().replace(/\D/g, "");
      if (numberTel && numberTelClean.length !== 11) {
        error = "Número inválido!";
        return error;
      }
    },
    validateState(state) {
      let error;
      if (!state) {
        error = "Campo vazio!";
        return error;
      }
    },
    validateCity(city) {
      let error;
      if (!city) {
        error = "Campo vazio!";
        return error;
      }
    },
    checkDataForm() {
      this.error = false;
      this.errorNameMessage = "";
      this.errorCpfMessage = "";
      this.errorNumberTelMessage = "";
      this.errorStateMessage = "";
      this.errorCityMessage = "";

      const nameValidated = this.validateName(this.name);
      const cpfValidated = this.validateCpf(this.cpf);
      const numberTelValidated = this.validateNumberTel(this.numberTel);
      const stateValited = this.validateState(this.state);
      const cityValited = this.validateCity(this.city);
      if (nameValidated) {
        this.error = true;
        this.errorNameMessage = nameValidated;
      }

      if (cpfValidated) {
        this.error = true;
        this.errorCpfMessage = cpfValidated;
      }

      if (numberTelValidated) {
        this.error = true;
        this.errorNumberTelMessage = numberTelValidated;
      }
      if (stateValited) {
        this.error = true;
        this.errorStateMessage = stateValited;
      }
      if (cityValited) {
        this.error = true;
        this.errorCityMessage = cityValited;
      }
    },
    goNextPage() {
      this.checkDataForm();
      if (!this.error) {
        this.$store.commit("ADD_DATA_USER", {
          name: this.name,
          cpf: this.cpf,
          tel: this.numberTel,
          state: this.state.nome,
          city: this.city.nome,
        });
        this.$router.push({ name: "services" });
      }
    },
  },
  watch: {
    state() {
      this.getAllCity(this.state.id);
    },
    cpf(value) {
      this.error = false;
      this.errorCpfMessage = "";
      let error = this.validateCpf(value);
      if (!error) {
        const cpfClean = this.cpf.toString().replace(/\D/g, "");
        fetch(
          `https://api-teste-front-end-fc.herokuapp.com/profissionais?cpf=${cpfClean}`
        )
          .then((response) => response.json())
          .then((json) => {
            this.checkCpf = json;
          })
          .finally(() => {
            if (this.checkCpf.length != 0) {
              this.error = true;
              this.errorCpfMessage = "CPF já cadastrado!";
            }
          });
      } else {
        this.error = true;
        this.errorCpfMessage = error;
      }
    },
  },
  created() {
    this.getAllStates();
  },
};
</script>

<style scoped>
section {
  max-width: 900px;
}
h2 {
  font-family: "Comfortaa", cursive;
  font-weight: 700;
  font-size: 1.25rem;
  color: #282828;
  margin-bottom: 20px;
}
</style>
