import { defineStore } from "pinia";

export const useCurrentRegionStore = defineStore({
  id: "currentRegion",
  state: () => ({
    currentRegion: "germany", //TODO: Set default state
  }),
  actions: {
    updateRegion(region) {
      this.currentRegion = region;
    },
  },
});
