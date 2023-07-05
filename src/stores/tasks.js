import { defineStore } from 'pinia'


const initialState = [
  {
    id: '1',
    userId: '1',
    title: 'bread',
    description: 'i need to buy a bread',
    isDone: false
  },
  {
    id: '2',
    userId: '1',
    title: 'bed',
    description: 'go to sleep',
    isDone: false
  }
]

const STORE_NAME = 'tasks'

export const useTaskStore = defineStore(STORE_NAME, {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem(STORE_NAME)) || initialState
  }),
  getters: {},
  actions: {
    addTask(task) {
      this.tasks.push(task)
      localStorage.setItem(STORE_NAME, JSON.stringify(this.tasks))
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((item) => {
        return item.id !== id
      })
      localStorage.setItem(STORE_NAME, JSON.stringify(this.tasks))
    },
    setDoneTask(id) {
      this.tasks = this.tasks.map((item) => {
        if (item.id === id) item.isDone = true
        return item
      })
      localStorage.setItem(STORE_NAME, JSON.stringify(this.tasks))
    }
  }
})
