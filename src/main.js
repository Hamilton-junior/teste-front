import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import TitlePages from "./components/TitlePages.vue";
import ButtonNextPage from "./components/ButtonNextPage.vue";
import ErroMessage from "./components/ErroMessage.vue";
import ButtonBackPage from "./components/ButtonBackPage.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import VueTheMask from "vue-the-mask";

Vue.config.productionTip = false;

Vue.component("TitlePages", TitlePages);
Vue.component("ButtonNextPage", ButtonNextPage);
Vue.component("ErroMessage", ErroMessage);
Vue.component("ButtonBackPage", ButtonBackPage);
Vue.use(VueTheMask);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
