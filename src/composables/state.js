import { readonly, ref, reactive } from 'vue'

export function useState(initialState) {
  const state = ref(initialState)
  
  const setState = (newState) => {
    state.value = newState
  }

  return [readonly(state), setState]
}


export function useObjectState(initialState) {
  const state = reactive(initialState)

  const setObjectState = (newState) => {
    state.value = newState
  }

  return [readonly(state), setObjectState]
}
