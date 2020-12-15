import Vue from "vue";
import VueRouter from "vue-router";
import dashboard from "@/views/dashboard.vue";
import testComp from "@/views/test-comp.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing-Page",
    component: () => import("../views/landing-page.vue"),
  },
  {
    path: "/home",
    name: "Home-Page",
    component: () => import("../views/home-page.vue"),
  },
  {
    path: "/test",
    component: testComp,
  },
  {
    path: "/board/:id",
    name: "Finito-app",
    component: () => import("../views/trellor-app.vue"),
  },
  {
    name: "auth",
    path: "/auth",
    component: () => import("../views/login-page.vue"),
  },
  {
    name: "about",
    path: "/about",
    component: () => import("../views/about-page.vue"),
  },
  {
    path: "/board/dash/charts",
    name: "dash",
    component: dashboard,
  },
  {
    path: "*",
    component: () => import("../views/404.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
