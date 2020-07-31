export default {
  LOCAL_STORAGE_KEY: "HOMEPAGE_SETTINGS",
  SEARCH_ENGINES: [
    { name: "Baidu", icon: require("../assets/searchEngineIcons/baidu.png") },
    {
      name: "Google",
      icon: require("../assets/searchEngineIcons/google.png")
    },
    { name: "Bing", icon: require("../assets/searchEngineIcons/bing.png") }
  ],
  DEFAULT_SITES: [
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
