import Vue from "vue";
import App from "./app.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./utils/filters.js";
import "./styles/styles.scss";
//EXTENAL LIBS
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vuelidate from "vuelidate";
import elementLocale from "element-ui/lib/locale/lang/en";
Vue.use(ElementUI, { locale: elementLocale });
Vue.use(Vuelidate);
Vue.use(require("vue-moment"));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
