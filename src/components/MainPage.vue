<template>
  <div class="main-page">
    <div id="bg1" class="bg" :style="`background-image: url(${bgImg1})`"></div>
    <div id="bg2" class="bg" :style="`background-image: url(${bgImg2})`"></div>
    <div class="content"></div>
  </div>
</template>

<script>
  import {getRandom} from "../utils";

  export default {
    name: "MainPage",
    data() {
      const requireContext = require.context("../assets/bg", true);
      const images = requireContext.keys().map(requireContext);
      console.log(images)
      return {
        bgImg1: "",
        bgImg2: "",
        images,
        showingBg: 1
      }
    },
    methods: {
      getBg() {
        const bgIndex = getRandom(0, this.images.length - 1);
        if (this.showingBg === 1) {
          this.bgImg1 = this.images[bgIndex];
          this.showingBg = 2;
        } else {
          this.bgImg2 = this.images[bgIndex];
          this.showingBg = 1;
        }
      }
    },
    created() {
      this.getBg();
    }
  }
</script>

<style scoped lang="less">
  .bg {
    position: fixed;
    width: 100%;
    height: 100%;
    background-size: cover;
    z-index: 1;
  }
  .content {
    width: 80%;
    background-color: rgba(255,255,235,0.4);
    margin-left: 10%;
    height: 100%;
    min-width: 550px;
    position: absolute;
    z-index: 2;
  }
</style>