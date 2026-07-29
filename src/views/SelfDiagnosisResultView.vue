<script setup>
import { computed, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

onMounted(() => {
  window.scrollTo({
    top: 0,
  });
});

import DiagnosisResultCard from "../components/DiagnosisResultCard.vue";

const router = useRouter();

const diagnosisResults = {
  active: {
    type: "active",
    icon: "☀️",
    title: "アクティブタイプ",
    description:
      "気になったことにはすぐに挑戦できる、行動力のあるタイプです。変化を楽しみながら、周りを引っ張っていく力があります。",
    personality: "好奇心が強く、思い立ったら行動に移せる性格",
    strength: "新しい環境にも前向きに飛び込める行動力",
    impression: "行動力があって頼りになる",
    charmPoint: "失敗を恐れずに挑戦できるところ",
  },

  healing: {
    type: "healing",
    icon: "🌷",
    title: "癒やしタイプ",
    description:
      "相手の気持ちを大切にできる、思いやりのあるタイプです。話を丁寧に聞けるため、周りの人に安心感を与えます。",
    personality: "優しく、人の気持ちに寄り添える性格",
    strength: "相手の立場に立って考えられる共感力",
    impression: "一緒にいると安心する",
    charmPoint: "周りの小さな変化に気づけるところ",
  },

  creative: {
    type: "creative",
    icon: "🎨",
    title: "クリエイティブタイプ",
    description:
      "自分らしい視点を持ち、新しいアイデアを考えることが得意なタイプです。好奇心が強く、気になったことを深く追求できます。",
    personality: "感性が豊かで、自分らしい考えを大切にする性格",
    strength: "ほかの人とは違う視点から考えられる発想力",
    impression: "発想がおもしろくて個性的",
    charmPoint: "自分らしい感性とひらめきを持っているところ",
  },

  steady: {
    type: "steady",
    icon: "📚",
    title: "コツコツタイプ",
    description:
      "計画を立て、目標に向かって丁寧に取り組めるタイプです。責任感が強く、任されたことを最後までやり遂げます。",
    personality: "まじめで、物事に丁寧に取り組める性格",
    strength: "目標に向かって努力を続けられる継続力",
    impression: "しっかりしていて頼りになる",
    charmPoint: "最後まで諦めずに取り組めるところ",
  },

  moodMaker: {
    type: "moodMaker",
    icon: "✨",
    title: "ムードメーカータイプ",
    description:
      "人とのコミュニケーションを楽しみ、自然と周りを明るくできるタイプです。人と人をつなぐことが得意です。",
    personality: "明るく、人と関わることが好きな性格",
    strength: "その場の雰囲気を明るくできるコミュニケーション力",
    impression: "一緒にいると楽しくて話しやすい",
    charmPoint: "自然と周りを笑顔にできるところ",
  },

  myPace: {
    type: "myPace",
    icon: "🌙",
    title: "マイペースタイプ",
    description:
      "周りに流されすぎず、自分の気持ちやペースを大切にできるタイプです。落ち着いて物事を考えられます。",
    personality: "落ち着いていて、自分らしさを大切にする性格",
    strength: "慌てずに自分の考えを整理できる冷静さ",
    impression: "自然体で落ち着いている",
    charmPoint: "周りに流されず、自分らしくいられるところ",
  },
};

const resultType = localStorage.getItem("diagnosisResultType");

const result = computed(() => {
  if (!resultType) {
    return null;
  }

  return diagnosisResults[resultType] || null;
});

watchEffect(() => {
  if (!result.value) {
    return;
  }

  localStorage.setItem("profileDiagnosis", JSON.stringify(result.value));
});

const goHome = () => {
  router.push("/");
};
</script>

<template>
  <main class="page-background">
    <div class="header-background">
      <header class="page-header">
        <button
          type="button"
          class="back-button"
          aria-label="前の画面に戻る"
          @click="router.back()"
        >
          ＜
        </button>

        <h1>自己診断結果</h1>
      </header>
    </div>

    <div class="result-page">
      <section v-if="result" class="result-content">
        <DiagnosisResultCard :result="result" />

        <button type="button" class="home-button" @click="goHome">
          トップに戻る
        </button>
      </section>

      <section v-else class="no-result">
        <p>診断結果がありません。</p>

        <button type="button" class="home-button" @click="goHome">
          トップに戻る
        </button>
      </section>
    </div>
  </main>
</template>

<style scoped>
.page-background {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  background: #fff1f6;
}

.header-background {
  position: sticky;
  top: 0;
  z-index: 20;

  width: 100%;

  background: #ffd8e8;
  border-bottom: 1px solid #f1bfd2;
}

.page-header {
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr) 52px;
  align-items: center;

  width: 100%;
  max-width: 760px;
  min-height: 72px;
  margin: 0 auto;
  padding: 10px 20px;

  background: #ffd8e8;
  box-sizing: border-box;
}

.page-header h1 {
  grid-column: 2;

  min-width: 0;
  margin: 0;

  font-size: clamp(20px, 4vw, 28px);
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
}

.back-button {
  grid-column: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 44px;
  height: 44px;
  padding: 0;

  color: #2d2026;
  font-size: 32px;

  background: transparent;
  border: none;

  cursor: pointer;
}

.back-button:hover {
  opacity: 0.65;
}

.result-page {
  width: 100%;
  max-width: 760px;
  min-height: calc(100vh - 72px);
  margin: 0 auto;

  background: #fff1f6;
}

.result-content {
  padding: 44px 32px 56px;
}

.home-button {
  display: block;

  width: min(100%, 420px);
  min-height: 54px;
  margin: 36px auto 0;
  padding: 14px 20px;

  color: #2d2026;
  font-size: 16px;
  font-weight: 600;

  background: #ffe08a;
  border: 1px solid #b58a3f;
  border-radius: 10px;

  cursor: pointer;

  transition:
    background-color 0.2s,
    transform 0.2s;
}

.home-button:hover {
  background: #ffd66b;
  transform: translateY(-1px);
}

.no-result {
  padding: 80px 20px;
  text-align: center;
}

.no-result p {
  margin: 0 0 24px;
}

.no-result .home-button {
  margin-top: 0;
}

@media (max-width: 600px) {
  .page-header {
    grid-template-columns: 40px minmax(0, 1fr) 40px;

    max-width: none;
    min-height: 64px;
    margin: 0;
    padding: 8px 12px;
  }

  .page-header h1 {
    font-size: 20px;
  }

  .back-button {
    width: 40px;
    height: 40px;

    font-size: 28px;
  }

  .result-page {
    min-height: calc(100vh - 64px);
  }

  .result-content {
    padding: 36px 20px 44px;
  }

  .home-button {
    width: 100%;
    min-height: 52px;
  }
}

@media (max-width: 360px) {
  .page-header {
    padding-right: 8px;
    padding-left: 8px;
  }

  .page-header h1 {
    font-size: 18px;
  }

  .result-content {
    padding-right: 16px;
    padding-left: 16px;
  }
}
</style>
