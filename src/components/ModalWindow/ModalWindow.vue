<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="modal">
    <div class="model__container">
          <h1 class="modal__title">{{ title }}</h1>
    </div>
  </div>
  
</template>

<style scoped src="./style.css"></style>
