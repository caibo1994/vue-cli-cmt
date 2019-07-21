<template>
    <div class="photoinfo-container">
        <h3>{{ list.title }}</h3>
        <div class="subtitle">
            <span>发表时间：{{ list.add_time | dateFormat }}</span>
            <span>点击数：{{ list.click }}次 </span>
        </div>
        <hr>
        <div v-html="list.content">
        </div>

        <!-- 显示缩略图 -->
        <div>
          <vue-preview :slides="imgList"></vue-preview>
        </div>

        
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
import axios from 'axios'
import comments from '../subcomponents/comments.vue'
export default {
    data() {
        return {
            list:{},
            id: this.$route.params.id,
            imgList:[],
        }
    },
    created() {
        this.getPhotoInfo()
        this.getImgs()
    },
    methods: {
        getPhotoInfo() {
            axios.get('/api/getimageInfo/' + this.id)
            .then(res => {
                if(res.data.status === 0) {
                    // console.log(res);
                    this.list = res.data.message[0]
                }
            })
        },
        getImgs() {
          axios.get('/api/getthumimages/'+ this.id)
          .then(res => {
            if(res.data.status == 0) {
              this.imgList = res.data.message 
              this.imgList.forEach(item => {
                item.w = 600
                item.h = 400
                item.msrc = item.src
              })
            }
          })
        }
    },
    components: {
        "cmt-box": comments,
    }
}
</script>



<style lang="less" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }

  .thumbs{
    img{
      margin: 10px;
      box-shadow: 0 0 8px #999;
    }
  }
}
</style>
