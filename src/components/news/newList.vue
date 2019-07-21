<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newsInfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <div>
              <span>发表日期： {{ item.add_time | dateFormat}}</span>
              <span>点击次数： {{ item.click }}</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "http://www.liulongbin.top:3005";
import { Toast } from "mint-ui";
var changeTime = (data) => {
  return data.substr(0, 10);
};
export default {
  data() {
    return {
      newsList: []
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      axios.get("/api/getnewslist").then(res => {
        // console.log(res);
        if (res.data.status === 0) {
          this.newsList = res.data.message;
        } else {
          Toast("获取新闻列表失败");
        }
      });
    }
  },
  filters: {
    changeTime
  }
};
</script>


<style scoped>
.mui-table-view li h1 {
  font-size: 14px;
}
.mui-media-body div {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}
</style>
