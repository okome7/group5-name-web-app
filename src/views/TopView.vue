<!-- PRテスト用のコメント -->

<template>
  <div class="app-wrapper">
    <div class="top-container">
      <div class="content-wrapper">
       <h1 class="app-title">proffy</h1>

       <div class="button-group">
         <button class="menu-button" @click="goTo('diagnosis')">自己診断をする</button>
         <button class="menu-button" @click="goTo('profile-edit')">プロフィール編集</button>
         <button class="menu-button" @click="goTo('profile-exchange')">プロフィール交換</button>
       </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goTo(page) {
  router.push(`/${page}`)
}
</script>

<style scoped>
/* 外側（ピンクを広げない） */
.app-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  padding-top: 20px;
}

/* スマホ枠（角ばったまま）＋ 0.9倍縮小 */
.top-container {
  width: calc(100vh*9/18);
  height: 100vh;
  background-color: #ffebf3;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 100px;

  transform: scale(0.8);
  transform-origin: top center; /* 上中央を基準に縮小 */
}

.content-wrapper {
  margin-top: 40px; /* ← タイトル＋ボタン全体を下げる */
}


/* タイトル */
.app-title {
  font-size: 30px;
  color: #311313;
  margin-bottom: 60px;
  font-weight: 300;
  margin-bottom: 60px;
  text-align: center;
  width: 100%;
}

/* ボタン配置 */
.button-group {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 80%;
  max-width: 300px;
}

/* 丸いボタン（縁あり・影なし） */
.menu-button {
  background-color: #ffe8a3;
  border: 1px solid #311313;
  padding: 10px 2px;
  font-size: 15px;
  border-radius: 10px; /* ボタンだけ丸く */
  cursor: pointer;
  font-weight: bold;
  color: #333;
  width:150px;
  margin:0 auto;
}
</style>
