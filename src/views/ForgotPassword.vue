<script setup>
import { ref } from "vue";

const email = ref("");

const sendMail = () => {
  alert(`${email.value} にパスワード再設定メールを送信しました。`);
};
</script>

<template>
  <div class="forgot-page">
    <h1>パスワード再設定</h1>

    <p>
      登録しているメールアドレスを入力してください。<br />
      パスワード再設定用のメールを送信します。
    </p>

    <input v-model="email" type="email" placeholder="メールアドレス" />

    <button @click="sendMail">メールを送信</button>

    <router-link to="/"> ログイン画面へ戻る </router-link>
  </div>
</template>

<style scoped>
.forgot-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f9e7ef;
}

input {
  width: 260px;
  height: 35px;
  margin: 20px 0;
  padding: 0 10px;
}

button {
  width: 180px;
  height: 40px;
  margin-bottom: 20px;
}
</style>
