import { defineStore } from 'pinia'

export const useCurrentDateStore = defineStore({
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