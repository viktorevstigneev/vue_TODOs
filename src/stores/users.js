import { defineStore } from 'pinia'

const initialState = [
  {
    id: '1',
    name: 'pasha',
    email: 'pavel2001@mail.ru',
    phone: '+375(44)563-12-49',
    avatar: 'https://xsgames.co/randomusers/assets/avatars/male/3.jpg'
  },
  {
    id: '2',
    name: 'max',
    email: 'max2001@mail.ru',
    phone: '+375(25)353-67-92',
    avatar: 'https://xsgames.co/randomusers/assets/avatars/male/2.jpg'
  },
  {
    id: '3',
    name: 'Daria',
    email: 'Daria@mail.ru',
    phone: '+375(33)674-15-70',
    avatar: 'https://xsgames.co/randomusers/assets/avatars/female/1.jpg'
  }
]

const STORE_NAME = 'users'

export const useUsersStore = defineStore(STORE_NAME, {
  state: () => ({
    users: JSON.parse(localStorage.getItem(STORE_NAME)) || initialState
  }),
  getters: {},
  actions: {
    addUser(user) {
      this.users.push(user)
      localStorage.setItem(STORE_NAME, JSON.stringify(this.users))
    },
    deleteUser(id) {
      this.users = this.users.filter((item) => {
        return item.id !== id
      })
      localStorage.setItem(STORE_NAME, JSON.stringify(this.users))
    },
    setUserData({ id, name, email, phone }) {
      this.users = this.users.map((item) => {
        if (item.id === id) {
          item.name = name
          item.email = email
          item.phone = phone
          return item
        }
        return item
      })
      localStorage.setItem(STORE_NAME, JSON.stringify(this.users))
    }
  }
})
