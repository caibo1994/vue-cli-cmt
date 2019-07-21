<template>
  <div class="newInfo-container">
    <!-- <h1>newsInfo + {{ id }}</h1> -->
    <h3 class="title">{{ newsInfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ newsInfo.add_time | dateFormat }}</span>
      <span>点击：{{ newsInfo.click }}</span>
    </p>
    <hr />
    <div v-html="newsInfo.content"></div>

    <my-comments :id="id"></my-comments>
  </div>
</template>

<script>
import axios from "axios";
import comments from "../subcomponents/comments.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsInfo: [],
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      axios.get("/api/getnew/" + this.id).then(res => {
        // console.log(res);
        if (res.data.status === 0) {
          this.newsInfo = res.data.message[0];
          // console.log(this.newsInfo);
        }
      });
    }
  },
  components: {
    "my-comments": comments
  }
};
</script>

<style lang="less" scoped>
.newInfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  div {
    padding: 0 2px;
    text-align: left;
  }
}
</style>

