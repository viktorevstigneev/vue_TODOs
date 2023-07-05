<script setup>
defineProps({
  model: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['onDone', 'onRemove'])

const emitOnDone = (id) => {
  emit('onDone', id)
}

const emitOnRemove = (id) => {
  emit('onRemove', id)
}
</script>

<template>
  <div class="card">
    <div>
      <h4 class="card__title">{{ model.title }}</h4>
      <p class="card__description">{{ model.description }}</p>
    </div>
    <div>
      <button @click="emitOnDone" v-if="!model.isDone">✅</button>
      <button @click="emitOnRemove" v-else>❌</button>
    </div>
  </div>
</template>

<style src="./style.css"></style>
