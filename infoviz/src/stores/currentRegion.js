import { defineStore } from "pinia";
import { names } from "@/data/dataKeys";

export const useCurrentRegionStore = defineStore({
  id: "currentRegion",
  state: () => ({
    currentRegion: "germany", //TODO: Set default state
  }),
  getters: {
    currentRegionName(state) {
      return names[state.currentRegion];
    },
  },
  actions: {
    updateRegion(region) {
      this.currentRegion = region;
    },
  },
});
