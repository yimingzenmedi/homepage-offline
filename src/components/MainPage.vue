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
      <a-icon type="close-circle" class="hidden-btn" @click="resetSettings" />
    </div>
    <div class="content-wrap"></div>
    <div class="content">
      <div id="searchBox">
        <SearchBox />
      </div>
      <div
        class="cards"
        :style="tempFix ? 'opacity: 1' : fixCards ? 'opacity: 1' : ''"
      >
        <a-row :gutter="[20, 40]">
          <a-col
            v-for="site in getSites"
            :key="site.name + site.editTime ? site.editTime : ''"
            :xl="6"
            :lg="12"
            :md="24"
          >
            <Card
              :url="site.url"
              :imgPath="site.imgPath"
              :name="site.name"
              @editCard="editCard"
              @deleteCard="deleteCard"
              :class="deletingSite === site.name ? 'shake shake-constant' : ''"
            />
          </a-col>
          <a-col :xl="6" :lg="12" :md="24">
            <div class="add-btn" @click="handleClickAdd">
              <div class="cross-v"></div>
              <div class="cross-h"></div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <a-modal
      :title="editingSite ? `Editing ${editingSite.name}` : 'Adding site'"
      :visible="showModal"
      @ok="handleModalOk"
      @cancel="handleModalCancel"
    >
      <a-form :labelCol="{ span: 24 }" :wrapper-col="{ span: 24 }" :form="form">
        <a-form-item label="Site name">
          <a-input
            placeholder="I'm essential and unique."
            v-decorator="[
              'name',
              {
                rules: [
                  { required: true, message: 'I\'m essential.' },
                  { validator: checkUnique }
                ],
                initialValue: editingSite ? editingSite.name : undefined
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="URL">
          <a-input
            placeholder="It's meaningless without me."
            v-decorator="[
              'url',
              {
                rules: [{ required: true, message: 'It\'s meaningless.' }],
                initialValue: editingSite ? editingSite.url : undefined
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="Background image">
          <a-upload
            name="Background image"
            list-type="picture-card"
            class="image-uploader"
            :show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :before-upload="tempSave"
            v-decorator="['imgPath', { rules: [{ validator: checkSize }] }]"
          >
            <img
              v-if="
                tempFile64 ? tempFile64 : editingSite && editingSite.imgPath
              "
              :src="
                tempFile64 ? tempFile64 : editingSite ? editingSite.imgPath : ''
              "
              alt="avatar"
              class="uploaded-img"
            />
            <div v-else>
              <a-icon type="plus" />
              <div class="ant-upload-text">
                I love beauty.
              </div>
            </div>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { getRandom, saveLocalStorage } from "../utils";
import SearchBox from "./SearchBox";
import Card from "./Card";
import { mapMutations, mapState } from "vuex";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  name: "MainPage",
  components: { SearchBox, Card },
  data() {
    const requireContext = require.context("../assets/bg", true);
    const bgImgs = requireContext.keys();

    return {
      bgImg1: "",
      bgImg2: "",
      bgImgs,
      tempFix: false,
      autoChangeTimer: null,
      tempFile64: null,
      tempFile: null,
      showingBg: 1,
      editingSite: null,
      deletingSite: "",
      showModal: false,
      form: this.$form.createForm(this, { name: "editSiteForm" }),
      isAdding: false
    };
  },
  computed: {
    ...mapState("statusStore", ["autoUpdateBg", "fixCards", "sites"]),
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
    ...mapMutations("statusStore", [
      "setAutoUpdateBg",
      "setFixCards",
      "initLocalStorage",
      "setSites"
    ]),
    getBg() {
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
    async checkUnique(rule, value, callback) {
      if (
        this.isAdding &&
        value &&
        value.trim() &&
        this.sites &&
        this.sites.length > 0
      ) {
        for (const site of this.sites) {
          if (site.name.toLowerCase() === value.trim().toLowerCase()) {
            return callback("I'm unique.");
          }
        }
        callback();
      }
    },
    async checkSize(rule, value, callback) {
      if (this.tempFile && this.tempFile.size / 1024 > 150) {
        return callback("I refuse. Too big. Should be smaller than 150kb.");
      }
      callback();
    },
    tempSave(file) {
      this.tempFile = file;
      getBase64(file, base64 => {
        console.log(base64);
        this.tempFile64 = base64;
      });
      console.log(file);
      console.log(this.tempFile64);
      return false;
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
    },
    resetSettings() {
      this.$confirm({
        title: "Reset everything?",
        content: "Some descriptions",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: () => {
          saveLocalStorage(null);
          this.initLocalStorage();
        }
      });
    },
    editCard(name) {
      for (const site of this.sites) {
        if (site.name === name) {
          this.editingSite = site;
          this.showModal = true;
        }
      }
    },
    deleteCard(name) {
      this.deletingSite = name;
      this.tempFix = true;
      this.$confirm({
        title: `Remove ${name}?`,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: () => {
          const sites = [...this.sites];
          for (const site of sites) {
            if (site.name === name) {
              const index = sites.indexOf(site);
              sites.splice(index, 1);
              break;
            }
          }
          this.setSites(sites);
          this.deletingSite = "";
          this.tempFix = false;
        },
        onCancel: () => {
          this.deletingSite = "";
          this.tempFix = false;
        }
      });
    },
    handleClickAdd() {
      this.isAdding = true;
      this.showModal = true;
    },
    handleModalOk() {
      console.log("Submit");
      this.form.validateFields(async (error, values) => {
        console.log("Checking...");
        if (error) {
          console.log("Have error: ");
          console.log(values);
          return;
        }
        console.log(values);
        // const itemObj = {
        //   name: values.name
        // };
        console.log("No error :p");
        let newSites = [...this.sites];
        if (this.isAdding) {
          newSites.push({
            name: values.name,
            url: values.url,
            imgPath: this.tempFile64,
            editTime: new Date().getTime()
          });
        } else {
          for (const index in newSites) {
            const site = newSites[index];
            if (site.name === this.editingSite.name) {
              newSites[index] = {
                name: values.name,
                url: values.url,
                imgPath:
                  this.tempFile64 || this.tempFile64 === ""
                    ? this.tempFile64
                    : site.imgPath,
                editTime: new Date().getTime()
              };
              break;
            }
          }
        }
        console.log(newSites);
        this.setSites(newSites);
        this.handleModalCancel();
      });
    },
    handleModalCancel() {
      this.editingSite = null;
      this.isAdding = false;
      this.form.resetFields();
      this.showModal = false;
      this.tempFile64 = null;
      this.tempFile = null;
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
.content-wrap {
  width: 80%;
  background-color: rgba(255, 255, 235, 0.4);
  margin-left: 10%;
  height: 100%;
  min-width: 550px;
  position: fixed;
  z-index: 2;
}

.content {
  width: 80%;
  margin-left: 10%;
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
  border-radius: 15px;
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

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.uploaded-img {
  max-width: 450px;
}

.image-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
</style>
