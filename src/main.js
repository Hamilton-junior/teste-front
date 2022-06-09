import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import TitlePages from "./components/TitlePages.vue";
import ButtonNextPage from "./components/ButtonNextPage.vue";

Vue.config.productionTip = false;

Vue.component("TitlePages", TitlePages);
Vue.component("ButtonNextPage", ButtonNextPage);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
