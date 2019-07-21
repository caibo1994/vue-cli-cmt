<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']"
            v-for="item in cates"
            :key="item.id"
            @tap="getPhotos(item.id)"
          >{{ item.title }}</a>
        </div>
      </div>
    </div>

    <ul class="phpto-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoInfo/' + item.id" tag="li">
        <img v-lazy="item.img_url" />
        <div class="info">
          <div class="info-title">{{ item.title }}</div>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>


<script>
import mui from "../../assets/lib/mui/js/mui.js";

import axios from "axios";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      cates: [],
      list: []
    };
  },
  created() {
    this.getPhotoList();
    this.getPhotos(0);
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getPhotoList() {
      axios.get("api/getimgcategory").then(res => {
        // console.log(res);
        if (res.data.status == 0) {
          res.data.message.unshift({ id: 0, title: "全部" });
          this.cates = res.data.message;
        } else {
          Toast("获取图片分类列表失败");
        }
      });
    },
    getPhotos(cateid) {
      axios.get("/api/getimages/" + cateid).then(res => {
        if (res.data.status == 0) {
          this.list = res.data.message;
        }
      });
    }
  }
};
</script>


<style lang="less" scoped>
* {
  touch-action: pan-y;
}

.phpto-list {
  margin: 0;
  padding: 0;
  padding: 0 10px;
  padding-bottom: 0;
  li {
    background-color: #fff;
    list-style: none;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
      position: absolute;
      bottom: 0;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.4);
      text-align: left;
      max-height: 100px;
      .info-title {
        font-size: 14px;
      }

      .info-body {
        font-size: 12px;
      }
    }
  }
}
</style>
