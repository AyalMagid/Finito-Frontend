import Vue from "vue";
import Vuex from "vuex";
import boardStore from "./board-store.js";
import { notificationStore } from "./notification-store";
import { userStore } from "./user-store.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
  modules: {
    boardStore,
    userStore,
    notificationStore,
  },
});
