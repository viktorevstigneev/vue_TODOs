<script setup>
import { ref } from 'vue'
import { useUsersStore } from '../../stores/users'
import {randomIntFromInterval} from '../../helpers'
const name = ref('')
const email = ref('')
const phone = ref('')

const store = useUsersStore()

const handleSubmit = (evt) => {
  if (name.value.length > 0 && email.value.length > 0 && phone.value.length > 0) {
    store.addUser({
      id: Math.floor(Math.random() * 1000000),
      name: name.value,
      email: email.value,
      phone: phone.value,
      avatar: `https://xsgames.co/randomusers/assets/avatars/male/${randomIntFromInterval(1, 50)}.jpg`
    })
   
  }

   evt.target.reset();
}
</script>

<template>
  <form class="user__wrapper" @submit.prevent="handleSubmit">
    <input class="user__input" v-model="name" placeholder="Ender user name" type="text" />
    <input class="user__input" v-model="email" placeholder="enter email" type="email" />
    <input class="user__input" v-model="phone" placeholder="phone" type="text" />
    <button class="user__button">Add User</button>
  </form>
</template>

<style src="./style.css"></style>
