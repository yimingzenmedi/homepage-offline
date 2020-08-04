import Vue from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "csshake/dist/csshake.min.css";
import store from "./Stores";

Vue.config.productionTip = false;
Vue.use(Antd);

new Vue({
  render: h => h(App),
  store
}).$mount("#app");
