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
  methods: {
    handleClick() {
      const realUrl =
        this.url.substr(0, 7).toLowerCase() === "http://" ||
        this.url.substr(0, 8).toLowerCase() === "https://"
          ? this.url
          : "http://" + this.url;
      window.open(realUrl, "_blank");
    },
    handleEditCard() {
      this.$emit("editCard", this.name);
    },
    handleDeleteCard() {
      this.$emit("deleteCard", this.name);
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
      line-height: 1.3rem;
      vertical-align: middle;
      font-size: 1rem;
      color: rgba(80, 80, 80, 0.7);
      margin-right: 6px;
      text-shadow: 0 0 1px rgba(250, 250, 250, 0.7);
    }
    span:hover {
      font-size: 1.2rem;
    }
    .remove:hover {
      color: #ff4648;
    }
    .edit:hover {
      color: rgb(25, 127, 255);
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
