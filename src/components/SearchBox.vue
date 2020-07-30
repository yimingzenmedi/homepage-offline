<template>
  <div
    :class="focus || over || overMenu ? 'show' : 'hide'"
    @mouseover="handleOver"
    @mouseout="handleOut"
  >
    <a-input-search
      :placeholder="placeholder"
      size="large"
      @search="handleSearch"
      class="input"
      allowClear
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <span slot="addonBefore">
        <a-dropdown class="dropdown">
          <span>
            <img
              class="search-engine-icon"
              :src="searchEngine.icon"
              alt="search engine"
            />
          </span>
          <a-menu
            slot="overlay"
            @mouseover="handleOverMenu"
            @mouseout="handleOutMenu"
          >
            <a-menu-item
              v-for="engine of searchEngines"
              :key="engine.name"
              @click="handleMenuItemClick(engine)"
            >
              {{ engine.name }}
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </a-input-search>
  </div>
</template>

<script>
import { getRandom } from "../utils";
import config from "../config";

export default {
  name: "SearchBox",
  data() {
    const searchEngines = [
      { name: "Baidu", icon: require("../assets/searchEngineIcons/baidu.png") },
      {
        name: "Google",
        icon: require("../assets/searchEngineIcons/google.png")
      },
      { name: "Bing", icon: require("../assets/searchEngineIcons/bing.png") }
    ];

    const placeholders = [
      " Search here ...",
      " What do u want to know ?",
      " Get something new here !",
      " What are u wondering ?",
      " I can answer your question ~",
      " Ask me anything ."
    ];

    return {
      focus: false,
      over: false,
      overMenu: false,
      searchEngine: searchEngines[0],
      styleClass: "hide",
      searchEngines,
      placeholders,
      placeholder: ""
    };
  },
  methods: {
    getPlaceholder() {
      const index = getRandom(0, this.placeholders.length - 1);
      this.placeholder = this.placeholders[index];
    },
    handleSearch(value) {
      if (value.trim()) {
        let url;
        const encodedVal = encodeURIComponent(value.trim());
        if (this.searchEngine.name === "Baidu") {
          url = "https://www.baidu.com/s?wd=" + encodedVal;
        } else if (this.searchEngine.name === "Google") {
          url =
            "https://www.google.com.hk/search?&sourceid=chrome&ie=UTF-8&q=" +
            encodedVal;
        } else if (this.searchEngine.name === "Bing") {
          url = "https://www.bing.com/search?ensearch=1&q=" + encodedVal;
        }
        window.open(url, "_blank");
        this.getPlaceholder();
      }
    },
    handleMenuItemClick(engine) {
      this.searchEngine = engine;
      localStorage.setItem(
        config.LOCAL_STORAGE_KEYS.SEARCH_ENGINE,
        engine.name
      );
    },
    handleFocus() {
      this.focus = true;
    },
    handleBlur() {
      this.focus = false;
    },
    handleOver() {
      this.over = true;
    },
    handleOut() {
      this.over = false;
    },
    handleOverMenu() {
      this.overMenu = true;
    },
    handleOutMenu() {
      this.overMenu = false;
    }
  },
  created() {
    this.getPlaceholder();
    const engineName = localStorage.getItem(
      config.LOCAL_STORAGE_KEYS.SEARCH_ENGINE
    );
    for (const engine of this.searchEngines) {
      if (engine.name === engineName) {
        this.searchEngine = engine;
        break;
      }
    }
  }
};
</script>

<style scoped lang="less">
.hide {
  opacity: 0.75;
  box-shadow: 0 0 10px rgba(215, 217, 210, 0.75);
  transition: box-shadow 0.3s, opacity 0.3s;
}
.show {
  opacity: 0.95;
  box-shadow: 0 0 20px rgba(245, 247, 240, 0.9);
  transition: box-shadow 0.3s, opacity 0.3s;
}
.search-engine-icon {
  width: 70px;
  max-height: 35px;
}
.dropdown {
  cursor: pointer;
}
</style>
