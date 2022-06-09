import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/Home.vue";
import PageServices from "../views/PageServices.vue";
import PageRevision from "../views/PageRevision.vue";
import PageThank from "../views/PageThank.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/atendimento",
    name: "services",
    component: PageServices,
  },
  {
    path: "/revisao",
    name: "revision",
    component: PageRevision,
  },
  {
    path: "/agradecimento",
    name: "thank",
    component: PageThank,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
