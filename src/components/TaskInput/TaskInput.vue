<script setup>
import { ref } from 'vue'
import { useTaskStore } from '../../stores/tasks'

const props = defineProps({
  userId: {
    type: String,
    required: true
  }
})

const title = ref('')
const description = ref('')

const { userId } = props

const store = useTaskStore()

const handleSubmit = (evt) => {
  if (title.value.length > 0 && description.value.length > 0) {
    store.addTask({
      id: Math.floor(Math.random() * 1000000),
      userId: userId,
      title: title.value,
      description: description.value,
      isDone: false
    })
    // evt.target.reset()
    title.value = ''
    description.value = ''
  }
}
</script>

<template>
  <form class="task__wrapper" @submit.prevent="handleSubmit">
    <input class="task__input" v-model="title" placeholder="Title" type="text" />
    <input class="task__input" v-model="description" placeholder="Description" type="text" />
    <button class="task__button" >Add task</button>
  </form>
</template>

<style src="./style.css"></style>
