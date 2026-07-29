<script setup>
import DiagnosisOption from "./DiagnosisOption.vue";

defineProps({
  question: {
    type: Object,
    required: true,
  },
  selectedAnswer: {
    type: String,
    default: null,
  },
});

defineEmits(["select"]);
</script>

<template>
  <section class="question-card">
    <h2>Q{{ question.id }}. {{ question.text }}</h2>

    <div class="option-list">
      <DiagnosisOption
        v-for="option in question.options"
        :key="option.text"
        :option="option"
        :question-id="question.id"
        :selected="selectedAnswer === option.type"
        @select="$emit('select', $event)"
      />
    </div>
  </section>
</template>

<style scoped>
.question-card {
  margin-bottom: 34px;
}

.question-card h2 {
  margin: 0 0 14px;
  font-size: 17px;
  line-height: 1.6;
}

.option-list {
  display: grid;
  gap: 10px;
}
</style>
