import config from "../config";
import { loadLocalStorage, saveLocalStorage } from "../utils";

const statusStore = {
  namespaced: true,
  state: {
    searchEngine: "",
    autoUpdateBg: false
  },
  mutations: {
    setSearchEngine: (state, searchEngine) => {
      state.searchEngine = searchEngine;
      saveLocalStorage(state);
    },
    setAutoUpdateBg: (state, autoUpdateBg) => {
      state.autoUpdateBg = autoUpdateBg;
      saveLocalStorage(state);
    },
    initLocalStorage: state => {
      let savedInfo = loadLocalStorage();
      if (savedInfo == null) {
        savedInfo = {};
      }
      console.log("Saved info: ", savedInfo);
      const { searchEngine, autoUpdateBg } = savedInfo;
      state.searchEngine = searchEngine
        ? searchEngine
        : config.SEARCH_ENGINES[0];
      state.autoUpdateBg = autoUpdateBg == null ? false : autoUpdateBg;
    }
  }
};

export default statusStore;
