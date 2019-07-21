import VueRouter from "vue-router";

import home from "./components/home.vue";
import member from "./components/member.vue";
import shopcar from "./components/shopcar.vue";
import search from "./components/search.vue";
import newList from "./components/news/newList.vue";
import newsInfo from "./components/news/newsInfo.vue";
import phptoList from "./components/photoList/photoList.vue";
import photoInfo from "./components/photoList/photoInfo";
import goodsLIst from "./components/goods/goodLIst.vue"

const router = new VueRouter({
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: home },
    { path: "/member", component: member },
    { path: "/shopcar", component: shopcar },
    { path: "/search", component: search },
    { path: "/home/newList", component: newList },
    { path: "/home/newsInfo/:id", component: newsInfo },
    { path: "/home/phptoList", component: phptoList },
    { path: "/home/photoInfo/:id", component: photoInfo },
    { path: "/home/goodsLIst", component: goodsLIst },
  ],
  linkActiveClass: "mui-active"
});

export default router;
