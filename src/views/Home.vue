<template>
  <div>
    <TitlePages title="Sobre o Profissional" />
    <label for="">Dados do profissional</label>
    <form>
      <label for="name">Nome completo*</label>
      <input type="text" name="name" id="name" v-model.lazy.trim="name" />
      <span v-if="errorNameMessage">{{ errorNameMessage }}</span>

      <label for="cpf">CPF*</label>
      <input type="text" name="cpf" id="cpf" v-model.lazy.trim="cpf" />
      <span v-if="errorCpfMessage">{{ errorCpfMessage }}</span>

      <label for="tel">Número de celular*</label>
      <input type="tel" name="tel" id="tel" v-model.lazy.trim="numberTel" />
      <span v-if="errorNumberTelMessage">{{ errorNumberTelMessage }}</span>
      <div>
        <label for="state">Estado*</label>
        <select name="state" id="state" v-model.lazy.trim="state">
          <option v-for="state in allStates" :value="state" :key="state.id">
            {{ state.nome }}
          </option>
        </select>
        <span v-if="errorStateMessage">{{ errorStateMessage }}</span>
        <label for="city">Cidade*</label>
        <select name="city" id="city" v-model.lazy.trim="city">
          <option v-for="city in allCity" :value="city" :key="city.id">
            {{ city.nome }}
          </option>
        </select>
        <span v-if="errorCityMessage">{{ errorCityMessage }}</span>
      </div>
    </form>

    <ButtonNextPage name="Próximo" :nextPage="goNextPage" />
  </div>
</template>

<script>
import ButtonNextPage from "@/components/ButtonNextPage.vue";
import { mapFields } from "@/helpers.js";

export default {
  name: "HomePage",
  components: { ButtonNextPage },
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
        error = "Campo estado não pode ser vazio!";
        return error;
      }
    },
    validateCity(city) {
      let error;
      if (!city) {
        error = "Campo cidade não pode ser vazio!";
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

<style></style>
