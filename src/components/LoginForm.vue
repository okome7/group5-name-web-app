<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");

function goRegister() {
  router.push({ name: "register" });
}
</script>

<template>
  <div class="login-page">
    <h1 class="logo">proffy</h1>

    <form class="login-form">
      <label>
        メールアドレス：
        <input v-model="email" type="email" />
      </label>

      <label>
        パスワード：
        <input v-model="password" type="password" />
      </label>

      <router-link to="/forgot-password" class="forgot">
        パスワードをお忘れですか？
      </router-link>

      <button class="login-btn">ログイン</button>
      <button type="button" class="register-btn" @click="goRegister">
        新規登録
      </button>
    </form>
  </div>
</template>

<style scoped>
/* ページ全体 */
.login-page {
  position: fixed;
  inset: 0;
  background: #f9e7ef;

  display: flex;
  flex-direction: column;
  justify-content: center; /* 縦方向の中央 */
  align-items: center; /* 横方向の中央 */

  box-sizing: border-box;
}

/* タイトル */
.logo {
  font-size: 56px;
  font-family: "Times New Roman", serif;
  color: #4d2f2f;
  margin-bottom: 80px;
}

/* フォーム */
.login-form {
  width: 260px;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 14px;
  margin-bottom: 12px;
}

input {
  width: 100%;
  height: 32px;
  margin-top: 4px;
  border: 1px solid #999;
  border-radius: 5px;
  padding: 0 10px;
  box-sizing: border-box;
}

/* パスワード忘れ */
.forgot {
  font-size: 12px;
  color: #3b73d9;
  margin-bottom: 35px;
  text-decoration: underline;
}

/* ボタン共通 */
.login-btn,
.register-btn {
  width: 130px;
  height: 48px;

  margin: 10px auto;

  display: block; /* ←追加 */

  border: 1px solid #7a5b3c;
  border-radius: 10px;

  background: #ffe7a6;

  font-size: 24px;

  cursor: pointer;

  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}

.login-btn:hover,
.register-btn:hover {
  background: #ffd977;
}
</style>
