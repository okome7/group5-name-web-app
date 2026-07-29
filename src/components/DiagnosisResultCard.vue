<script setup>
defineProps({
  result: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="result-card">
    <p class="result-label">あなたのタイプは</p>

    <div class="result-icon">
      {{ result.icon }}
    </div>

    <h2>{{ result.title }}</h2>

    <p class="description">
      {{ result.description }}
    </p>

    <div class="detail-list">
      <section class="detail-item">
        <h3>あなたの性格</h3>
        <p>{{ result.personality }}</p>
      </section>

      <section class="detail-item">
        <h3>あなたの強み</h3>
        <p>{{ result.strength }}</p>
      </section>

      <section class="detail-item">
        <h3>みんなからは</h3>
        <p>「{{ result.impression }}」と思われているかも</p>
      </section>

      <section class="detail-item">
        <h3>チャームポイント</h3>
        <p>{{ result.charmPoint }}</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.result-card {
  text-align: center;
}

.result-label {
  margin: 0 0 12px;
  font-size: 16px;
}

.result-icon {
  margin-bottom: 8px;
  font-size: 52px;
}

.result-card h2 {
  margin: 0 0 22px;
  font-size: 27px;
}

.description {
  margin: 0 0 28px;
  line-height: 1.9;
  text-align: left;
}

.detail-list {
  display: grid;
  gap: 14px;
}

.detail-item {
  padding: 16px;
  border-radius: 12px;
  background: #ffffff;
  text-align: left;
}

.detail-item h3 {
  margin: 0 0 8px;
  color: #a34d74;
  font-size: 15px;
}

.detail-item p {
  margin: 0;
  line-height: 1.7;
}
</style>
