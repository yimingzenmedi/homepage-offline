import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const statusStore = new Vuex.Store({
  namespaced: true,
  status: {
    searchEngine: "Baidu"
  }
});

export default statusStore;