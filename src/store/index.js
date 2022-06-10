import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      name: "",
      cpf: "",
      numberTel: "",
      state: "",
      city: "",
      specialty: "",
      valueQuery: "",
      paymentMethods: {
        pix: "",
        money: "",
        card: {
          selected: "",
          installments: "",
        },
      },
    },
  },
  mutations: {
    ADD_DATA_USER(state, payload) {
      state.user = Object.assign(state.user, payload);
    },
  },
});
