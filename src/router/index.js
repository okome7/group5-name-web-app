import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/LoginView.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import RegisterView from "../views/RegisterView.vue";
import TopView from "../views/TopView.vue";
import SelfDiagnosisQuestionView from "../views/SelfDiagnosisQuestionView.vue";
import SelfDiagnosisResultView from "../views/SelfDiagnosisResultView.vue";
// ★ プロフィール作成ページのインポートを追加
import ProfileCreationView from "../views/ProfileCreationView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPassword,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/top",
      name: "top",
      component: TopView,
    },
    {
      path: "/self-diagnosis",
      name: "SelfDiagnosisQuestion",
      component: SelfDiagnosisQuestionView,
    },
    {
      path: "/self-diagnosis/result",
      name: "SelfDiagnosisResult",
      component: SelfDiagnosisResultView,
    },
    // ★ プロフィール作成画面のルートを追加
    {
      path: "/profile/create",
      name: "profile-creation",
      component: ProfileCreationView,
    },
  ],
});

export default router;
