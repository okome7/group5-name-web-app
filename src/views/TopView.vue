<!-- PRテスト用のコメント -->

<template>
  <main class="top-page">
    <div class="top-container">
      <div class="content-wrapper">
        <h1 class="app-title">proffy</h1>

        <div class="button-group">
          <button
            type="button"
            class="menu-button"
            @click="goTo('self-diagnosis')"
          >
            自己診断をする
          </button>

          <button
            type="button"
            class="menu-button"
            @click="goTo('profile-edit')"
          >
            プロフィール編集
          </button>

          <button
            type="button"
            class="menu-button"
            @click="goTo('profile-exchange')"
          >
            プロフィール交換
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goTo = (page) => {
  router.push(`/${page}`);
};
</script>

<style scoped>
.top-page {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  background: #ffebf3;
}

.top-container {
  display: flex;
  align-items: flex-start;
  justify-content: center;

  width: 100%;
  max-width: 760px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 120px 32px 48px;

  background: #ffebf3;
  box-sizing: border-box;
}

.content-wrapper {
  width: 100%;
  max-width: 420px;
  text-align: center;
}

.app-title {
  width: 100%;
  margin: 0 0 64px;
  text-align: center;
  font-size: 56px;
  font-family: "Times New Roman", serif;
  color: #4d2f2f;
  margin-bottom: 80px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 28px;

  width: 100%;
}

.menu-button {
  display: block;

  width: min(100%, 280px);
  min-height: 52px;
  margin: 0 auto;
  padding: 12px 20px;

  color: #333333;
  font-size: 16px;
  font-weight: 700;

  background: #ffe8a3;
  border: 1px solid #311313;
  border-radius: 10px;

  cursor: pointer;

  transition:
    background-color 0.2s,
    transform 0.2s;
}

.menu-button:hover {
  background: #ffde7d;
  transform: translateY(-1px);
}

.menu-button:active {
  transform: translateY(0);
}

@media (max-width: 600px) {
  .top-container {
    max-width: none;
    min-height: 100vh;
    margin: 0;
    padding: 96px 20px 40px;
  }

  .content-wrapper {
    max-width: 360px;
  }

  .app-title {
    margin-bottom: 52px;
    font-size: 32px;
  }

  .button-group {
    gap: 24px;
  }

  .menu-button {
    width: min(100%, 240px);
    min-height: 50px;
    font-size: 15px;
  }
}

@media (max-width: 360px) {
  .top-container {
    padding-top: 80px;
    padding-right: 16px;
    padding-left: 16px;
  }

  .app-title {
    margin-bottom: 44px;
    font-size: 29px;
  }

  .button-group {
    gap: 20px;
  }

  .menu-button {
    width: min(100%, 220px);
  }
}
</style>
