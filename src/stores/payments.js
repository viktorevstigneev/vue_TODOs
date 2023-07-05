import { defineStore } from 'pinia'

const initialState = [
  {
    id: '1',
    name: 'buy a bread',
    money: -12,
    userId: '1',
    date: new Date()
  },
  {
    id: '2',
    name: 'salary',
    money: 1200,
    userId: '1',
    date: new Date()
  },

  {
    id: '3',
    name: 'buy a bread',
    money: -12,
    userId: '1',
    date: new Date()
  }
]

const STORE_NAME = 'payments'

export const usePaymentsStore = defineStore(STORE_NAME, {
  state: () => ({
    payments: JSON.parse(localStorage.getItem(STORE_NAME)) || initialState
  }),
  getters: {},
  actions: {
    addPayment(payment) {

      this.payments.push(payment)

      localStorage.setItem(STORE_NAME, JSON.stringify(this.payments))
    },
    deletePayment(id) {
      this.payments = this.payments.filter((item) => {
        return item.id !== id
      })
      localStorage.setItem(STORE_NAME, JSON.stringify(this.payments))
    }
  }
})
