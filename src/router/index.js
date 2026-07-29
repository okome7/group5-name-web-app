import { createRouter, createWebHistory } from "vue-router";

import SelfDiagnosisQuestionView from "../views/SelfDiagnosisQuestionView.vue";
import SelfDiagnosisResultView from "../views/SelfDiagnosisResultView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
  ],
});

export default router;
