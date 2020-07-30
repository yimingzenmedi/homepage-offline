import Vue from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import statusStore from "./Stores/statusStore";

Vue.config.productionTip = false;
Vue.use(Antd);

new Vue({
  render: h => h(App),
  store: statusStore
}).$mount("#app");
