import config from "../config";
import { loadLocalStorage, saveLocalStorage } from "../utils";

const statusStore = {
  namespaced: true,
  state: {
    searchEngine: "",
    autoUpdateBg: false,
    fixCards: false,
    sites: []
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
    setFixCards: (state, fixCards) => {
      state.fixCards = fixCards;
      saveLocalStorage(state);
    },
    initLocalStorage: state => {
      let savedInfo = loadLocalStorage();
      if (savedInfo == null) {
        savedInfo = {};
      }
      console.log("Saved info: ", savedInfo);
      const { searchEngine, autoUpdateBg, fixCards, sites } = savedInfo;
      state.searchEngine = searchEngine
        ? searchEngine
        : config.SEARCH_ENGINES[0];
      state.autoUpdateBg = autoUpdateBg == null ? false : autoUpdateBg;
      state.fixCards = fixCards == null ? false : fixCards;
      state.sites = sites ? sites : config.DEFAULT_SITES;
      saveLocalStorage(state);
    }
  }
};

export default statusStore;
