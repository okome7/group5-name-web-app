<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import DiagnosisQuestionCard from "../components/DiagnosisQuestionCard.vue";

const router = useRouter();

const questions = [
  {
    id: 1,
    text: "休日は、どのように過ごすことが多い？",
    options: [
      {
        text: "友達と遊びに行く",
        type: "moodMaker",
      },
      {
        text: "気になる場所へ出かける",
        type: "active",
      },
      {
        text: "家でゆっくり過ごす",
        type: "myPace",
      },
      {
        text: "趣味や勉強に集中する",
        type: "steady",
      },
    ],
  },
  {
    id: 2,
    text: "グループワークでは、どのような役割になることが多い？",
    options: [
      {
        text: "みんなを引っ張るリーダー役",
        type: "active",
      },
      {
        text: "意見を聞いて支えるサポート役",
        type: "healing",
      },
      {
        text: "新しい案を出すアイデア役",
        type: "creative",
      },
      {
        text: "場を明るくする盛り上げ役",
        type: "moodMaker",
      },
    ],
  },
  {
    id: 3,
    text: "初対面の人が多い場所では、どうする？",
    options: [
      {
        text: "自分から積極的に話しかける",
        type: "moodMaker",
      },
      {
        text: "話しかけやすそうな人を見つけて話す",
        type: "active",
      },
      {
        text: "話しかけられたら自然に話す",
        type: "myPace",
      },
      {
        text: "周りの様子を見てから話す",
        type: "steady",
      },
    ],
  },
  {
    id: 4,
    text: "何かを決めるとき、一番大切にすることは？",
    options: [
      {
        text: "まず行動してみること",
        type: "active",
      },
      {
        text: "周りの人の気持ち",
        type: "healing",
      },
      {
        text: "自分の直感やひらめき",
        type: "creative",
      },
      {
        text: "情報を集めてじっくり考えること",
        type: "steady",
      },
    ],
  },
  {
    id: 5,
    text: "友達から相談を受けたとき、どうすることが多い？",
    options: [
      {
        text: "一緒に解決方法を考える",
        type: "active",
      },
      {
        text: "相手の気持ちをじっくり聞く",
        type: "healing",
      },
      {
        text: "別の視点からアイデアを伝える",
        type: "creative",
      },
      {
        text: "相手が落ち着くまでそばにいる",
        type: "myPace",
      },
    ],
  },
  {
    id: 6,
    text: "予定を立てるとき、あなたに一番近いのは？",
    options: [
      {
        text: "思い立ったらすぐに行動する",
        type: "active",
      },
      {
        text: "一緒に行く人の希望を優先する",
        type: "healing",
      },
      {
        text: "その日の気分で自由に決める",
        type: "myPace",
      },
      {
        text: "時間や行き先を細かく決める",
        type: "steady",
      },
    ],
  },
  {
    id: 7,
    text: "課題やレポートには、どのように取り組む？",
    options: [
      {
        text: "早めに始めて計画的に進める",
        type: "steady",
      },
      {
        text: "興味のある部分から取り組む",
        type: "creative",
      },
      {
        text: "友達と相談しながら進める",
        type: "healing",
      },
      {
        text: "締め切りが近づくと一気に進める",
        type: "active",
      },
    ],
  },
  {
    id: 8,
    text: "予定にない出来事が起きたときは？",
    options: [
      {
        text: "すぐに次の行動を考える",
        type: "active",
      },
      {
        text: "周りの人が困っていないか確認する",
        type: "healing",
      },
      {
        text: "新しい展開として楽しむ",
        type: "creative",
      },
      {
        text: "落ち着いて状況を整理する",
        type: "steady",
      },
    ],
  },
  {
    id: 9,
    text: "友達と一緒にいるときのあなたは？",
    options: [
      {
        text: "話題を出して会話を盛り上げる",
        type: "moodMaker",
      },
      {
        text: "みんなの話を聞くことが多い",
        type: "healing",
      },
      {
        text: "自分の好きなことについて話す",
        type: "creative",
      },
      {
        text: "無理に話さず自然体で過ごす",
        type: "myPace",
      },
    ],
  },
  {
    id: 10,
    text: "自分に一番近いと思う言葉は？",
    options: [
      {
        text: "行動力がある",
        type: "active",
      },
      {
        text: "思いやりがある",
        type: "healing",
      },
      {
        text: "発想力がある",
        type: "creative",
      },
      {
        text: "自分のペースを大切にしている",
        type: "myPace",
      },
    ],
  },
];

const answers = ref(Array(questions.length).fill(null));

const answeredCount = computed(() => {
  return answers.value.filter((answer) => answer !== null).length;
});

const progressPercentage = computed(() => {
  return (answeredCount.value / questions.length) * 100;
});

const isAllAnswered = computed(() => {
  return answers.value.every((answer) => answer !== null);
});

const selectAnswer = (questionIndex, type) => {
  answers.value[questionIndex] = type;
};

const calculateResult = () => {
  const scores = {
    active: 0,
    healing: 0,
    creative: 0,
    steady: 0,
    moodMaker: 0,
    myPace: 0,
  };

  answers.value.forEach((answer) => {
    if (answer) {
      scores[answer] += 1;
    }
  });

  const highestScore = Math.max(...Object.values(scores));

  const highestTypes = Object.keys(scores).filter(
    (type) => scores[type] === highestScore,
  );

  for (let index = answers.value.length - 1; index >= 0; index -= 1) {
    const answer = answers.value[index];

    if (highestTypes.includes(answer)) {
      return answer;
    }
  }

  return highestTypes[0];
};

const submitDiagnosis = () => {
  if (!isAllAnswered.value) {
    alert("すべての質問に回答してください");
    return;
  }

  const resultType = calculateResult();

  localStorage.setItem("diagnosisResultType", resultType);

  router.push("/self-diagnosis/result");
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

        <h1>自己診断</h1>
      </header>
    </div>

    <div class="diagnosis-page">
      <section class="introduction">
        <h2>あなたはどんなタイプ？</h2>

        <p>
          10個の質問に答えて、自分の性格や強みを見つけてみよう。
          深く考えすぎず、自分に一番近いものを選んでね。
        </p>
      </section>

      <section class="progress-area">
        <div class="progress-information">
          <span>回答状況</span>

          <span> {{ answeredCount }} / {{ questions.length }} </span>
        </div>

        <div class="progress-bar">
          <div
            class="progress-value"
            :style="{
              width: `${progressPercentage}%`,
            }"
          ></div>
        </div>
      </section>

      <form class="question-list" @submit.prevent="submitDiagnosis">
        <DiagnosisQuestionCard
          v-for="(question, questionIndex) in questions"
          :key="question.id"
          :question="question"
          :selected-answer="answers[questionIndex]"
          @select="selectAnswer(questionIndex, $event)"
        />

        <div class="submit-area">
          <button
            type="submit"
            class="submit-button"
            :disabled="!isAllAnswered"
          >
            診断する
          </button>

          <p v-if="!isAllAnswered" class="answer-message">
            あと{{ questions.length - answeredCount }}問です
          </p>
        </div>
      </form>
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
  grid-template-columns: 44px minmax(0, 1fr) 44px;
  align-items: center;

  width: 100%;
  max-width: 760px;
  min-height: 72px;
  margin: 0 auto;
  padding: 10px 16px;

  background: #ffd8e8;
  box-sizing: border-box;
}

.page-header h1 {
  grid-column: 2;
  margin: 0;
  font-size: clamp(20px, 4vw, 28px);
  font-weight: 700;
  text-align: center;
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

.diagnosis-page {
  width: 100%;
  max-width: 760px;
  min-height: calc(100vh - 72px);
  margin: 0 auto;
  background: #fff1f6;
}

.introduction {
  padding: 42px 32px 24px;
  text-align: center;
}

.introduction h2 {
  margin: 0 0 18px;
  font-size: clamp(23px, 4.5vw, 32px);
  line-height: 1.4;
}

.introduction p {
  max-width: 620px;
  margin: 0 auto;
  font-size: clamp(15px, 2.5vw, 18px);
  line-height: 1.9;
  text-align: left;
}

.progress-area {
  padding: 0 32px 36px;
}

.progress-information {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: clamp(14px, 2.5vw, 16px);
}

.progress-bar {
  width: 100%;
  height: 12px;
  overflow: hidden;
  background: #ead2dc;
  border-radius: 999px;
}

.progress-value {
  height: 100%;
  background: #bf6e91;
  border-radius: 999px;
  transition: width 0.3s ease;
}

.question-list {
  padding: 0 32px 56px;
}

.submit-area {
  padding-top: 12px;
  text-align: center;
}

.submit-button {
  display: block;

  width: min(100%, 280px);
  min-height: 56px;
  margin: 28px auto 0;
  padding: 14px 24px;

  color: #2d2026;
  font-size: 18px;
  font-weight: 600;

  background: #ffe5a3;
  border: 1px solid #a4773e;
  border-radius: 12px;

  cursor: pointer;

  transition:
    background-color 0.2s,
    transform 0.2s,
    opacity 0.2s;
}

.submit-button:hover:not(:disabled) {
  background: #ffdb7a;
  transform: translateY(-1px);
}

.submit-button:disabled {
  color: #a99d94;
  background: #f3dfbf;
  border-color: #d5b98d;
  cursor: not-allowed;
  opacity: 0.6;
}

.answer-message {
  margin: 12px 0 0;
  font-size: 15px;
  text-align: center;
}

@media (max-width: 600px) {
  .page-header {
    grid-template-columns: 40px minmax(0, 1fr) 40px;

    width: 100%;
    max-width: none;
    min-height: 64px;
    margin: 0;
    padding: 8px 12px;

    box-sizing: border-box;
  }

  .page-header h1 {
    min-width: 0;
    font-size: 20px;
    white-space: nowrap;
  }

  .back-button {
    width: 40px;
    height: 40px;
    font-size: 28px;
  }

  .introduction {
    padding: 30px 20px 20px;
  }

  .introduction p {
    line-height: 1.8;
  }

  .progress-area {
    padding: 0 20px 30px;
  }

  .question-list {
    padding: 0 16px 44px;
  }

  .submit-button {
    width: min(100%, 240px);
    min-height: 52px;
    font-size: 17px;
  }
}

@media (max-width: 360px) {
  .page-header {
    padding-right: 8px;
    padding-left: 8px;
  }

  .introduction {
    padding-right: 16px;
    padding-left: 16px;
  }

  .progress-area {
    padding-right: 16px;
    padding-left: 16px;
  }

  .question-list {
    padding-right: 12px;
    padding-left: 12px;
  }
}
</style>
