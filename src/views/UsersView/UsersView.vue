<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useState } from '../../composables/state'
import { useTaskStore } from '../../stores/tasks'
import { useUsersStore } from '../../stores/users'
import ModalWindow from '../../components/ModalWindow/ModalWindow.vue'
import { POPUP_OVERLAY_CLASSNAME } from '../../constants.js'

import TaskInput from '../../components/TaskInput/TaskInput.vue'
import UserInput from '../../components/UserInput/UserInput.vue'
import TaskItem from '../../components/TaskItem/TaskItem.vue'

const store = useTaskStore()
const reffedStore = storeToRefs(store)

const usersStore = useUsersStore()
const reffedUsersStore = storeToRefs(usersStore)

const [activeUser, setActiveUser] = useState(reffedStore.tasks.value[0])
const [isModalOpen, setModalOpen] = useState(false)
const [isModalEditOpen, setModalEditOpen] = useState(false)

const name = ref('')
const email = ref('')
const phone = ref('')

const handleCloseButtonClick = () => {
  setModalOpen(false)
}

const handleOverlayClick = (evt) => {
  if (evt.target.classList.contains(POPUP_OVERLAY_CLASSNAME)) {
    setModalOpen(false)
  }
}

const handleCloseEditWindowClick = () => {
  setModalEditOpen(false)
}

const handleEditWindowOverlayClick = (evt) => {
  if (evt.target.classList.contains(POPUP_OVERLAY_CLASSNAME)) {
    setModalEditOpen(false)
  }
}

const handleEditButtonClick = (item) => {
  setModalEditOpen(true)
  setActiveUser(item)
  name.value = item.name
  email.value = item.email
  phone.value = item.phone
}

const handleSubmit = (id) => {

  if (name.value.length > 0 && email.value.length > 0 && phone.value.length > 0) {
    usersStore.setUserData({
      id,
      name: name.value,
      email: email.value,
      phone: phone.value
    })
  }
}
</script>

<template>
  <main class="users">
    <div class="users__container">
      <UserInput />
      <h2 class="users__title">List of all Users</h2>
      <ul class="users__list">
        <li
          class="users__item"
          v-for="item in reffedUsersStore.users.value"
          :key="item.id"
          @click="
            () => {
              setActiveUser(item)
              setModalOpen(true)
            }
          "
        >
          <i class="users__delete-icon" @click.stop="usersStore.deleteUser(item.id)">&times;</i>
          <img class="users__avatar" :src="item.avatar" alt="avatar" width="200" height="200" />
          <p class="users__name">{{ item.name }}</p>
          <a
            class="users__email"
            :href="'mailto:' + item.email"
            @click="
              (evt) => {
                evt.stopPropagation()
              }
            "
            >{{ item.email }}</a
          >
          <button class="users__edit" @click.stop="handleEditButtonClick(item)">
            Edit user data
          </button>
          <a
            class="users__phone"
            :href="'tel:' + item.phone"
            @click="
              (evt) => {
                evt.stopPropagation()
              }
            "
            >{{ item.phone }}</a
          >
        </li>
      </ul>
    </div>
  </main>
  <ModalWindow
    v-if="isModalOpen"
    @onCloseButtonClick="handleCloseButtonClick"
    @onOverlayClick="handleOverlayClick"
    :title="`${activeUser.name}'s tasks list`"
  >
    <TaskInput :userId="activeUser.id"></TaskInput>
    <ul
      class="task__list"
      v-if="reffedStore.tasks.value.filter((item) => item.userId === activeUser.id).length > 0"
    >
      <li
        class="task__item"
        v-for="item in reffedStore.tasks.value.filter((item) => item.userId === activeUser.id)"
        :key="item.id"
      >
        <TaskItem
          @onRemove="store.deleteTask(item.id)"
          @onDone="store.setDoneTask(item.id)"
          :model="item"
        ></TaskItem>
      </li>
    </ul>

    <p class="task__empty" v-else>there is no items for now</p>
  </ModalWindow>

  <ModalWindow
    v-if="isModalEditOpen"
    @onCloseButtonClick="handleCloseEditWindowClick"
    @onOverlayClick="handleEditWindowOverlayClick"
    :title="`${activeUser.name}`"
  >
    <img class="users__avatar" :src="activeUser.avatar" alt="avatar" width="200" height="200" />
    <form class="edit__wrapper" @submit.prevent="handleSubmit(activeUser.id)">
      <input
        class="edit__input"
        v-model="name"
        placeholder="Ender user name"
        type="text"
        required
      />
      <input class="edit__input" v-model="email" placeholder="enter email" type="email" required />
      <input class="edit__input" v-model="phone" placeholder="phone" type="text" required />
      <button class="edit__button">save changes</button>
    </form>
  </ModalWindow>
</template>

<style src="./style.css"></style>
