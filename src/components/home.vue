<template>
  <div>
    <!-- <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in getList">
        <img :src="" alt="">
      </mt-swipe-item>
    </mt-swipe>-->

    <!-- 轮播图区域 -->
    <mt-swipe :auto="4000" class="swipeId">
      <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
      <mt-swipe-item v-for="item in proList" :key="item.id">
        <img :src="item.img" alt />
      </mt-swipe-item>
    </mt-swipe>

    <!-- 九宫格 到 6宫格 的改造工程 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newList">
          <img src="../images/menu1.png" alt />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/phptoList">
          <img src="../images/menu2.png" alt />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodsLIst">
          <img src="../images/menu3.png" alt />
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../images/menu4.png" alt />
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../images/menu5.png" alt />
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../images/menu6.png" alt />
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      proList: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios.get("http://www.liulongbin.top:3005/api/getlunbo").then(res => {
        // console.log(res);
        if (res.data.status === 0) {
          this.proList = res.data.message;
        } else {
          // alret("请求失败");
        }
      });
    }
  }
};
</script>

<style scoped>
.swipeId {
  height: 150px;
}
.swipeId img {
  /* width: 100; */
  height: 150px;
}

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
}
.mui-grid-view.mui-grid-9 img {
  width: 60px;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
</style>
