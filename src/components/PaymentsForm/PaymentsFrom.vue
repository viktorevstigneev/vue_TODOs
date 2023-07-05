<script setup>
import { ref } from 'vue'
import { useUsersStore } from '../../stores/users'
import { usePaymentsStore } from '../../stores/payments'

const name = ref('')
const money = ref(0)
const userId = ref('')

const store = useUsersStore()
const paymentsStore = usePaymentsStore()

const handleSubmit = () => {
  if (name.value.length > 0 && userId.value.length > 0) {
    paymentsStore.addPayment({
      id: Math.floor(Math.random() * 1000000),
      name: name.value,
      money: money.value,
      userId: userId.value,
      date: new Date()
    })
  }
}
</script>

<template>
  <form class="payment__wrapper" @submit.prevent="handleSubmit">
    <input class="payment__input" v-model="name" placeholder="Enter payment name" type="text" />
    <input
      class="payment__input"
      v-model="money"
      placeholder="Enter income/expense"
      type="number"
    />
    <label for="userId">Choose user</label>
    <select class="payment__input" v-model="userId" id="userId">
      <option v-for="item in store.users" :value="item.id">{{ item.name }}</option>
    </select>
    <button class="payment__button">Add Payment</button>
  </form>
</template>

<style src="./style.css"></style>
