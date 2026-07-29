import { createRouter, createWebHistory } from "vue-router";
import ProfileExchangingView from "../views/ProfileExchangingView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/profile-exchange", // URLパス（例: http://localhost:5173/profile-exchange）
      name: "profile-exchange",
      component: ProfileExchangingView
    },
    // トップページ（/）にアクセスしたときも表示したい場合は以下のように設定できます
    {
      path: "/",
      redirect: "/profile-exchange"
    }
  ]
});

export default router;

/*
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [],
})

export default router
*/
