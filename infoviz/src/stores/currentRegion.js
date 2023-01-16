import { createStore } from 'pinia'

export const useStore = createStore({
  id: "currentRegion",
  state: () => ({
    currentRegion: null, //TODO: Set default state
  }),
  mutations: {
    updateCurrentTimestamp(state, region) {
      state.currentRegion = region;
    }
  }
})