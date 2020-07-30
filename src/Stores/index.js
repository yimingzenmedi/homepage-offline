import Vue from "vue";
import Vuex from "vuex";
import statusStore from "./statusStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { statusStore }
});
