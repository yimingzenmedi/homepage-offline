<template>
  <div id="app">
    <MainPage />
  </div>
</template>

<script>
import MainPage from "./components/MainPage.vue";
import { mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    MainPage
  },
  methods: {
    ...mapMutations("statusStore", ["initLocalStorage"])
  },
  created() {
    this.initLocalStorage();
  }
};
</script>

<style>
@import "global.less";
</style>
