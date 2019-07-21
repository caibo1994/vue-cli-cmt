import Vue from "vue";
import App from "./App.vue";
import mintui from "mint-ui";

import VueRouter from "vue-router";
Vue.use(VueRouter);

// 导入mui相关css
import "../dist/css/mui.css";
import "../dist/css/icons-extra.css";


// 由于图片懒加载冲突，所以换一个加载方式
// import { Header, Swipe, SwipeItem, Button, Lazyload } from "mint-ui";
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'


// 导入格式化时间模块，同时注册时间过滤器
import moment from "moment";
Vue.filter("dateFormat", (datastr, plug = "YYYY-MM-DD HH:mm:ss") => {
  return moment(datastr).format(plug);
});


// 使用vue-preview
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


new Vue({
  render: h => h(App)
}).$mount("#app");
