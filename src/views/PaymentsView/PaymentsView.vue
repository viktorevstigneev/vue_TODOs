<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useState } from '../../composables/state'
import { usePaymentsStore } from '../../stores/payments'
import { useUsersStore } from '../../stores/users'

import PaymentsFrom from '../../components/PaymentsForm/PaymentsFrom.vue'
import ModalWindow from '../../components/ModalWindow/ModalWindow.vue'
import { POPUP_OVERLAY_CLASSNAME } from '../../constants.js'

const store = usePaymentsStore()
const reffedStore = storeToRefs(store)

const usersStore = useUsersStore()

const [activePay, setActivePay] = useState(reffedStore.payments.value[0])
const [activeUser, setActiveUser] = useState(usersStore.users[0])
const [isModalOpen, setModalOpen] = useState(false)

const handleCloseButtonClick = () => {
  setModalOpen(false)
}

const handleOverlayClick = (evt) => {
  if (evt.target.classList.contains(POPUP_OVERLAY_CLASSNAME)) {
    setModalOpen(false)
  }
}

const handlePaymentClick = (item) => {
  setModalOpen(true)
  setActivePay(item)
  setActiveUser(usersStore.users.find((user) => user.id == item.userId))
}

const handleDeletePayment = (id)=>{
  store.deletePayment(id)
}
</script>

<template>
  <main class="pay">
    <div class="pay__container">
      <PaymentsFrom />
      <h1 class="pay__title">All payments</h1>
      <ul class="pay__list" v-if="reffedStore.payments.value.length > 0">
        <li
          class="pay__item"
          v-for="item in store.payments"
          :key="item.id"
          @click="handlePaymentClick(item)"
        >
          {{ item.name }}
          ----------
          {{ new Date(item.date).toLocaleString() }}

          <button class="pay__delete" @click.stop="handleDeletePayment(item.id)">❌</button>
        </li>
      </ul>
    </div>
  </main>

  <ModalWindow
    v-if="isModalOpen"
    @onCloseButtonClick="handleCloseButtonClick"
    @onOverlayClick="handleOverlayClick"
    :title="`${activePay.name} details`"
  >
    <div class="details">
      <p class="details__text">User: {{ activeUser.name }}</p>
      <p class="details__text">Income/ expense: {{ activePay.money }}$</p>
      <p class="details__text">Payments date: {{ new Date(activePay.date).toLocaleString() }}</p>
    </div>
  </ModalWindow>
</template>

<style src="./style.css"></style>
