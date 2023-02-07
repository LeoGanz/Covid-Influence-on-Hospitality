import { defineStore } from "pinia";

export const useBarChartStore = defineStore({
  id: "barchart",
  state: () => ({
    displayUpperCategory: true,
    displayLodging: false,
    displayGastronomy: false,
  }),
});
