<template>
  <div class="main-page">
    <div id="bg1" class="bg" :style="`background-image: url(${bgImg1})`"></div>
    <div id="bg2" class="bg" :style="`background-image: url(${bgImg2})`"></div>
    <div class="content">
      <div id="searchBox">
        <SearchBox />
      </div>
      <div class="cards">
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
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getRandom } from "../utils";
import SearchBox from "./SearchBox";
import Card from "./Card";
export default {
  name: "MainPage",
  components: { SearchBox, Card },
  data() {
    const requireContext = require.context("../assets/bg", true);
    const bgImgs = requireContext.keys().map(requireContext);
    // console.log(images);
    return {
      bgImg1: "",
      bgImg2: "",
      bgImgs,
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
    getSites() {
      if (!this.sites || this.sites.length === 0) {
        return this.defaultSites;
      }
      return this.sites;
    }
  },
  methods: {
    getBg() {
      const bgIndex = getRandom(0, this.bgImgs.length - 1);
      if (this.showingBg === 1) {
        this.bgImg1 = this.bgImgs[bgIndex];
        this.showingBg = 2;
      } else {
        this.bgImg2 = this.bgImgs[bgIndex];
        this.showingBg = 1;
      }
    }
  },
  created() {
    this.getBg();
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
.cards {
  padding-left: 2%;
  padding-right: 2%;
  width: 90%;
  min-width: 500px;
  margin: 70px auto 5%;
  text-align: center;
  transition: 0.5s opacity;
  /*opacity: 0;*/
}
.cards:hover {
  transition: 0.5s opacity;
  opacity: 1;
}
</style>
