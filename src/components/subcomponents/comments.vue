<template>
  <div class="cmt-container">
    <h3>评论列表</h3>
    <textarea placeholder="请输入您要评论的内容，最多输入120字" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,i) in comments" :key="i">
        <div
          class="cmt-title"
        >第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}</div>
        <div class="cmt-body">{{item.content == 'undefined'? '此用户没有评论' : item.content}}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      comments: [],
      pageindex: 1,
      msg: ""
    };
  },
  props: ["id"],
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      axios
        .get("/api/getcomments/" + this.id + "?pageindex=" + this.pageindex)
        .then(res => {
          // console.log(res);
          if (res.data.status === 0) {
            // this.comments.push(...res.data.message);
            this.comments = this.comments.concat(res.data.message);
            // console.log(this.comments);
          } else {
            Toast("获取评论失败");
          }
        });
    },
    getmore() {
      this.pageindex++;
      this.getComments();
    },
    postComment() {
      axios
        .post("/api/postcomment/" + this.id, {
          content: this.msg
        })
        .then(res => {
          if (res.data.status === 0) {
            let cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg
            };
            this.comments.unshift(cmt);
            this.msg = ''
          } else {
            Toast("评论发表失败");
          }
        });
    }
  }
}
</script>


<style lang="less" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
