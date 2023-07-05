<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['onCloseButtonClick', 'onOverlayClick'])

const emitOnCloseButtonClick = (evt) => {
  emit('onCloseButtonClick', evt)
}

const emitOnOverlayClick = (evt) => {
  emit('onOverlayClick', evt)
}
</script>

<template>
  <div className="modal__window" @click="emitOnOverlayClick">
    <div className="modal__container">
      <button className="modal__close-button" @click="emitOnCloseButtonClick">&times;</button>
      <div className="modal__header">
        <h2 className="modal__title">{{ title }}</h2>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped src="./style.css"></style>
