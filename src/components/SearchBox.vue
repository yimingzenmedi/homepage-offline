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
        <a-dropdown @click="e => e.preventDefault()" class="dropdown">
          <span>
            <img
              class="search-engine-icon"
              src="../assets/searchEngineIcons/baidu.png"
              :alt="'baidu'"
            />
          </span>
          <a-menu
            slot="overlay"
            @mouseover="handleOverMenu"
            @mouseout="handleOutMenu"
          >
            <a-menu-item>Baidu</a-menu-item>
            <a-menu-item>Google</a-menu-item>
            <a-menu-item>Bing</a-menu-item>
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
    return {
      focus: false,
      over: false,
      overMenu: false,
      searchEngine: "baidu",
      styleClass: "hide"
    };
  },
  methods: {
    handleSearch() {},
    handleFocus() {
      console.log(1)
      this.focus = true;
    },
    handleBlur() {
      console.log(2)
      this.focus = false;
    },
    handleOver() {
      console.log(3)
      this.over = true;
    },
    handleOut() {
      console.log(4)
      this.over = false;
    },
    handleOverMenu() {
      console.log(5)
      this.overMenu = true;
    },
    handleOutMenu() {
      console.log(6)
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
