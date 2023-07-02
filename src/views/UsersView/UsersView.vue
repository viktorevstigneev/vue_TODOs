<script setup>
import { useState } from '../../composables/state.js'
import ModalWindow from '../../components/ModalWindow/ModalWindow.vue'

const USERS_LIST = [
  {
    id: '1',
    name: 'pasha',
    email: 'pavel2001@mail.ru',
    phone: '+375(44)563-12-49'
  },
   {
    id: '2',
    name: 'max',
    email: 'max2001@mail.ru',
    phone: '+375(44)563-12-49'
  }
]

const [activeUserId, setActiveUserID] = useState(USERS_LIST[0].id);

const [isModalOpen, setModalOpen] = useState(false);

</script>

<template>
  <main class="users">
    <div v-for="item in USERS_LIST" :key="item.id" @click="setActiveUserID(item.id)">{{ item.name }}</div>
  </main>
  <ModalWindow v-if="isModalOpen" />
</template>

<style src="./style.css"></style>
