import { createStore } from 'pinia'

export const useStore = createStore({
  id: 'timestamp',
  state: () => ({
    currentTimestamp: new Date('2020-01-07').getTime() * 1000
  }),
  mutations: {
    updateCurrentTimestamp(state, timestamp) {
      state.currentTimestamp = timestamp
    }
  }
})