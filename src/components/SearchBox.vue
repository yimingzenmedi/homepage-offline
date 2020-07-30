<template>
  <div
    :class="focus || over || overMenu ? 'show' : 'hide'"
    @mouseover="handleOver"
    @mouseout="handleOut"
  >
    <a-input-search
      placeholder="input search text"
      size="large"
      @search="handleSearch"
      class="input"
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

    return {
      focus: false,
      over: false,
      overMenu: false,
      searchEngine: searchEngines[0],
      styleClass: "hide",
      searchEngines
    };
  },
  methods: {
    handleSearch() {},
    handleMenuItemClick(engine) {
      this.searchEngine = engine;
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
  }
};
</script>

<style scoped lang="less">
.hide {
  opacity: 0.5;
  box-shadow: 0 0 10px rgba(215, 217, 210, 0.75);
  transition: box-shadow 0.3s, opacity 0.3s;
}
.show {
  opacity: 0.9;
  box-shadow: 0 0 20px rgba(245, 247, 240, 0.9);
  transition: box-shadow 0.3s, opacity 0.3s;
}
.search-engine-icon {
  width: 70px;
  max-height: 35px;
}
</style>
