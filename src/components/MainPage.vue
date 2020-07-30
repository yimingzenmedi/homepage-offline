<template>
  <div class="main-page">
    <div id="bg1" class="bg" :style="bg1Style"></div>
    <div id="bg2" class="bg" :style="bg2Style"></div>
    <div class="hidden-buttons">
      <a-icon type="reload" class="hidden-btn" @click="getBg" />
      <a-icon type="pushpin" class="hidden-btn" @click="triggerFixCards" />
      <a-icon
        type="clock-circle"
        class="hidden-btn"
        @click="triggerAutoChange"
        :spin="autoUpdateBg"
      />
    </div>
    <div class="content">
      <div id="searchBox">
        <SearchBox />
      </div>
      <div class="cards" :style="`opacity: ${fixCards ? 1 : 0}`">
        <a-row :gutter="[20, 40]">
          <a-col
            v-for="site in getSites"
            :key="site.name"
            :xl="6"
            :lg="12"
            :md="24"
          >
            <Card :url="site.url" :imgPath="site.imgPath" :name="site.name" />
          </a-col>
          <a-col :xl="6" :lg="12" :md="24">
            <div class="add-btn">
              <div class="cross-v"></div>
              <div class="cross-h"></div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getRandom } from "../utils";
import SearchBox from "./SearchBox";
import Card from "./Card";
import { mapMutations, mapState } from "vuex";
export default {
  name: "MainPage",
  components: { SearchBox, Card },
  data() {
    const requireContext = require.context("../assets/bg", true);
    const bgImgs = requireContext.keys();
    // const bgIndex = getRandom(0, bgImgs.length - 1);
    // const nextImg = require(`../assets/bg/${bgImgs[bgIndex].substring(2)}`);
    // console.log(requireContext.keys());
    // console.log(bgImgs);
    return {
      bgImg1: "",
      bgImg2: "",
      bgImgs,
      autoChangeTimer: null,
      showingBg: 1,
      sites: [],
      defaultSites: [
        {
          name: "Youtube",
          url: "https://www.youtube.com",
          imgPath: require("../assets/defaultImg/youtube.png")
        },
        {
          name: "Bilibili",
          url: "https://www.bilibili.com/",
          imgPath: require("../assets/defaultImg/bilibili.png")
        },
        {
          name: "Gmail",
          url: "https://mail.google.com",
          imgPath: require("../assets/defaultImg/gmail.png")
        },
        {
          name: "Google docs",
          url: "https://www.google.com/intl/zh-CN/docs/about/",
          imgPath: require("../assets/defaultImg/googledocs.png")
        },
        {
          name: "Github",
          url: "https://github.com/",
          imgPath: require("../assets/defaultImg/github.png")
        },
        {
          name: "JD.com",
          url: "https://www.jd.com/",
          imgPath: require("../assets/defaultImg/jdcom.png")
        },
        {
          name: "TradeMe",
          url: "https://www.trademe.co.nz/",
          imgPath: require("../assets/defaultImg/trademe.png")
        },
        {
          name: "Facebook",
          url: "https://www.facebook.com/",
          imgPath: require("../assets/defaultImg/facebook.png")
        },
        {
          name: "Twitter",
          url: "https://twitter.com/",
          imgPath: require("../assets/defaultImg/twitter.png")
        },
        {
          name: "Instagram",
          url: "https://www.instagram.com/",
          imgPath: require("../assets/defaultImg/instagram.png")
        },
        {
          name: "QQ mail",
          url: "https://mail.qq.com/",
          imgPath: require("../assets/defaultImg/qqmail.png")
        }
      ]
    };
  },
  computed: {
    ...mapState("statusStore", ["autoUpdateBg", "fixCards"]),
    getSites() {
      if (!this.sites || this.sites.length === 0) {
        return this.defaultSites;
      }
      return this.sites;
    },
    bg1Style() {
      return `opacity: ${
        this.showingBg === 1 ? 1 : 0
      }; background-image: url("${this.bgImg1}")`;
    },
    bg2Style() {
      return `opacity: ${
        this.showingBg === 2 ? 1 : 0
      }; background-image: url("${this.bgImg2}")`;
    }
  },
  methods: {
    ...mapMutations("statusStore", ["setAutoUpdateBg", "setFixCards"]),
    getBg() {
      console.log(111);
      if (!this.bgImg1 || !this.bgImg2) {
        const bg1Index = getRandom(0, this.bgImgs.length - 1);
        const bg2Index = getRandom(0, this.bgImgs.length - 1);
        this.bgImg1 = require(`../assets/bg/${this.bgImgs[bg1Index].substring(
          2
        )}`);
        this.bgImg2 = require(`../assets/bg/${this.bgImgs[bg2Index].substring(
          2
        )}`);
        this.showingBg = 1;
      } else {
        const bgIndex = getRandom(0, this.bgImgs.length - 1);
        if (this.showingBg === 1) {
          this.showingBg = 2;
          setTimeout(() => {
            this.bgImg1 = require(`../assets/bg/${this.bgImgs[
              bgIndex
            ].substring(2)}`);
          }, 600);
        } else {
          this.showingBg = 1;
          setTimeout(() => {
            this.bgImg2 = require(`../assets/bg/${this.bgImgs[
              bgIndex
            ].substring(2)}`);
          }, 600);
        }
      }
    },
    triggerAutoChange() {
      if (this.autoUpdateBg) {
        this.setAutoUpdateBg(false);
        this.stopAutoChangeTimer();
      } else {
        this.setAutoUpdateBg(true);
        this.startAutoChangeTimer();
      }
    },
    stopAutoChangeTimer() {
      window.clearInterval(this.autoChangeTimer);
    },
    startAutoChangeTimer() {
      const _this = this;
      this.autoChangeTimer = self.setInterval(() => {
        _this.getBg();
      }, 1000);
    },
    triggerFixCards() {
      if (this.fixCards) {
        this.setFixCards(false);
      } else {
        this.setFixCards(true);
      }
    }
  },
  created() {
    this.getBg();
  },
  beforeMount() {
    this.stopAutoChangeTimer();
  }
};
</script>

<style scoped lang="less">
.bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background-size: cover;
  z-index: 1;
  transition: opacity 1s;
}
.content {
  width: 80%;
  background-color: rgba(255, 255, 235, 0.4);
  margin-left: 10%;
  height: 100%;
  min-width: 550px;
  position: absolute;
  z-index: 2;
}

#searchBox {
  width: 90%;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 150px;
}

.hidden-buttons {
  position: absolute;
  z-index: 2;
  height: 0;
  font-size: 16px;
  left: 5px;
  top: 5px;
  width: 20px;
}

.hidden-btn {
  cursor: help !important;
  color: rgba(133, 133, 133, 0);
  transition: color 1s;
}
.hidden-btn:hover {
  color: rgba(133, 133, 133, 0.95);
  transition: color 1s;
}

.cards {
  padding-left: 2%;
  padding-right: 2%;
  width: 90%;
  min-width: 500px;
  margin: 70px auto 5%;
  text-align: center;
  transition: 0.5s opacity;
  opacity: 0;
}
.cards:hover {
  transition: 0.5s opacity;
  opacity: 1;
}

.add-btn {
  width: 200px;
  height: 140px;
  cursor: pointer;
  display: inline-block;
  border-radius: 10px;
  box-shadow: 0 0 2px rgba(200, 200, 200, 0.5);
  opacity: 0;
  transition: box-shadow 0.3s, opacity 0.3s;

  .cross-v,
  .cross-h {
    box-shadow: 0 0 2px rgba(200, 200, 200, 0.5);
    position: relative;
  }
  .cross-v {
    height: 100px;
    width: 0;
    top: 20px;
    left: calc(50% - 1px);
    border-left: 1px solid #b5b5b5;
  }
  .cross-h {
    width: 100px;
    height: 0;
    left: 50px;
    top: -30px;
    border-bottom: 1px solid #b5b5b5;
  }
}
.add-btn:hover {
  box-shadow: 0 0 10px rgba(200, 200, 200, 1);
  opacity: 0.95;
  transition: box-shadow 0.3s, opacity 0.3s;
  .cross-v,
  .cross-h {
    box-shadow: 0 0 20px rgb(214, 214, 214);
    transition: box-shadow 0.3s;
  }
}
</style>
