import { defineStore } from "pinia";
import {germanyKey, names, regions} from "@/data/dataKeys";

export const useCurrentRegionStore = defineStore({
  id: "currentRegion",
  state: () => ({
    currentRegion: germanyKey
  }),
  getters: {
    currentRegionName(state) {
      return names[state.currentRegion];
    },
  },
  actions: {
    updateRegion(region) {
      if (region === germanyKey || regions.find(reg => reg.key === region)) {
        this.currentRegion = region;
        console.log("Setting current region to", region);
      } else {
        console.warn('Invalid region (', region, '). Using default region instead.');
        region = germanyKey
      }
    },
  },
});
