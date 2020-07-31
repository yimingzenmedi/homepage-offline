<template>
  <div class="wrap">
    <div class="card" @click="handleClick">
      <div :style="style" class="card-inner">
        <div class="cover" v-if="showCover"></div>
      </div>
      <div class="name">
        <span>{{ name }}</span>
      </div>
      <div class="icons">
        <a-icon type="edit" class="edit" @click.stop="handleEditCard" />
        <a-icon type="close" class="remove" @click.stop="handleDeleteCard" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Card",
  data() {
    let { name, url, imgPath } = this.$attrs;
    let showCover = false;
    if (!imgPath.trim()) {
      showCover = true;
      imgPath = require("../assets/defaultImg/d_ag.png");
    }
    const style = {
      backgroundImage: `url(${imgPath})`,
      backgroundSize: "cover"
    };
    return { name, url, style, showCover };
  },
  computed: {
    ...mapState("statusStore", ["sites"])
  },
  methods: {
    ...mapMutations("statusStore", ["setSites"]),
    handleClick() {
      const realUrl =
        this.url.substr(0, 7).toLowerCase() === "http://" ||
        this.url.substr(0, 8).toLowerCase() === "https://"
          ? this.url
          : "http://" + this.url;
      window.open(realUrl, "_blank");
    },
    handleEditCard() {
      console.log("EDIT: ", this.name);
    },
    handleDeleteCard() {
      console.log("DELETE: ", this.name);
      this.$confirm({
        title: `Remove ${this.name}?`,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: () => {
          const sites = [...this.sites];
          for (const site of sites) {
            if (site.name === this.name) {
              const index = sites.indexOf(site);
              sites.splice(index, 1);
              break;
            }
          }
          this.setSites(sites);
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.wrap {
  text-align: center;
}
.cover {
  width: 100%;
  height: 100%;
  /*background: rgba(255, 252, 50, 0.5);*/
}
.card {
  width: 200px;
  height: 140px;
  cursor: pointer;
  display: inline-block;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 2px rgba(200, 200, 200, 0.5);
  transition: box-shadow 0.3s;

  .name {
    width: 100%;
    height: 0;
    z-index: 10;
    position: relative;
    top: -135px;

    span {
      color: rgba(80, 80, 80, 0.7);
      padding-top: 3px;
      font-size: 1rem;
      text-shadow: 0 0 1px rgba(250, 250, 250, 0.7);
    }
  }

  .icons {
    height: 0;
    position: relative;
    z-index: 10;
    left: 80px;
    top: -135px;
    .remove,
    .edit {
      display: inline-block;
      line-height: 1rem;
      vertical-align: middle;
      font-size: 0.9rem;
      color: rgba(80, 80, 80, 0.7);
      text-shadow: 0 0 1px rgba(250, 250, 250, 0.7);
      margin-left: 3px;
      margin-right: 3px;
    }
    .remove:hover {
      color: #ff4648;
    }
    .edit:hover {
      color: rgb(0, 86, 255);
    }
  }
  .card-inner {
    opacity: 0.75;
    z-index: 1;
    width: 100%;
    height: 100%;
    transform: scale(1);
    transition: transform 0.5s, opacity 0.5s;
  }
  .card-inner:hover {
    opacity: 0.95;
    transform: scale(1.2);
    transition: transform 0.5s, opacity 0.5s;
  }
}
.card:hover {
  box-shadow: 0 0 15px rgba(200, 200, 200, 1);
  transition: box-shadow 0.3s;
}
</style>
