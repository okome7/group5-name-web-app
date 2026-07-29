<script setup>
defineProps({
  option: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  questionId: {
    type: Number,
    required: true,
  },
});

defineEmits(["select"]);
</script>

<template>
  <label class="diagnosis-option" :class="{ selected }">
    <input
      type="radio"
      :name="`question-${questionId}`"
      :value="option.type"
      :checked="selected"
      @change="$emit('select', option.type)"
    />

    <span>{{ option.text }}</span>
  </label>
</template>

<style scoped>
.diagnosis-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid #d7a6ba;
  border-radius: 10px;
  background: white;
  cursor: pointer;
}

.diagnosis-option.selected {
  border: 2px solid #bf6e91;
  background: #ffe2ed;
}

.diagnosis-option input {
  width: 18px;
  height: 18px;
  margin: 0;
  accent-color: #bf6e91;
}
</style>
