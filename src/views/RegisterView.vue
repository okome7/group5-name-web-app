<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const passwordConfirm = ref("");

function handleRegister() {
  if (password.value !== passwordConfirm.value) {
    alert("パスワードが一致しません");
    return;
  }

  alert("新規登録しました");

  // 登録後ログイン画面へ戻る
  router.push({ name: "login" });
}

function backLogin() {
  router.push({ name: "login" });
}
</script>

<template>
  <div class="register-page">
    <h1 class="logo">proffy</h1>

    <form class="register-form" @submit.prevent="handleRegister">
      <label>
        メールアドレス：
        <input v-model="email" type="email" />
      </label>

      <label>
        パスワード：
        <input v-model="password" type="password" />
      </label>

      <label>
        パスワード確認：
        <input v-model="passwordConfirm" type="password" />
      </label>

      <button class="register-btn">新規登録</button>

      <a href="#" class="back-link" @click.prevent="backLogin">
        ログイン画面へ戻る
      </a>
    </form>
  </div>
</template>

<style scoped>
/* ページ全体 */
.register-page {
  position: fixed;
  inset: 0;
  background: #f9e7ef;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
}

/* ロゴ */
.logo {
  font-size: 56px;
  font-family: "Times New Roman", serif;
  color: #4d2f2f;
  margin-bottom: 80px;
}

/* フォーム */
.register-form {
  width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

/* ボタン共通 */
.register-btn,
.back-btn {
  width: 130px;
  height: 48px;

  margin: 10px auto;

  border: 1px solid #7a5b3c;
  border-radius: 10px;

  background: #ffe7a6;

  font-size: 20px;

  cursor: pointer;

  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}

.register-btn:hover,
.back-btn:hover {
  background: #ffd977;
}
.back-link {
  font-size: 14px;
  color: #3b73d9;

  text-decoration: underline;

  cursor: pointer;

  margin-top: 20px;
}
</style>
