import { createRouter, createWebHistory } from "vue-router";
import ProfileExchangingView from "../views/ProfileExchangingView.vue";

const routes = [
  {
    path: "/", // ← ここを '/' にすることで、開いた瞬間に表示されます
    name: "ProfileExchanging",
    component: ProfileExchangingView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
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
